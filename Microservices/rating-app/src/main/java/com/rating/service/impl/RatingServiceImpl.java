package com.rating.service.impl;

import com.rating.service.RatingService;
import com.rating.domain.Rating;
import com.rating.repository.RatingRepository;
import com.rating.service.dto.RatingDTO;
import com.rating.service.mapper.RatingMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;


/**
 * Service Implementation for managing Rating.
 */
@Service
@Transactional
public class RatingServiceImpl implements RatingService {

    private final Logger log = LoggerFactory.getLogger(RatingServiceImpl.class);

    private final RatingRepository ratingRepository;

    private final RatingMapper ratingMapper;

    public RatingServiceImpl(RatingRepository ratingRepository, RatingMapper ratingMapper) {
        this.ratingRepository = ratingRepository;
        this.ratingMapper = ratingMapper;
    }

    /**
     * Save a rating.
     *
     * @param ratingDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public RatingDTO save(RatingDTO ratingDTO) {
        log.debug("Request to save Rating : {}", ratingDTO);
        Rating rating = ratingMapper.toEntity(ratingDTO);
        rating = ratingRepository.save(rating);
        return ratingMapper.toDto(rating);
    }

    /**
     * Get all the ratings.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<RatingDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Ratings");
        return ratingRepository.findAll(pageable)
            .map(ratingMapper::toDto);
    }

    /**
     * Get one rating by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public RatingDTO findOne(Long id) {
        log.debug("Request to get Rating : {}", id);
        Rating rating = ratingRepository.findOne(id);
        return ratingMapper.toDto(rating);
    }

    @Override
    public List<RatingDTO> findByFlightId(Long flightId) {
        List<Rating> ratings = ratingRepository.findByFlightId(flightId);
        if(ratings.isEmpty()){
            return Collections.emptyList();
        }
        else{
            return ratings.stream().map(ratingMapper::toDto).collect(Collectors.toList());
        }
    }

    /**
     * Delete the rating by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Rating : {}", id);
        ratingRepository.delete(id);
    }
}
