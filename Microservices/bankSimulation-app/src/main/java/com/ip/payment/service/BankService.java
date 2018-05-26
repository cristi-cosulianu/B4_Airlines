package com.ip.payment.service;

import com.ip.payment.service.dto.BankDTO;
import java.util.List;

/**
 * Service Interface for managing Bank.
 */
public interface BankService {

    /**
     * Save a bank.
     *
     * @param bankDTO the entity to save
     * @return the persisted entity
     */
    BankDTO save(BankDTO bankDTO);

    /**
     * Get all the banks.
     *
     * @return the list of entities
     */
    List<BankDTO> findAll();

    /**
     * Get the "id" bank.
     *
     * @param id the id of the entity
     * @return the entity
     */
    BankDTO findOne(Long id);

    /**
     * Delete the "id" bank.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
