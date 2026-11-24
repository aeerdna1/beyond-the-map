package com.beyondthemap.repository;

import com.beyondthemap.model.TripInquiry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripInquiryRepository extends JpaRepository<TripInquiry, Long> {

    Page<TripInquiry> findByStatus(TripInquiry.Status status, Pageable pageable);
}
