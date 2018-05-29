package com.ip.seatsapp.repository;


import com.ip.seatsapp.domain.Seats;
import com.ip.seatsapp.service.dto.SeatsDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data JPA repository for the Seats entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SeatsRepository extends JpaRepository<Seats, Long> {
    Page<Seats> findByType(Pageable pageable, Integer type);
}
