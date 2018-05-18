package com.ip.userinfo.web.rest;

import com.ip.userinfo.UserinfoApp;

import com.ip.userinfo.domain.Userinfo;
import com.ip.userinfo.repository.UserinfoRepository;
import com.ip.userinfo.service.UserinfoService;
import com.ip.userinfo.service.dto.UserinfoDTO;
import com.ip.userinfo.service.mapper.UserinfoMapper;
import com.ip.userinfo.web.rest.errors.ExceptionTranslator;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.ip.userinfo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the UserinfoResource REST controller.
 *
 * @see UserinfoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = UserinfoApp.class)
public class UserinfoResourceIntTest {

    private static final String DEFAULT_UID = "AAAAAAAAAAAAAAAAAA";
    private static final String UPDATED_UID = "BBBBBBBBBBBBBBBBBB";

    private static final String DEFAULT_CNP = "AAAAAAAAAAAAA";
    private static final String UPDATED_CNP = "BBBBBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PRENUME = "AAAAAAAAAA";
    private static final String UPDATED_PRENUME = "BBBBBBBBBB";

    private static final String DEFAULT_ADRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADRESS = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_OF_BIRTH = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_OF_BIRTH = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_ID_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_ID_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_SERIAL_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_SERIAL_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_EMITTING_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_EMITTING_COUNTRY = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_EXPIRING_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_EXPIRING_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_LOGINID = "AAAAAAAAAA";
    private static final String UPDATED_LOGINID = "BBBBBBBBBB";

    @Autowired
    private UserinfoRepository userinfoRepository;

    @Autowired
    private UserinfoMapper userinfoMapper;

    @Autowired
    private UserinfoService userinfoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUserinfoMockMvc;

    private Userinfo userinfo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserinfoResource userinfoResource = new UserinfoResource(userinfoService);
        this.restUserinfoMockMvc = MockMvcBuilders.standaloneSetup(userinfoResource)
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
    public static Userinfo createEntity(EntityManager em) {
        Userinfo userinfo = new Userinfo()
            .uid(DEFAULT_UID)
            .cnp(DEFAULT_CNP)
            .name(DEFAULT_NAME)
            .prenume(DEFAULT_PRENUME)
            .adress(DEFAULT_ADRESS)
            .dateOfBirth(DEFAULT_DATE_OF_BIRTH)
            .phoneNumber(DEFAULT_PHONE_NUMBER)
            .idType(DEFAULT_ID_TYPE)
            .serialNumber(DEFAULT_SERIAL_NUMBER)
            .emittingCountry(DEFAULT_EMITTING_COUNTRY)
            .expiringDate(DEFAULT_EXPIRING_DATE)
            .loginid(DEFAULT_LOGINID);
        return userinfo;
    }

    @Before
    public void initTest() {
        userinfo = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserinfo() throws Exception {
        int databaseSizeBeforeCreate = userinfoRepository.findAll().size();

        // Create the Userinfo
        UserinfoDTO userinfoDTO = userinfoMapper.toDto(userinfo);
        restUserinfoMockMvc.perform(post("/api/userinfos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userinfoDTO)))
            .andExpect(status().isCreated());

        // Validate the Userinfo in the database
        List<Userinfo> userinfoList = userinfoRepository.findAll();
        assertThat(userinfoList).hasSize(databaseSizeBeforeCreate + 1);
        Userinfo testUserinfo = userinfoList.get(userinfoList.size() - 1);
        assertThat(testUserinfo.getUid()).isEqualTo(DEFAULT_UID);
        assertThat(testUserinfo.getCnp()).isEqualTo(DEFAULT_CNP);
        assertThat(testUserinfo.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testUserinfo.getPrenume()).isEqualTo(DEFAULT_PRENUME);
        assertThat(testUserinfo.getAdress()).isEqualTo(DEFAULT_ADRESS);
        assertThat(testUserinfo.getDateOfBirth()).isEqualTo(DEFAULT_DATE_OF_BIRTH);
        assertThat(testUserinfo.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
        assertThat(testUserinfo.getIdType()).isEqualTo(DEFAULT_ID_TYPE);
        assertThat(testUserinfo.getSerialNumber()).isEqualTo(DEFAULT_SERIAL_NUMBER);
        assertThat(testUserinfo.getEmittingCountry()).isEqualTo(DEFAULT_EMITTING_COUNTRY);
        assertThat(testUserinfo.getExpiringDate()).isEqualTo(DEFAULT_EXPIRING_DATE);
        assertThat(testUserinfo.getLoginid()).isEqualTo(DEFAULT_LOGINID);
    }

    @Test
    @Transactional
    public void createUserinfoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userinfoRepository.findAll().size();

        // Create the Userinfo with an existing ID
        userinfo.setId(1L);
        UserinfoDTO userinfoDTO = userinfoMapper.toDto(userinfo);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserinfoMockMvc.perform(post("/api/userinfos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userinfoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Userinfo in the database
        List<Userinfo> userinfoList = userinfoRepository.findAll();
        assertThat(userinfoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkUidIsRequired() throws Exception {
        int databaseSizeBeforeTest = userinfoRepository.findAll().size();
        // set the field null
        userinfo.setUid(null);

        // Create the Userinfo, which fails.
        UserinfoDTO userinfoDTO = userinfoMapper.toDto(userinfo);

        restUserinfoMockMvc.perform(post("/api/userinfos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userinfoDTO)))
            .andExpect(status().isBadRequest());

        List<Userinfo> userinfoList = userinfoRepository.findAll();
        assertThat(userinfoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCnpIsRequired() throws Exception {
        int databaseSizeBeforeTest = userinfoRepository.findAll().size();
        // set the field null
        userinfo.setCnp(null);

        // Create the Userinfo, which fails.
        UserinfoDTO userinfoDTO = userinfoMapper.toDto(userinfo);

        restUserinfoMockMvc.perform(post("/api/userinfos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userinfoDTO)))
            .andExpect(status().isBadRequest());

        List<Userinfo> userinfoList = userinfoRepository.findAll();
        assertThat(userinfoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = userinfoRepository.findAll().size();
        // set the field null
        userinfo.setName(null);

        // Create the Userinfo, which fails.
        UserinfoDTO userinfoDTO = userinfoMapper.toDto(userinfo);

        restUserinfoMockMvc.perform(post("/api/userinfos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userinfoDTO)))
            .andExpect(status().isBadRequest());

        List<Userinfo> userinfoList = userinfoRepository.findAll();
        assertThat(userinfoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrenumeIsRequired() throws Exception {
        int databaseSizeBeforeTest = userinfoRepository.findAll().size();
        // set the field null
        userinfo.setPrenume(null);

        // Create the Userinfo, which fails.
        UserinfoDTO userinfoDTO = userinfoMapper.toDto(userinfo);

        restUserinfoMockMvc.perform(post("/api/userinfos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userinfoDTO)))
            .andExpect(status().isBadRequest());

        List<Userinfo> userinfoList = userinfoRepository.findAll();
        assertThat(userinfoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAdressIsRequired() throws Exception {
        int databaseSizeBeforeTest = userinfoRepository.findAll().size();
        // set the field null
        userinfo.setAdress(null);

        // Create the Userinfo, which fails.
        UserinfoDTO userinfoDTO = userinfoMapper.toDto(userinfo);

        restUserinfoMockMvc.perform(post("/api/userinfos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userinfoDTO)))
            .andExpect(status().isBadRequest());

        List<Userinfo> userinfoList = userinfoRepository.findAll();
        assertThat(userinfoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateOfBirthIsRequired() throws Exception {
        int databaseSizeBeforeTest = userinfoRepository.findAll().size();
        // set the field null
        userinfo.setDateOfBirth(null);

        // Create the Userinfo, which fails.
        UserinfoDTO userinfoDTO = userinfoMapper.toDto(userinfo);

        restUserinfoMockMvc.perform(post("/api/userinfos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userinfoDTO)))
            .andExpect(status().isBadRequest());

        List<Userinfo> userinfoList = userinfoRepository.findAll();
        assertThat(userinfoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPhoneNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = userinfoRepository.findAll().size();
        // set the field null
        userinfo.setPhoneNumber(null);

        // Create the Userinfo, which fails.
        UserinfoDTO userinfoDTO = userinfoMapper.toDto(userinfo);

        restUserinfoMockMvc.perform(post("/api/userinfos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userinfoDTO)))
            .andExpect(status().isBadRequest());

        List<Userinfo> userinfoList = userinfoRepository.findAll();
        assertThat(userinfoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIdTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = userinfoRepository.findAll().size();
        // set the field null
        userinfo.setIdType(null);

        // Create the Userinfo, which fails.
        UserinfoDTO userinfoDTO = userinfoMapper.toDto(userinfo);

        restUserinfoMockMvc.perform(post("/api/userinfos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userinfoDTO)))
            .andExpect(status().isBadRequest());

        List<Userinfo> userinfoList = userinfoRepository.findAll();
        assertThat(userinfoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSerialNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = userinfoRepository.findAll().size();
        // set the field null
        userinfo.setSerialNumber(null);

        // Create the Userinfo, which fails.
        UserinfoDTO userinfoDTO = userinfoMapper.toDto(userinfo);

        restUserinfoMockMvc.perform(post("/api/userinfos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userinfoDTO)))
            .andExpect(status().isBadRequest());

        List<Userinfo> userinfoList = userinfoRepository.findAll();
        assertThat(userinfoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmittingCountryIsRequired() throws Exception {
        int databaseSizeBeforeTest = userinfoRepository.findAll().size();
        // set the field null
        userinfo.setEmittingCountry(null);

        // Create the Userinfo, which fails.
        UserinfoDTO userinfoDTO = userinfoMapper.toDto(userinfo);

        restUserinfoMockMvc.perform(post("/api/userinfos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userinfoDTO)))
            .andExpect(status().isBadRequest());

        List<Userinfo> userinfoList = userinfoRepository.findAll();
        assertThat(userinfoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkExpiringDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = userinfoRepository.findAll().size();
        // set the field null
        userinfo.setExpiringDate(null);

        // Create the Userinfo, which fails.
        UserinfoDTO userinfoDTO = userinfoMapper.toDto(userinfo);

        restUserinfoMockMvc.perform(post("/api/userinfos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userinfoDTO)))
            .andExpect(status().isBadRequest());

        List<Userinfo> userinfoList = userinfoRepository.findAll();
        assertThat(userinfoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLoginidIsRequired() throws Exception {
        int databaseSizeBeforeTest = userinfoRepository.findAll().size();
        // set the field null
        userinfo.setLoginid(null);

        // Create the Userinfo, which fails.
        UserinfoDTO userinfoDTO = userinfoMapper.toDto(userinfo);

        restUserinfoMockMvc.perform(post("/api/userinfos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userinfoDTO)))
            .andExpect(status().isBadRequest());

        List<Userinfo> userinfoList = userinfoRepository.findAll();
        assertThat(userinfoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUserinfos() throws Exception {
        // Initialize the database
        userinfoRepository.saveAndFlush(userinfo);

        // Get all the userinfoList
        restUserinfoMockMvc.perform(get("/api/userinfos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userinfo.getId().intValue())))
            .andExpect(jsonPath("$.[*].uid").value(hasItem(DEFAULT_UID.toString())))
            .andExpect(jsonPath("$.[*].cnp").value(hasItem(DEFAULT_CNP.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].prenume").value(hasItem(DEFAULT_PRENUME.toString())))
            .andExpect(jsonPath("$.[*].adress").value(hasItem(DEFAULT_ADRESS.toString())))
            .andExpect(jsonPath("$.[*].dateOfBirth").value(hasItem(DEFAULT_DATE_OF_BIRTH.toString())))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].idType").value(hasItem(DEFAULT_ID_TYPE.toString())))
            .andExpect(jsonPath("$.[*].serialNumber").value(hasItem(DEFAULT_SERIAL_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].emittingCountry").value(hasItem(DEFAULT_EMITTING_COUNTRY.toString())))
            .andExpect(jsonPath("$.[*].expiringDate").value(hasItem(DEFAULT_EXPIRING_DATE.toString())))
            .andExpect(jsonPath("$.[*].loginid").value(hasItem(DEFAULT_LOGINID.toString())));
    }

    @Test
    @Transactional
    public void getUserinfo() throws Exception {
        // Initialize the database
        userinfoRepository.saveAndFlush(userinfo);

        // Get the userinfo
        restUserinfoMockMvc.perform(get("/api/userinfos/{id}", userinfo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userinfo.getId().intValue()))
            .andExpect(jsonPath("$.uid").value(DEFAULT_UID.toString()))
            .andExpect(jsonPath("$.cnp").value(DEFAULT_CNP.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.prenume").value(DEFAULT_PRENUME.toString()))
            .andExpect(jsonPath("$.adress").value(DEFAULT_ADRESS.toString()))
            .andExpect(jsonPath("$.dateOfBirth").value(DEFAULT_DATE_OF_BIRTH.toString()))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER.toString()))
            .andExpect(jsonPath("$.idType").value(DEFAULT_ID_TYPE.toString()))
            .andExpect(jsonPath("$.serialNumber").value(DEFAULT_SERIAL_NUMBER.toString()))
            .andExpect(jsonPath("$.emittingCountry").value(DEFAULT_EMITTING_COUNTRY.toString()))
            .andExpect(jsonPath("$.expiringDate").value(DEFAULT_EXPIRING_DATE.toString()))
            .andExpect(jsonPath("$.loginid").value(DEFAULT_LOGINID.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUserinfo() throws Exception {
        // Get the userinfo
        restUserinfoMockMvc.perform(get("/api/userinfos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserinfo() throws Exception {
        // Initialize the database
        userinfoRepository.saveAndFlush(userinfo);
        int databaseSizeBeforeUpdate = userinfoRepository.findAll().size();

        // Update the userinfo
        Userinfo updatedUserinfo = userinfoRepository.findOne(userinfo.getId());
        // Disconnect from session so that the updates on updatedUserinfo are not directly saved in db
        em.detach(updatedUserinfo);
        updatedUserinfo
            .uid(UPDATED_UID)
            .cnp(UPDATED_CNP)
            .name(UPDATED_NAME)
            .prenume(UPDATED_PRENUME)
            .adress(UPDATED_ADRESS)
            .dateOfBirth(UPDATED_DATE_OF_BIRTH)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .idType(UPDATED_ID_TYPE)
            .serialNumber(UPDATED_SERIAL_NUMBER)
            .emittingCountry(UPDATED_EMITTING_COUNTRY)
            .expiringDate(UPDATED_EXPIRING_DATE)
            .loginid(UPDATED_LOGINID);
        UserinfoDTO userinfoDTO = userinfoMapper.toDto(updatedUserinfo);

        restUserinfoMockMvc.perform(put("/api/userinfos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userinfoDTO)))
            .andExpect(status().isOk());

        // Validate the Userinfo in the database
        List<Userinfo> userinfoList = userinfoRepository.findAll();
        assertThat(userinfoList).hasSize(databaseSizeBeforeUpdate);
        Userinfo testUserinfo = userinfoList.get(userinfoList.size() - 1);
        assertThat(testUserinfo.getUid()).isEqualTo(UPDATED_UID);
        assertThat(testUserinfo.getCnp()).isEqualTo(UPDATED_CNP);
        assertThat(testUserinfo.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testUserinfo.getPrenume()).isEqualTo(UPDATED_PRENUME);
        assertThat(testUserinfo.getAdress()).isEqualTo(UPDATED_ADRESS);
        assertThat(testUserinfo.getDateOfBirth()).isEqualTo(UPDATED_DATE_OF_BIRTH);
        assertThat(testUserinfo.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testUserinfo.getIdType()).isEqualTo(UPDATED_ID_TYPE);
        assertThat(testUserinfo.getSerialNumber()).isEqualTo(UPDATED_SERIAL_NUMBER);
        assertThat(testUserinfo.getEmittingCountry()).isEqualTo(UPDATED_EMITTING_COUNTRY);
        assertThat(testUserinfo.getExpiringDate()).isEqualTo(UPDATED_EXPIRING_DATE);
        assertThat(testUserinfo.getLoginid()).isEqualTo(UPDATED_LOGINID);
    }

    @Test
    @Transactional
    public void updateNonExistingUserinfo() throws Exception {
        int databaseSizeBeforeUpdate = userinfoRepository.findAll().size();

        // Create the Userinfo
        UserinfoDTO userinfoDTO = userinfoMapper.toDto(userinfo);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUserinfoMockMvc.perform(put("/api/userinfos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userinfoDTO)))
            .andExpect(status().isCreated());

        // Validate the Userinfo in the database
        List<Userinfo> userinfoList = userinfoRepository.findAll();
        assertThat(userinfoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUserinfo() throws Exception {
        // Initialize the database
        userinfoRepository.saveAndFlush(userinfo);
        int databaseSizeBeforeDelete = userinfoRepository.findAll().size();

        // Get the userinfo
        restUserinfoMockMvc.perform(delete("/api/userinfos/{id}", userinfo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Userinfo> userinfoList = userinfoRepository.findAll();
        assertThat(userinfoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Userinfo.class);
        Userinfo userinfo1 = new Userinfo();
        userinfo1.setId(1L);
        Userinfo userinfo2 = new Userinfo();
        userinfo2.setId(userinfo1.getId());
        assertThat(userinfo1).isEqualTo(userinfo2);
        userinfo2.setId(2L);
        assertThat(userinfo1).isNotEqualTo(userinfo2);
        userinfo1.setId(null);
        assertThat(userinfo1).isNotEqualTo(userinfo2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserinfoDTO.class);
        UserinfoDTO userinfoDTO1 = new UserinfoDTO();
        userinfoDTO1.setId(1L);
        UserinfoDTO userinfoDTO2 = new UserinfoDTO();
        assertThat(userinfoDTO1).isNotEqualTo(userinfoDTO2);
        userinfoDTO2.setId(userinfoDTO1.getId());
        assertThat(userinfoDTO1).isEqualTo(userinfoDTO2);
        userinfoDTO2.setId(2L);
        assertThat(userinfoDTO1).isNotEqualTo(userinfoDTO2);
        userinfoDTO1.setId(null);
        assertThat(userinfoDTO1).isNotEqualTo(userinfoDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(userinfoMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(userinfoMapper.fromId(null)).isNull();
    }
}
