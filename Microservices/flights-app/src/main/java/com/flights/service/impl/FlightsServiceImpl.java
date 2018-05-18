package com.flights.service.impl;

import com.flights.service.FlightsService;
import com.flights.domain.Flights;
import com.flights.repository.FlightsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Flights.
 */
@Service
@Transactional
public class FlightsServiceImpl implements FlightsService {

    private final Logger log = LoggerFactory.getLogger(FlightsServiceImpl.class);

    private final FlightsRepository flightsRepository;

    public FlightsServiceImpl(FlightsRepository flightsRepository) {
        this.flightsRepository = flightsRepository;
    }

    /**
     * Save a flights.
     *
     * @param flights the entity to save
     * @return the persisted entity
     */
    @Override
    public Flights save(Flights flights) {
        log.debug("Request to save Flights : {}", flights);
        return flightsRepository.save(flights);
    }

    /**
     * Get all the flights.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Flights> findAll() {
        log.debug("Request to get all Flights");
        return flightsRepository.findAll();
    }

    /**
     * Get one flights by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Flights findOne(Long id) {
        log.debug("Request to get Flights : {}", id);
        return flightsRepository.findOne(id);
    }

    /**
     * Delete the flights by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Flights : {}", id);
        flightsRepository.delete(id);
    }

	@Override
	public List<Flights> findFlights(String departure, String arrival) {
		return flightsRepository.findByDepartureAndArrival(departure , arrival);
	}
}
