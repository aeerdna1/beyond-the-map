package com.beyondthemap;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Editing a translated destination through the admin API must keep its translations.
 * The upsert updates places, top 5 items and gallery photos in place, so their ids (which the
 * translation rows reference with ON DELETE CASCADE) do not change.
 * Uses its own in-memory database, because it changes Japan, which other tests read.
 */
@SpringBootTest(properties = "spring.datasource.url="
        + "jdbc:h2:mem:admin-edit;MODE=PostgreSQL;DATABASE_TO_LOWER=TRUE;DEFAULT_NULL_ORDERING=HIGH")
@AutoConfigureMockMvc
@ActiveProfiles("dev")
class AdminEditKeepsTranslationsTest {

    @Autowired
    MockMvc mvc;

    @Autowired
    ObjectMapper json;

    @Autowired
    JdbcTemplate jdbc;

    private long placeId(String slug) {
        return jdbc.queryForObject("""
                SELECT p.id FROM place p JOIN destination d ON d.id = p.destination_id
                WHERE d.slug = 'japan' AND p.slug = ?
                """, Long.class, slug);
    }

    private ObjectNode place(ArrayNode places, String slug) {
        for (var p : places) {
            if (slug.equals(p.get("slug").asText())) return (ObjectNode) p;
        }
        throw new AssertionError("no place " + slug);
    }

    @Test
    void editingADestinationKeepsItsTranslations() throws Exception {
        long kyotoBefore = placeId("kyoto");
        Integer translatedPlacesBefore = jdbc.queryForObject("SELECT COUNT(*) FROM place_translation", Integer.class);
        assertThat(translatedPlacesBefore).isEqualTo(5);

        // Start from the current English content, the way an admin client would.
        String english = mvc.perform(get("/api/destinations/japan")).andReturn().getResponse().getContentAsString();
        ObjectNode body = (ObjectNode) json.readTree(english);
        body.put("tagline", "Edited English tagline");
        ArrayNode places = (ArrayNode) body.get("places");
        ObjectNode kyoto = place(places, "kyoto");
        kyoto.put("description", "Edited English description of Kyoto");
        ((ObjectNode) kyoto.get("activities").get(1)).put("title", "Edited English title, rank 2");
        // Remove Okinawa and add a new, untranslated place.
        for (int i = 0; i < places.size(); i++) {
            if ("okinawa".equals(places.get(i).get("slug").asText())) {
                places.remove(i);
                break;
            }
        }
        places.addObject().put("slug", "nara").put("name", "Nara").put("description", "Deer and temples.")
                .put("heroImageUrl", "https://example.com/nara.jpg")
                .putArray("activities").addObject().put("rank", 1).put("title", "Todai-ji").put("description", "Big Buddha.");

        mvc.perform(put("/api/admin/destinations/japan").with(httpBasic("admin", "change-me"))
                        .contentType(MediaType.APPLICATION_JSON).content(json.writeValueAsString(body)))
                .andExpect(status().isOk())
                // The admin API answers with the English content it stored.
                .andExpect(jsonPath("$.tagline").value("Edited English tagline"));

        // Same row, so the translations that point at it are still there.
        assertThat(placeId("kyoto")).isEqualTo(kyotoBefore);
        // Okinawa's translation went with Okinawa; the other four stayed.
        assertThat(jdbc.queryForObject("SELECT COUNT(*) FROM place_translation", Integer.class)).isEqualTo(4);

        mvc.perform(get("/api/destinations/japan").param("lang", "ro"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Japonia"))
                // A translation still wins over the edited English text (it has to be re-translated by hand).
                .andExpect(jsonPath("$.tagline", startsWith("Nopți de neon")))
                .andExpect(jsonPath("$.places[*].slug", contains("tokyo", "kyoto", "osaka", "hokkaido", "nara")))
                .andExpect(jsonPath("$.places[1].description", startsWith("Vechea capitală imperială")))
                // The new place has no translation yet: English.
                .andExpect(jsonPath("$.places[4].name").value("Nara"))
                .andExpect(jsonPath("$.places[4].description").value("Deer and temples."));

        mvc.perform(get("/api/destinations/japan/places/kyoto").param("lang", "ro"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.funFact", containsString("1.600 de temple")))
                .andExpect(jsonPath("$.activities", hasSize(5)))
                .andExpect(jsonPath("$.activities[0].description", startsWith("Plimbă-te la răsărit")))
                .andExpect(jsonPath("$.activities[1].title").value("Pădurea de bambus Arashiyama și Tenryu-ji"))
                .andExpect(jsonPath("$.gallery[*].caption", contains("Pagoda Yasaka", "Felinare în Gion")));

        // English readers see the edits.
        mvc.perform(get("/api/destinations/japan/places/kyoto"))
                .andExpect(jsonPath("$.description").value("Edited English description of Kyoto"))
                .andExpect(jsonPath("$.activities[1].title").value("Edited English title, rank 2"))
                .andExpect(jsonPath("$.gallery[*].caption", contains("Yasaka Pagoda", "Lanterns in Gion")));
    }

    @Test
    void duplicatePlaceSlugsAreRejected() throws Exception {
        String body = """
                {"name":"Dup","region":"Asia","places":[
                  {"slug":"same","name":"A","activities":[],"gallery":[]},
                  {"slug":"same","name":"B","activities":[],"gallery":[]}]}
                """;
        mvc.perform(put("/api/admin/destinations/dup").with(httpBasic("admin", "change-me"))
                        .contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isBadRequest());
        mvc.perform(get("/api/destinations/dup")).andExpect(status().isNotFound());
    }
}
