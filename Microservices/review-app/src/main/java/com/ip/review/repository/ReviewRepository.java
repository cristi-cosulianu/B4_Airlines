package com.ip.review.repository;

import com.ip.review.domain.Review;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


/**
 * Spring Data JPA repository for the Review entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Page<Review> getByFlightId(Pageable pageable, Long flightId);
    Page<Review> getByUserId(Pageable pageable, Long userId);
}
