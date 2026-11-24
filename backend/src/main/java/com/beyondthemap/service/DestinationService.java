package com.beyondthemap.service;

import com.beyondthemap.dto.DestinationDtos.*;
import com.beyondthemap.model.Activity;
import com.beyondthemap.model.Destination;
import com.beyondthemap.model.Image;
import com.beyondthemap.model.Place;
import com.beyondthemap.repository.DestinationRepository;
import com.beyondthemap.repository.PlaceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Service
public class DestinationService {

    private final DestinationRepository destinations;
    private final PlaceRepository places;

    public DestinationService(DestinationRepository destinations, PlaceRepository places) {
        this.destinations = destinations;
        this.places = places;
    }

    @Transactional(readOnly = true)
    public List<DestinationSummaryDto> list() {
        return destinations.findAllByOrderBySortOrderAsc().stream().map(DestinationService::toSummary).toList();
    }

    @Transactional(readOnly = true)
    public DestinationDto get(String slug) {
        return destinations.findBySlug(slug).map(DestinationService::toDto)
                .orElseThrow(() -> new NotFoundException("Destination not found: " + slug));
    }

    @Transactional(readOnly = true)
    public PlaceDto getPlace(String slug, String placeSlug) {
        return places.findByDestinationSlugAndSlug(slug, placeSlug).map(DestinationService::toDto)
                .orElseThrow(() -> new NotFoundException("Place not found: " + slug + "/" + placeSlug));
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
        return toDto(destinations.save(d));
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

    static DestinationSummaryDto toSummary(Destination d) {
        return new DestinationSummaryDto(d.getSlug(), d.getName(), d.getFlag(), d.getRegion(), vibes(d),
                d.getTagline(), d.getDescription(), d.getBestTimeToVisit(), d.getHeroImageUrl(),
                d.getLat(), d.getLng(), d.getPlaces().size());
    }

    static DestinationDto toDto(Destination d) {
        return new DestinationDto(d.getSlug(), d.getName(), d.getFlag(), d.getRegion(), vibes(d),
                d.getTagline(), d.getDescription(), d.getBestTimeToVisit(), d.getHeroImageUrl(),
                d.getLat(), d.getLng(), d.getPlaces().stream().map(DestinationService::toDto).toList());
    }

    static PlaceDto toDto(Place p) {
        return new PlaceDto(p.getSlug(), p.getName(), nullToEmpty(p.getDescription()), p.getFunFact(), p.getHeroImageUrl(),
                p.getActivities().stream()
                        .map(a -> new ActivityDto(a.getRank(), a.getTitle(), a.getDescription(), a.getImageUrl()))
                        .toList(),
                p.getGallery().stream().map(g -> new ImageDto(g.getUrl(), g.getCaption())).toList());
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
