package com.flights.web.rest;

import com.flights.FlightsApp;

import com.flights.domain.Flights;
import com.flights.repository.FlightsRepository;
import com.flights.service.FlightsService;
import com.flights.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.flights.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FlightsResource REST controller.
 *
 * @see FlightsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FlightsApp.class)
public class FlightsResourceIntTest {

    private static final String DEFAULT_DEPARTURE = "AAAAAAAAAA";
    private static final String UPDATED_DEPARTURE = "BBBBBBBBBB";

    private static final String DEFAULT_ARRIVAL = "AAAAAAAAAA";
    private static final String UPDATED_ARRIVAL = "BBBBBBBBBB";

    private static final String DEFAULT_DEPARTURE_TIME = "AAAAA";
    private static final String UPDATED_DEPARTURE_TIME = "BBBBB";

    private static final String DEFAULT_ARRIVAL_TIME = "AAAAA";
    private static final String UPDATED_ARRIVAL_TIME = "BBBBB";

    private static final Double DEFAULT_PRICE_RANGE_MIN = 100D;
    private static final Double UPDATED_PRICE_RANGE_MIN = 101D;

    private static final Double DEFAULT_PRICE_RANGE_MAX = 101D;
    private static final Double UPDATED_PRICE_RANGE_MAX = 102D;

    private static final Long DEFAULT_AVAIBLE_SEATS = 1L;
    private static final Long UPDATED_AVAIBLE_SEATS = 2L;

    private static final String DEFAULT_COMPANY = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY = "BBBBBBBBBB";

    private static final Integer DEFAULT_RATING = 1;
    private static final Integer UPDATED_RATING = 2;

    @Autowired
    private FlightsRepository flightsRepository;

    @Autowired
    private FlightsService flightsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFlightsMockMvc;

    private Flights flights;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FlightsResource flightsResource = new FlightsResource(flightsService);
        this.restFlightsMockMvc = MockMvcBuilders.standaloneSetup(flightsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Flights createEntity(EntityManager em) {
        Flights flights = new Flights()
            .departure(DEFAULT_DEPARTURE)
            .arrival(DEFAULT_ARRIVAL)
            .departureTime(DEFAULT_DEPARTURE_TIME)
            .arrivalTime(DEFAULT_ARRIVAL_TIME)
            .priceRangeMin(DEFAULT_PRICE_RANGE_MIN)
            .priceRangeMax(DEFAULT_PRICE_RANGE_MAX)
            .avaibleSeats(DEFAULT_AVAIBLE_SEATS)
            .company(DEFAULT_COMPANY)
            .rating(DEFAULT_RATING);
        return flights;
    }

    @Before
    public void initTest() {
        flights = createEntity(em);
    }

    @Test
    @Transactional
    public void createFlights() throws Exception {
        int databaseSizeBeforeCreate = flightsRepository.findAll().size();

        // Create the Flights
        restFlightsMockMvc.perform(post("/api/flights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flights)))
            .andExpect(status().isCreated());

        // Validate the Flights in the database
        List<Flights> flightsList = flightsRepository.findAll();
        assertThat(flightsList).hasSize(databaseSizeBeforeCreate + 1);
        Flights testFlights = flightsList.get(flightsList.size() - 1);
        assertThat(testFlights.getDeparture()).isEqualTo(DEFAULT_DEPARTURE);
        assertThat(testFlights.getArrival()).isEqualTo(DEFAULT_ARRIVAL);
        assertThat(testFlights.getDepartureTime()).isEqualTo(DEFAULT_DEPARTURE_TIME);
        assertThat(testFlights.getArrivalTime()).isEqualTo(DEFAULT_ARRIVAL_TIME);
        assertThat(testFlights.getPriceRangeMin()).isEqualTo(DEFAULT_PRICE_RANGE_MIN);
        assertThat(testFlights.getPriceRangeMax()).isEqualTo(DEFAULT_PRICE_RANGE_MAX);
        assertThat(testFlights.getAvaibleSeats()).isEqualTo(DEFAULT_AVAIBLE_SEATS);
        assertThat(testFlights.getCompany()).isEqualTo(DEFAULT_COMPANY);
        assertThat(testFlights.getRating()).isEqualTo(DEFAULT_RATING);
    }

    @Test
    @Transactional
    public void createFlightsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = flightsRepository.findAll().size();

        // Create the Flights with an existing ID
        flights.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFlightsMockMvc.perform(post("/api/flights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flights)))
            .andExpect(status().isBadRequest());

        // Validate the Flights in the database
        List<Flights> flightsList = flightsRepository.findAll();
        assertThat(flightsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDepartureIsRequired() throws Exception {
        int databaseSizeBeforeTest = flightsRepository.findAll().size();
        // set the field null
        flights.setDeparture(null);

        // Create the Flights, which fails.

        restFlightsMockMvc.perform(post("/api/flights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flights)))
            .andExpect(status().isBadRequest());

        List<Flights> flightsList = flightsRepository.findAll();
        assertThat(flightsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkArrivalIsRequired() throws Exception {
        int databaseSizeBeforeTest = flightsRepository.findAll().size();
        // set the field null
        flights.setArrival(null);

        // Create the Flights, which fails.

        restFlightsMockMvc.perform(post("/api/flights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flights)))
            .andExpect(status().isBadRequest());

        List<Flights> flightsList = flightsRepository.findAll();
        assertThat(flightsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDepartureTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = flightsRepository.findAll().size();
        // set the field null
        flights.setDepartureTime(null);

        // Create the Flights, which fails.

        restFlightsMockMvc.perform(post("/api/flights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flights)))
            .andExpect(status().isBadRequest());

        List<Flights> flightsList = flightsRepository.findAll();
        assertThat(flightsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkArrivalTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = flightsRepository.findAll().size();
        // set the field null
        flights.setArrivalTime(null);

        // Create the Flights, which fails.

        restFlightsMockMvc.perform(post("/api/flights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flights)))
            .andExpect(status().isBadRequest());

        List<Flights> flightsList = flightsRepository.findAll();
        assertThat(flightsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPriceRangeMinIsRequired() throws Exception {
        int databaseSizeBeforeTest = flightsRepository.findAll().size();
        // set the field null
        flights.setPriceRangeMin(null);

        // Create the Flights, which fails.

        restFlightsMockMvc.perform(post("/api/flights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flights)))
            .andExpect(status().isBadRequest());

        List<Flights> flightsList = flightsRepository.findAll();
        assertThat(flightsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPriceRangeMaxIsRequired() throws Exception {
        int databaseSizeBeforeTest = flightsRepository.findAll().size();
        // set the field null
        flights.setPriceRangeMax(null);

        // Create the Flights, which fails.

        restFlightsMockMvc.perform(post("/api/flights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flights)))
            .andExpect(status().isBadRequest());

        List<Flights> flightsList = flightsRepository.findAll();
        assertThat(flightsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFlights() throws Exception {
        // Initialize the database
        flightsRepository.saveAndFlush(flights);

        // Get all the flightsList
        restFlightsMockMvc.perform(get("/api/flights?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(flights.getId().intValue())))
            .andExpect(jsonPath("$.[*].departure").value(hasItem(DEFAULT_DEPARTURE.toString())))
            .andExpect(jsonPath("$.[*].arrival").value(hasItem(DEFAULT_ARRIVAL.toString())))
            .andExpect(jsonPath("$.[*].departureTime").value(hasItem(DEFAULT_DEPARTURE_TIME.toString())))
            .andExpect(jsonPath("$.[*].arrivalTime").value(hasItem(DEFAULT_ARRIVAL_TIME.toString())))
            .andExpect(jsonPath("$.[*].priceRangeMin").value(hasItem(DEFAULT_PRICE_RANGE_MIN.doubleValue())))
            .andExpect(jsonPath("$.[*].priceRangeMax").value(hasItem(DEFAULT_PRICE_RANGE_MAX.doubleValue())))
            .andExpect(jsonPath("$.[*].avaibleSeats").value(hasItem(DEFAULT_AVAIBLE_SEATS.intValue())))
            .andExpect(jsonPath("$.[*].company").value(hasItem(DEFAULT_COMPANY.toString())))
            .andExpect(jsonPath("$.[*].rating").value(hasItem(DEFAULT_RATING)));
    }

    @Test
    @Transactional
    public void getFlights() throws Exception {
        // Initialize the database
        flightsRepository.saveAndFlush(flights);

        // Get the flights
        restFlightsMockMvc.perform(get("/api/flights/{id}", flights.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(flights.getId().intValue()))
            .andExpect(jsonPath("$.departure").value(DEFAULT_DEPARTURE.toString()))
            .andExpect(jsonPath("$.arrival").value(DEFAULT_ARRIVAL.toString()))
            .andExpect(jsonPath("$.departureTime").value(DEFAULT_DEPARTURE_TIME.toString()))
            .andExpect(jsonPath("$.arrivalTime").value(DEFAULT_ARRIVAL_TIME.toString()))
            .andExpect(jsonPath("$.priceRangeMin").value(DEFAULT_PRICE_RANGE_MIN.doubleValue()))
            .andExpect(jsonPath("$.priceRangeMax").value(DEFAULT_PRICE_RANGE_MAX.doubleValue()))
            .andExpect(jsonPath("$.avaibleSeats").value(DEFAULT_AVAIBLE_SEATS.intValue()))
            .andExpect(jsonPath("$.company").value(DEFAULT_COMPANY.toString()))
            .andExpect(jsonPath("$.rating").value(DEFAULT_RATING));
    }

    @Test
    @Transactional
    public void getNonExistingFlights() throws Exception {
        // Get the flights
        restFlightsMockMvc.perform(get("/api/flights/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFlights() throws Exception {
        // Initialize the database
        flightsService.save(flights);

        int databaseSizeBeforeUpdate = flightsRepository.findAll().size();

        // Update the flights
        Flights updatedFlights = flightsRepository.findOne(flights.getId());
        // Disconnect from session so that the updates on updatedFlights are not directly saved in db
        em.detach(updatedFlights);
        updatedFlights
            .departure(UPDATED_DEPARTURE)
            .arrival(UPDATED_ARRIVAL)
            .departureTime(UPDATED_DEPARTURE_TIME)
            .arrivalTime(UPDATED_ARRIVAL_TIME)
            .priceRangeMin(UPDATED_PRICE_RANGE_MIN)
            .priceRangeMax(UPDATED_PRICE_RANGE_MAX)
            .avaibleSeats(UPDATED_AVAIBLE_SEATS)
            .company(UPDATED_COMPANY)
            .rating(UPDATED_RATING);

        restFlightsMockMvc.perform(put("/api/flights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFlights)))
            .andExpect(status().isOk());

        // Validate the Flights in the database
        List<Flights> flightsList = flightsRepository.findAll();
        assertThat(flightsList).hasSize(databaseSizeBeforeUpdate);
        Flights testFlights = flightsList.get(flightsList.size() - 1);
        assertThat(testFlights.getDeparture()).isEqualTo(UPDATED_DEPARTURE);
        assertThat(testFlights.getArrival()).isEqualTo(UPDATED_ARRIVAL);
        assertThat(testFlights.getDepartureTime()).isEqualTo(UPDATED_DEPARTURE_TIME);
        assertThat(testFlights.getArrivalTime()).isEqualTo(UPDATED_ARRIVAL_TIME);
        assertThat(testFlights.getPriceRangeMin()).isEqualTo(UPDATED_PRICE_RANGE_MIN);
        assertThat(testFlights.getPriceRangeMax()).isEqualTo(UPDATED_PRICE_RANGE_MAX);
        assertThat(testFlights.getAvaibleSeats()).isEqualTo(UPDATED_AVAIBLE_SEATS);
        assertThat(testFlights.getCompany()).isEqualTo(UPDATED_COMPANY);
        assertThat(testFlights.getRating()).isEqualTo(UPDATED_RATING);
    }

    @Test
    @Transactional
    public void updateNonExistingFlights() throws Exception {
        int databaseSizeBeforeUpdate = flightsRepository.findAll().size();

        // Create the Flights

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFlightsMockMvc.perform(put("/api/flights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flights)))
            .andExpect(status().isCreated());

        // Validate the Flights in the database
        List<Flights> flightsList = flightsRepository.findAll();
        assertThat(flightsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFlights() throws Exception {
        // Initialize the database
        flightsService.save(flights);

        int databaseSizeBeforeDelete = flightsRepository.findAll().size();

        // Get the flights
        restFlightsMockMvc.perform(delete("/api/flights/{id}", flights.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Flights> flightsList = flightsRepository.findAll();
        assertThat(flightsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Flights.class);
        Flights flights1 = new Flights();
        flights1.setId(1L);
        Flights flights2 = new Flights();
        flights2.setId(flights1.getId());
        assertThat(flights1).isEqualTo(flights2);
        flights2.setId(2L);
        assertThat(flights1).isNotEqualTo(flights2);
        flights1.setId(null);
        assertThat(flights1).isNotEqualTo(flights2);
    }
}
