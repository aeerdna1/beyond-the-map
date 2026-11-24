package com.beyondthemap.repository;

import com.beyondthemap.model.Place;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlaceRepository extends JpaRepository<Place, Long> {

    Optional<Place> findByDestinationSlugAndSlug(String destinationSlug, String slug);
}
