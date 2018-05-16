package com.ip.seatsapp.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Seats.
 */
@Entity
@Table(name = "seats")
public class Seats implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Min(value = 0)
    @Column(name = "seat_index", nullable = false)
    private Integer seat_index;

    @NotNull
    @Column(name = "id_flight", nullable = false)
    private String id_flight;

    @NotNull
    @Min(value = 0)
    @Column(name = "jhi_type", nullable = false)
    private Integer type;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSeat_index() {
        return seat_index;
    }

    public Seats seat_index(Integer seat_index) {
        this.seat_index = seat_index;
        return this;
    }

    public void setSeat_index(Integer seat_index) {
        this.seat_index = seat_index;
    }

    public String getId_flight() {
        return id_flight;
    }

    public Seats id_flight(String id_flight) {
        this.id_flight = id_flight;
        return this;
    }

    public void setId_flight(String id_flight) {
        this.id_flight = id_flight;
    }

    public Integer getType() {
        return type;
    }

    public Seats type(Integer type) {
        this.type = type;
        return this;
    }

    public void setType(Integer type) {
        this.type = type;
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
        Seats seats = (Seats) o;
        if (seats.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), seats.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Seats{" +
            "id=" + getId() +
            ", seat_index=" + getSeat_index() +
            ", id_flight='" + getId_flight() + "'" +
            ", type=" + getType() +
            "}";
    }
}
