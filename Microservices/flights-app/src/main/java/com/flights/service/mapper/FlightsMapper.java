package com.flights.service.mapper;

import com.flights.domain.*;
import com.flights.service.dto.FlightsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Flights and its DTO FlightsDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface FlightsMapper extends EntityMapper<FlightsDTO, Flights> {



    default Flights fromId(Long id) {
        if (id == null) {
            return null;
        }
        Flights flights = new Flights();
        flights.setId(id);
        return flights;
    }
}
