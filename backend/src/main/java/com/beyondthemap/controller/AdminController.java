package com.beyondthemap.controller;

import com.beyondthemap.dto.DestinationDtos.DestinationDto;
import com.beyondthemap.dto.InquiryDtos.InquiryView;
import com.beyondthemap.dto.InquiryDtos.StatusUpdate;
import com.beyondthemap.model.TripInquiry;
import com.beyondthemap.service.DestinationService;
import com.beyondthemap.service.InquiryService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/** Protected admin API (HTTP Basic, role ADMIN - see SecurityConfig). */
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final InquiryService inquiries;
    private final DestinationService destinations;

    public AdminController(InquiryService inquiries, DestinationService destinations) {
        this.inquiries = inquiries;
        this.destinations = destinations;
    }

    // ---- trip requests ----

    @GetMapping("/inquiries")
    public Page<InquiryView> listInquiries(
            @RequestParam(required = false) TripInquiry.Status status,
            @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        return inquiries.list(status, pageable);
    }

    @PutMapping("/inquiries/{id}/status")
    public InquiryView updateStatus(@PathVariable Long id, @Valid @RequestBody StatusUpdate body) {
        return inquiries.updateStatus(id, body.status());
    }

    @DeleteMapping("/inquiries/{id}")
    public ResponseEntity<Void> deleteInquiry(@PathVariable Long id) {
        inquiries.delete(id);
        return ResponseEntity.noContent().build();
    }

    // ---- content ----

    /** Create or fully replace a destination with its places, top 5 and gallery. */
    @PutMapping("/destinations/{slug}")
    public DestinationDto upsertDestination(@PathVariable String slug, @RequestBody DestinationDto body) {
        return destinations.upsert(slug, body);
    }

    @DeleteMapping("/destinations/{slug}")
    public ResponseEntity<Void> deleteDestination(@PathVariable String slug) {
        destinations.delete(slug);
        return ResponseEntity.noContent().build();
    }
}
