package com.ip.payment.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import com.ip.payment.domain.enumeration.CardType;

/**
 * A Card.
 */
@Entity
@Table(name = "card")
public class Card implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(min = 16, max = 16)
    @Pattern(regexp = "[0-9]+")
    @Column(name = "jhi_number", length = 16, nullable = false)
    private String number;

    @NotNull
    @Column(name = "expiration_month", nullable = false)
    private Integer expirationMonth;

    @NotNull
    @Column(name = "expiration_year", nullable = false)
    private Integer expirationYear;

    @NotNull
    @Pattern(regexp = "[a-zA-Z ]+")
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Pattern(regexp = "[0-9][0-9][0-9]")
    @Column(name = "ccv", nullable = false)
    private String ccv;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "card_type", nullable = false)
    private CardType cardType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public Card number(String number) {
        this.number = number;
        return this;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Integer getExpirationMonth() {
        return expirationMonth;
    }

    public Card expirationMonth(Integer expirationMonth) {
        this.expirationMonth = expirationMonth;
        return this;
    }

    public void setExpirationMonth(Integer expirationMonth) {
        this.expirationMonth = expirationMonth;
    }

    public Integer getExpirationYear() {
        return expirationYear;
    }

    public Card expirationYear(Integer expirationYear) {
        this.expirationYear = expirationYear;
        return this;
    }

    public void setExpirationYear(Integer expirationYear) {
        this.expirationYear = expirationYear;
    }

    public String getName() {
        return name;
    }

    public Card name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCcv() {
        return ccv;
    }

    public Card ccv(String ccv) {
        this.ccv = ccv;
        return this;
    }

    public void setCcv(String ccv) {
        this.ccv = ccv;
    }

    public CardType getCardType() {
        return cardType;
    }

    public Card cardType(CardType cardType) {
        this.cardType = cardType;
        return this;
    }

    public void setCardType(CardType cardType) {
        this.cardType = cardType;
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
        Card card = (Card) o;
        if (card.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), card.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Card{" +
            "id=" + getId() +
            ", number='" + getNumber() + "'" +
            ", expirationMonth=" + getExpirationMonth() +
            ", expirationYear=" + getExpirationYear() +
            ", name='" + getName() + "'" +
            ", ccv='" + getCcv() + "'" +
            ", cardType='" + getCardType() + "'" +
            "}";
    }
}
