package com.ip.payment.service;

import com.ip.payment.service.dto.OrderHistoryDTO;
import java.util.List;

/**
 * Service Interface for managing OrderHistory.
 */
public interface OrderHistoryService {

    /**
     * Save a orderHistory.
     *
     * @param orderHistoryDTO the entity to save
     * @return the persisted entity
     */
    OrderHistoryDTO save(OrderHistoryDTO orderHistoryDTO);

    /**
     * Get all the orderHistories.
     *
     * @return the list of entities
     */
    List<OrderHistoryDTO> findAll();

    /**
     * Get the "id" orderHistory.
     *
     * @param id the id of the entity
     * @return the entity
     */
    OrderHistoryDTO findOne(Long id);

    /**
     * Delete the "id" orderHistory.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
