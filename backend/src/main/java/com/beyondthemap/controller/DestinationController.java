package com.beyondthemap.controller;

import com.beyondthemap.dto.DestinationDtos.DestinationDto;
import com.beyondthemap.dto.DestinationDtos.DestinationSummaryDto;
import com.beyondthemap.dto.DestinationDtos.PlaceDto;
import com.beyondthemap.model.TripInquiry.Lang;
import com.beyondthemap.service.DestinationService;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.List;

/**
 * Public, read-only content API. Optional ?lang=ro returns Romanian text where it exists;
 * every field without a translation (and any unknown or missing lang) is English.
 */
@RestController
@RequestMapping("/api/destinations")
public class DestinationController {

    private static final CacheControl CACHE = CacheControl.maxAge(Duration.ofMinutes(10)).cachePublic();

    private final DestinationService service;

    public DestinationController(DestinationService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<DestinationSummaryDto>> list(@RequestParam(required = false) String lang) {
        Lang l = Lang.fromCode(lang);
        return ok(l).body(service.list(l));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<DestinationDto> get(@PathVariable String slug, @RequestParam(required = false) String lang) {
        Lang l = Lang.fromCode(lang);
        return ok(l).body(service.get(slug, l));
    }

    @GetMapping("/{slug}/places/{placeSlug}")
    public ResponseEntity<PlaceDto> place(@PathVariable String slug, @PathVariable String placeSlug,
                                          @RequestParam(required = false) String lang) {
        Lang l = Lang.fromCode(lang);
        return ok(l).body(service.getPlace(slug, placeSlug, l));
    }

    // The language is part of the URL (?lang=), so caches keep the versions apart without Vary.
    // Content-Language says which language was asked for; untranslated fields are still English.
    private static ResponseEntity.BodyBuilder ok(Lang lang) {
        return ResponseEntity.ok().cacheControl(CACHE).header(HttpHeaders.CONTENT_LANGUAGE, lang.code());
    }
}
