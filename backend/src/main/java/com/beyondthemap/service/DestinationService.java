package com.beyondthemap.service;

import com.beyondthemap.dto.DestinationDtos.*;
import com.beyondthemap.model.Activity;
import com.beyondthemap.model.Destination;
import com.beyondthemap.model.Image;
import com.beyondthemap.model.Place;
import com.beyondthemap.model.TripInquiry.Lang;
import com.beyondthemap.repository.DestinationRepository;
import com.beyondthemap.repository.PlaceRepository;
import com.beyondthemap.service.ContentTranslations.ActivityText;
import com.beyondthemap.service.ContentTranslations.DestinationText;
import com.beyondthemap.service.ContentTranslations.PlaceText;
import com.beyondthemap.service.ContentTranslations.Texts;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class DestinationService {

    private final DestinationRepository destinations;
    private final PlaceRepository places;
    private final ContentTranslations translations;

    public DestinationService(DestinationRepository destinations, PlaceRepository places,
                              ContentTranslations translations) {
        this.destinations = destinations;
        this.places = places;
        this.translations = translations;
    }

    // Public reads take a language. English is the base text; for other languages each field
    // is replaced by its translation when one exists, and otherwise stays English.

    @Transactional(readOnly = true)
    public List<DestinationSummaryDto> list(Lang lang) {
        Texts tx = translations.forAllDestinations(lang);
        return destinations.findAllByOrderBySortOrderAsc().stream().map(d -> toSummary(d, tx)).toList();
    }

    @Transactional(readOnly = true)
    public DestinationDto get(String slug, Lang lang) {
        Destination d = destinations.findBySlug(slug)
                .orElseThrow(() -> new NotFoundException("Destination not found: " + slug));
        return toDto(d, translations.forDestination(d.getId(), lang));
    }

    @Transactional(readOnly = true)
    public PlaceDto getPlace(String slug, String placeSlug, Lang lang) {
        Place p = places.findByDestinationSlugAndSlug(slug, placeSlug)
                .orElseThrow(() -> new NotFoundException("Place not found: " + slug + "/" + placeSlug));
        return toDto(p, translations.forDestination(p.getDestination().getId(), lang));
    }

    /** Admin: create or fully replace a destination (including its places, top 5 and gallery). */
    @Transactional
    public DestinationDto upsert(String slug, DestinationDto in) {
        List<PlaceDto> ps = in.places() == null ? List.of() : in.places();
        requireUniquePlaceSlugs(ps);

        Destination d = destinations.findBySlug(slug).orElseGet(Destination::new);
        if (d.getId() == null) {
            d.setSortOrder((int) destinations.count());
        }
        d.setSlug(slug);
        d.setName(in.name());
        d.setFlag(in.flag());
        d.setRegion(in.region());
        d.setVibes(in.vibes() == null ? null : String.join(",", in.vibes()));
        d.setTagline(in.tagline());
        d.setDescription(in.description());
        d.setBestTimeToVisit(in.bestTimeToVisit());
        d.setHeroImageUrl(in.heroImageUrl());
        d.setLat(in.lat());
        d.setLng(in.lng());

        // Existing places, top 5 items and gallery photos are updated in place instead of being
        // deleted and inserted again. Their ids stay the same, so the translation rows that point
        // at them (V4 tables, ON DELETE CASCADE) survive the edit. Matching uses the same keys as
        // R__seed_translations.sql: place slug, activity rank and gallery position. Only items that
        // are really gone are deleted (orphanRemoval), and their translations with them. New items
        // have no translation yet, so they show English.
        Map<String, Place> existing = new HashMap<>();
        for (Place p : d.getPlaces()) {
            existing.put(p.getSlug(), p);
        }
        d.getPlaces().clear();
        for (int i = 0; i < ps.size(); i++) {
            PlaceDto pin = ps.get(i);
            Place p = existing.remove(pin.slug());
            if (p == null) {
                p = new Place();
                p.setDestination(d);
                p.setSlug(pin.slug());
            }
            applyPlace(pin, p, i);
            d.getPlaces().add(p);
        }
        // A new destination is persisted; an existing one is already managed, so it is only
        // flushed (save() would merge it, which can replace new child objects with copies).
        // After the flush every new place, top 5 item and photo has its id.
        if (d.getId() == null) {
            destinations.save(d);
        }
        destinations.flush();
        // The admin API edits the English base content, so it answers in English.
        return toDto(d, Texts.NONE);
    }

    // Places are matched by slug, so two places with the same slug in one request would be merged
    // into one row. Reject the request instead (the database also requires unique slugs).
    private static void requireUniquePlaceSlugs(List<PlaceDto> ps) {
        Set<String> seen = new HashSet<>();
        for (PlaceDto p : ps) {
            if (!seen.add(p.slug())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Duplicate place slug: " + p.slug());
            }
        }
    }

    @Transactional
    public void delete(String slug) {
        Destination d = destinations.findBySlug(slug)
                .orElseThrow(() -> new NotFoundException("Destination not found: " + slug));
        destinations.delete(d);
    }

    // ---- mapping -------------------------------------------------------

    private static List<String> vibes(Destination d) {
        if (d.getVibes() == null || d.getVibes().isBlank()) return List.of();
        return Arrays.stream(d.getVibes().split(",")).map(String::trim).filter(s -> !s.isEmpty()).toList();
    }

    /** The translated value when there is one, otherwise the English value. */
    private static String or(String translated, String english) {
        return translated == null || translated.isBlank() ? english : translated;
    }

    static DestinationSummaryDto toSummary(Destination d, Texts tx) {
        DestinationText t = tx.destinations().get(d.getId());
        return new DestinationSummaryDto(d.getSlug(),
                or(t == null ? null : t.name(), d.getName()), d.getFlag(), d.getRegion(), vibes(d),
                or(t == null ? null : t.tagline(), d.getTagline()),
                or(t == null ? null : t.description(), d.getDescription()),
                or(t == null ? null : t.bestTimeToVisit(), d.getBestTimeToVisit()),
                d.getHeroImageUrl(), d.getLat(), d.getLng(), d.getPlaces().size());
    }

    static DestinationDto toDto(Destination d, Texts tx) {
        DestinationText t = tx.destinations().get(d.getId());
        return new DestinationDto(d.getSlug(),
                or(t == null ? null : t.name(), d.getName()), d.getFlag(), d.getRegion(), vibes(d),
                or(t == null ? null : t.tagline(), d.getTagline()),
                or(t == null ? null : t.description(), d.getDescription()),
                or(t == null ? null : t.bestTimeToVisit(), d.getBestTimeToVisit()),
                d.getHeroImageUrl(), d.getLat(), d.getLng(),
                d.getPlaces().stream().map(p -> toDto(p, tx)).toList());
    }

    static PlaceDto toDto(Place p, Texts tx) {
        PlaceText t = tx.places().get(p.getId());
        return new PlaceDto(p.getSlug(),
                or(t == null ? null : t.name(), p.getName()),
                nullToEmpty(or(t == null ? null : t.description(), p.getDescription())),
                or(t == null ? null : t.funFact(), p.getFunFact()),
                p.getHeroImageUrl(),
                p.getActivities().stream().map(a -> {
                    ActivityText at = tx.activities().get(a.getId());
                    return new ActivityDto(a.getRank(),
                            or(at == null ? null : at.title(), a.getTitle()),
                            or(at == null ? null : at.description(), a.getDescription()),
                            a.getImageUrl());
                }).toList(),
                p.getGallery().stream()
                        .map(g -> new ImageDto(g.getUrl(), or(tx.captions().get(g.getId()), g.getCaption())))
                        .toList());
    }

    /**
     * Copies the English content of one place onto an existing or new Place. Top 5 items are
     * reused by rank and gallery photos by position, so their ids (and translations) are kept.
     */
    private static void applyPlace(PlaceDto in, Place p, int order) {
        p.setName(in.name());
        p.setDescription(in.description());
        p.setFunFact(in.funFact());
        p.setHeroImageUrl(in.heroImageUrl());
        p.setSortOrder(order);

        // A queue per rank, so a request that repeats a rank still reuses each old row only once.
        Map<Integer, Deque<Activity>> byRank = new HashMap<>();
        for (Activity a : p.getActivities()) {
            byRank.computeIfAbsent(a.getRank(), r -> new ArrayDeque<>()).add(a);
        }
        p.getActivities().clear();
        for (ActivityDto a : in.activities() == null ? List.<ActivityDto>of() : in.activities()) {
            Deque<Activity> sameRank = byRank.get(a.rank());
            Activity act = sameRank == null || sameRank.isEmpty() ? new Activity() : sameRank.poll();
            act.setPlace(p);
            act.setRank(a.rank());
            act.setTitle(a.title());
            act.setDescription(a.description());
            act.setImageUrl(a.imageUrl());
            p.getActivities().add(act);
        }

        // The gallery is loaded in sort_order, so index i is the photo at position i.
        List<Image> oldGallery = new ArrayList<>(p.getGallery());
        p.getGallery().clear();
        List<ImageDto> gallery = in.gallery() == null ? List.of() : in.gallery();
        for (int i = 0; i < gallery.size(); i++) {
            ImageDto g = gallery.get(i);
            Image im = i < oldGallery.size() ? oldGallery.get(i) : new Image();
            im.setPlace(p);
            im.setUrl(g.url());
            im.setCaption(g.caption());
            im.setSortOrder(i);
            p.getGallery().add(im);
        }
    }

    private static String nullToEmpty(String s) {
        return s == null ? "" : s;
    }
}
