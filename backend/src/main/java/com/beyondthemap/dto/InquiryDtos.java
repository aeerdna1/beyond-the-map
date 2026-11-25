package com.beyondthemap.dto;

import com.beyondthemap.model.TripInquiry;
import jakarta.validation.constraints.*;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;

public final class InquiryDtos {

    private InquiryDtos() {
    }

    /** Body of POST /api/inquiries (mirrors the frontend TripInquiry type). */
    public record InquiryRequest(
            @NotBlank @Size(min = 2, max = 120) String name,
            @NotBlank @Email @Size(max = 200) String email,
            @Size(max = 40) String phone,
            @NotEmpty @Size(max = 20) List<@Pattern(regexp = "[a-z0-9-]{1,80}") String> destinations,
            LocalDate travelFrom,
            LocalDate travelTo,
            @Min(1) @Max(50) int travelers,
            @NotBlank @Size(max = 60) String budget,
            @NotBlank @Size(max = 40) String travelStyle,
            @Size(max = 2000) String message,
            @AssertTrue(message = "consent is required") boolean consent,
            /* Site language ("en" or "ro"); picks the confirmation email language. Optional, defaults to "en". */
            @Pattern(regexp = "en|ro", message = "lang must be en or ro") String lang,
            /* Honeypot field - real users never fill it in. */
            String website) {

        @AssertTrue(message = "travelTo must be on or after travelFrom")
        public boolean isDateRangeValid() {
            return travelFrom == null || travelTo == null || !travelTo.isBefore(travelFrom);
        }
    }

    /** Admin view of an inquiry. */
    public record InquiryView(
            Long id,
            String name,
            String email,
            String phone,
            List<String> destinations,
            LocalDate travelFrom,
            LocalDate travelTo,
            int travelers,
            String budget,
            String travelStyle,
            String message,
            /* "en" or "ro": the language to reply in. */
            String lang,
            TripInquiry.Status status,
            OffsetDateTime createdAt) {
    }

    public record StatusUpdate(@NotNull TripInquiry.Status status) {
    }
}
