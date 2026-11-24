package com.beyondthemap.model;

import jakarta.persistence.*;

/** One of the "top 5 things to do" for a place. */
@Entity
@Table(name = "activity")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "place_id")
    private Place place;

    /** 1..5; column is rank_no because RANK is a reserved word in some databases. */
    @Column(name = "rank_no", nullable = false)
    private int rank;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    public Long getId() { return id; }
    public Place getPlace() { return place; }
    public void setPlace(Place place) { this.place = place; }
    public int getRank() { return rank; }
    public void setRank(int rank) { this.rank = rank; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
