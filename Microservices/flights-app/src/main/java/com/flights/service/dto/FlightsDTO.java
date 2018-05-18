package com.flights.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Flights entity.
 */
public class FlightsDTO implements Serializable {

    private Long id;

    @NotNull
    private String departure;

    @NotNull
    private String arrival;

    @NotNull
    @Size(min = 5, max = 5)
    private String departureTime;

    @NotNull
    @Size(min = 5, max = 5)
    private String arrivalTime;

    @NotNull
    @DecimalMin(value = "0")
    private Double priceRangeMin;

    @NotNull
    @DecimalMin(value = "1")
    private Double priceRangeMax;

    @NotNull
    private String company;

    @NotNull
    @Min(value = 1)
    @Max(value = 5)
    private Integer rating;

    @NotNull
    private Integer planeType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDeparture() {
        return departure;
    }

    public void setDeparture(String departure) {
        this.departure = departure;
    }

    public String getArrival() {
        return arrival;
    }

    public void setArrival(String arrival) {
        this.arrival = arrival;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public Double getPriceRangeMin() {
        return priceRangeMin;
    }

    public void setPriceRangeMin(Double priceRangeMin) {
        this.priceRangeMin = priceRangeMin;
    }

    public Double getPriceRangeMax() {
        return priceRangeMax;
    }

    public void setPriceRangeMax(Double priceRangeMax) {
        this.priceRangeMax = priceRangeMax;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Integer getPlaneType() {
        return planeType;
    }

    public void setPlaneType(Integer planeType) {
        this.planeType = planeType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FlightsDTO flightsDTO = (FlightsDTO) o;
        if(flightsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), flightsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FlightsDTO{" +
            "id=" + getId() +
            ", departure='" + getDeparture() + "'" +
            ", arrival='" + getArrival() + "'" +
            ", departureTime='" + getDepartureTime() + "'" +
            ", arrivalTime='" + getArrivalTime() + "'" +
            ", priceRangeMin=" + getPriceRangeMin() +
            ", priceRangeMax=" + getPriceRangeMax() +
            ", company='" + getCompany() + "'" +
            ", rating=" + getRating() +
            ", planeType=" + getPlaneType() +
            "}";
    }
}
