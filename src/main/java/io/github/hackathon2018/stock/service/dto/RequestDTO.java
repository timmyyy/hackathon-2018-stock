package io.github.hackathon2018.stock.service.dto;

import io.github.hackathon2018.stock.domain.enumeration.RequestStatus;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

public class RequestDTO {

    private Long id;

    private Instant createTime;

    private Instant closeTime;

    private Instant changeTime;

    private RequestStatus status;

    private EmployeeDTO customer;

    private TaskDTO task;

    private FeedbackDTO feedback;

    private Set<RespondDTO> responses = new HashSet<>();

    private Set<PerformersDTO> performers = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Instant createTime) {
        this.createTime = createTime;
    }

    public Instant getCloseTime() {
        return closeTime;
    }

    public void setCloseTime(Instant closeTime) {
        this.closeTime = closeTime;
    }

    public Instant getChangeTime() {
        return changeTime;
    }

    public void setChangeTime(Instant changeTime) {
        this.changeTime = changeTime;
    }

    public RequestStatus getStatus() {
        return status;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }

    public EmployeeDTO getCustomer() {
        return customer;
    }

    public void setCustomer(EmployeeDTO customer) {
        this.customer = customer;
    }

    public TaskDTO getTask() {
        return task;
    }

    public void setTask(TaskDTO task) {
        this.task = task;
    }

    public FeedbackDTO getFeedback() {
        return feedback;
    }

    public void setFeedback(FeedbackDTO feedback) {
        this.feedback = feedback;
    }

    public Set<RespondDTO> getResponses() {
        return responses;
    }

    public void setResponses(Set<RespondDTO> responses) {
        this.responses = responses;
    }

    public Set<PerformersDTO> getPerformers() {
        return performers;
    }

    public void setPerformers(Set<PerformersDTO> performers) {
        this.performers = performers;
    }
}
