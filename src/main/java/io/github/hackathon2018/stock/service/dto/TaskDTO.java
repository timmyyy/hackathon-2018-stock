package io.github.hackathon2018.stock.service.dto;

import io.github.hackathon2018.stock.domain.enumeration.TaskComplexity;

public class TaskDTO {

    private Long id;

    private String originalText;

    private String commaSeparatedKeywords;

    private String system;

    private String subsystem;

    private TaskComplexity complexity;

    private Integer resourcesCount;

    private Boolean newIntegrations;

    private Boolean modifyIntegrations;

    private Boolean newPrintForms;

    private Boolean modifyPrintForms;

    private RequestDTO request;

    private EmployeeDTO performer;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOriginalText() {
        return originalText;
    }

    public void setOriginalText(String originalText) {
        this.originalText = originalText;
    }

    public String getCommaSeparatedKeywords() {
        return commaSeparatedKeywords;
    }

    public void setCommaSeparatedKeywords(String commaSeparatedKeywords) {
        this.commaSeparatedKeywords = commaSeparatedKeywords;
    }

    public String getSystem() {
        return system;
    }

    public void setSystem(String system) {
        this.system = system;
    }

    public String getSubsystem() {
        return subsystem;
    }

    public void setSubsystem(String subsystem) {
        this.subsystem = subsystem;
    }

    public TaskComplexity getComplexity() {
        return complexity;
    }

    public void setComplexity(TaskComplexity complexity) {
        this.complexity = complexity;
    }

    public Integer getResourcesCount() {
        return resourcesCount;
    }

    public void setResourcesCount(Integer resourcesCount) {
        this.resourcesCount = resourcesCount;
    }

    public Boolean getNewIntegrations() {
        return newIntegrations;
    }

    public void setNewIntegrations(Boolean newIntegrations) {
        this.newIntegrations = newIntegrations;
    }

    public Boolean getModifyIntegrations() {
        return modifyIntegrations;
    }

    public void setModifyIntegrations(Boolean modifyIntegrations) {
        this.modifyIntegrations = modifyIntegrations;
    }

    public Boolean getNewPrintForms() {
        return newPrintForms;
    }

    public void setNewPrintForms(Boolean newPrintForms) {
        this.newPrintForms = newPrintForms;
    }

    public Boolean getModifyPrintForms() {
        return modifyPrintForms;
    }

    public void setModifyPrintForms(Boolean modifyPrintForms) {
        this.modifyPrintForms = modifyPrintForms;
    }

    public RequestDTO getRequest() {
        return request;
    }

    public void setRequest(RequestDTO request) {
        this.request = request;
    }

    public EmployeeDTO getPerformer() {
        return performer;
    }

    public void setPerformer(EmployeeDTO performer) {
        this.performer = performer;
    }
}
