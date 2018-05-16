package com.ip.seatsapp.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Seats entity.
 */
public class SeatsDTO implements Serializable {

    private Long id;

    @NotNull
    @Min(value = 0)
    private Integer seat_index;

    @NotNull
    private String id_flight;

    @NotNull
    @Min(value = 0)
    private Integer type;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSeat_index() {
        return seat_index;
    }

    public void setSeat_index(Integer seat_index) {
        this.seat_index = seat_index;
    }

    public String getId_flight() {
        return id_flight;
    }

    public void setId_flight(String id_flight) {
        this.id_flight = id_flight;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SeatsDTO seatsDTO = (SeatsDTO) o;
        if(seatsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), seatsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SeatsDTO{" +
            "id=" + getId() +
            ", seat_index=" + getSeat_index() +
            ", id_flight='" + getId_flight() + "'" +
            ", type=" + getType() +
            "}";
    }
}
