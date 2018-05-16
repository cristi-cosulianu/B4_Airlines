package com.ip.seatsapp.service.mapper;

import com.ip.seatsapp.domain.*;
import com.ip.seatsapp.service.dto.SeatsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Seats and its DTO SeatsDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SeatsMapper extends EntityMapper<SeatsDTO, Seats> {



    default Seats fromId(Long id) {
        if (id == null) {
            return null;
        }
        Seats seats = new Seats();
        seats.setId(id);
        return seats;
    }
}
