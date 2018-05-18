package com.flights.service;

import com.flights.service.dto.FlightsDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Flights.
 */
public interface FlightsService {

    /**
     * Save a flights.
     *
     * @param flightsDTO the entity to save
     * @return the persisted entity
     */
    FlightsDTO save(FlightsDTO flightsDTO);

    /**
     * Get all the flights.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<FlightsDTO> findAll(Pageable pageable);

    /**
     * Get the "id" flights.
     *
     * @param id the id of the entity
     * @return the entity
     */
    FlightsDTO findOne(Long id);

    /**
     * Delete the "id" flights.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
    
    Page<FlightsDTO> findFlights(Pageable pageable , String departure , String arrival);
}
