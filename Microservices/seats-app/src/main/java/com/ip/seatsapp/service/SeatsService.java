package com.ip.seatsapp.service;

import com.ip.seatsapp.service.dto.SeatsDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Seats.
 */
public interface SeatsService {

    /**
     * Save a seats.
     *
     * @param seatsDTO the entity to save
     * @return the persisted entity
     */
    SeatsDTO save(SeatsDTO seatsDTO);

    /**
     * Get all the seats.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<SeatsDTO> findAll(Pageable pageable);

    /**
     * Get the "id" seats.
     *
     * @param id the id of the entity
     * @return the entity
     */
    SeatsDTO findOne(Long id);

    /**
     * Delete the "id" seats.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
