package com.ip.userinfo.service.impl;

import com.ip.userinfo.service.UserinfoService;
import com.ip.userinfo.domain.Userinfo;
import com.ip.userinfo.repository.UserinfoRepository;
import com.ip.userinfo.service.dto.UserinfoDTO;
import com.ip.userinfo.service.mapper.UserinfoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Userinfo.
 */
@Service
@Transactional
public class UserinfoServiceImpl implements UserinfoService {

    private final Logger log = LoggerFactory.getLogger(UserinfoServiceImpl.class);

    private final UserinfoRepository userinfoRepository;

    private final UserinfoMapper userinfoMapper;

    public UserinfoServiceImpl(UserinfoRepository userinfoRepository, UserinfoMapper userinfoMapper) {
        this.userinfoRepository = userinfoRepository;
        this.userinfoMapper = userinfoMapper;
    }

    /**
     * Save a userinfo.
     *
     * @param userinfoDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public UserinfoDTO save(UserinfoDTO userinfoDTO) {
        log.debug("Request to save Userinfo : {}", userinfoDTO);
        Userinfo userinfo = userinfoMapper.toEntity(userinfoDTO);
        userinfo = userinfoRepository.save(userinfo);
        return userinfoMapper.toDto(userinfo);
    }

    /**
     * Get all the userinfos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<UserinfoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Userinfos");
        return userinfoRepository.findAll(pageable)
            .map(userinfoMapper::toDto);
    }

    /**
     * Get one userinfo by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public UserinfoDTO findOne(Long id) {
        log.debug("Request to get Userinfo : {}", id);
        Userinfo userinfo = userinfoRepository.findOne(id);
        return userinfoMapper.toDto(userinfo);
    }

    /**
     * Delete the userinfo by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Userinfo : {}", id);
        userinfoRepository.delete(id);
    }
}
