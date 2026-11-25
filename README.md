# Beyond the Map - personal travel website

> **Craft a life that feels like you.** Do you want to see the world? Let's start this journey together.

A personal travel brand site (not a booking engine): visitors explore **destinations -> places -> top 5 things to do**,
read the "35+ countries" story, and send a **Plan my trip** request.

| Layer | Tech |
|---|---|
| Frontend | React 18 + Vite + TypeScript, Tailwind CSS, React Router, Framer Motion, TanStack Query, React Hook Form + Zod |
| Backend | Spring Boot 3.3 (Java 21): Web, Data JPA, Validation, Mail, Security |
| Database | PostgreSQL + Flyway (H2 in-memory for the `dev` profile and tests) |

## Quick start

### Frontend only (no backend needed)

```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
```

The frontend tries the API first and falls back to its bundled seed data, so every page works without the backend.
Only the **Plan my trip** form needs the API (without it the form shows a friendly error with WhatsApp/email links).

> If `npm run dev` crashes with `EMFILE: too many open files, watch ...`, your machine has run out of inotify
> instances (VS Code uses many). Use `npm run dev:poll` instead.

### Backend (dev profile, in-memory H2 - no PostgreSQL needed)

```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=dev     # http://localhost:8080/api/destinations
```

Vite proxies `/api` to `:8080`, so with both running the site uses the real API.
Emails are only **logged** unless `MAIL_ENABLED=true`.

> **Behind a proxy?** Maven ignores `HTTPS_PROXY`. If you get `Connection reset` from Maven Central, add a
> `<proxies>` section to `~/.m2/settings.xml` pointing at your proxy.

### Full stack with Docker (PostgreSQL + API + Mailpit)

```bash
docker compose up --build        # API :8080, Mailpit inbox http://localhost:8025
cd frontend && npm run dev
```

## Project layout

```
frontend/
  src/
    components/   Navbar, Footer, Hero (typewriter + plane), DestinationCard, Top5List, Gallery, ContactForm ...
    pages/        Home, Destinations, Country, Place, About, PlanTrip, Privacy, NotFound
    data/         Seed content: one file per destination (japan.ts, italy.ts, ...), others.ts (display order), img.ts (photo IDs)
      ro/         Romanian destination content (only what differs from English), translations.ts merges it
    i18n/         Interface text: en.ts, ro.ts, language switch
    api/          API client with local-data fallback
  scripts/generate-seed-sql.mjs   -> writes backend V2__seed_destinations.sql and R__seed_translations.sql from src/data
backend/
  src/main/java/com/beyondthemap/
    controller/   DestinationController, InquiryController, AdminController, ApiExceptionHandler
    service/      DestinationService, ContentTranslations, InquiryService, MailService, RateLimiter
    model/ repository/ dto/ config/ (SecurityConfig: CORS + admin auth)
  src/main/resources/db/migration/  V1__schema.sql, V2__seed_destinations.sql (generated), V3 inquiry language,
                                    V4 translation tables, R__seed_translations.sql (generated)
```

## Editing content

The frontend `src/data/*.ts` files are the single source of truth for the seed content:

1. Edit or add a destination in `frontend/src/data/` (same shape as `japan.ts`).
2. Run `npm run seed:sql` in `frontend/` to regenerate `V2__seed_destinations.sql`.
3. **Before the first production deploy** you can freely regenerate V2. **After** it has run against a real
   database, put further content changes in a new migration (`V3__...sql`) or use the admin API. Flyway
   rejects changes to migrations that have already been applied.

### Translating destination content

English is the base content. Translations only hold the texts that differ, and anything missing
(a destination, a place, a field or a caption) is shown in English, both by the API and by the offline fallback.
Only Japan is translated into Romanian so far (`frontend/src/data/ro/japan.ts`); use it as the template.

1. Copy `frontend/src/data/ro/japan.ts` to `ro/<slug>.ts` and translate it. Places are keyed by slug,
   top-5 activities by rank, and gallery captions follow the English order (`null` keeps the English caption).
   Leave out names that do not change (for example Tokyo).
2. Register it in `frontend/src/data/ro/index.ts`.
3. Run `npm run seed:sql`. It regenerates `R__seed_translations.sql`. If a slug, rank or caption does not
   exist in the English data, or a text is too long for its column, it prints the problem and writes nothing.

`R__seed_translations.sql` is a *repeatable* Flyway migration: it re-runs automatically whenever it changes,
so translations can be updated at any time, also after going live. It replaces all translation rows and
matches them to the English rows by slug, rank and gallery position, so changing a place slug or the
gallery order in English also needs the translation updated.

The admin API only edits English, and it keeps the translations. `PUT /api/admin/destinations/{slug}`
updates existing places, top 5 items and gallery photos in place (matched by place slug, rank and gallery
position, the same keys as the translation file), so their translations stay attached. A place, item or photo
you leave out is deleted together with its translation, and a new one shows English until it is translated.
A translation still wins over edited English text, so after changing English, update the Romanian text too.

## REST API

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/api/destinations?lang=ro` | public | All destination cards |
| GET | `/api/destinations/{slug}?lang=ro` | public | Destination + its places |
| GET | `/api/destinations/{slug}/places/{placeSlug}?lang=ro` | public | Place: fun fact, top 5, gallery |
| POST | `/api/inquiries` | public | Plan-my-trip request (validated, honeypot, 5/hour/IP rate limit, emails) |
| GET | `/api/admin/inquiries?status=NEW` | admin | Paged requests, newest first |
| PUT | `/api/admin/inquiries/{id}/status` | admin | `{"status":"CONTACTED"}`: NEW / CONTACTED / BOOKED / CLOSED |
| DELETE | `/api/admin/inquiries/{id}` | admin | GDPR erasure |
| PUT / DELETE | `/api/admin/destinations/{slug}` | admin | Create/replace or delete content (English) |

`lang` is optional on the public reads: `ro` returns Romanian where a translation exists, and anything else
(missing, `en` or unknown) returns English. The response has a `Content-Language` header.

Admin uses HTTP Basic (`ADMIN_USER` / `ADMIN_PASSWORD`). The default `admin` / `change-me` only works with the
local `dev` profile. **In any other environment the API refuses to start** unless `ADMIN_PASSWORD` is set to at
least 12 characters and is not `change-me`. Set it in your hosting provider's environment variables (Render /
Railway dashboard), never in the repository. To generate one: `openssl rand -base64 24`.

## Configuration (backend env vars)

| Variable | Default | Notes |
|---|---|---|
| `DB_URL`, `DB_USER`, `DB_PASSWORD` | local PostgreSQL `beyondthemap` | |
| `CORS_ORIGINS` | `http://localhost:5173` | Comma-separated; set to your Vercel/Netlify URL |
| `MAIL_ENABLED` | `false` | `true` to actually send |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` | | Brevo / SendGrid / Gmail SMTP |
| `MAIL_FROM`, `MAIL_NOTIFY_TO` | `andreea.barbulescu@yahoo.com` | Sender, and where new requests are sent. `MAIL_FROM` must be an address your SMTP provider is allowed to send as (see below) |
| `ADMIN_USER`, `ADMIN_PASSWORD` | `admin` / `change-me` | **Required in production**: 12+ characters, not the default, or the API will not start |
| `INQUIRY_RATE_LIMIT` | `5` | Requests per IP per hour |

Frontend: `VITE_API_URL` (API base URL in production), `VITE_USE_LOCAL_DATA=true` (static demo, never calls the API).

> **Sender address and Yahoo.** Yahoo's DMARC policy is `reject`: mail that says it is *from* a `@yahoo.com`
> address but is sent through another provider (Brevo, SendGrid, ...) is usually rejected or lands in spam.
> Either send through Yahoo's own SMTP (`smtp.mail.yahoo.com`, port 587, with a Yahoo *app password*), or set
> `MAIL_FROM` to an address on your own domain that you have verified with your SMTP provider. `MAIL_NOTIFY_TO`
> can stay your Yahoo address. Visitor emails already set `Reply-To`, so replies always reach you.

## Deployment: keep the API behind a proxy

The inquiry rate limit is per visitor IP. The API reads that IP from `X-Forwarded-For` only when the request
arrives from a trusted proxy address (private/loopback ranges: `10.x`, `172.16-31.x`, `192.168.x`, `127.x`,
`100.64.x`, ...), and it reads the header from the right, so anything a visitor adds is ignored.
Requests from any other address are limited by their real connection IP.

- **Do** expose the API only through Render, Railway, or your own reverse proxy (nginx, Caddy, Traefik).
- **Do not** publish the backend port directly to the internet. If your proxy is not on a private address,
  set `SERVER_TOMCAT_REMOTEIP_INTERNALPROXIES` to a regex matching its IP. Never set it to an empty
  value: that trusts no proxy, and every visitor would then share the proxy's IP and its 5-per-hour limit.
- The limiter is in memory: it resets on restart and is per instance. It clears inactive visitors every
  10 minutes. If you run more than one instance, move it to Redis (e.g. Bucket4j).

## Tests

```bash
cd backend && mvn test      # 27 tests: content API (EN/RO), admin edits keep translations, validation, consent, honeypot, admin auth + password guard, mail, rate limiter, client-IP spoofing
cd frontend && npm run build  # type-check + production build
```

## Status and TODO before launch

**Done:** all pages, responsive layout (mobile hamburger menu, 1/2/3-column grids), coral/sunset/amber design system,
interactive hero (typewriter + "Start the journey" plane), filters by region and vibe, complete content for
**all 13 destinations** (56 places with fun fact + top 5), the inquiry pipeline, GDPR consent and privacy page.

**Needs your input:**
- [x] Real **phone / WhatsApp number, email, Instagram** -> `frontend/src/data/index.ts` (`CONTACT`)
- [ ] **Your own photos.** The current ones are Unsplash placeholders and are reused across places -> `frontend/src/data/img.ts`
- [x] Top 5 + fun facts for every destination (please proofread and add your own experiences)
- [ ] Your personal story -> `frontend/src/pages/About.tsx` (the visited-countries list and map are done;
      to add a country, add a row in `frontend/src/data/visited.ts`)
- [ ] Have the privacy policy reviewed by someone qualified -> `frontend/src/pages/Privacy.tsx`
      (bump `LAST_UPDATED` whenever you change it)
- [ ] Domain name, hosting choice, SMTP provider
- [x] Romanian destination content for all 13 destinations (please proofread)
      -> `frontend/src/data/ro/` (see "Translating destination content")
- [x] 3D destination globe on the home page and interactive visited-countries map on About
      (d3-geo + world-atlas, loaded on demand so the first page load stays small)

**Not built yet (from the roadmap):** admin UI (the admin API exists),
testimonials, blog, newsletter, Cloudinary image pipeline, SEO sitemap, analytics.
