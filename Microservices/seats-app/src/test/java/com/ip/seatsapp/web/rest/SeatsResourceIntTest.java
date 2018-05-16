package com.ip.seatsapp.web.rest;

import com.ip.seatsapp.SeatsApp;

import com.ip.seatsapp.domain.Seats;
import com.ip.seatsapp.repository.SeatsRepository;
import com.ip.seatsapp.service.SeatsService;
import com.ip.seatsapp.service.dto.SeatsDTO;
import com.ip.seatsapp.service.mapper.SeatsMapper;
import com.ip.seatsapp.web.rest.errors.ExceptionTranslator;

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

import static com.ip.seatsapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SeatsResource REST controller.
 *
 * @see SeatsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SeatsApp.class)
public class SeatsResourceIntTest {

    private static final Integer DEFAULT_SEAT_INDEX = 0;
    private static final Integer UPDATED_SEAT_INDEX = 1;

    private static final String DEFAULT_ID_FLIGHT = "AAAAAAAAAA";
    private static final String UPDATED_ID_FLIGHT = "BBBBBBBBBB";

    private static final Integer DEFAULT_TYPE = 0;
    private static final Integer UPDATED_TYPE = 1;

    @Autowired
    private SeatsRepository seatsRepository;

    @Autowired
    private SeatsMapper seatsMapper;

    @Autowired
    private SeatsService seatsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSeatsMockMvc;

    private Seats seats;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SeatsResource seatsResource = new SeatsResource(seatsService);
        this.restSeatsMockMvc = MockMvcBuilders.standaloneSetup(seatsResource)
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
    public static Seats createEntity(EntityManager em) {
        Seats seats = new Seats()
            .seat_index(DEFAULT_SEAT_INDEX)
            .id_flight(DEFAULT_ID_FLIGHT)
            .type(DEFAULT_TYPE);
        return seats;
    }

    @Before
    public void initTest() {
        seats = createEntity(em);
    }

    @Test
    @Transactional
    public void createSeats() throws Exception {
        int databaseSizeBeforeCreate = seatsRepository.findAll().size();

        // Create the Seats
        SeatsDTO seatsDTO = seatsMapper.toDto(seats);
        restSeatsMockMvc.perform(post("/api/seats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(seatsDTO)))
            .andExpect(status().isCreated());

        // Validate the Seats in the database
        List<Seats> seatsList = seatsRepository.findAll();
        assertThat(seatsList).hasSize(databaseSizeBeforeCreate + 1);
        Seats testSeats = seatsList.get(seatsList.size() - 1);
        assertThat(testSeats.getSeat_index()).isEqualTo(DEFAULT_SEAT_INDEX);
        assertThat(testSeats.getId_flight()).isEqualTo(DEFAULT_ID_FLIGHT);
        assertThat(testSeats.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createSeatsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = seatsRepository.findAll().size();

        // Create the Seats with an existing ID
        seats.setId(1L);
        SeatsDTO seatsDTO = seatsMapper.toDto(seats);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSeatsMockMvc.perform(post("/api/seats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(seatsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Seats in the database
        List<Seats> seatsList = seatsRepository.findAll();
        assertThat(seatsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkSeat_indexIsRequired() throws Exception {
        int databaseSizeBeforeTest = seatsRepository.findAll().size();
        // set the field null
        seats.setSeat_index(null);

        // Create the Seats, which fails.
        SeatsDTO seatsDTO = seatsMapper.toDto(seats);

        restSeatsMockMvc.perform(post("/api/seats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(seatsDTO)))
            .andExpect(status().isBadRequest());

        List<Seats> seatsList = seatsRepository.findAll();
        assertThat(seatsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkId_flightIsRequired() throws Exception {
        int databaseSizeBeforeTest = seatsRepository.findAll().size();
        // set the field null
        seats.setId_flight(null);

        // Create the Seats, which fails.
        SeatsDTO seatsDTO = seatsMapper.toDto(seats);

        restSeatsMockMvc.perform(post("/api/seats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(seatsDTO)))
            .andExpect(status().isBadRequest());

        List<Seats> seatsList = seatsRepository.findAll();
        assertThat(seatsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = seatsRepository.findAll().size();
        // set the field null
        seats.setType(null);

        // Create the Seats, which fails.
        SeatsDTO seatsDTO = seatsMapper.toDto(seats);

        restSeatsMockMvc.perform(post("/api/seats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(seatsDTO)))
            .andExpect(status().isBadRequest());

        List<Seats> seatsList = seatsRepository.findAll();
        assertThat(seatsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSeats() throws Exception {
        // Initialize the database
        seatsRepository.saveAndFlush(seats);

        // Get all the seatsList
        restSeatsMockMvc.perform(get("/api/seats?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(seats.getId().intValue())))
            .andExpect(jsonPath("$.[*].seat_index").value(hasItem(DEFAULT_SEAT_INDEX)))
            .andExpect(jsonPath("$.[*].id_flight").value(hasItem(DEFAULT_ID_FLIGHT.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)));
    }

    @Test
    @Transactional
    public void getSeats() throws Exception {
        // Initialize the database
        seatsRepository.saveAndFlush(seats);

        // Get the seats
        restSeatsMockMvc.perform(get("/api/seats/{id}", seats.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(seats.getId().intValue()))
            .andExpect(jsonPath("$.seat_index").value(DEFAULT_SEAT_INDEX))
            .andExpect(jsonPath("$.id_flight").value(DEFAULT_ID_FLIGHT.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE));
    }

    @Test
    @Transactional
    public void getNonExistingSeats() throws Exception {
        // Get the seats
        restSeatsMockMvc.perform(get("/api/seats/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSeats() throws Exception {
        // Initialize the database
        seatsRepository.saveAndFlush(seats);
        int databaseSizeBeforeUpdate = seatsRepository.findAll().size();

        // Update the seats
        Seats updatedSeats = seatsRepository.findOne(seats.getId());
        // Disconnect from session so that the updates on updatedSeats are not directly saved in db
        em.detach(updatedSeats);
        updatedSeats
            .seat_index(UPDATED_SEAT_INDEX)
            .id_flight(UPDATED_ID_FLIGHT)
            .type(UPDATED_TYPE);
        SeatsDTO seatsDTO = seatsMapper.toDto(updatedSeats);

        restSeatsMockMvc.perform(put("/api/seats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(seatsDTO)))
            .andExpect(status().isOk());

        // Validate the Seats in the database
        List<Seats> seatsList = seatsRepository.findAll();
        assertThat(seatsList).hasSize(databaseSizeBeforeUpdate);
        Seats testSeats = seatsList.get(seatsList.size() - 1);
        assertThat(testSeats.getSeat_index()).isEqualTo(UPDATED_SEAT_INDEX);
        assertThat(testSeats.getId_flight()).isEqualTo(UPDATED_ID_FLIGHT);
        assertThat(testSeats.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingSeats() throws Exception {
        int databaseSizeBeforeUpdate = seatsRepository.findAll().size();

        // Create the Seats
        SeatsDTO seatsDTO = seatsMapper.toDto(seats);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSeatsMockMvc.perform(put("/api/seats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(seatsDTO)))
            .andExpect(status().isCreated());

        // Validate the Seats in the database
        List<Seats> seatsList = seatsRepository.findAll();
        assertThat(seatsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSeats() throws Exception {
        // Initialize the database
        seatsRepository.saveAndFlush(seats);
        int databaseSizeBeforeDelete = seatsRepository.findAll().size();

        // Get the seats
        restSeatsMockMvc.perform(delete("/api/seats/{id}", seats.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Seats> seatsList = seatsRepository.findAll();
        assertThat(seatsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Seats.class);
        Seats seats1 = new Seats();
        seats1.setId(1L);
        Seats seats2 = new Seats();
        seats2.setId(seats1.getId());
        assertThat(seats1).isEqualTo(seats2);
        seats2.setId(2L);
        assertThat(seats1).isNotEqualTo(seats2);
        seats1.setId(null);
        assertThat(seats1).isNotEqualTo(seats2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SeatsDTO.class);
        SeatsDTO seatsDTO1 = new SeatsDTO();
        seatsDTO1.setId(1L);
        SeatsDTO seatsDTO2 = new SeatsDTO();
        assertThat(seatsDTO1).isNotEqualTo(seatsDTO2);
        seatsDTO2.setId(seatsDTO1.getId());
        assertThat(seatsDTO1).isEqualTo(seatsDTO2);
        seatsDTO2.setId(2L);
        assertThat(seatsDTO1).isNotEqualTo(seatsDTO2);
        seatsDTO1.setId(null);
        assertThat(seatsDTO1).isNotEqualTo(seatsDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(seatsMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(seatsMapper.fromId(null)).isNull();
    }
}
