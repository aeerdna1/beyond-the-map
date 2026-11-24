package com.beyondthemap.repository;

import com.beyondthemap.model.Destination;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DestinationRepository extends JpaRepository<Destination, Long> {

    @EntityGraph(attributePaths = "places")
    List<Destination> findAllByOrderBySortOrderAsc();

    @EntityGraph(attributePaths = "places")
    Optional<Destination> findBySlug(String slug);

    boolean existsBySlug(String slug);
}
