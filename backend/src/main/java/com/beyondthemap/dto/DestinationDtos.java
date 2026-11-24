package com.beyondthemap.dto;

import java.util.List;

/**
 * Read-side DTOs. Field names match the frontend TypeScript types in
 * frontend/src/types.ts so the React app can switch between API and local data.
 */
public final class DestinationDtos {

    private DestinationDtos() {
    }

    public record ActivityDto(int rank, String title, String description, String imageUrl) {
    }

    public record ImageDto(String url, String caption) {
    }

    public record PlaceDto(
            String slug,
            String name,
            String description,
            String funFact,
            String heroImageUrl,
            List<ActivityDto> activities,
            List<ImageDto> gallery) {
    }

    /** Card shape for GET /api/destinations. */
    public record DestinationSummaryDto(
            String slug,
            String name,
            String flag,
            String region,
            List<String> vibes,
            String tagline,
            String description,
            String bestTimeToVisit,
            String heroImageUrl,
            Double lat,
            Double lng,
            int placeCount) {
    }

    /** Full shape for GET /api/destinations/{slug}. */
    public record DestinationDto(
            String slug,
            String name,
            String flag,
            String region,
            List<String> vibes,
            String tagline,
            String description,
            String bestTimeToVisit,
            String heroImageUrl,
            Double lat,
            Double lng,
            List<PlaceDto> places) {
    }
}
