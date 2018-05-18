package com.flights.repository;

import com.flights.domain.Flights;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Flights entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FlightsRepository extends JpaRepository<Flights, Long> {
	public List<Flights> findByDepartureAndArrival(String departure , String arrival);

}
