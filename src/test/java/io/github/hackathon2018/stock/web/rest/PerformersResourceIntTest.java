package io.github.hackathon2018.stock.web.rest;

import io.github.hackathon2018.stock.StockApp;
import io.github.hackathon2018.stock.domain.Performers;
import io.github.hackathon2018.stock.repository.PerformersRepository;
import io.github.hackathon2018.stock.service.EmployeeService;
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

/**
 * Test class for the PerformersResource REST controller.
 *
 * @see PerformersResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = StockApp.class)
public class PerformersResourceIntTest {

    @Autowired
    private PerformersRepository performersRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPerformersMockMvc;

    private Performers performers;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PerformersResource performersResource = new PerformersResource(performersRepository);
        this.restPerformersMockMvc = MockMvcBuilders.standaloneSetup(performersResource)
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
    public static Performers createEntity(EntityManager em) {
        Performers performers = new Performers();
        return performers;
    }

    @Before
    public void initTest() {
        performers = createEntity(em);
    }

    @Test
    @Transactional
    public void createPerformers() throws Exception {
        int databaseSizeBeforeCreate = performersRepository.findAll().size();

        // Create the Performers
        restPerformersMockMvc.perform(post("/api/performers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(performers)))
            .andExpect(status().isCreated());

        // Validate the Performers in the database
        List<Performers> performersList = performersRepository.findAll();
        assertThat(performersList).hasSize(databaseSizeBeforeCreate + 1);
        Performers testPerformers = performersList.get(performersList.size() - 1);
    }

    @Test
    @Transactional
    public void createPerformersWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = performersRepository.findAll().size();

        // Create the Performers with an existing ID
        performers.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPerformersMockMvc.perform(post("/api/performers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(performers)))
            .andExpect(status().isBadRequest());

        // Validate the Performers in the database
        List<Performers> performersList = performersRepository.findAll();
        assertThat(performersList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPerformers() throws Exception {
        // Initialize the database
        performersRepository.saveAndFlush(performers);

        // Get all the performersList
        restPerformersMockMvc.perform(get("/api/performers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(performers.getId().intValue())));
    }

    @Test
    @Transactional
    public void getPerformers() throws Exception {
        // Initialize the database
        performersRepository.saveAndFlush(performers);

        // Get the performers
        restPerformersMockMvc.perform(get("/api/performers/{id}", performers.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(performers.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPerformers() throws Exception {
        // Get the performers
        restPerformersMockMvc.perform(get("/api/performers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePerformers() throws Exception {
        // Initialize the database
        performersRepository.saveAndFlush(performers);

        int databaseSizeBeforeUpdate = performersRepository.findAll().size();

        // Update the performers
        Performers updatedPerformers = performersRepository.findById(performers.getId()).get();
        // Disconnect from session so that the updates on updatedPerformers are not directly saved in db
        em.detach(updatedPerformers);

        restPerformersMockMvc.perform(put("/api/performers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPerformers)))
            .andExpect(status().isOk());

        // Validate the Performers in the database
        List<Performers> performersList = performersRepository.findAll();
        assertThat(performersList).hasSize(databaseSizeBeforeUpdate);
        Performers testPerformers = performersList.get(performersList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingPerformers() throws Exception {
        int databaseSizeBeforeUpdate = performersRepository.findAll().size();

        // Create the Performers

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPerformersMockMvc.perform(put("/api/performers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(performers)))
            .andExpect(status().isBadRequest());

        // Validate the Performers in the database
        List<Performers> performersList = performersRepository.findAll();
        assertThat(performersList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePerformers() throws Exception {
        // Initialize the database
        performersRepository.saveAndFlush(performers);

        int databaseSizeBeforeDelete = performersRepository.findAll().size();

        // Get the performers
        restPerformersMockMvc.perform(delete("/api/performers/{id}", performers.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Performers> performersList = performersRepository.findAll();
        assertThat(performersList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Performers.class);
        Performers performers1 = new Performers();
        performers1.setId(1L);
        Performers performers2 = new Performers();
        performers2.setId(performers1.getId());
        assertThat(performers1).isEqualTo(performers2);
        performers2.setId(2L);
        assertThat(performers1).isNotEqualTo(performers2);
        performers1.setId(null);
        assertThat(performers1).isNotEqualTo(performers2);
    }
}
