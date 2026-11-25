package com.beyondthemap.service;

import com.beyondthemap.dto.DestinationDtos.*;
import com.beyondthemap.model.Activity;
import com.beyondthemap.model.Destination;
import com.beyondthemap.model.Image;
import com.beyondthemap.model.Place;
import com.beyondthemap.model.TripInquiry.Lang;
import com.beyondthemap.repository.DestinationRepository;
import com.beyondthemap.repository.PlaceRepository;
import com.beyondthemap.service.ContentTranslations.ActivityText;
import com.beyondthemap.service.ContentTranslations.DestinationText;
import com.beyondthemap.service.ContentTranslations.PlaceText;
import com.beyondthemap.service.ContentTranslations.Texts;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Service
public class DestinationService {

    private final DestinationRepository destinations;
    private final PlaceRepository places;
    private final ContentTranslations translations;

    public DestinationService(DestinationRepository destinations, PlaceRepository places,
                              ContentTranslations translations) {
        this.destinations = destinations;
        this.places = places;
        this.translations = translations;
    }

    // Public reads take a language. English is the base text; for other languages each field
    // is replaced by its translation when one exists, and otherwise stays English.

    @Transactional(readOnly = true)
    public List<DestinationSummaryDto> list(Lang lang) {
        Texts tx = translations.forAllDestinations(lang);
        return destinations.findAllByOrderBySortOrderAsc().stream().map(d -> toSummary(d, tx)).toList();
    }

    @Transactional(readOnly = true)
    public DestinationDto get(String slug, Lang lang) {
        Destination d = destinations.findBySlug(slug)
                .orElseThrow(() -> new NotFoundException("Destination not found: " + slug));
        return toDto(d, translations.forDestination(d.getId(), lang));
    }

    @Transactional(readOnly = true)
    public PlaceDto getPlace(String slug, String placeSlug, Lang lang) {
        Place p = places.findByDestinationSlugAndSlug(slug, placeSlug)
                .orElseThrow(() -> new NotFoundException("Place not found: " + slug + "/" + placeSlug));
        return toDto(p, translations.forDestination(p.getDestination().getId(), lang));
    }

    /** Admin: create or fully replace a destination (including its places, top 5 and gallery). */
    @Transactional
    public DestinationDto upsert(String slug, DestinationDto in) {
        Destination d = destinations.findBySlug(slug).orElseGet(Destination::new);
        if (d.getId() == null) {
            d.setSortOrder((int) destinations.count());
        }
        d.setSlug(slug);
        d.setName(in.name());
        d.setFlag(in.flag());
        d.setRegion(in.region());
        d.setVibes(in.vibes() == null ? null : String.join(",", in.vibes()));
        d.setTagline(in.tagline());
        d.setDescription(in.description());
        d.setBestTimeToVisit(in.bestTimeToVisit());
        d.setHeroImageUrl(in.heroImageUrl());
        d.setLat(in.lat());
        d.setLng(in.lng());

        d.getPlaces().clear();
        destinations.flush();
        List<PlaceDto> ps = in.places() == null ? List.of() : in.places();
        for (int i = 0; i < ps.size(); i++) {
            d.getPlaces().add(fromDto(ps.get(i), d, i));
        }
        // The admin API edits the English base content, so it answers in English.
        return toDto(destinations.save(d), Texts.NONE);
    }

    @Transactional
    public void delete(String slug) {
        Destination d = destinations.findBySlug(slug)
                .orElseThrow(() -> new NotFoundException("Destination not found: " + slug));
        destinations.delete(d);
    }

    // ---- mapping -------------------------------------------------------

    private static List<String> vibes(Destination d) {
        if (d.getVibes() == null || d.getVibes().isBlank()) return List.of();
        return Arrays.stream(d.getVibes().split(",")).map(String::trim).filter(s -> !s.isEmpty()).toList();
    }

    /** The translated value when there is one, otherwise the English value. */
    private static String or(String translated, String english) {
        return translated == null || translated.isBlank() ? english : translated;
    }

    static DestinationSummaryDto toSummary(Destination d, Texts tx) {
        DestinationText t = tx.destinations().get(d.getId());
        return new DestinationSummaryDto(d.getSlug(),
                or(t == null ? null : t.name(), d.getName()), d.getFlag(), d.getRegion(), vibes(d),
                or(t == null ? null : t.tagline(), d.getTagline()),
                or(t == null ? null : t.description(), d.getDescription()),
                or(t == null ? null : t.bestTimeToVisit(), d.getBestTimeToVisit()),
                d.getHeroImageUrl(), d.getLat(), d.getLng(), d.getPlaces().size());
    }

    static DestinationDto toDto(Destination d, Texts tx) {
        DestinationText t = tx.destinations().get(d.getId());
        return new DestinationDto(d.getSlug(),
                or(t == null ? null : t.name(), d.getName()), d.getFlag(), d.getRegion(), vibes(d),
                or(t == null ? null : t.tagline(), d.getTagline()),
                or(t == null ? null : t.description(), d.getDescription()),
                or(t == null ? null : t.bestTimeToVisit(), d.getBestTimeToVisit()),
                d.getHeroImageUrl(), d.getLat(), d.getLng(),
                d.getPlaces().stream().map(p -> toDto(p, tx)).toList());
    }

    static PlaceDto toDto(Place p, Texts tx) {
        PlaceText t = tx.places().get(p.getId());
        return new PlaceDto(p.getSlug(),
                or(t == null ? null : t.name(), p.getName()),
                nullToEmpty(or(t == null ? null : t.description(), p.getDescription())),
                or(t == null ? null : t.funFact(), p.getFunFact()),
                p.getHeroImageUrl(),
                p.getActivities().stream().map(a -> {
                    ActivityText at = tx.activities().get(a.getId());
                    return new ActivityDto(a.getRank(),
                            or(at == null ? null : at.title(), a.getTitle()),
                            or(at == null ? null : at.description(), a.getDescription()),
                            a.getImageUrl());
                }).toList(),
                p.getGallery().stream()
                        .map(g -> new ImageDto(g.getUrl(), or(tx.captions().get(g.getId()), g.getCaption())))
                        .toList());
    }

    private static Place fromDto(PlaceDto in, Destination d, int order) {
        Place p = new Place();
        p.setDestination(d);
        p.setSlug(in.slug());
        p.setName(in.name());
        p.setDescription(in.description());
        p.setFunFact(in.funFact());
        p.setHeroImageUrl(in.heroImageUrl());
        p.setSortOrder(order);
        if (in.activities() != null) {
            for (ActivityDto a : in.activities()) {
                Activity act = new Activity();
                act.setPlace(p);
                act.setRank(a.rank());
                act.setTitle(a.title());
                act.setDescription(a.description());
                act.setImageUrl(a.imageUrl());
                p.getActivities().add(act);
            }
        }
        if (in.gallery() != null) {
            for (int i = 0; i < in.gallery().size(); i++) {
                ImageDto g = in.gallery().get(i);
                Image im = new Image();
                im.setPlace(p);
                im.setUrl(g.url());
                im.setCaption(g.caption());
                im.setSortOrder(i);
                p.getGallery().add(im);
            }
        }
        return p;
    }

    private static String nullToEmpty(String s) {
        return s == null ? "" : s;
    }
}
