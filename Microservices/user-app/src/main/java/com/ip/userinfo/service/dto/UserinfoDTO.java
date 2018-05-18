package com.ip.userinfo.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Userinfo entity.
 */
public class UserinfoDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 18, max = 18)
    private String uid;

    @NotNull
    @Size(min = 13)
    private String cnp;

    @NotNull
    @Size(min = 3, max = 20)
    private String name;

    @NotNull
    @Size(min = 3, max = 60)
    private String prenume;

    @NotNull
    private String adress;

    @NotNull
    private LocalDate dateOfBirth;

    @NotNull
    @Size(min = 5)
    private String phoneNumber;

    @NotNull
    private String idType;

    @NotNull
    @Size(min = 3)
    private String serialNumber;

    @NotNull
    private String emittingCountry;

    @NotNull
    private LocalDate expiringDate;

    @NotNull
    private String loginid;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getCnp() {
        return cnp;
    }

    public void setCnp(String cnp) {
        this.cnp = cnp;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPrenume() {
        return prenume;
    }

    public void setPrenume(String prenume) {
        this.prenume = prenume;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getIdType() {
        return idType;
    }

    public void setIdType(String idType) {
        this.idType = idType;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getEmittingCountry() {
        return emittingCountry;
    }

    public void setEmittingCountry(String emittingCountry) {
        this.emittingCountry = emittingCountry;
    }

    public LocalDate getExpiringDate() {
        return expiringDate;
    }

    public void setExpiringDate(LocalDate expiringDate) {
        this.expiringDate = expiringDate;
    }

    public String getLoginid() {
        return loginid;
    }

    public void setLoginid(String loginid) {
        this.loginid = loginid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        UserinfoDTO userinfoDTO = (UserinfoDTO) o;
        if(userinfoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userinfoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserinfoDTO{" +
            "id=" + getId() +
            ", uid='" + getUid() + "'" +
            ", cnp='" + getCnp() + "'" +
            ", name='" + getName() + "'" +
            ", prenume='" + getPrenume() + "'" +
            ", adress='" + getAdress() + "'" +
            ", dateOfBirth='" + getDateOfBirth() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", idType='" + getIdType() + "'" +
            ", serialNumber='" + getSerialNumber() + "'" +
            ", emittingCountry='" + getEmittingCountry() + "'" +
            ", expiringDate='" + getExpiringDate() + "'" +
            ", loginid='" + getLoginid() + "'" +
            "}";
    }
}
