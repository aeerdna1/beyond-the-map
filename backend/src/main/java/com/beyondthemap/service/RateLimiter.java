package com.beyondthemap.service;

import com.beyondthemap.config.AppProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Simple in-memory sliding-window limiter per client key (IP).
 * Good enough for a single instance; use Redis/Bucket4j if you scale out.
 *
 * The client IP is only trustworthy when the API sits behind the hosting proxy
 * (Render, Railway, nginx...). See server.tomcat.remoteip in application.yml.
 */
@Component
public class RateLimiter {

    private static final Duration WINDOW = Duration.ofHours(1);

    private final Map<String, Deque<Instant>> hits = new ConcurrentHashMap<>();
    private final int limit;
    private final Clock clock;

    @Autowired
    public RateLimiter(AppProperties props) {
        this(props.rateLimit().inquiriesPerHour(), Clock.systemUTC());
    }

    RateLimiter(int limit, Clock clock) {
        this.limit = limit;
        this.clock = clock;
    }

    /** Returns true if the call is allowed (and records it). */
    public boolean tryAcquire(String key) {
        Instant now = clock.instant();
        Instant cutoff = now.minus(WINDOW);
        boolean[] allowed = new boolean[1];
        // compute() runs atomically per key, so it cannot race with evictStale() removing the same key.
        hits.compute(key, (k, q) -> {
            if (q == null) q = new ArrayDeque<>();
            dropOlderThan(q, cutoff);
            if (q.size() < limit) {
                q.addLast(now);
                allowed[0] = true;
            }
            return q;
        });
        return allowed[0];
    }

    /**
     * Forgets clients whose requests have all left the window, so the map does not
     * grow forever. Runs every 10 minutes (scheduling is enabled in SecurityConfig).
     */
    @Scheduled(fixedDelay = 10, timeUnit = java.util.concurrent.TimeUnit.MINUTES)
    public void evictStale() {
        Instant cutoff = clock.instant().minus(WINDOW);
        for (String key : hits.keySet()) {
            // Returning null from computeIfPresent removes the entry atomically.
            hits.computeIfPresent(key, (k, q) -> {
                dropOlderThan(q, cutoff);
                return q.isEmpty() ? null : q;
            });
        }
    }

    /** Number of tracked clients (for tests and monitoring). */
    int trackedKeys() {
        return hits.size();
    }

    private static void dropOlderThan(Deque<Instant> q, Instant cutoff) {
        while (!q.isEmpty() && q.peekFirst().isBefore(cutoff)) {
            q.pollFirst();
        }
    }
}
