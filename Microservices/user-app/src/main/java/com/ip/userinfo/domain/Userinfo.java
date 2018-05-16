package com.ip.userinfo.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Userinfo.
 */
@Entity
@Table(name = "userinfo")
public class Userinfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(min = 18, max = 18)
    @Column(name = "jhi_uid", length = 18, nullable = false)
    private String uid;

    @NotNull
    @Size(min = 13)
    @Column(name = "cnp", nullable = false)
    private String cnp;

    @NotNull
    @Size(min = 3, max = 20)
    @Column(name = "name", length = 20, nullable = false)
    private String name;

    @NotNull
    @Size(min = 3, max = 60)
    @Column(name = "prenume", length = 60, nullable = false)
    private String prenume;

    @NotNull
    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @NotNull
    @Column(name = "adress", nullable = false)
    private String adress;

    @NotNull
    @Size(min = 5)
    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @NotNull
    @Column(name = "id_type", nullable = false)
    private String idType;

    @NotNull
    @Size(min = 3)
    @Column(name = "serial_number", nullable = false)
    private String serialNumber;

    @NotNull
    @Column(name = "emitting_country", nullable = false)
    private String emittingCountry;

    @NotNull
    @Column(name = "expiring_date", nullable = false)
    private LocalDate expiringDate;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUid() {
        return uid;
    }

    public Userinfo uid(String uid) {
        this.uid = uid;
        return this;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getCnp() {
        return cnp;
    }

    public Userinfo cnp(String cnp) {
        this.cnp = cnp;
        return this;
    }

    public void setCnp(String cnp) {
        this.cnp = cnp;
    }

    public String getName() {
        return name;
    }

    public Userinfo name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPrenume() {
        return prenume;
    }

    public Userinfo prenume(String prenume) {
        this.prenume = prenume;
        return this;
    }

    public void setPrenume(String prenume) {
        this.prenume = prenume;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public Userinfo dateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
        return this;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getAdress() {
        return adress;
    }

    public Userinfo adress(String adress) {
        this.adress = adress;
        return this;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Userinfo phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getIdType() {
        return idType;
    }

    public Userinfo idType(String idType) {
        this.idType = idType;
        return this;
    }

    public void setIdType(String idType) {
        this.idType = idType;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public Userinfo serialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
        return this;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getEmittingCountry() {
        return emittingCountry;
    }

    public Userinfo emittingCountry(String emittingCountry) {
        this.emittingCountry = emittingCountry;
        return this;
    }

    public void setEmittingCountry(String emittingCountry) {
        this.emittingCountry = emittingCountry;
    }

    public LocalDate getExpiringDate() {
        return expiringDate;
    }

    public Userinfo expiringDate(LocalDate expiringDate) {
        this.expiringDate = expiringDate;
        return this;
    }

    public void setExpiringDate(LocalDate expiringDate) {
        this.expiringDate = expiringDate;
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
        Userinfo userinfo = (Userinfo) o;
        if (userinfo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userinfo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Userinfo{" +
            "id=" + getId() +
            ", uid='" + getUid() + "'" +
            ", cnp='" + getCnp() + "'" +
            ", name='" + getName() + "'" +
            ", prenume='" + getPrenume() + "'" +
            ", dateOfBirth='" + getDateOfBirth() + "'" +
            ", adress='" + getAdress() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", idType='" + getIdType() + "'" +
            ", serialNumber='" + getSerialNumber() + "'" +
            ", emittingCountry='" + getEmittingCountry() + "'" +
            ", expiringDate='" + getExpiringDate() + "'" +
            "}";
    }
}
