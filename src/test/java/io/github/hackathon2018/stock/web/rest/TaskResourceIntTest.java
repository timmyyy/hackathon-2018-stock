package io.github.hackathon2018.stock.web.rest;

import io.github.hackathon2018.stock.StockApp;

import io.github.hackathon2018.stock.domain.Task;
import io.github.hackathon2018.stock.repository.TaskRepository;
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

import io.github.hackathon2018.stock.domain.enumeration.TaskComplexity;
/**
 * Test class for the TaskResource REST controller.
 *
 * @see TaskResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = StockApp.class)
public class TaskResourceIntTest {

    private static final String DEFAULT_ORIGINAL_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_ORIGINAL_TEXT = "BBBBBBBBBB";

    private static final String DEFAULT_COMMA_SEPARATED_KEYWORDS = "AAAAAAAAAA";
    private static final String UPDATED_COMMA_SEPARATED_KEYWORDS = "BBBBBBBBBB";

    private static final String DEFAULT_SYSTEM = "AAAAAAAAAA";
    private static final String UPDATED_SYSTEM = "BBBBBBBBBB";

    private static final String DEFAULT_SUBSYSTEM = "AAAAAAAAAA";
    private static final String UPDATED_SUBSYSTEM = "BBBBBBBBBB";

    private static final TaskComplexity DEFAULT_COMPLEXITY = TaskComplexity.LOW;
    private static final TaskComplexity UPDATED_COMPLEXITY = TaskComplexity.MEDIUM;

    private static final Boolean DEFAULT_NEW_INTEGRATIONS = false;
    private static final Boolean UPDATED_NEW_INTEGRATIONS = true;

    private static final Boolean DEFAULT_MODIFY_INTEGRATIONS = false;
    private static final Boolean UPDATED_MODIFY_INTEGRATIONS = true;

    private static final Boolean DEFAULT_NEW_PRINT_FORMS = false;
    private static final Boolean UPDATED_NEW_PRINT_FORMS = true;

    private static final Boolean DEFAULT_MODIFY_PRINT_FORMS = false;
    private static final Boolean UPDATED_MODIFY_PRINT_FORMS = true;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTaskMockMvc;

    private Task task;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TaskResource taskResource = new TaskResource(taskRepository);
        this.restTaskMockMvc = MockMvcBuilders.standaloneSetup(taskResource)
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
    public static Task createEntity(EntityManager em) {
        Task task = new Task()
            .originalText(DEFAULT_ORIGINAL_TEXT)
            .commaSeparatedKeywords(DEFAULT_COMMA_SEPARATED_KEYWORDS)
            .system(DEFAULT_SYSTEM)
            .subsystem(DEFAULT_SUBSYSTEM)
            .complexity(DEFAULT_COMPLEXITY)
            .newIntegrations(DEFAULT_NEW_INTEGRATIONS)
            .modifyIntegrations(DEFAULT_MODIFY_INTEGRATIONS)
            .newPrintForms(DEFAULT_NEW_PRINT_FORMS)
            .modifyPrintForms(DEFAULT_MODIFY_PRINT_FORMS);
        return task;
    }

    @Before
    public void initTest() {
        task = createEntity(em);
    }

    @Test
    @Transactional
    public void createTask() throws Exception {
        int databaseSizeBeforeCreate = taskRepository.findAll().size();

        // Create the Task
        restTaskMockMvc.perform(post("/api/tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(task)))
            .andExpect(status().isCreated());

        // Validate the Task in the database
        List<Task> taskList = taskRepository.findAll();
        assertThat(taskList).hasSize(databaseSizeBeforeCreate + 1);
        Task testTask = taskList.get(taskList.size() - 1);
        assertThat(testTask.getOriginalText()).isEqualTo(DEFAULT_ORIGINAL_TEXT);
        assertThat(testTask.getCommaSeparatedKeywords()).isEqualTo(DEFAULT_COMMA_SEPARATED_KEYWORDS);
        assertThat(testTask.getSystem()).isEqualTo(DEFAULT_SYSTEM);
        assertThat(testTask.getSubsystem()).isEqualTo(DEFAULT_SUBSYSTEM);
        assertThat(testTask.getComplexity()).isEqualTo(DEFAULT_COMPLEXITY);
        assertThat(testTask.isNewIntegrations()).isEqualTo(DEFAULT_NEW_INTEGRATIONS);
        assertThat(testTask.isModifyIntegrations()).isEqualTo(DEFAULT_MODIFY_INTEGRATIONS);
        assertThat(testTask.isNewPrintForms()).isEqualTo(DEFAULT_NEW_PRINT_FORMS);
        assertThat(testTask.isModifyPrintForms()).isEqualTo(DEFAULT_MODIFY_PRINT_FORMS);
    }

    @Test
    @Transactional
    public void createTaskWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = taskRepository.findAll().size();

        // Create the Task with an existing ID
        task.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTaskMockMvc.perform(post("/api/tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(task)))
            .andExpect(status().isBadRequest());

        // Validate the Task in the database
        List<Task> taskList = taskRepository.findAll();
        assertThat(taskList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTasks() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList
        restTaskMockMvc.perform(get("/api/tasks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(task.getId().intValue())))
            .andExpect(jsonPath("$.[*].originalText").value(hasItem(DEFAULT_ORIGINAL_TEXT.toString())))
            .andExpect(jsonPath("$.[*].commaSeparatedKeywords").value(hasItem(DEFAULT_COMMA_SEPARATED_KEYWORDS.toString())))
            .andExpect(jsonPath("$.[*].system").value(hasItem(DEFAULT_SYSTEM.toString())))
            .andExpect(jsonPath("$.[*].subsystem").value(hasItem(DEFAULT_SUBSYSTEM.toString())))
            .andExpect(jsonPath("$.[*].complexity").value(hasItem(DEFAULT_COMPLEXITY.toString())))
            .andExpect(jsonPath("$.[*].newIntegrations").value(hasItem(DEFAULT_NEW_INTEGRATIONS.booleanValue())))
            .andExpect(jsonPath("$.[*].modifyIntegrations").value(hasItem(DEFAULT_MODIFY_INTEGRATIONS.booleanValue())))
            .andExpect(jsonPath("$.[*].newPrintForms").value(hasItem(DEFAULT_NEW_PRINT_FORMS.booleanValue())))
            .andExpect(jsonPath("$.[*].modifyPrintForms").value(hasItem(DEFAULT_MODIFY_PRINT_FORMS.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getTask() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get the task
        restTaskMockMvc.perform(get("/api/tasks/{id}", task.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(task.getId().intValue()))
            .andExpect(jsonPath("$.originalText").value(DEFAULT_ORIGINAL_TEXT.toString()))
            .andExpect(jsonPath("$.commaSeparatedKeywords").value(DEFAULT_COMMA_SEPARATED_KEYWORDS.toString()))
            .andExpect(jsonPath("$.system").value(DEFAULT_SYSTEM.toString()))
            .andExpect(jsonPath("$.subsystem").value(DEFAULT_SUBSYSTEM.toString()))
            .andExpect(jsonPath("$.complexity").value(DEFAULT_COMPLEXITY.toString()))
            .andExpect(jsonPath("$.newIntegrations").value(DEFAULT_NEW_INTEGRATIONS.booleanValue()))
            .andExpect(jsonPath("$.modifyIntegrations").value(DEFAULT_MODIFY_INTEGRATIONS.booleanValue()))
            .andExpect(jsonPath("$.newPrintForms").value(DEFAULT_NEW_PRINT_FORMS.booleanValue()))
            .andExpect(jsonPath("$.modifyPrintForms").value(DEFAULT_MODIFY_PRINT_FORMS.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTask() throws Exception {
        // Get the task
        restTaskMockMvc.perform(get("/api/tasks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTask() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        int databaseSizeBeforeUpdate = taskRepository.findAll().size();

        // Update the task
        Task updatedTask = taskRepository.findById(task.getId()).get();
        // Disconnect from session so that the updates on updatedTask are not directly saved in db
        em.detach(updatedTask);
        updatedTask
            .originalText(UPDATED_ORIGINAL_TEXT)
            .commaSeparatedKeywords(UPDATED_COMMA_SEPARATED_KEYWORDS)
            .system(UPDATED_SYSTEM)
            .subsystem(UPDATED_SUBSYSTEM)
            .complexity(UPDATED_COMPLEXITY)
            .newIntegrations(UPDATED_NEW_INTEGRATIONS)
            .modifyIntegrations(UPDATED_MODIFY_INTEGRATIONS)
            .newPrintForms(UPDATED_NEW_PRINT_FORMS)
            .modifyPrintForms(UPDATED_MODIFY_PRINT_FORMS);

        restTaskMockMvc.perform(put("/api/tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTask)))
            .andExpect(status().isOk());

        // Validate the Task in the database
        List<Task> taskList = taskRepository.findAll();
        assertThat(taskList).hasSize(databaseSizeBeforeUpdate);
        Task testTask = taskList.get(taskList.size() - 1);
        assertThat(testTask.getOriginalText()).isEqualTo(UPDATED_ORIGINAL_TEXT);
        assertThat(testTask.getCommaSeparatedKeywords()).isEqualTo(UPDATED_COMMA_SEPARATED_KEYWORDS);
        assertThat(testTask.getSystem()).isEqualTo(UPDATED_SYSTEM);
        assertThat(testTask.getSubsystem()).isEqualTo(UPDATED_SUBSYSTEM);
        assertThat(testTask.getComplexity()).isEqualTo(UPDATED_COMPLEXITY);
        assertThat(testTask.isNewIntegrations()).isEqualTo(UPDATED_NEW_INTEGRATIONS);
        assertThat(testTask.isModifyIntegrations()).isEqualTo(UPDATED_MODIFY_INTEGRATIONS);
        assertThat(testTask.isNewPrintForms()).isEqualTo(UPDATED_NEW_PRINT_FORMS);
        assertThat(testTask.isModifyPrintForms()).isEqualTo(UPDATED_MODIFY_PRINT_FORMS);
    }

    @Test
    @Transactional
    public void updateNonExistingTask() throws Exception {
        int databaseSizeBeforeUpdate = taskRepository.findAll().size();

        // Create the Task

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTaskMockMvc.perform(put("/api/tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(task)))
            .andExpect(status().isBadRequest());

        // Validate the Task in the database
        List<Task> taskList = taskRepository.findAll();
        assertThat(taskList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTask() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        int databaseSizeBeforeDelete = taskRepository.findAll().size();

        // Get the task
        restTaskMockMvc.perform(delete("/api/tasks/{id}", task.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Task> taskList = taskRepository.findAll();
        assertThat(taskList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Task.class);
        Task task1 = new Task();
        task1.setId(1L);
        Task task2 = new Task();
        task2.setId(task1.getId());
        assertThat(task1).isEqualTo(task2);
        task2.setId(2L);
        assertThat(task1).isNotEqualTo(task2);
        task1.setId(null);
        assertThat(task1).isNotEqualTo(task2);
    }
}
