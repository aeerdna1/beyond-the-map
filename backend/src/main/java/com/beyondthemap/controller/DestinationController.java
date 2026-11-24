package com.beyondthemap.controller;

import com.beyondthemap.dto.DestinationDtos.DestinationDto;
import com.beyondthemap.dto.DestinationDtos.DestinationSummaryDto;
import com.beyondthemap.dto.DestinationDtos.PlaceDto;
import com.beyondthemap.service.DestinationService;
import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.List;

/** Public, read-only content API. */
@RestController
@RequestMapping("/api/destinations")
public class DestinationController {

    private static final CacheControl CACHE = CacheControl.maxAge(Duration.ofMinutes(10)).cachePublic();

    private final DestinationService service;

    public DestinationController(DestinationService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<DestinationSummaryDto>> list() {
        return ResponseEntity.ok().cacheControl(CACHE).body(service.list());
    }

    @GetMapping("/{slug}")
    public ResponseEntity<DestinationDto> get(@PathVariable String slug) {
        return ResponseEntity.ok().cacheControl(CACHE).body(service.get(slug));
    }

    @GetMapping("/{slug}/places/{placeSlug}")
    public ResponseEntity<PlaceDto> place(@PathVariable String slug, @PathVariable String placeSlug) {
        return ResponseEntity.ok().cacheControl(CACHE).body(service.getPlace(slug, placeSlug));
    }
}
