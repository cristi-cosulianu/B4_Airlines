package com.ip.payment.service.mapper;

import com.ip.payment.domain.*;
import com.ip.payment.service.dto.OrderHistoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity OrderHistory and its DTO OrderHistoryDTO.
 */
@Mapper(componentModel = "spring", uses = {CardMapper.class})
public interface OrderHistoryMapper extends EntityMapper<OrderHistoryDTO, OrderHistory> {

    @Mapping(source = "card.id", target = "cardId")
    OrderHistoryDTO toDto(OrderHistory orderHistory);

    @Mapping(source = "cardId", target = "card")
    OrderHistory toEntity(OrderHistoryDTO orderHistoryDTO);

    default OrderHistory fromId(Long id) {
        if (id == null) {
            return null;
        }
        OrderHistory orderHistory = new OrderHistory();
        orderHistory.setId(id);
        return orderHistory;
    }
}
