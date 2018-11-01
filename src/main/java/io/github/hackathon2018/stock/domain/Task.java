package io.github.hackathon2018.stock.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import io.github.hackathon2018.stock.domain.enumeration.TaskComplexity;

/**
 * Задача
 */
@ApiModel(description = "Задача")
@Entity
@Table(name = "task")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Task implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "original_text")
    private String originalText;

    @Column(name = "comma_separated_keywords")
    private String commaSeparatedKeywords;

    @Column(name = "jhi_system")
    private String system;

    @Column(name = "subsystem")
    private String subsystem;

    @Enumerated(EnumType.STRING)
    @Column(name = "complexity")
    private TaskComplexity complexity;

    @Column(name = "resources_count")
    private Integer resourcesCount;

    @Column(name = "new_integrations")
    private Boolean newIntegrations;

    @Column(name = "modify_integrations")
    private Boolean modifyIntegrations;

    @Column(name = "new_print_forms")
    private Boolean newPrintForms;

    @Column(name = "modify_print_forms")
    private Boolean modifyPrintForms;

    @OneToOne(mappedBy = "task", cascade = CascadeType.ALL)
    @JsonIgnore
    private Request request;

    @ManyToOne
    @JsonIgnoreProperties("completedTasks")
    private Employee performer;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOriginalText() {
        return originalText;
    }

    public Task originalText(String originalText) {
        this.originalText = originalText;
        return this;
    }

    public void setOriginalText(String originalText) {
        this.originalText = originalText;
    }

    public String getCommaSeparatedKeywords() {
        return commaSeparatedKeywords;
    }

    public Task commaSeparatedKeywords(String commaSeparatedKeywords) {
        this.commaSeparatedKeywords = commaSeparatedKeywords;
        return this;
    }

    public void setCommaSeparatedKeywords(String commaSeparatedKeywords) {
        this.commaSeparatedKeywords = commaSeparatedKeywords;
    }

    public String getSystem() {
        return system;
    }

    public Task system(String system) {
        this.system = system;
        return this;
    }

    public void setSystem(String system) {
        this.system = system;
    }

    public String getSubsystem() {
        return subsystem;
    }

    public Task subsystem(String subsystem) {
        this.subsystem = subsystem;
        return this;
    }

    public void setSubsystem(String subsystem) {
        this.subsystem = subsystem;
    }

    public TaskComplexity getComplexity() {
        return complexity;
    }

    public Task complexity(TaskComplexity complexity) {
        this.complexity = complexity;
        return this;
    }

    public void setComplexity(TaskComplexity complexity) {
        this.complexity = complexity;
    }

    public Integer getResourcesCount() {
        return resourcesCount;
    }

    public Task resourcesCount(Integer resourcesCount) {
        this.resourcesCount = resourcesCount;
        return this;
    }

    public void setResourcesCount(Integer resourcesCount) {
        this.resourcesCount = resourcesCount;
    }

    public Boolean isNewIntegrations() {
        return newIntegrations;
    }

    public Task newIntegrations(Boolean newIntegrations) {
        this.newIntegrations = newIntegrations;
        return this;
    }

    public void setNewIntegrations(Boolean newIntegrations) {
        this.newIntegrations = newIntegrations;
    }

    public Boolean isModifyIntegrations() {
        return modifyIntegrations;
    }

    public Task modifyIntegrations(Boolean modifyIntegrations) {
        this.modifyIntegrations = modifyIntegrations;
        return this;
    }

    public void setModifyIntegrations(Boolean modifyIntegrations) {
        this.modifyIntegrations = modifyIntegrations;
    }

    public Boolean isNewPrintForms() {
        return newPrintForms;
    }

    public Task newPrintForms(Boolean newPrintForms) {
        this.newPrintForms = newPrintForms;
        return this;
    }

    public void setNewPrintForms(Boolean newPrintForms) {
        this.newPrintForms = newPrintForms;
    }

    public Boolean isModifyPrintForms() {
        return modifyPrintForms;
    }

    public Task modifyPrintForms(Boolean modifyPrintForms) {
        this.modifyPrintForms = modifyPrintForms;
        return this;
    }

    public void setModifyPrintForms(Boolean modifyPrintForms) {
        this.modifyPrintForms = modifyPrintForms;
    }

    public Request getRequest() {
        return request;
    }

    public Task request(Request request) {
        this.request = request;
        return this;
    }

    public void setRequest(Request request) {
        this.request = request;
    }

    public Employee getPerformer() {
        return performer;
    }

    public Task performer(Employee employee) {
        this.performer = employee;
        return this;
    }

    public void setPerformer(Employee employee) {
        this.performer = employee;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Task task = (Task) o;
        if (task.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), task.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Task{" +
            "id=" + getId() +
            ", originalText='" + getOriginalText() + "'" +
            ", commaSeparatedKeywords='" + getCommaSeparatedKeywords() + "'" +
            ", system='" + getSystem() + "'" +
            ", subsystem='" + getSubsystem() + "'" +
            ", complexity='" + getComplexity() + "'" +
            ", resourcesCount=" + getResourcesCount() +
            ", newIntegrations='" + isNewIntegrations() + "'" +
            ", modifyIntegrations='" + isModifyIntegrations() + "'" +
            ", newPrintForms='" + isNewPrintForms() + "'" +
            ", modifyPrintForms='" + isModifyPrintForms() + "'" +
            "}";
    }
}
