package com.ip.userinfo.service.mapper;

import com.ip.userinfo.domain.*;
import com.ip.userinfo.service.dto.UserinfoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Userinfo and its DTO UserinfoDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface UserinfoMapper extends EntityMapper<UserinfoDTO, Userinfo> {



    default Userinfo fromId(Long id) {
        if (id == null) {
            return null;
        }
        Userinfo userinfo = new Userinfo();
        userinfo.setId(id);
        return userinfo;
    }
}
