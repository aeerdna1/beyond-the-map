-- Translations of destination content. English stays in the base tables (destination, place,
-- activity, image) and is always the fallback: a missing row or a NULL column here means
-- "show the English text". Only non-English languages are stored, so lang is limited to 'ro' for now;
-- add a language by extending the CHECK constraints.
-- The rows are filled by the generated repeatable migration R__seed_translations.sql.
-- ON DELETE CASCADE: deleting (or replacing) content through the admin API also removes its translations.

CREATE TABLE destination_translation (
    destination_id     BIGINT      NOT NULL REFERENCES destination (id) ON DELETE CASCADE,
    lang               VARCHAR(5)  NOT NULL,
    name               VARCHAR(200),
    tagline            VARCHAR(500),
    description        TEXT,
    best_time_to_visit VARCHAR(500),
    PRIMARY KEY (destination_id, lang),
    CONSTRAINT chk_destination_translation_lang CHECK (lang IN ('ro'))
);

CREATE TABLE place_translation (
    place_id    BIGINT       NOT NULL REFERENCES place (id) ON DELETE CASCADE,
    lang        VARCHAR(5)   NOT NULL,
    name        VARCHAR(200),
    description TEXT,
    fun_fact    TEXT,
    PRIMARY KEY (place_id, lang),
    CONSTRAINT chk_place_translation_lang CHECK (lang IN ('ro'))
);

CREATE TABLE activity_translation (
    activity_id BIGINT       NOT NULL REFERENCES activity (id) ON DELETE CASCADE,
    lang        VARCHAR(5)   NOT NULL,
    title       VARCHAR(300),
    description TEXT,
    PRIMARY KEY (activity_id, lang),
    CONSTRAINT chk_activity_translation_lang CHECK (lang IN ('ro'))
);

CREATE TABLE image_translation (
    image_id BIGINT       NOT NULL REFERENCES image (id) ON DELETE CASCADE,
    lang     VARCHAR(5)   NOT NULL,
    caption  VARCHAR(500),
    PRIMARY KEY (image_id, lang),
    CONSTRAINT chk_image_translation_lang CHECK (lang IN ('ro'))
);
