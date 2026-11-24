package com.beyondthemap.controller;

import com.beyondthemap.dto.InquiryDtos.InquiryRequest;
import com.beyondthemap.service.InquiryService;
import com.beyondthemap.service.RateLimiter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/** "Plan my trip" form endpoint. */
@RestController
@RequestMapping("/api/inquiries")
public class InquiryController {

    private final InquiryService service;
    private final RateLimiter rateLimiter;

    public InquiryController(InquiryService service, RateLimiter rateLimiter) {
        this.service = service;
        this.rateLimiter = rateLimiter;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> submit(@Valid @RequestBody InquiryRequest body, HttpServletRequest req) {
        // remoteAddr is the real client IP: Tomcat's RemoteIpValve (forward-headers-strategy=native) only
        // takes it from X-Forwarded-For when the request came through a trusted internal proxy.
        if (!rateLimiter.tryAcquire(req.getRemoteAddr())) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(Map.of("message", "Too many requests - please try again later or contact me directly."));
        }
        service.submit(body);
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(Map.of("message", "Thank you! I'll get back to you within 24h."));
    }
}
