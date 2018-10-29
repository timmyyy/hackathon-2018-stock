package io.github.hackathon2018.stock.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import io.github.hackathon2018.stock.domain.enumeration.ResponseStatus;

/**
 * Отклик
 */
@ApiModel(description = "Отклик")
@Entity
@Table(name = "respond")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Respond implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ResponseStatus status;

    @OneToOne    @JoinColumn(unique = true)
    private Employee employee;

    @ManyToOne
    @JsonIgnoreProperties("responses")
    private Request request;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ResponseStatus getStatus() {
        return status;
    }

    public Respond status(ResponseStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(ResponseStatus status) {
        this.status = status;
    }

    public Employee getEmployee() {
        return employee;
    }

    public Respond employee(Employee employee) {
        this.employee = employee;
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Request getRequest() {
        return request;
    }

    public Respond request(Request request) {
        this.request = request;
        return this;
    }

    public void setRequest(Request request) {
        this.request = request;
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
        Respond respond = (Respond) o;
        if (respond.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), respond.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Respond{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
