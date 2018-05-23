package com.ip.payment.web.rest;

import com.ip.payment.PaymentApp;

import com.ip.payment.domain.OrderHistory;
import com.ip.payment.repository.OrderHistoryRepository;
import com.ip.payment.service.OrderHistoryService;
import com.ip.payment.service.dto.OrderHistoryDTO;
import com.ip.payment.service.mapper.OrderHistoryMapper;
import com.ip.payment.web.rest.errors.ExceptionTranslator;

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

import static com.ip.payment.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the OrderHistoryResource REST controller.
 *
 * @see OrderHistoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PaymentApp.class)
public class OrderHistoryResourceIntTest {

    private static final String DEFAULT_TICKET_USER_ID = "AAAAAAAAAA";
    private static final String UPDATED_TICKET_USER_ID = "BBBBBBBBBB";

    private static final Integer DEFAULT_TICKET_FLIGHT_ID = 1;
    private static final Integer UPDATED_TICKET_FLIGHT_ID = 2;

    private static final Integer DEFAULT_TICKET_PLANE_TYPE = 1;
    private static final Integer UPDATED_TICKET_PLANE_TYPE = 2;

    private static final Float DEFAULT_TICKET_PRICE = 0F;
    private static final Float UPDATED_TICKET_PRICE = 1F;

    private static final Long DEFAULT_CREDIT_CARD_ID = 1L;
    private static final Long UPDATED_CREDIT_CARD_ID = 2L;

    @Autowired
    private OrderHistoryRepository orderHistoryRepository;

    @Autowired
    private OrderHistoryMapper orderHistoryMapper;

    @Autowired
    private OrderHistoryService orderHistoryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOrderHistoryMockMvc;

    private OrderHistory orderHistory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrderHistoryResource orderHistoryResource = new OrderHistoryResource(orderHistoryService);
        this.restOrderHistoryMockMvc = MockMvcBuilders.standaloneSetup(orderHistoryResource)
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
    public static OrderHistory createEntity(EntityManager em) {
        OrderHistory orderHistory = new OrderHistory()
            .ticketUserId(DEFAULT_TICKET_USER_ID)
            .ticketFlightID(DEFAULT_TICKET_FLIGHT_ID)
            .ticketPlaneType(DEFAULT_TICKET_PLANE_TYPE)
            .ticketPrice(DEFAULT_TICKET_PRICE)
            .creditCardId(DEFAULT_CREDIT_CARD_ID);
        return orderHistory;
    }

    @Before
    public void initTest() {
        orderHistory = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrderHistory() throws Exception {
        int databaseSizeBeforeCreate = orderHistoryRepository.findAll().size();

        // Create the OrderHistory
        OrderHistoryDTO orderHistoryDTO = orderHistoryMapper.toDto(orderHistory);
        restOrderHistoryMockMvc.perform(post("/api/order-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderHistoryDTO)))
            .andExpect(status().isCreated());

        // Validate the OrderHistory in the database
        List<OrderHistory> orderHistoryList = orderHistoryRepository.findAll();
        assertThat(orderHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        OrderHistory testOrderHistory = orderHistoryList.get(orderHistoryList.size() - 1);
        assertThat(testOrderHistory.getTicketUserId()).isEqualTo(DEFAULT_TICKET_USER_ID);
        assertThat(testOrderHistory.getTicketFlightID()).isEqualTo(DEFAULT_TICKET_FLIGHT_ID);
        assertThat(testOrderHistory.getTicketPlaneType()).isEqualTo(DEFAULT_TICKET_PLANE_TYPE);
        assertThat(testOrderHistory.getTicketPrice()).isEqualTo(DEFAULT_TICKET_PRICE);
        assertThat(testOrderHistory.getCreditCardId()).isEqualTo(DEFAULT_CREDIT_CARD_ID);
    }

    @Test
    @Transactional
    public void createOrderHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = orderHistoryRepository.findAll().size();

        // Create the OrderHistory with an existing ID
        orderHistory.setId(1L);
        OrderHistoryDTO orderHistoryDTO = orderHistoryMapper.toDto(orderHistory);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrderHistoryMockMvc.perform(post("/api/order-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderHistoryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the OrderHistory in the database
        List<OrderHistory> orderHistoryList = orderHistoryRepository.findAll();
        assertThat(orderHistoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTicketUserIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = orderHistoryRepository.findAll().size();
        // set the field null
        orderHistory.setTicketUserId(null);

        // Create the OrderHistory, which fails.
        OrderHistoryDTO orderHistoryDTO = orderHistoryMapper.toDto(orderHistory);

        restOrderHistoryMockMvc.perform(post("/api/order-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderHistoryDTO)))
            .andExpect(status().isBadRequest());

        List<OrderHistory> orderHistoryList = orderHistoryRepository.findAll();
        assertThat(orderHistoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTicketFlightIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = orderHistoryRepository.findAll().size();
        // set the field null
        orderHistory.setTicketFlightID(null);

        // Create the OrderHistory, which fails.
        OrderHistoryDTO orderHistoryDTO = orderHistoryMapper.toDto(orderHistory);

        restOrderHistoryMockMvc.perform(post("/api/order-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderHistoryDTO)))
            .andExpect(status().isBadRequest());

        List<OrderHistory> orderHistoryList = orderHistoryRepository.findAll();
        assertThat(orderHistoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTicketPlaneTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = orderHistoryRepository.findAll().size();
        // set the field null
        orderHistory.setTicketPlaneType(null);

        // Create the OrderHistory, which fails.
        OrderHistoryDTO orderHistoryDTO = orderHistoryMapper.toDto(orderHistory);

        restOrderHistoryMockMvc.perform(post("/api/order-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderHistoryDTO)))
            .andExpect(status().isBadRequest());

        List<OrderHistory> orderHistoryList = orderHistoryRepository.findAll();
        assertThat(orderHistoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTicketPriceIsRequired() throws Exception {
        int databaseSizeBeforeTest = orderHistoryRepository.findAll().size();
        // set the field null
        orderHistory.setTicketPrice(null);

        // Create the OrderHistory, which fails.
        OrderHistoryDTO orderHistoryDTO = orderHistoryMapper.toDto(orderHistory);

        restOrderHistoryMockMvc.perform(post("/api/order-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderHistoryDTO)))
            .andExpect(status().isBadRequest());

        List<OrderHistory> orderHistoryList = orderHistoryRepository.findAll();
        assertThat(orderHistoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCreditCardIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = orderHistoryRepository.findAll().size();
        // set the field null
        orderHistory.setCreditCardId(null);

        // Create the OrderHistory, which fails.
        OrderHistoryDTO orderHistoryDTO = orderHistoryMapper.toDto(orderHistory);

        restOrderHistoryMockMvc.perform(post("/api/order-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderHistoryDTO)))
            .andExpect(status().isBadRequest());

        List<OrderHistory> orderHistoryList = orderHistoryRepository.findAll();
        assertThat(orderHistoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOrderHistories() throws Exception {
        // Initialize the database
        orderHistoryRepository.saveAndFlush(orderHistory);

        // Get all the orderHistoryList
        restOrderHistoryMockMvc.perform(get("/api/order-histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orderHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].ticketUserId").value(hasItem(DEFAULT_TICKET_USER_ID.toString())))
            .andExpect(jsonPath("$.[*].ticketFlightID").value(hasItem(DEFAULT_TICKET_FLIGHT_ID)))
            .andExpect(jsonPath("$.[*].ticketPlaneType").value(hasItem(DEFAULT_TICKET_PLANE_TYPE)))
            .andExpect(jsonPath("$.[*].ticketPrice").value(hasItem(DEFAULT_TICKET_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].creditCardId").value(hasItem(DEFAULT_CREDIT_CARD_ID.intValue())));
    }

    @Test
    @Transactional
    public void getOrderHistory() throws Exception {
        // Initialize the database
        orderHistoryRepository.saveAndFlush(orderHistory);

        // Get the orderHistory
        restOrderHistoryMockMvc.perform(get("/api/order-histories/{id}", orderHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(orderHistory.getId().intValue()))
            .andExpect(jsonPath("$.ticketUserId").value(DEFAULT_TICKET_USER_ID.toString()))
            .andExpect(jsonPath("$.ticketFlightID").value(DEFAULT_TICKET_FLIGHT_ID))
            .andExpect(jsonPath("$.ticketPlaneType").value(DEFAULT_TICKET_PLANE_TYPE))
            .andExpect(jsonPath("$.ticketPrice").value(DEFAULT_TICKET_PRICE.doubleValue()))
            .andExpect(jsonPath("$.creditCardId").value(DEFAULT_CREDIT_CARD_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingOrderHistory() throws Exception {
        // Get the orderHistory
        restOrderHistoryMockMvc.perform(get("/api/order-histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrderHistory() throws Exception {
        // Initialize the database
        orderHistoryRepository.saveAndFlush(orderHistory);
        int databaseSizeBeforeUpdate = orderHistoryRepository.findAll().size();

        // Update the orderHistory
        OrderHistory updatedOrderHistory = orderHistoryRepository.findOne(orderHistory.getId());
        // Disconnect from session so that the updates on updatedOrderHistory are not directly saved in db
        em.detach(updatedOrderHistory);
        updatedOrderHistory
            .ticketUserId(UPDATED_TICKET_USER_ID)
            .ticketFlightID(UPDATED_TICKET_FLIGHT_ID)
            .ticketPlaneType(UPDATED_TICKET_PLANE_TYPE)
            .ticketPrice(UPDATED_TICKET_PRICE)
            .creditCardId(UPDATED_CREDIT_CARD_ID);
        OrderHistoryDTO orderHistoryDTO = orderHistoryMapper.toDto(updatedOrderHistory);

        restOrderHistoryMockMvc.perform(put("/api/order-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderHistoryDTO)))
            .andExpect(status().isOk());

        // Validate the OrderHistory in the database
        List<OrderHistory> orderHistoryList = orderHistoryRepository.findAll();
        assertThat(orderHistoryList).hasSize(databaseSizeBeforeUpdate);
        OrderHistory testOrderHistory = orderHistoryList.get(orderHistoryList.size() - 1);
        assertThat(testOrderHistory.getTicketUserId()).isEqualTo(UPDATED_TICKET_USER_ID);
        assertThat(testOrderHistory.getTicketFlightID()).isEqualTo(UPDATED_TICKET_FLIGHT_ID);
        assertThat(testOrderHistory.getTicketPlaneType()).isEqualTo(UPDATED_TICKET_PLANE_TYPE);
        assertThat(testOrderHistory.getTicketPrice()).isEqualTo(UPDATED_TICKET_PRICE);
        assertThat(testOrderHistory.getCreditCardId()).isEqualTo(UPDATED_CREDIT_CARD_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingOrderHistory() throws Exception {
        int databaseSizeBeforeUpdate = orderHistoryRepository.findAll().size();

        // Create the OrderHistory
        OrderHistoryDTO orderHistoryDTO = orderHistoryMapper.toDto(orderHistory);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOrderHistoryMockMvc.perform(put("/api/order-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderHistoryDTO)))
            .andExpect(status().isCreated());

        // Validate the OrderHistory in the database
        List<OrderHistory> orderHistoryList = orderHistoryRepository.findAll();
        assertThat(orderHistoryList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteOrderHistory() throws Exception {
        // Initialize the database
        orderHistoryRepository.saveAndFlush(orderHistory);
        int databaseSizeBeforeDelete = orderHistoryRepository.findAll().size();

        // Get the orderHistory
        restOrderHistoryMockMvc.perform(delete("/api/order-histories/{id}", orderHistory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OrderHistory> orderHistoryList = orderHistoryRepository.findAll();
        assertThat(orderHistoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderHistory.class);
        OrderHistory orderHistory1 = new OrderHistory();
        orderHistory1.setId(1L);
        OrderHistory orderHistory2 = new OrderHistory();
        orderHistory2.setId(orderHistory1.getId());
        assertThat(orderHistory1).isEqualTo(orderHistory2);
        orderHistory2.setId(2L);
        assertThat(orderHistory1).isNotEqualTo(orderHistory2);
        orderHistory1.setId(null);
        assertThat(orderHistory1).isNotEqualTo(orderHistory2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderHistoryDTO.class);
        OrderHistoryDTO orderHistoryDTO1 = new OrderHistoryDTO();
        orderHistoryDTO1.setId(1L);
        OrderHistoryDTO orderHistoryDTO2 = new OrderHistoryDTO();
        assertThat(orderHistoryDTO1).isNotEqualTo(orderHistoryDTO2);
        orderHistoryDTO2.setId(orderHistoryDTO1.getId());
        assertThat(orderHistoryDTO1).isEqualTo(orderHistoryDTO2);
        orderHistoryDTO2.setId(2L);
        assertThat(orderHistoryDTO1).isNotEqualTo(orderHistoryDTO2);
        orderHistoryDTO1.setId(null);
        assertThat(orderHistoryDTO1).isNotEqualTo(orderHistoryDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(orderHistoryMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(orderHistoryMapper.fromId(null)).isNull();
    }
}
