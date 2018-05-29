package com.ip.seatsapp.service.impl;

import com.ip.seatsapp.service.SeatsService;
import com.ip.seatsapp.domain.Seats;
import com.ip.seatsapp.repository.SeatsRepository;
import com.ip.seatsapp.service.dto.SeatsDTO;
import com.ip.seatsapp.service.mapper.SeatsMapper;

import org.hibernate.internal.util.type.PrimitiveWrapperHelper.IntegerDescriptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Seats.
 */
@Service
@Transactional
public class SeatsServiceImpl implements SeatsService {

    private final Logger log = LoggerFactory.getLogger(SeatsServiceImpl.class);

    private final SeatsRepository seatsRepository;

    private final SeatsMapper seatsMapper;

    public SeatsServiceImpl(SeatsRepository seatsRepository, SeatsMapper seatsMapper) {
        this.seatsRepository = seatsRepository;
        this.seatsMapper = seatsMapper;
    }

    /**
     * Save a seats.
     *
     * @param seatsDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SeatsDTO save(SeatsDTO seatsDTO) {
        log.debug("Request to save Seats : {}", seatsDTO);
        Seats seats = seatsMapper.toEntity(seatsDTO);
        seats = seatsRepository.save(seats);
        return seatsMapper.toDto(seats);
    }

    /**
     * Get all the seats.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<SeatsDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Seats");
        return seatsRepository.findAll(pageable)
            .map(seatsMapper::toDto);
    }

    /**
     * Get one seats by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public SeatsDTO findOne(Long id) {
        log.debug("Request to get Seats : {}", id);
        Seats seats = seatsRepository.findOne(id);
        return seatsMapper.toDto(seats);
    }

    /**
     * Delete the seats by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Seats : {}", id);
        seatsRepository.delete(id);
    }

    @Transactional(readOnly = true)
    public Page<SeatsDTO> findByType(Pageable pageable, Integer type){
        log.debug("Request to get all Seats with flight id");
        return seatsRepository.findByType(pageable, type).map(seatsMapper::toDto);
    }
}
