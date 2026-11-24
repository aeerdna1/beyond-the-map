-- Core content model: destination -> place -> (activity top 5, image gallery)

CREATE TABLE destination (
    id                 BIGSERIAL PRIMARY KEY,
    slug               VARCHAR(80)  NOT NULL UNIQUE,
    name               VARCHAR(120) NOT NULL,
    flag               VARCHAR(16),
    region             VARCHAR(20)  NOT NULL,
    vibes              VARCHAR(120),          -- comma-separated: Beach,Nature,Culture
    tagline            VARCHAR(255),
    description        TEXT,
    best_time_to_visit VARCHAR(255),
    hero_image_url     VARCHAR(500),
    lat                DOUBLE PRECISION,
    lng                DOUBLE PRECISION,
    sort_order         INT NOT NULL DEFAULT 0
);

CREATE TABLE place (
    id             BIGSERIAL PRIMARY KEY,
    destination_id BIGINT       NOT NULL REFERENCES destination (id) ON DELETE CASCADE,
    slug           VARCHAR(80)  NOT NULL,
    name           VARCHAR(120) NOT NULL,
    description    TEXT,
    fun_fact       TEXT,
    hero_image_url VARCHAR(500),
    sort_order     INT NOT NULL DEFAULT 0,
    CONSTRAINT uq_place_slug UNIQUE (destination_id, slug)
);

CREATE TABLE activity (
    id          BIGSERIAL PRIMARY KEY,
    place_id    BIGINT       NOT NULL REFERENCES place (id) ON DELETE CASCADE,
    rank_no     INT          NOT NULL,
    title       VARCHAR(200) NOT NULL,
    description TEXT,
    image_url   VARCHAR(500)
);

CREATE TABLE image (
    id         BIGSERIAL PRIMARY KEY,
    place_id   BIGINT       NOT NULL REFERENCES place (id) ON DELETE CASCADE,
    url        VARCHAR(500) NOT NULL,
    caption    VARCHAR(255),
    sort_order INT NOT NULL DEFAULT 0
);

-- "Plan my trip" requests
CREATE TABLE trip_inquiry (
    id           BIGSERIAL PRIMARY KEY,
    name         VARCHAR(120) NOT NULL,
    email        VARCHAR(200) NOT NULL,
    phone        VARCHAR(40),
    destinations VARCHAR(500),          -- comma-separated slugs
    travel_from  DATE,
    travel_to    DATE,
    travelers    INT          NOT NULL,
    budget       VARCHAR(60),
    travel_style VARCHAR(40),
    message      TEXT,
    consent      BOOLEAN      NOT NULL,
    status       VARCHAR(20)  NOT NULL DEFAULT 'NEW',  -- NEW, CONTACTED, BOOKED, CLOSED
    created_at   TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_place_destination ON place (destination_id);
CREATE INDEX idx_activity_place ON activity (place_id);
CREATE INDEX idx_image_place ON image (place_id);
CREATE INDEX idx_inquiry_status ON trip_inquiry (status, created_at);
