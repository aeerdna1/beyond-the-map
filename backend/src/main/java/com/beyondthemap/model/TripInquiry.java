package com.beyondthemap.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.OffsetDateTime;

/** A "Plan my trip" request submitted from the website. */
@Entity
@Table(name = "trip_inquiry")
public class TripInquiry {

    public enum Status { NEW, CONTACTED, BOOKED, CLOSED }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    private String phone;

    /** Comma-separated destination slugs. */
    private String destinations;

    @Column(name = "travel_from")
    private LocalDate travelFrom;

    @Column(name = "travel_to")
    private LocalDate travelTo;

    @Column(nullable = false)
    private int travelers;

    private String budget;

    @Column(name = "travel_style")
    private String travelStyle;

    @Column(columnDefinition = "TEXT")
    private String message;

    @Column(nullable = false)
    private boolean consent;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.NEW;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @PrePersist
    void onCreate() {
        if (createdAt == null) createdAt = OffsetDateTime.now();
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getDestinations() { return destinations; }
    public void setDestinations(String destinations) { this.destinations = destinations; }
    public LocalDate getTravelFrom() { return travelFrom; }
    public void setTravelFrom(LocalDate travelFrom) { this.travelFrom = travelFrom; }
    public LocalDate getTravelTo() { return travelTo; }
    public void setTravelTo(LocalDate travelTo) { this.travelTo = travelTo; }
    public int getTravelers() { return travelers; }
    public void setTravelers(int travelers) { this.travelers = travelers; }
    public String getBudget() { return budget; }
    public void setBudget(String budget) { this.budget = budget; }
    public String getTravelStyle() { return travelStyle; }
    public void setTravelStyle(String travelStyle) { this.travelStyle = travelStyle; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public boolean isConsent() { return consent; }
    public void setConsent(boolean consent) { this.consent = consent; }
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
    public OffsetDateTime getCreatedAt() { return createdAt; }
}
