package com.beyondthemap.service;

import org.junit.jupiter.api.Test;

import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.time.ZoneOffset;

import static org.assertj.core.api.Assertions.assertThat;

class RateLimiterTest {

    /** Mutable clock so the test can move time forward. */
    static final class TestClock extends Clock {
        Instant now = Instant.parse("2026-01-01T10:00:00Z");

        @Override public ZoneOffset getZone() { return ZoneOffset.UTC; }
        @Override public Clock withZone(java.time.ZoneId zone) { return this; }
        @Override public Instant instant() { return now; }
    }

    @Test
    void blocksAfterLimitAndRecoversAfterWindow() {
        TestClock clock = new TestClock();
        RateLimiter rl = new RateLimiter(2, clock);

        assertThat(rl.tryAcquire("1.2.3.4")).isTrue();
        assertThat(rl.tryAcquire("1.2.3.4")).isTrue();
        assertThat(rl.tryAcquire("1.2.3.4")).isFalse();
        assertThat(rl.tryAcquire("5.6.7.8")).isTrue();

        clock.now = clock.now.plus(Duration.ofMinutes(61));
        assertThat(rl.tryAcquire("1.2.3.4")).isTrue();
    }

    @Test
    void evictStaleForgetsIdleClientsButKeepsActiveOnes() {
        TestClock clock = new TestClock();
        RateLimiter rl = new RateLimiter(5, clock);

        rl.tryAcquire("old-visitor");
        clock.now = clock.now.plus(Duration.ofMinutes(50));
        rl.tryAcquire("recent-visitor");
        assertThat(rl.trackedKeys()).isEqualTo(2);

        // 61 min after the old visit, 11 min after the recent one.
        clock.now = clock.now.plus(Duration.ofMinutes(11));
        rl.evictStale();

        assertThat(rl.trackedKeys()).isEqualTo(1);
        // The recent visitor's earlier request still counts towards the limit.
        for (int i = 0; i < 4; i++) assertThat(rl.tryAcquire("recent-visitor")).isTrue();
        assertThat(rl.tryAcquire("recent-visitor")).isFalse();
    }
}
