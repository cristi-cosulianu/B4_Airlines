package com.ip.payment.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Bank.
 */
@Entity
@Table(name = "bank")
public class Bank implements Serializable {

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
    @Column(name = "expiration_year", nullable = false)
    private Integer expirationYear;

    @NotNull
    @Min(value = 1)
    @Max(value = 12)
    @Column(name = "expiration_month", nullable = false)
    private Integer expirationMonth;

    @NotNull
    @Pattern(regexp = "[a-zA-Z ]+")
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Pattern(regexp = "[0-9][0-9][0-9]")
    @Column(name = "ccv", nullable = false)
    private String ccv;

    @NotNull
    @Column(name = "currency", nullable = false)
    private String currency;

    @NotNull
    @Min(value = 0)
    @Column(name = "amount", nullable = false)
    private Integer amount;

    @NotNull
    @Column(name = "expired", nullable = false)
    private Boolean expired;

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

    public Bank number(String number) {
        this.number = number;
        return this;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Integer getExpirationYear() {
        return expirationYear;
    }

    public Bank expirationYear(Integer expirationYear) {
        this.expirationYear = expirationYear;
        return this;
    }

    public void setExpirationYear(Integer expirationYear) {
        this.expirationYear = expirationYear;
    }

    public Integer getExpirationMonth() {
        return expirationMonth;
    }

    public Bank expirationMonth(Integer expirationMonth) {
        this.expirationMonth = expirationMonth;
        return this;
    }

    public void setExpirationMonth(Integer expirationMonth) {
        this.expirationMonth = expirationMonth;
    }

    public String getName() {
        return name;
    }

    public Bank name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCcv() {
        return ccv;
    }

    public Bank ccv(String ccv) {
        this.ccv = ccv;
        return this;
    }

    public void setCcv(String ccv) {
        this.ccv = ccv;
    }

    public String getCurrency() {
        return currency;
    }

    public Bank currency(String currency) {
        this.currency = currency;
        return this;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Integer getAmount() {
        return amount;
    }

    public Bank amount(Integer amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Boolean isExpired() {
        return expired;
    }

    public Bank expired(Boolean expired) {
        this.expired = expired;
        return this;
    }

    public void setExpired(Boolean expired) {
        this.expired = expired;
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
        Bank bank = (Bank) o;
        if (bank.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bank.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Bank{" +
            "id=" + getId() +
            ", number='" + getNumber() + "'" +
            ", expirationYear=" + getExpirationYear() +
            ", expirationMonth=" + getExpirationMonth() +
            ", name='" + getName() + "'" +
            ", ccv='" + getCcv() + "'" +
            ", currency='" + getCurrency() + "'" +
            ", amount=" + getAmount() +
            ", expired='" + isExpired() + "'" +
            "}";
    }

    @Override
    public Bank clone() {
        try {
          return (Bank) super.clone();
        } catch (CloneNotSupportedException e) {
          System.out.println("Cloning not allowed.");
          return this;
        }
    }
}
