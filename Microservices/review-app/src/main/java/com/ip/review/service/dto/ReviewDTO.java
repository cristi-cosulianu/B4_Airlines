package com.ip.review.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Review entity.
 */
public class ReviewDTO implements Serializable {

    private Long id;

    @NotNull
    private Long flightId;

    @NotNull
    @Size(min = 5, max = 1000)
    private String description;

    @NotNull
    private Long userId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getFlightId() {
        return flightId;
    }

    public void setFlightId(Long flightId) {
        this.flightId = flightId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ReviewDTO reviewDTO = (ReviewDTO) o;
        if(reviewDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), reviewDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ReviewDTO{" +
            "id=" + getId() +
            ", flightId=" + getFlightId() +
            ", description='" + getDescription() + "'" +
            ", userId=" + getUserId() +
            "}";
    }
}
