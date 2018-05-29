package com.ip.payment.repository;

import com.ip.payment.domain.OrderHistory;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the OrderHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderHistoryRepository extends JpaRepository<OrderHistory, Long> {
   List<OrderHistory> findByTicketUserId(String ticketUserId);
}
