package io.github.hackathon2018.stock.web.rest;

import io.github.hackathon2018.stock.StockApp;

import io.github.hackathon2018.stock.domain.Respond;
import io.github.hackathon2018.stock.repository.RespondRepository;
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
import java.util.List;


import static io.github.hackathon2018.stock.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import io.github.hackathon2018.stock.domain.enumeration.ResponseStatus;
/**
 * Test class for the RespondResource REST controller.
 *
 * @see RespondResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = StockApp.class)
public class RespondResourceIntTest {

    private static final ResponseStatus DEFAULT_STATUS = ResponseStatus.NEW;
    private static final ResponseStatus UPDATED_STATUS = ResponseStatus.ACCEPTED;

    @Autowired
    private RespondRepository respondRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRespondMockMvc;

    private Respond respond;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RespondResource respondResource = new RespondResource(respondRepository);
        this.restRespondMockMvc = MockMvcBuilders.standaloneSetup(respondResource)
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
    public static Respond createEntity(EntityManager em) {
        Respond respond = new Respond()
            .status(DEFAULT_STATUS);
        return respond;
    }

    @Before
    public void initTest() {
        respond = createEntity(em);
    }

    @Test
    @Transactional
    public void createRespond() throws Exception {
        int databaseSizeBeforeCreate = respondRepository.findAll().size();

        // Create the Respond
        restRespondMockMvc.perform(post("/api/responds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(respond)))
            .andExpect(status().isCreated());

        // Validate the Respond in the database
        List<Respond> respondList = respondRepository.findAll();
        assertThat(respondList).hasSize(databaseSizeBeforeCreate + 1);
        Respond testRespond = respondList.get(respondList.size() - 1);
        assertThat(testRespond.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createRespondWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = respondRepository.findAll().size();

        // Create the Respond with an existing ID
        respond.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRespondMockMvc.perform(post("/api/responds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(respond)))
            .andExpect(status().isBadRequest());

        // Validate the Respond in the database
        List<Respond> respondList = respondRepository.findAll();
        assertThat(respondList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllResponds() throws Exception {
        // Initialize the database
        respondRepository.saveAndFlush(respond);

        // Get all the respondList
        restRespondMockMvc.perform(get("/api/responds?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(respond.getId().intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getRespond() throws Exception {
        // Initialize the database
        respondRepository.saveAndFlush(respond);

        // Get the respond
        restRespondMockMvc.perform(get("/api/responds/{id}", respond.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(respond.getId().intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRespond() throws Exception {
        // Get the respond
        restRespondMockMvc.perform(get("/api/responds/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRespond() throws Exception {
        // Initialize the database
        respondRepository.saveAndFlush(respond);

        int databaseSizeBeforeUpdate = respondRepository.findAll().size();

        // Update the respond
        Respond updatedRespond = respondRepository.findById(respond.getId()).get();
        // Disconnect from session so that the updates on updatedRespond are not directly saved in db
        em.detach(updatedRespond);
        updatedRespond
            .status(UPDATED_STATUS);

        restRespondMockMvc.perform(put("/api/responds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRespond)))
            .andExpect(status().isOk());

        // Validate the Respond in the database
        List<Respond> respondList = respondRepository.findAll();
        assertThat(respondList).hasSize(databaseSizeBeforeUpdate);
        Respond testRespond = respondList.get(respondList.size() - 1);
        assertThat(testRespond.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingRespond() throws Exception {
        int databaseSizeBeforeUpdate = respondRepository.findAll().size();

        // Create the Respond

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRespondMockMvc.perform(put("/api/responds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(respond)))
            .andExpect(status().isBadRequest());

        // Validate the Respond in the database
        List<Respond> respondList = respondRepository.findAll();
        assertThat(respondList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRespond() throws Exception {
        // Initialize the database
        respondRepository.saveAndFlush(respond);

        int databaseSizeBeforeDelete = respondRepository.findAll().size();

        // Get the respond
        restRespondMockMvc.perform(delete("/api/responds/{id}", respond.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Respond> respondList = respondRepository.findAll();
        assertThat(respondList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Respond.class);
        Respond respond1 = new Respond();
        respond1.setId(1L);
        Respond respond2 = new Respond();
        respond2.setId(respond1.getId());
        assertThat(respond1).isEqualTo(respond2);
        respond2.setId(2L);
        assertThat(respond1).isNotEqualTo(respond2);
        respond1.setId(null);
        assertThat(respond1).isNotEqualTo(respond2);
    }
}
