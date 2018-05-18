package com.flights.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Flights.
 */
@Entity
@Table(name = "flights")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Flights implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(min = 1)
    @Column(name = "departure", nullable = false)
    private String departure;

    @NotNull
    @Size(min = 1)
    @Column(name = "arrival", nullable = false)
    private String arrival;

    @NotNull
    @Size(min = 5, max = 5)
    @Column(name = "departure_time", length = 5, nullable = false)
    private String departureTime;

    @NotNull
    @Size(min = 5, max = 5)
    @Column(name = "arrival_time", length = 5, nullable = false)
    private String arrivalTime;

    @NotNull
    @DecimalMin(value = "100")
    @Column(name = "price_range_min", nullable = false)
    private Double priceRangeMin;

    @NotNull
    @DecimalMin(value = "101")
    @Column(name = "price_range_max", nullable = false)
    private Double priceRangeMax;

    @Column(name = "avaible_seats")
    private Long avaibleSeats;

    @Column(name = "company")
    private String company;

    @Column(name = "rating")
    private Integer rating;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDeparture() {
        return departure;
    }

    public Flights departure(String departure) {
        this.departure = departure;
        return this;
    }

    public void setDeparture(String departure) {
        this.departure = departure;
    }

    public String getArrival() {
        return arrival;
    }

    public Flights arrival(String arrival) {
        this.arrival = arrival;
        return this;
    }

    public void setArrival(String arrival) {
        this.arrival = arrival;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public Flights departureTime(String departureTime) {
        this.departureTime = departureTime;
        return this;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public Flights arrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
        return this;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public Double getPriceRangeMin() {
        return priceRangeMin;
    }

    public Flights priceRangeMin(Double priceRangeMin) {
        this.priceRangeMin = priceRangeMin;
        return this;
    }

    public void setPriceRangeMin(Double priceRangeMin) {
        this.priceRangeMin = priceRangeMin;
    }

    public Double getPriceRangeMax() {
        return priceRangeMax;
    }

    public Flights priceRangeMax(Double priceRangeMax) {
        this.priceRangeMax = priceRangeMax;
        return this;
    }

    public void setPriceRangeMax(Double priceRangeMax) {
        this.priceRangeMax = priceRangeMax;
    }

    public Long getAvaibleSeats() {
        return avaibleSeats;
    }

    public Flights avaibleSeats(Long avaibleSeats) {
        this.avaibleSeats = avaibleSeats;
        return this;
    }

    public void setAvaibleSeats(Long avaibleSeats) {
        this.avaibleSeats = avaibleSeats;
    }

    public String getCompany() {
        return company;
    }

    public Flights company(String company) {
        this.company = company;
        return this;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public Integer getRating() {
        return rating;
    }

    public Flights rating(Integer rating) {
        this.rating = rating;
        return this;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
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
        Flights flights = (Flights) o;
        if (flights.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), flights.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Flights{" +
            "id=" + getId() +
            ", departure='" + getDeparture() + "'" +
            ", arrival='" + getArrival() + "'" +
            ", departureTime='" + getDepartureTime() + "'" +
            ", arrivalTime='" + getArrivalTime() + "'" +
            ", priceRangeMin=" + getPriceRangeMin() +
            ", priceRangeMax=" + getPriceRangeMax() +
            ", avaibleSeats=" + getAvaibleSeats() +
            ", company='" + getCompany() + "'" +
            ", rating=" + getRating() +
            "}";
    }
}
