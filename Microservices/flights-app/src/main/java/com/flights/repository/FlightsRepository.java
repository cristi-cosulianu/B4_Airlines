package com.flights.repository;

import com.flights.domain.Flights;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Flights entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FlightsRepository extends JpaRepository<Flights, Long> {
	public Page<Flights> findByDepartureAndArrival(Pageable pageable, String departure, String arrival);
	public List<Flights> findByDeparture(String departure);
	public List<Flights> findByArrival(String arrival);
}
