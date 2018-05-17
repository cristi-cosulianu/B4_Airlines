package com.ip.review.service.mapper;

import com.ip.review.domain.*;
import com.ip.review.service.dto.ReviewDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Review and its DTO ReviewDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ReviewMapper extends EntityMapper<ReviewDTO, Review> {



    default Review fromId(Long id) {
        if (id == null) {
            return null;
        }
        Review review = new Review();
        review.setId(id);
        return review;
    }
}
