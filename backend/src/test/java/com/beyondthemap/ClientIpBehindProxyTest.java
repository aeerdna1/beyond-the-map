package com.beyondthemap;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.test.context.ActiveProfiles;

import static com.beyondthemap.ClientIpSupport.post;
import static org.assertj.core.api.Assertions.assertThat;

/**
 * The test client connects from 127.0.0.1, which Tomcat trusts as an internal proxy,
 * so this simulates the API running behind Render/Railway. The proxy appends the real
 * client IP on the right; anything a visitor puts on the left must be ignored.
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
        properties = "app.rate-limit.inquiries-per-hour=1")
@ActiveProfiles("dev")
class ClientIpBehindProxyTest {

    @Autowired
    TestRestTemplate rest;

    @Test
    void spoofedLeftmostValueDoesNotBypassTheLimit() {
        assertThat(post(rest, "1.1.1.1, 203.0.113.7")).isEqualTo(202);
        // Same real client (203.0.113.7), different fake value on the left: must be blocked.
        assertThat(post(rest, "2.2.2.2, 203.0.113.7")).isEqualTo(429);
        // A genuinely different client is still allowed.
        assertThat(post(rest, "198.51.100.9")).isEqualTo(202);
    }
}
