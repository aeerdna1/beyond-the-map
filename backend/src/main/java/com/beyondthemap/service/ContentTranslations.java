package com.beyondthemap.service;

import com.beyondthemap.model.TripInquiry.Lang;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * Reads translated destination content (V4 translation tables). English lives in the base
 * tables, so for English nothing is queried. Each lookup loads all rows for one destination
 * (or all destination rows for the list) in a fixed number of queries, never one per item.
 */
@Repository
public class ContentTranslations {

    public record DestinationText(String name, String tagline, String description, String bestTimeToVisit) {
    }

    public record PlaceText(String name, String description, String funFact) {
    }

    public record ActivityText(String title, String description) {
    }

    /** Translated texts keyed by the id of the English row. Missing keys mean "use English". */
    public record Texts(Map<Long, DestinationText> destinations, Map<Long, PlaceText> places,
                        Map<Long, ActivityText> activities, Map<Long, String> captions) {

        // Collections.emptyMap() rather than Map.of(): Map.of().get(null) throws, and a row that
        // is not saved yet has a null id.
        public static final Texts NONE = new Texts(Collections.emptyMap(), Collections.emptyMap(),
                Collections.emptyMap(), Collections.emptyMap());
    }

    private final NamedParameterJdbcTemplate jdbc;

    public ContentTranslations(NamedParameterJdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /** Destination-level texts for every destination (used by the list endpoint). */
    public Texts forAllDestinations(Lang lang) {
        if (lang == Lang.EN) return Texts.NONE;
        return new Texts(destinationTexts("", Map.of("lang", lang.code())),
                Collections.emptyMap(), Collections.emptyMap(), Collections.emptyMap());
    }

    /** All texts of one destination: the destination itself, its places, their top 5 and gallery captions. */
    public Texts forDestination(long destinationId, Lang lang) {
        if (lang == Lang.EN) return Texts.NONE;
        Map<String, Object> p = Map.of("lang", lang.code(), "d", destinationId);

        Map<Long, PlaceText> places = new HashMap<>();
        jdbc.query("""
                SELECT t.place_id, t.name, t.description, t.fun_fact
                FROM place_translation t JOIN place p ON p.id = t.place_id
                WHERE t.lang = :lang AND p.destination_id = :d
                """, p, rs -> {
            places.put(rs.getLong(1), new PlaceText(rs.getString(2), rs.getString(3), rs.getString(4)));
        });

        Map<Long, ActivityText> activities = new HashMap<>();
        jdbc.query("""
                SELECT t.activity_id, t.title, t.description
                FROM activity_translation t
                JOIN activity a ON a.id = t.activity_id
                JOIN place p ON p.id = a.place_id
                WHERE t.lang = :lang AND p.destination_id = :d
                """, p, rs -> {
            activities.put(rs.getLong(1), new ActivityText(rs.getString(2), rs.getString(3)));
        });

        Map<Long, String> captions = new HashMap<>();
        jdbc.query("""
                SELECT t.image_id, t.caption
                FROM image_translation t
                JOIN image i ON i.id = t.image_id
                JOIN place p ON p.id = i.place_id
                WHERE t.lang = :lang AND p.destination_id = :d
                """, p, rs -> {
            captions.put(rs.getLong(1), rs.getString(2));
        });

        return new Texts(destinationTexts(" AND destination_id = :d", p), places, activities, captions);
    }

    private Map<Long, DestinationText> destinationTexts(String extraWhere, Map<String, Object> params) {
        Map<Long, DestinationText> out = new HashMap<>();
        jdbc.query("SELECT destination_id, name, tagline, description, best_time_to_visit "
                + "FROM destination_translation WHERE lang = :lang" + extraWhere, params, rs -> {
            out.put(rs.getLong(1), new DestinationText(rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5)));
        });
        return out;
    }
}
