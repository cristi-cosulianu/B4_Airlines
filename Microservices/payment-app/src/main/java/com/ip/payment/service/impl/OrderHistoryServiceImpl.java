package com.ip.payment.service.impl;

import com.ip.payment.service.OrderHistoryService;
import com.ip.payment.domain.OrderHistory;
import com.ip.payment.repository.OrderHistoryRepository;
import com.ip.payment.service.dto.OrderHistoryDTO;
import com.ip.payment.service.mapper.OrderHistoryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing OrderHistory.
 */
@Service
@Transactional
public class OrderHistoryServiceImpl implements OrderHistoryService {

    private final Logger log = LoggerFactory.getLogger(OrderHistoryServiceImpl.class);

    private final OrderHistoryRepository orderHistoryRepository;

    private final OrderHistoryMapper orderHistoryMapper;

    public OrderHistoryServiceImpl(OrderHistoryRepository orderHistoryRepository, OrderHistoryMapper orderHistoryMapper) {
        this.orderHistoryRepository = orderHistoryRepository;
        this.orderHistoryMapper = orderHistoryMapper;
    }

    /**
     * Save a orderHistory.
     *
     * @param orderHistoryDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public OrderHistoryDTO save(OrderHistoryDTO orderHistoryDTO) {
        log.debug("Request to save OrderHistory : {}", orderHistoryDTO);
        OrderHistory orderHistory = orderHistoryMapper.toEntity(orderHistoryDTO);
        orderHistory = orderHistoryRepository.save(orderHistory);
        return orderHistoryMapper.toDto(orderHistory);
    }

    /**
     * Get all the orderHistories.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<OrderHistoryDTO> findAll() {
        log.debug("Request to get all OrderHistories");
        return orderHistoryRepository.findAll().stream()
            .map(orderHistoryMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one orderHistory by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public OrderHistoryDTO findOne(Long id) {
        log.debug("Request to get OrderHistory : {}", id);
        OrderHistory orderHistory = orderHistoryRepository.findOne(id);
        return orderHistoryMapper.toDto(orderHistory);
    }

    /**
     * Delete the orderHistory by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete OrderHistory : {}", id);
        orderHistoryRepository.delete(id);
    }
}
