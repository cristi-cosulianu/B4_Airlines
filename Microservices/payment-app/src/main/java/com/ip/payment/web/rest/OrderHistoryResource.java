package com.ip.payment.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ip.payment.service.OrderHistoryService;
import com.ip.payment.web.rest.errors.BadRequestAlertException;
import com.ip.payment.web.rest.util.HeaderUtil;
import com.ip.payment.service.dto.OrderHistoryDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing OrderHistory.
 */
@RestController
@RequestMapping("/api")
public class OrderHistoryResource {

    private final Logger log = LoggerFactory.getLogger(OrderHistoryResource.class);

    private static final String ENTITY_NAME = "orderHistory";

    private final OrderHistoryService orderHistoryService;

    public OrderHistoryResource(OrderHistoryService orderHistoryService) {
        this.orderHistoryService = orderHistoryService;
    }

    /**
     * POST  /order-histories : Create a new orderHistory.
     *
     * @param orderHistoryDTO the orderHistoryDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new orderHistoryDTO, or with status 400 (Bad Request) if the orderHistory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/order-histories")
    @Timed
    public ResponseEntity<OrderHistoryDTO> createOrderHistory(@Valid @RequestBody OrderHistoryDTO orderHistoryDTO) throws URISyntaxException {
        log.debug("REST request to save OrderHistory : {}", orderHistoryDTO);
        if (orderHistoryDTO.getId() != null) {
            throw new BadRequestAlertException("A new orderHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrderHistoryDTO result = orderHistoryService.save(orderHistoryDTO);
        return ResponseEntity.created(new URI("/api/order-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /order-histories : Updates an existing orderHistory.
     *
     * @param orderHistoryDTO the orderHistoryDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated orderHistoryDTO,
     * or with status 400 (Bad Request) if the orderHistoryDTO is not valid,
     * or with status 500 (Internal Server Error) if the orderHistoryDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/order-histories")
    @Timed
    public ResponseEntity<OrderHistoryDTO> updateOrderHistory(@Valid @RequestBody OrderHistoryDTO orderHistoryDTO) throws URISyntaxException {
        log.debug("REST request to update OrderHistory : {}", orderHistoryDTO);
        if (orderHistoryDTO.getId() == null) {
            return createOrderHistory(orderHistoryDTO);
        }
        OrderHistoryDTO result = orderHistoryService.save(orderHistoryDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, orderHistoryDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /order-histories : get all the orderHistories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of orderHistories in body
     */
    @GetMapping("/order-histories")
    @Timed
    public List<OrderHistoryDTO> getAllOrderHistories() {
        log.debug("REST request to get all OrderHistories");
        return orderHistoryService.findAll();
        }

    /**
     * GET  /order-histories/:id : get the "id" orderHistory.
     *
     * @param id the id of the orderHistoryDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the orderHistoryDTO, or with status 404 (Not Found)
     */
    @GetMapping("/order-histories/{id}")
    @Timed
    public ResponseEntity<OrderHistoryDTO> getOrderHistory(@PathVariable Long id) {
        log.debug("REST request to get OrderHistory : {}", id);
        OrderHistoryDTO orderHistoryDTO = orderHistoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(orderHistoryDTO));
    }

    /**
     * DELETE  /order-histories/:id : delete the "id" orderHistory.
     *
     * @param id the id of the orderHistoryDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/order-histories/{id}")
    @Timed
    public ResponseEntity<Void> deleteOrderHistory(@PathVariable Long id) {
        log.debug("REST request to delete OrderHistory : {}", id);
        orderHistoryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
