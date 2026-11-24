package com.beyondthemap.service;

import com.beyondthemap.dto.InquiryDtos.InquiryRequest;
import com.beyondthemap.dto.InquiryDtos.InquiryView;
import com.beyondthemap.model.TripInquiry;
import com.beyondthemap.repository.TripInquiryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Service
public class InquiryService {

    private static final Logger log = LoggerFactory.getLogger(InquiryService.class);

    private final TripInquiryRepository repo;
    private final MailService mail;

    public InquiryService(TripInquiryRepository repo, MailService mail) {
        this.repo = repo;
        this.mail = mail;
    }

    /**
     * Saves the inquiry and sends emails. Honeypot submissions are silently
     * dropped (the bot still gets a 202 so it learns nothing).
     */
    @Transactional
    public void submit(InquiryRequest r) {
        if (r.website() != null && !r.website().isBlank()) {
            log.info("Dropped inquiry: honeypot field filled");
            return;
        }
        TripInquiry i = new TripInquiry();
        i.setName(r.name().trim());
        i.setEmail(r.email().trim());
        i.setPhone(blankToNull(r.phone()));
        i.setDestinations(String.join(",", r.destinations()));
        i.setTravelFrom(r.travelFrom());
        i.setTravelTo(r.travelTo());
        i.setTravelers(r.travelers());
        i.setBudget(r.budget());
        i.setTravelStyle(r.travelStyle());
        i.setMessage(blankToNull(r.message()));
        i.setConsent(r.consent());
        repo.save(i);
        mail.sendInquiryEmails(i);
    }

    @Transactional(readOnly = true)
    public Page<InquiryView> list(TripInquiry.Status status, Pageable pageable) {
        Page<TripInquiry> page = status == null ? repo.findAll(pageable) : repo.findByStatus(status, pageable);
        return page.map(InquiryService::toView);
    }

    @Transactional
    public InquiryView updateStatus(Long id, TripInquiry.Status status) {
        TripInquiry i = repo.findById(id).orElseThrow(() -> new NotFoundException("Inquiry not found: " + id));
        i.setStatus(status);
        return toView(i);
    }

    /** GDPR: right to erasure. */
    @Transactional
    public void delete(Long id) {
        if (!repo.existsById(id)) throw new NotFoundException("Inquiry not found: " + id);
        repo.deleteById(id);
    }

    private static InquiryView toView(TripInquiry i) {
        List<String> dest = i.getDestinations() == null ? List.of() : Arrays.asList(i.getDestinations().split(","));
        return new InquiryView(i.getId(), i.getName(), i.getEmail(), i.getPhone(), dest, i.getTravelFrom(),
                i.getTravelTo(), i.getTravelers(), i.getBudget(), i.getTravelStyle(), i.getMessage(), i.getStatus(),
                i.getCreatedAt());
    }

    private static String blankToNull(String s) {
        return s == null || s.isBlank() ? null : s.trim();
    }
}
