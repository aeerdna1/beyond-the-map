package com.beyondthemap;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.test.context.ActiveProfiles;

import static com.beyondthemap.ClientIpSupport.post;
import static org.assertj.core.api.Assertions.assertThat;

/**
 * Simulates the API being reachable directly (no proxy in front): the connecting peer
 * (127.0.0.1 here) is NOT in the trusted proxy list, so X-Forwarded-For must be ignored.
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
        properties = {
                "app.rate-limit.inquiries-per-hour=1",
                "server.tomcat.remoteip.internal-proxies=192.0.2.1"
        })
@ActiveProfiles("dev")
class ClientIpDirectExposureTest {

    @Autowired
    TestRestTemplate rest;

    @Test
    void forwardedHeaderFromUntrustedPeerIsIgnored() {
        assertThat(post(rest, "1.1.1.1")).isEqualTo(202);
        // A different fake IP from the same connection must not reset the limit.
        assertThat(post(rest, "2.2.2.2")).isEqualTo(429);
    }
}
