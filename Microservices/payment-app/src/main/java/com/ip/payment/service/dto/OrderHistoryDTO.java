package com.ip.payment.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the OrderHistory entity.
 */
public class OrderHistoryDTO implements Serializable {

    private Long id;

    @NotNull
    private String ticketUserId;

    @NotNull
    private Integer ticketFlightID;

    @NotNull
    private Integer ticketPlaneType;

    @NotNull
    @DecimalMin(value = "0")
    private Float ticketPrice;

    @NotNull
    private Long creditCardId;

    private Long cardId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTicketUserId() {
        return ticketUserId;
    }

    public void setTicketUserId(String ticketUserId) {
        this.ticketUserId = ticketUserId;
    }

    public Integer getTicketFlightID() {
        return ticketFlightID;
    }

    public void setTicketFlightID(Integer ticketFlightID) {
        this.ticketFlightID = ticketFlightID;
    }

    public Integer getTicketPlaneType() {
        return ticketPlaneType;
    }

    public void setTicketPlaneType(Integer ticketPlaneType) {
        this.ticketPlaneType = ticketPlaneType;
    }

    public Float getTicketPrice() {
        return ticketPrice;
    }

    public void setTicketPrice(Float ticketPrice) {
        this.ticketPrice = ticketPrice;
    }

    public Long getCreditCardId() {
        return creditCardId;
    }

    public void setCreditCardId(Long creditCardId) {
        this.creditCardId = creditCardId;
    }

    public Long getCardId() {
        return cardId;
    }

    public void setCardId(Long cardId) {
        this.cardId = cardId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        OrderHistoryDTO orderHistoryDTO = (OrderHistoryDTO) o;
        if(orderHistoryDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), orderHistoryDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrderHistoryDTO{" +
            "id=" + getId() +
            ", ticketUserId='" + getTicketUserId() + "'" +
            ", ticketFlightID=" + getTicketFlightID() +
            ", ticketPlaneType=" + getTicketPlaneType() +
            ", ticketPrice=" + getTicketPrice() +
            ", creditCardId=" + getCreditCardId() +
            "}";
    }
}
