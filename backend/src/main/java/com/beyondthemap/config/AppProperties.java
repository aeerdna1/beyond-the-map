package com.beyondthemap.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

/** Typed view of the "app.*" section in application.yml. */
@ConfigurationProperties(prefix = "app")
public record AppProperties(
        List<String> corsOrigins,
        Mail mail,
        Admin admin,
        RateLimit rateLimit) {

    public record Mail(boolean enabled, String from, String notifyTo) {
    }

    public record Admin(String username, String password) {
    }

    public record RateLimit(int inquiriesPerHour) {
    }
}
