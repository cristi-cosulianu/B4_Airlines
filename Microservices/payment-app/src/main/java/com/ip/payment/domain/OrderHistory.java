package com.ip.payment.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A OrderHistory.
 */
@Entity
@Table(name = "order_history")
public class OrderHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "ticket_user_id", nullable = false)
    private String ticketUserId;

    @NotNull
    @Column(name = "ticket_flight_id", nullable = false)
    private Integer ticketFlightID;

    @NotNull
    @Column(name = "ticket_plane_type", nullable = false)
    private Integer ticketPlaneType;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "ticket_price", nullable = false)
    private Float ticketPrice;

    @NotNull
    @Column(name = "credit_card_id", nullable = false)
    private Long creditCardId;

    @Column(name = "blind")
    private Boolean blind;

    @Column(name = "deaf")
    private Boolean deaf;

    @Column(name = "cognitive")
    private Boolean cognitive;

    @Column(name = "other")
    private Boolean other;

    @Column(name = "animal_service")
    private Boolean animalService;

    @OneToOne
    @JoinColumn(unique = true)
    private Card card;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTicketUserId() {
        return ticketUserId;
    }

    public OrderHistory ticketUserId(String ticketUserId) {
        this.ticketUserId = ticketUserId;
        return this;
    }

    public void setTicketUserId(String ticketUserId) {
        this.ticketUserId = ticketUserId;
    }

    public Integer getTicketFlightID() {
        return ticketFlightID;
    }

    public OrderHistory ticketFlightID(Integer ticketFlightID) {
        this.ticketFlightID = ticketFlightID;
        return this;
    }

    public void setTicketFlightID(Integer ticketFlightID) {
        this.ticketFlightID = ticketFlightID;
    }

    public Integer getTicketPlaneType() {
        return ticketPlaneType;
    }

    public OrderHistory ticketPlaneType(Integer ticketPlaneType) {
        this.ticketPlaneType = ticketPlaneType;
        return this;
    }

    public void setTicketPlaneType(Integer ticketPlaneType) {
        this.ticketPlaneType = ticketPlaneType;
    }

    public Float getTicketPrice() {
        return ticketPrice;
    }

    public OrderHistory ticketPrice(Float ticketPrice) {
        this.ticketPrice = ticketPrice;
        return this;
    }

    public void setTicketPrice(Float ticketPrice) {
        this.ticketPrice = ticketPrice;
    }

    public Long getCreditCardId() {
        return creditCardId;
    }

    public OrderHistory creditCardId(Long creditCardId) {
        this.creditCardId = creditCardId;
        return this;
    }

    public void setCreditCardId(Long creditCardId) {
        this.creditCardId = creditCardId;
    }

    public Boolean isBlind() {
        return blind;
    }

    public OrderHistory blind(Boolean blind) {
        this.blind = blind;
        return this;
    }

    public void setBlind(Boolean blind) {
        this.blind = blind;
    }

    public Boolean isDeaf() {
        return deaf;
    }

    public OrderHistory deaf(Boolean deaf) {
        this.deaf = deaf;
        return this;
    }

    public void setDeaf(Boolean deaf) {
        this.deaf = deaf;
    }

    public Boolean isCognitive() {
        return cognitive;
    }

    public OrderHistory cognitive(Boolean cognitive) {
        this.cognitive = cognitive;
        return this;
    }

    public void setCognitive(Boolean cognitive) {
        this.cognitive = cognitive;
    }

    public Boolean isOther() {
        return other;
    }

    public OrderHistory other(Boolean other) {
        this.other = other;
        return this;
    }

    public void setOther(Boolean other) {
        this.other = other;
    }

    public Boolean isAnimalService() {
        return animalService;
    }

    public OrderHistory animalService(Boolean animalService) {
        this.animalService = animalService;
        return this;
    }

    public void setAnimalService(Boolean animalService) {
        this.animalService = animalService;
    }

    public Card getCard() {
        return card;
    }

    public OrderHistory card(Card card) {
        this.card = card;
        return this;
    }

    public void setCard(Card card) {
        this.card = card;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        OrderHistory orderHistory = (OrderHistory) o;
        if (orderHistory.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), orderHistory.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrderHistory{" +
            "id=" + getId() +
            ", ticketUserId='" + getTicketUserId() + "'" +
            ", ticketFlightID=" + getTicketFlightID() +
            ", ticketPlaneType=" + getTicketPlaneType() +
            ", ticketPrice=" + getTicketPrice() +
            ", creditCardId=" + getCreditCardId() +
            ", blind='" + isBlind() + "'" +
            ", deaf='" + isDeaf() + "'" +
            ", cognitive='" + isCognitive() + "'" +
            ", other='" + isOther() + "'" +
            ", animalService='" + isAnimalService() + "'" +
            "}";
    }

    public Float get
}
