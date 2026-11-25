package com.beyondthemap;

import com.beyondthemap.model.TripInquiry;
import com.beyondthemap.repository.TripInquiryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/** Boots the full app on in-memory H2 with the Flyway schema + seed. */
@SpringBootTest(properties = "app.rate-limit.inquiries-per-hour=1000")
@AutoConfigureMockMvc
@ActiveProfiles("dev")
class ApiIntegrationTest {

    private static final String VALID_INQUIRY = """
            {"name":"Ana","email":"ana@example.com","destinations":["japan"],
             "travelers":2,"budget":"1,500 - 3,000 EUR / person","travelStyle":"culture",
             "consent":true}
            """;

    @Autowired
    MockMvc mvc;

    @Autowired
    TripInquiryRepository inquiries;

    @BeforeEach
    void clean() {
        inquiries.deleteAll();
    }

    @Test
    void listsAllSeededDestinations() throws Exception {
        mvc.perform(get("/api/destinations"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(13)))
                .andExpect(jsonPath("$[0].slug").value("japan"))
                .andExpect(jsonPath("$[0].placeCount").value(5))
                .andExpect(jsonPath("$[0].vibes", contains("Culture", "Nature")));
    }

    @Test
    void returnsPlaceWithTop5InRankOrder() throws Exception {
        mvc.perform(get("/api/destinations/japan/places/kyoto"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Kyoto"))
                .andExpect(jsonPath("$.funFact", containsString("1,600")))
                .andExpect(jsonPath("$.activities", hasSize(5)))
                .andExpect(jsonPath("$.activities[0].rank").value(1))
                .andExpect(jsonPath("$.activities[0].title").value("Fushimi Inari"));
    }

    // ---- translated content (V4 tables, filled by R__seed_translations.sql) ----

    @Test
    void listInRomanianTranslatesWhatExistsAndKeepsEnglishForTheRest() throws Exception {
        mvc.perform(get("/api/destinations").param("lang", "ro"))
                .andExpect(status().isOk())
                .andExpect(header().string("Content-Language", "ro"))
                .andExpect(jsonPath("$", hasSize(13)))
                .andExpect(jsonPath("$[0].slug").value("japan"))
                .andExpect(jsonPath("$[0].name").value("Japonia"))
                .andExpect(jsonPath("$[0].tagline", startsWith("Nopți de neon")))
                // Not translated yet: English.
                .andExpect(jsonPath("$[1].slug").value("iceland"))
                .andExpect(jsonPath("$[1].name").value("Iceland"))
                // Language-independent fields are untouched.
                .andExpect(jsonPath("$[0].vibes", contains("Culture", "Nature")))
                .andExpect(jsonPath("$[0].placeCount").value(5));
    }

    @Test
    void destinationInRomanianTranslatesItsPlaces() throws Exception {
        mvc.perform(get("/api/destinations/japan").param("lang", "ro"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Japonia"))
                .andExpect(jsonPath("$.bestTimeToVisit", containsString("cireșii în floare")))
                .andExpect(jsonPath("$.places", hasSize(5)))
                // Place names are not translated, so they stay English.
                .andExpect(jsonPath("$.places[0].name").value("Tokyo"))
                .andExpect(jsonPath("$.places[0].description", startsWith("Un oraș de 14 milioane")));
    }

    @Test
    void placeInRomanianFallsBackToEnglishFieldByField() throws Exception {
        mvc.perform(get("/api/destinations/japan/places/kyoto").param("lang", "ro"))
                .andExpect(status().isOk())
                .andExpect(header().string("Content-Language", "ro"))
                .andExpect(jsonPath("$.name").value("Kyoto"))
                .andExpect(jsonPath("$.funFact", containsString("1.600 de temple")))
                .andExpect(jsonPath("$.activities", hasSize(5)))
                .andExpect(jsonPath("$.activities[0].rank").value(1))
                // Rank 1 only has a translated description: the title stays English.
                .andExpect(jsonPath("$.activities[0].title").value("Fushimi Inari"))
                .andExpect(jsonPath("$.activities[0].description", startsWith("Plimbă-te la răsărit")))
                .andExpect(jsonPath("$.activities[3].title").value("Kinkaku-ji, Pavilionul de Aur"))
                .andExpect(jsonPath("$.gallery[0].caption").value("Pagoda Yasaka"))
                .andExpect(jsonPath("$.gallery[1].caption").value("Felinare în Gion"));
    }

    @Test
    void englishAndUnknownLanguagesReturnTheEnglishContent() throws Exception {
        for (String lang : new String[] {"en", "fr", ""}) {
            mvc.perform(get("/api/destinations/japan/places/kyoto").param("lang", lang))
                    .andExpect(status().isOk())
                    .andExpect(header().string("Content-Language", "en"))
                    .andExpect(jsonPath("$.funFact", containsString("1,600")))
                    .andExpect(jsonPath("$.gallery[0].caption").value("Yasaka Pagoda"));
        }
        mvc.perform(get("/api/destinations"))
                .andExpect(header().string("Content-Language", "en"))
                .andExpect(jsonPath("$[0].name").value("Japan"));
    }

    @Test
    void unknownDestinationIs404InEveryLanguage() throws Exception {
        mvc.perform(get("/api/destinations/atlantis").param("lang", "ro")).andExpect(status().isNotFound());
        mvc.perform(get("/api/destinations/japan/places/atlantis").param("lang", "ro")).andExpect(status().isNotFound());
    }

    @Test
    void unknownDestinationIs404() throws Exception {
        mvc.perform(get("/api/destinations/atlantis")).andExpect(status().isNotFound());
    }

    @Test
    void acceptsValidInquiry() throws Exception {
        mvc.perform(post("/api/inquiries").contentType(MediaType.APPLICATION_JSON).content(VALID_INQUIRY))
                .andExpect(status().isAccepted());
        assertThat(inquiries.count()).isEqualTo(1);
    }

    @Test
    void inquiryWithoutLangIsStoredAsEnglish() throws Exception {
        mvc.perform(post("/api/inquiries").contentType(MediaType.APPLICATION_JSON).content(VALID_INQUIRY))
                .andExpect(status().isAccepted());
        assertThat(inquiries.findAll()).singleElement()
                .extracting(TripInquiry::getLang).isEqualTo(TripInquiry.Lang.EN);
    }

    @Test
    void storesRomanianLanguageAndShowsItToTheAdmin() throws Exception {
        mvc.perform(post("/api/inquiries").contentType(MediaType.APPLICATION_JSON)
                        .content(VALID_INQUIRY.replace("\"consent\":true", "\"consent\":true,\"lang\":\"ro\"")))
                .andExpect(status().isAccepted());
        assertThat(inquiries.findAll()).singleElement()
                .extracting(TripInquiry::getLang).isEqualTo(TripInquiry.Lang.RO);
        mvc.perform(get("/api/admin/inquiries").with(httpBasic("admin", "change-me")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].lang").value("ro"));
    }

    @Test
    void rejectsUnknownLanguage() throws Exception {
        mvc.perform(post("/api/inquiries").contentType(MediaType.APPLICATION_JSON)
                        .content(VALID_INQUIRY.replace("\"consent\":true", "\"consent\":true,\"lang\":\"fr\"")))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.lang").exists());
        assertThat(inquiries.count()).isZero();
    }

    @Test
    void rejectsInquiryWithoutConsent() throws Exception {
        mvc.perform(post("/api/inquiries").contentType(MediaType.APPLICATION_JSON)
                        .content(VALID_INQUIRY.replace("\"consent\":true", "\"consent\":false")))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.consent").exists());
        assertThat(inquiries.count()).isZero();
    }

    @Test
    void silentlyDropsHoneypotSubmissions() throws Exception {
        mvc.perform(post("/api/inquiries").contentType(MediaType.APPLICATION_JSON)
                        .content(VALID_INQUIRY.replace("\"consent\":true", "\"consent\":true,\"website\":\"spam.example\"")))
                .andExpect(status().isAccepted());
        assertThat(inquiries.count()).isZero();
    }

    @Test
    void adminEndpointsRequireCredentials() throws Exception {
        mvc.perform(get("/api/admin/inquiries")).andExpect(status().isUnauthorized());
        mvc.perform(get("/api/admin/inquiries").with(httpBasic("admin", "change-me")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray());
    }
}
