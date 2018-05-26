package com.ip.payment.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Bank entity.
 */
public class BankDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 16, max = 16)
    @Pattern(regexp = "[0-9]+")
    private String number;

    @NotNull
    private Integer expirationYear;

    @NotNull
    @Min(value = 1)
    @Max(value = 12)
    private Integer expirationMonth;

    @NotNull
    @Pattern(regexp = "[a-zA-Z ]+")
    private String name;

    @NotNull
    @Pattern(regexp = "[0-9][0-9][0-9]")
    private String ccv;

    @NotNull
    private String currency;

    @NotNull
    @Min(value = 0)
    private Integer amount;

    @NotNull
    private Boolean expired;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Integer getExpirationYear() {
        return expirationYear;
    }

    public void setExpirationYear(Integer expirationYear) {
        this.expirationYear = expirationYear;
    }

    public Integer getExpirationMonth() {
        return expirationMonth;
    }

    public void setExpirationMonth(Integer expirationMonth) {
        this.expirationMonth = expirationMonth;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCcv() {
        return ccv;
    }

    public void setCcv(String ccv) {
        this.ccv = ccv;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Boolean isExpired() {
        return expired;
    }

    public void setExpired(Boolean expired) {
        this.expired = expired;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BankDTO bankDTO = (BankDTO) o;
        if(bankDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bankDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BankDTO{" +
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
}
