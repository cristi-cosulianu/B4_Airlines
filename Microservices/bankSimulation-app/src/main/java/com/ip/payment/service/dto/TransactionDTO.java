package com.ip.payment.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Bank entity.
 */
public class TransactionDTO implements Serializable {

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
    @Min(value = 0)
    private Integer amount;

    @NotNull
    private Boolean isReversed;

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

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    /**
     * @return the isReversed
     */
    public Boolean getIsReversed() {
        return isReversed;
    }

    /**
     * @param isReversed the isReversed to set
     */
    public void setIsReversed(Boolean isReversed) {
        this.isReversed = isReversed;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(number);
    }

    @Override
    public String toString() {
        return "BankDTO{" + ", number='" + getNumber() + "'" + ", expirationYear=" + getExpirationYear()
                + ", expirationMonth=" + getExpirationMonth() + ", name='" + getName() + "'" + ", ccv='" + getCcv()
                + "'" + ", amount=" + getAmount() + "}";
    }
}