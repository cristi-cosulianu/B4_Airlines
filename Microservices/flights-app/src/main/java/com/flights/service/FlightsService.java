package com.flights.service;

import com.flights.domain.Flights;
import java.util.List;

/**
 * Service Interface for managing Flights.
 */
public interface FlightsService {

    /**
     * Save a flights.
     *
     * @param flights the entity to save
     * @return the persisted entity
     */
    Flights save(Flights flights);

    /**
     * Get all the flights.
     *
     * @return the list of entities
     */
    List<Flights> findAll();

    /**
     * Get the "id" flights.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Flights findOne(Long id);

    /**
     * Delete the "id" flights.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
    
    public List<Flights> findFlights(String departure , String arrival);
}
