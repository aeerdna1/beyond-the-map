package com.beyondthemap;

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
                .andExpect(jsonPath("$", hasSize(11)))
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
