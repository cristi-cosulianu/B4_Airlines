package com.ip.payment.service;

import com.ip.payment.service.dto.CardDTO;
import java.util.List;

/**
 * Service Interface for managing Card.
 */
public interface CardService {

    /**
     * Save a card.
     *
     * @param cardDTO the entity to save
     * @return the persisted entity
     */
    CardDTO save(CardDTO cardDTO);

    /**
     * Get all the cards.
     *
     * @return the list of entities
     */
    List<CardDTO> findAll();

    /**
     * Get the "id" card.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CardDTO findOne(Long id);

    /**
     * Delete the "id" card.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
