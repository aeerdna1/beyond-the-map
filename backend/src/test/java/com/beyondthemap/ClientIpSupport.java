package com.beyondthemap;

import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

/** Posts a valid inquiry through the real embedded Tomcat, with a chosen X-Forwarded-For header. */
final class ClientIpSupport {

    private static final String BODY = """
            {"name":"Ana","email":"ana@example.com","destinations":["japan"],
             "travelers":2,"budget":"1,500 - 3,000 EUR / person","travelStyle":"culture",
             "consent":true}
            """;

    private ClientIpSupport() {
    }

    static int post(TestRestTemplate rest, String xForwardedFor) {
        HttpHeaders h = new HttpHeaders();
        h.setContentType(MediaType.APPLICATION_JSON);
        if (xForwardedFor != null) h.set("X-Forwarded-For", xForwardedFor);
        return rest.postForEntity("/api/inquiries", new HttpEntity<>(BODY, h), String.class)
                .getStatusCode().value();
    }
}
