package com.rating.service;

import com.rating.service.dto.RatingDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

/**
 * Service Interface for managing Rating.
 */
public interface RatingService {

    /**
     * Save a rating.
     *
     * @param ratingDTO the entity to save
     * @return the persisted entity
     */
    RatingDTO save(RatingDTO ratingDTO);

    /**
     * Get all the ratings.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<RatingDTO> findAll(Pageable pageable);

    /**
     * Get the "id" rating.
     *
     * @param id the id of the entity
     * @return the entity
     */
    RatingDTO findOne(Long id);

    /**
     * Delete the "id" rating.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    List<RatingDTO> findByFlightId(Long flightId);
}
