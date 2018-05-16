package com.ip.userinfo.service;

import com.ip.userinfo.service.dto.UserinfoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Userinfo.
 */
public interface UserinfoService {

    /**
     * Save a userinfo.
     *
     * @param userinfoDTO the entity to save
     * @return the persisted entity
     */
    UserinfoDTO save(UserinfoDTO userinfoDTO);

    /**
     * Get all the userinfos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<UserinfoDTO> findAll(Pageable pageable);

    /**
     * Get the "id" userinfo.
     *
     * @param id the id of the entity
     * @return the entity
     */
    UserinfoDTO findOne(Long id);

    /**
     * Delete the "id" userinfo.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
