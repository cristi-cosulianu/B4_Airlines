package com.ip.payment.web.rest;

import com.ip.payment.BankSimulationApp;

import com.ip.payment.domain.Bank;
import com.ip.payment.repository.BankRepository;
import com.ip.payment.service.BankService;
import com.ip.payment.service.dto.BankDTO;
import com.ip.payment.service.mapper.BankMapper;
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
 * Test class for the BankResource REST controller.
 *
 * @see BankResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BankSimulationApp.class)
public class BankResourceIntTest {

    private static final String DEFAULT_NUMBER = "91";
    private static final String UPDATED_NUMBER = "6";

    private static final Integer DEFAULT_EXPIRATION_YEAR = 1;
    private static final Integer UPDATED_EXPIRATION_YEAR = 2;

    private static final Integer DEFAULT_EXPIRATION_MONTH = 1;
    private static final Integer UPDATED_EXPIRATION_MONTH = 2;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CCV = "394";
    private static final String UPDATED_CCV = "976";

    private static final String DEFAULT_CURRENCY = "AAAAAAAAAA";
    private static final String UPDATED_CURRENCY = "BBBBBBBBBB";

    private static final Integer DEFAULT_AMOUNT = 0;
    private static final Integer UPDATED_AMOUNT = 1;

    private static final Boolean DEFAULT_EXPIRED = false;
    private static final Boolean UPDATED_EXPIRED = true;

    @Autowired
    private BankRepository bankRepository;

    @Autowired
    private BankMapper bankMapper;

    @Autowired
    private BankService bankService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBankMockMvc;

    private Bank bank;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BankResource bankResource = new BankResource(bankService);
        this.restBankMockMvc = MockMvcBuilders.standaloneSetup(bankResource)
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
    public static Bank createEntity(EntityManager em) {
        Bank bank = new Bank()
            .number(DEFAULT_NUMBER)
            .expirationYear(DEFAULT_EXPIRATION_YEAR)
            .expirationMonth(DEFAULT_EXPIRATION_MONTH)
            .name(DEFAULT_NAME)
            .ccv(DEFAULT_CCV)
            .currency(DEFAULT_CURRENCY)
            .amount(DEFAULT_AMOUNT)
            .expired(DEFAULT_EXPIRED);
        return bank;
    }

    @Before
    public void initTest() {
        bank = createEntity(em);
    }

    @Test
    @Transactional
    public void createBank() throws Exception {
        int databaseSizeBeforeCreate = bankRepository.findAll().size();

        // Create the Bank
        BankDTO bankDTO = bankMapper.toDto(bank);
        restBankMockMvc.perform(post("/api/banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankDTO)))
            .andExpect(status().isCreated());

        // Validate the Bank in the database
        List<Bank> bankList = bankRepository.findAll();
        assertThat(bankList).hasSize(databaseSizeBeforeCreate + 1);
        Bank testBank = bankList.get(bankList.size() - 1);
        assertThat(testBank.getNumber()).isEqualTo(DEFAULT_NUMBER);
        assertThat(testBank.getExpirationYear()).isEqualTo(DEFAULT_EXPIRATION_YEAR);
        assertThat(testBank.getExpirationMonth()).isEqualTo(DEFAULT_EXPIRATION_MONTH);
        assertThat(testBank.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testBank.getCcv()).isEqualTo(DEFAULT_CCV);
        assertThat(testBank.getCurrency()).isEqualTo(DEFAULT_CURRENCY);
        assertThat(testBank.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testBank.isExpired()).isEqualTo(DEFAULT_EXPIRED);
    }

    @Test
    @Transactional
    public void createBankWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bankRepository.findAll().size();

        // Create the Bank with an existing ID
        bank.setId(1L);
        BankDTO bankDTO = bankMapper.toDto(bank);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBankMockMvc.perform(post("/api/banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Bank in the database
        List<Bank> bankList = bankRepository.findAll();
        assertThat(bankList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = bankRepository.findAll().size();
        // set the field null
        bank.setNumber(null);

        // Create the Bank, which fails.
        BankDTO bankDTO = bankMapper.toDto(bank);

        restBankMockMvc.perform(post("/api/banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankDTO)))
            .andExpect(status().isBadRequest());

        List<Bank> bankList = bankRepository.findAll();
        assertThat(bankList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkExpirationYearIsRequired() throws Exception {
        int databaseSizeBeforeTest = bankRepository.findAll().size();
        // set the field null
        bank.setExpirationYear(null);

        // Create the Bank, which fails.
        BankDTO bankDTO = bankMapper.toDto(bank);

        restBankMockMvc.perform(post("/api/banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankDTO)))
            .andExpect(status().isBadRequest());

        List<Bank> bankList = bankRepository.findAll();
        assertThat(bankList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkExpirationMonthIsRequired() throws Exception {
        int databaseSizeBeforeTest = bankRepository.findAll().size();
        // set the field null
        bank.setExpirationMonth(null);

        // Create the Bank, which fails.
        BankDTO bankDTO = bankMapper.toDto(bank);

        restBankMockMvc.perform(post("/api/banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankDTO)))
            .andExpect(status().isBadRequest());

        List<Bank> bankList = bankRepository.findAll();
        assertThat(bankList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = bankRepository.findAll().size();
        // set the field null
        bank.setName(null);

        // Create the Bank, which fails.
        BankDTO bankDTO = bankMapper.toDto(bank);

        restBankMockMvc.perform(post("/api/banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankDTO)))
            .andExpect(status().isBadRequest());

        List<Bank> bankList = bankRepository.findAll();
        assertThat(bankList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCcvIsRequired() throws Exception {
        int databaseSizeBeforeTest = bankRepository.findAll().size();
        // set the field null
        bank.setCcv(null);

        // Create the Bank, which fails.
        BankDTO bankDTO = bankMapper.toDto(bank);

        restBankMockMvc.perform(post("/api/banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankDTO)))
            .andExpect(status().isBadRequest());

        List<Bank> bankList = bankRepository.findAll();
        assertThat(bankList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCurrencyIsRequired() throws Exception {
        int databaseSizeBeforeTest = bankRepository.findAll().size();
        // set the field null
        bank.setCurrency(null);

        // Create the Bank, which fails.
        BankDTO bankDTO = bankMapper.toDto(bank);

        restBankMockMvc.perform(post("/api/banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankDTO)))
            .andExpect(status().isBadRequest());

        List<Bank> bankList = bankRepository.findAll();
        assertThat(bankList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = bankRepository.findAll().size();
        // set the field null
        bank.setAmount(null);

        // Create the Bank, which fails.
        BankDTO bankDTO = bankMapper.toDto(bank);

        restBankMockMvc.perform(post("/api/banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankDTO)))
            .andExpect(status().isBadRequest());

        List<Bank> bankList = bankRepository.findAll();
        assertThat(bankList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkExpiredIsRequired() throws Exception {
        int databaseSizeBeforeTest = bankRepository.findAll().size();
        // set the field null
        bank.setExpired(null);

        // Create the Bank, which fails.
        BankDTO bankDTO = bankMapper.toDto(bank);

        restBankMockMvc.perform(post("/api/banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankDTO)))
            .andExpect(status().isBadRequest());

        List<Bank> bankList = bankRepository.findAll();
        assertThat(bankList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBanks() throws Exception {
        // Initialize the database
        bankRepository.saveAndFlush(bank);

        // Get all the bankList
        restBankMockMvc.perform(get("/api/banks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bank.getId().intValue())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].expirationYear").value(hasItem(DEFAULT_EXPIRATION_YEAR)))
            .andExpect(jsonPath("$.[*].expirationMonth").value(hasItem(DEFAULT_EXPIRATION_MONTH)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].ccv").value(hasItem(DEFAULT_CCV.toString())))
            .andExpect(jsonPath("$.[*].currency").value(hasItem(DEFAULT_CURRENCY.toString())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT)))
            .andExpect(jsonPath("$.[*].expired").value(hasItem(DEFAULT_EXPIRED.booleanValue())));
    }

    @Test
    @Transactional
    public void getBank() throws Exception {
        // Initialize the database
        bankRepository.saveAndFlush(bank);

        // Get the bank
        restBankMockMvc.perform(get("/api/banks/{id}", bank.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bank.getId().intValue()))
            .andExpect(jsonPath("$.number").value(DEFAULT_NUMBER.toString()))
            .andExpect(jsonPath("$.expirationYear").value(DEFAULT_EXPIRATION_YEAR))
            .andExpect(jsonPath("$.expirationMonth").value(DEFAULT_EXPIRATION_MONTH))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.ccv").value(DEFAULT_CCV.toString()))
            .andExpect(jsonPath("$.currency").value(DEFAULT_CURRENCY.toString()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT))
            .andExpect(jsonPath("$.expired").value(DEFAULT_EXPIRED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingBank() throws Exception {
        // Get the bank
        restBankMockMvc.perform(get("/api/banks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBank() throws Exception {
        // Initialize the database
        bankRepository.saveAndFlush(bank);
        int databaseSizeBeforeUpdate = bankRepository.findAll().size();

        // Update the bank
        Bank updatedBank = bankRepository.findOne(bank.getId());
        // Disconnect from session so that the updates on updatedBank are not directly saved in db
        em.detach(updatedBank);
        updatedBank
            .number(UPDATED_NUMBER)
            .expirationYear(UPDATED_EXPIRATION_YEAR)
            .expirationMonth(UPDATED_EXPIRATION_MONTH)
            .name(UPDATED_NAME)
            .ccv(UPDATED_CCV)
            .currency(UPDATED_CURRENCY)
            .amount(UPDATED_AMOUNT)
            .expired(UPDATED_EXPIRED);
        BankDTO bankDTO = bankMapper.toDto(updatedBank);

        restBankMockMvc.perform(put("/api/banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankDTO)))
            .andExpect(status().isOk());

        // Validate the Bank in the database
        List<Bank> bankList = bankRepository.findAll();
        assertThat(bankList).hasSize(databaseSizeBeforeUpdate);
        Bank testBank = bankList.get(bankList.size() - 1);
        assertThat(testBank.getNumber()).isEqualTo(UPDATED_NUMBER);
        assertThat(testBank.getExpirationYear()).isEqualTo(UPDATED_EXPIRATION_YEAR);
        assertThat(testBank.getExpirationMonth()).isEqualTo(UPDATED_EXPIRATION_MONTH);
        assertThat(testBank.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBank.getCcv()).isEqualTo(UPDATED_CCV);
        assertThat(testBank.getCurrency()).isEqualTo(UPDATED_CURRENCY);
        assertThat(testBank.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testBank.isExpired()).isEqualTo(UPDATED_EXPIRED);
    }

    @Test
    @Transactional
    public void updateNonExistingBank() throws Exception {
        int databaseSizeBeforeUpdate = bankRepository.findAll().size();

        // Create the Bank
        BankDTO bankDTO = bankMapper.toDto(bank);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBankMockMvc.perform(put("/api/banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankDTO)))
            .andExpect(status().isCreated());

        // Validate the Bank in the database
        List<Bank> bankList = bankRepository.findAll();
        assertThat(bankList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBank() throws Exception {
        // Initialize the database
        bankRepository.saveAndFlush(bank);
        int databaseSizeBeforeDelete = bankRepository.findAll().size();

        // Get the bank
        restBankMockMvc.perform(delete("/api/banks/{id}", bank.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Bank> bankList = bankRepository.findAll();
        assertThat(bankList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Bank.class);
        Bank bank1 = new Bank();
        bank1.setId(1L);
        Bank bank2 = new Bank();
        bank2.setId(bank1.getId());
        assertThat(bank1).isEqualTo(bank2);
        bank2.setId(2L);
        assertThat(bank1).isNotEqualTo(bank2);
        bank1.setId(null);
        assertThat(bank1).isNotEqualTo(bank2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BankDTO.class);
        BankDTO bankDTO1 = new BankDTO();
        bankDTO1.setId(1L);
        BankDTO bankDTO2 = new BankDTO();
        assertThat(bankDTO1).isNotEqualTo(bankDTO2);
        bankDTO2.setId(bankDTO1.getId());
        assertThat(bankDTO1).isEqualTo(bankDTO2);
        bankDTO2.setId(2L);
        assertThat(bankDTO1).isNotEqualTo(bankDTO2);
        bankDTO1.setId(null);
        assertThat(bankDTO1).isNotEqualTo(bankDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(bankMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(bankMapper.fromId(null)).isNull();
    }
}
