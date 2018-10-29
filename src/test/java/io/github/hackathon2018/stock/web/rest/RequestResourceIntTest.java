package io.github.hackathon2018.stock.web.rest;

import io.github.hackathon2018.stock.JhipsterApp;

import io.github.hackathon2018.stock.domain.Request;
import io.github.hackathon2018.stock.repository.RequestRepository;
import io.github.hackathon2018.stock.web.rest.errors.ExceptionTranslator;

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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static io.github.hackathon2018.stock.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import io.github.hackathon2018.stock.domain.enumeration.RequestStatus;
/**
 * Test class for the RequestResource REST controller.
 *
 * @see RequestResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class RequestResourceIntTest {

    private static final Instant DEFAULT_CREATE_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATE_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_CLOSE_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CLOSE_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_CHANGE_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CHANGE_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final RequestStatus DEFAULT_STATUS = RequestStatus.NEW;
    private static final RequestStatus UPDATED_STATUS = RequestStatus.PERFORMERS_REQUESTED;

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRequestMockMvc;

    private Request request;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RequestResource requestResource = new RequestResource(requestRepository);
        this.restRequestMockMvc = MockMvcBuilders.standaloneSetup(requestResource)
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
    public static Request createEntity(EntityManager em) {
        Request request = new Request()
            .createTime(DEFAULT_CREATE_TIME)
            .closeTime(DEFAULT_CLOSE_TIME)
            .changeTime(DEFAULT_CHANGE_TIME)
            .status(DEFAULT_STATUS);
        return request;
    }

    @Before
    public void initTest() {
        request = createEntity(em);
    }

    @Test
    @Transactional
    public void createRequest() throws Exception {
        int databaseSizeBeforeCreate = requestRepository.findAll().size();

        // Create the Request
        restRequestMockMvc.perform(post("/api/requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(request)))
            .andExpect(status().isCreated());

        // Validate the Request in the database
        List<Request> requestList = requestRepository.findAll();
        assertThat(requestList).hasSize(databaseSizeBeforeCreate + 1);
        Request testRequest = requestList.get(requestList.size() - 1);
        assertThat(testRequest.getCreateTime()).isEqualTo(DEFAULT_CREATE_TIME);
        assertThat(testRequest.getCloseTime()).isEqualTo(DEFAULT_CLOSE_TIME);
        assertThat(testRequest.getChangeTime()).isEqualTo(DEFAULT_CHANGE_TIME);
        assertThat(testRequest.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createRequestWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = requestRepository.findAll().size();

        // Create the Request with an existing ID
        request.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRequestMockMvc.perform(post("/api/requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(request)))
            .andExpect(status().isBadRequest());

        // Validate the Request in the database
        List<Request> requestList = requestRepository.findAll();
        assertThat(requestList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRequests() throws Exception {
        // Initialize the database
        requestRepository.saveAndFlush(request);

        // Get all the requestList
        restRequestMockMvc.perform(get("/api/requests?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(request.getId().intValue())))
            .andExpect(jsonPath("$.[*].createTime").value(hasItem(DEFAULT_CREATE_TIME.toString())))
            .andExpect(jsonPath("$.[*].closeTime").value(hasItem(DEFAULT_CLOSE_TIME.toString())))
            .andExpect(jsonPath("$.[*].changeTime").value(hasItem(DEFAULT_CHANGE_TIME.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getRequest() throws Exception {
        // Initialize the database
        requestRepository.saveAndFlush(request);

        // Get the request
        restRequestMockMvc.perform(get("/api/requests/{id}", request.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(request.getId().intValue()))
            .andExpect(jsonPath("$.createTime").value(DEFAULT_CREATE_TIME.toString()))
            .andExpect(jsonPath("$.closeTime").value(DEFAULT_CLOSE_TIME.toString()))
            .andExpect(jsonPath("$.changeTime").value(DEFAULT_CHANGE_TIME.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRequest() throws Exception {
        // Get the request
        restRequestMockMvc.perform(get("/api/requests/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRequest() throws Exception {
        // Initialize the database
        requestRepository.saveAndFlush(request);

        int databaseSizeBeforeUpdate = requestRepository.findAll().size();

        // Update the request
        Request updatedRequest = requestRepository.findById(request.getId()).get();
        // Disconnect from session so that the updates on updatedRequest are not directly saved in db
        em.detach(updatedRequest);
        updatedRequest
            .createTime(UPDATED_CREATE_TIME)
            .closeTime(UPDATED_CLOSE_TIME)
            .changeTime(UPDATED_CHANGE_TIME)
            .status(UPDATED_STATUS);

        restRequestMockMvc.perform(put("/api/requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRequest)))
            .andExpect(status().isOk());

        // Validate the Request in the database
        List<Request> requestList = requestRepository.findAll();
        assertThat(requestList).hasSize(databaseSizeBeforeUpdate);
        Request testRequest = requestList.get(requestList.size() - 1);
        assertThat(testRequest.getCreateTime()).isEqualTo(UPDATED_CREATE_TIME);
        assertThat(testRequest.getCloseTime()).isEqualTo(UPDATED_CLOSE_TIME);
        assertThat(testRequest.getChangeTime()).isEqualTo(UPDATED_CHANGE_TIME);
        assertThat(testRequest.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingRequest() throws Exception {
        int databaseSizeBeforeUpdate = requestRepository.findAll().size();

        // Create the Request

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRequestMockMvc.perform(put("/api/requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(request)))
            .andExpect(status().isBadRequest());

        // Validate the Request in the database
        List<Request> requestList = requestRepository.findAll();
        assertThat(requestList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRequest() throws Exception {
        // Initialize the database
        requestRepository.saveAndFlush(request);

        int databaseSizeBeforeDelete = requestRepository.findAll().size();

        // Get the request
        restRequestMockMvc.perform(delete("/api/requests/{id}", request.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Request> requestList = requestRepository.findAll();
        assertThat(requestList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Request.class);
        Request request1 = new Request();
        request1.setId(1L);
        Request request2 = new Request();
        request2.setId(request1.getId());
        assertThat(request1).isEqualTo(request2);
        request2.setId(2L);
        assertThat(request1).isNotEqualTo(request2);
        request1.setId(null);
        assertThat(request1).isNotEqualTo(request2);
    }
}
