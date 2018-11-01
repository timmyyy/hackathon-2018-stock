package io.github.hackathon2018.stock.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import io.github.hackathon2018.stock.domain.enumeration.RequestStatus;

/**
 * Заявка на исполнителя
 */
@ApiModel(description = "Заявка на исполнителя")
@Entity
@Table(name = "request")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Request implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "create_time")
    private Instant createTime;

    @Column(name = "close_time")
    private Instant closeTime;

    @Column(name = "change_time")
    private Instant changeTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private RequestStatus status;

    @OneToOne    @JoinColumn(unique = true)
    private Employee customer;

    @OneToOne    @JoinColumn(unique = true)
    private Task task;

    @OneToOne    @JoinColumn(unique = true)
    private Feedback feedback;

    @OneToMany(mappedBy = "request")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Respond> responses = new HashSet<>();
    @OneToMany(mappedBy = "request")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Performers> performers = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getCreateTime() {
        return createTime;
    }

    public Request createTime(Instant createTime) {
        this.createTime = createTime;
        return this;
    }

    public void setCreateTime(Instant createTime) {
        this.createTime = createTime;
    }

    public Instant getCloseTime() {
        return closeTime;
    }

    public Request closeTime(Instant closeTime) {
        this.closeTime = closeTime;
        return this;
    }

    public void setCloseTime(Instant closeTime) {
        this.closeTime = closeTime;
    }

    public Instant getChangeTime() {
        return changeTime;
    }

    public Request changeTime(Instant changeTime) {
        this.changeTime = changeTime;
        return this;
    }

    public void setChangeTime(Instant changeTime) {
        this.changeTime = changeTime;
    }

    public RequestStatus getStatus() {
        return status;
    }

    public Request status(RequestStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }

    public Employee getCustomer() {
        return customer;
    }

    public Request customer(Employee employee) {
        this.customer = employee;
        return this;
    }

    public void setCustomer(Employee employee) {
        this.customer = employee;
    }

    public Task getTask() {
        return task;
    }

    public Request task(Task task) {
        this.task = task;
        return this;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public Feedback getFeedback() {
        return feedback;
    }

    public Request feedback(Feedback feedback) {
        this.feedback = feedback;
        return this;
    }

    public void setFeedback(Feedback feedback) {
        this.feedback = feedback;
    }

    public Set<Respond> getResponses() {
        return responses;
    }

    public Request responses(Set<Respond> responds) {
        this.responses = responds;
        return this;
    }

    public Request addResponses(Respond respond) {
        this.responses.add(respond);
        respond.setRequest(this);
        return this;
    }

    public Request removeResponses(Respond respond) {
        this.responses.remove(respond);
        respond.setRequest(null);
        return this;
    }

    public void setResponses(Set<Respond> responds) {
        this.responses = responds;
    }

    public Set<Performers> getPerformers() {
        return performers;
    }

    public Request performers(Set<Performers> performers) {
        this.performers = performers;
        return this;
    }

    public Request addPerformers(Performers performers) {
        this.performers.add(performers);
        performers.setRequest(this);
        return this;
    }

    public Request removePerformers(Performers performers) {
        this.performers.remove(performers);
        performers.setRequest(null);
        return this;
    }

    public void setPerformers(Set<Performers> performers) {
        this.performers = performers;
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
        Request request = (Request) o;
        if (request.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), request.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Request{" +
            "id=" + getId() +
            ", createTime='" + getCreateTime() + "'" +
            ", closeTime='" + getCloseTime() + "'" +
            ", changeTime='" + getChangeTime() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
