package com.flights.service.impl;

import com.flights.service.FlightsService;
import com.flights.domain.Flights;
import com.flights.repository.FlightsRepository;
import com.flights.service.dto.FlightsDTO;
import com.flights.service.mapper.FlightsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Flights.
 */
@Service
@Transactional
public class FlightsServiceImpl implements FlightsService {

    private final Logger log = LoggerFactory.getLogger(FlightsServiceImpl.class);

    private final FlightsRepository flightsRepository;

    private final FlightsMapper flightsMapper;

    public FlightsServiceImpl(FlightsRepository flightsRepository, FlightsMapper flightsMapper) {
        this.flightsRepository = flightsRepository;
        this.flightsMapper = flightsMapper;
    }

    /**
     * Save a flights.
     *
     * @param flightsDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public FlightsDTO save(FlightsDTO flightsDTO) {
        log.debug("Request to save Flights : {}", flightsDTO);
        Flights flights = flightsMapper.toEntity(flightsDTO);
        flights = flightsRepository.save(flights);
        return flightsMapper.toDto(flights);
    }

    /**
     * Get all the flights.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<FlightsDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Flights");
        return flightsRepository.findAll(pageable)
            .map(flightsMapper::toDto);
    }

    /**
     * Get one flights by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public FlightsDTO findOne(Long id) {
        log.debug("Request to get Flights : {}", id);
        Flights flights = flightsRepository.findOne(id);
        return flightsMapper.toDto(flights);
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
	public Page<FlightsDTO> findFlights(Pageable pageable , String departure, String arrival) {
		Page<Flights> flights = flightsRepository.findByDepartureAndArrival(pageable , departure, arrival);
		return flights.map(flightsMapper::toDto);
	}
}
