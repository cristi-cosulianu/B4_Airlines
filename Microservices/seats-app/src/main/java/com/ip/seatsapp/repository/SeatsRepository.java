package com.ip.seatsapp.repository;

import com.ip.seatsapp.domain.Seats;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Seats entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SeatsRepository extends JpaRepository<Seats, Long> {

}
