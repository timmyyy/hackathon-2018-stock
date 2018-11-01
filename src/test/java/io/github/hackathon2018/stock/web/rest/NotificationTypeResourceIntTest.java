package io.github.hackathon2018.stock.web.rest;

import io.github.hackathon2018.stock.StockApp;

import io.github.hackathon2018.stock.domain.NotificationType;
import io.github.hackathon2018.stock.repository.NotificationTypeRepository;
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

import io.github.hackathon2018.stock.domain.enumeration.NotificationTypeCode;
/**
 * Test class for the NotificationTypeResource REST controller.
 *
 * @see NotificationTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = StockApp.class)
public class NotificationTypeResourceIntTest {

    private static final NotificationTypeCode DEFAULT_CODE = NotificationTypeCode.NEW_REQUEST;
    private static final NotificationTypeCode UPDATED_CODE = NotificationTypeCode.NEW_RESPONSE;

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_TEXT = "BBBBBBBBBB";

    @Autowired
    private NotificationTypeRepository notificationTypeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restNotificationTypeMockMvc;

    private NotificationType notificationType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NotificationTypeResource notificationTypeResource = new NotificationTypeResource(notificationTypeRepository);
        this.restNotificationTypeMockMvc = MockMvcBuilders.standaloneSetup(notificationTypeResource)
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
    public static NotificationType createEntity(EntityManager em) {
        NotificationType notificationType = new NotificationType()
            .code(DEFAULT_CODE)
            .title(DEFAULT_TITLE)
            .text(DEFAULT_TEXT);
        return notificationType;
    }

    @Before
    public void initTest() {
        notificationType = createEntity(em);
    }

    @Test
    @Transactional
    public void createNotificationType() throws Exception {
        int databaseSizeBeforeCreate = notificationTypeRepository.findAll().size();

        // Create the NotificationType
        restNotificationTypeMockMvc.perform(post("/api/notification-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(notificationType)))
            .andExpect(status().isCreated());

        // Validate the NotificationType in the database
        List<NotificationType> notificationTypeList = notificationTypeRepository.findAll();
        assertThat(notificationTypeList).hasSize(databaseSizeBeforeCreate + 1);
        NotificationType testNotificationType = notificationTypeList.get(notificationTypeList.size() - 1);
        assertThat(testNotificationType.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testNotificationType.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testNotificationType.getText()).isEqualTo(DEFAULT_TEXT);
    }

    @Test
    @Transactional
    public void createNotificationTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = notificationTypeRepository.findAll().size();

        // Create the NotificationType with an existing ID
        notificationType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNotificationTypeMockMvc.perform(post("/api/notification-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(notificationType)))
            .andExpect(status().isBadRequest());

        // Validate the NotificationType in the database
        List<NotificationType> notificationTypeList = notificationTypeRepository.findAll();
        assertThat(notificationTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllNotificationTypes() throws Exception {
        // Initialize the database
        notificationTypeRepository.saveAndFlush(notificationType);

        // Get all the notificationTypeList
        restNotificationTypeMockMvc.perform(get("/api/notification-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(notificationType.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT.toString())));
    }
    
    @Test
    @Transactional
    public void getNotificationType() throws Exception {
        // Initialize the database
        notificationTypeRepository.saveAndFlush(notificationType);

        // Get the notificationType
        restNotificationTypeMockMvc.perform(get("/api/notification-types/{id}", notificationType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(notificationType.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.text").value(DEFAULT_TEXT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingNotificationType() throws Exception {
        // Get the notificationType
        restNotificationTypeMockMvc.perform(get("/api/notification-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNotificationType() throws Exception {
        // Initialize the database
        notificationTypeRepository.saveAndFlush(notificationType);

        int databaseSizeBeforeUpdate = notificationTypeRepository.findAll().size();

        // Update the notificationType
        NotificationType updatedNotificationType = notificationTypeRepository.findById(notificationType.getId()).get();
        // Disconnect from session so that the updates on updatedNotificationType are not directly saved in db
        em.detach(updatedNotificationType);
        updatedNotificationType
            .code(UPDATED_CODE)
            .title(UPDATED_TITLE)
            .text(UPDATED_TEXT);

        restNotificationTypeMockMvc.perform(put("/api/notification-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNotificationType)))
            .andExpect(status().isOk());

        // Validate the NotificationType in the database
        List<NotificationType> notificationTypeList = notificationTypeRepository.findAll();
        assertThat(notificationTypeList).hasSize(databaseSizeBeforeUpdate);
        NotificationType testNotificationType = notificationTypeList.get(notificationTypeList.size() - 1);
        assertThat(testNotificationType.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testNotificationType.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testNotificationType.getText()).isEqualTo(UPDATED_TEXT);
    }

    @Test
    @Transactional
    public void updateNonExistingNotificationType() throws Exception {
        int databaseSizeBeforeUpdate = notificationTypeRepository.findAll().size();

        // Create the NotificationType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNotificationTypeMockMvc.perform(put("/api/notification-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(notificationType)))
            .andExpect(status().isBadRequest());

        // Validate the NotificationType in the database
        List<NotificationType> notificationTypeList = notificationTypeRepository.findAll();
        assertThat(notificationTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNotificationType() throws Exception {
        // Initialize the database
        notificationTypeRepository.saveAndFlush(notificationType);

        int databaseSizeBeforeDelete = notificationTypeRepository.findAll().size();

        // Get the notificationType
        restNotificationTypeMockMvc.perform(delete("/api/notification-types/{id}", notificationType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<NotificationType> notificationTypeList = notificationTypeRepository.findAll();
        assertThat(notificationTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NotificationType.class);
        NotificationType notificationType1 = new NotificationType();
        notificationType1.setId(1L);
        NotificationType notificationType2 = new NotificationType();
        notificationType2.setId(notificationType1.getId());
        assertThat(notificationType1).isEqualTo(notificationType2);
        notificationType2.setId(2L);
        assertThat(notificationType1).isNotEqualTo(notificationType2);
        notificationType1.setId(null);
        assertThat(notificationType1).isNotEqualTo(notificationType2);
    }
}
