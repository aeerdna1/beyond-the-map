package com.beyondthemap.service;

import com.beyondthemap.config.AppProperties;
import org.springframework.beans.factory.annotation.Autowired;
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
        Deque<Instant> q = hits.computeIfAbsent(key, k -> new ArrayDeque<>());
        synchronized (q) {
            while (!q.isEmpty() && q.peekFirst().isBefore(cutoff)) {
                q.pollFirst();
            }
            if (q.size() >= limit) {
                return false;
            }
            q.addLast(now);
            return true;
        }
    }
}
