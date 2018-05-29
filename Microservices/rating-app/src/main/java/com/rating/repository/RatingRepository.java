package com.rating.repository;

import com.rating.domain.Rating;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Rating entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findByFlightId(Long flightId);
    Rating findByUserIdAndFlightId(Long userId , Long flightId);
}
