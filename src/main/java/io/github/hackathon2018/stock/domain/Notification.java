package io.github.hackathon2018.stock.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * Уведомление
 * Исполнителя о заявке
 * Заказчика об отклике
 * О назначении заявки исполнителю
 * О подтверждении исполнителем взятия в работу
 */
@ApiModel(description = "Уведомление Исполнителя о заявке Заказчика об отклике О назначении заявки исполнителю О подтверждении исполнителем взятия в работу")
@Entity
@Table(name = "notification")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Notification implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "create_time")
    private Instant createTime;

    @Column(name = "readed")
    private Boolean readed;

    @OneToOne    @JoinColumn(unique = true)
    private Request request;

    @OneToOne    @JoinColumn(unique = true)
    private Employee employee;

    @OneToOne    @JoinColumn(unique = true)
    private NotificationType type;

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

    public Notification createTime(Instant createTime) {
        this.createTime = createTime;
        return this;
    }

    public void setCreateTime(Instant createTime) {
        this.createTime = createTime;
    }

    public Boolean isReaded() {
        return readed;
    }

    public Notification readed(Boolean readed) {
        this.readed = readed;
        return this;
    }

    public void setReaded(Boolean readed) {
        this.readed = readed;
    }

    public Request getRequest() {
        return request;
    }

    public Notification request(Request request) {
        this.request = request;
        return this;
    }

    public void setRequest(Request request) {
        this.request = request;
    }

    public Employee getEmployee() {
        return employee;
    }

    public Notification employee(Employee employee) {
        this.employee = employee;
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public NotificationType getType() {
        return type;
    }

    public Notification type(NotificationType notificationType) {
        this.type = notificationType;
        return this;
    }

    public void setType(NotificationType notificationType) {
        this.type = notificationType;
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
        Notification notification = (Notification) o;
        if (notification.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), notification.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Notification{" +
            "id=" + getId() +
            ", createTime='" + getCreateTime() + "'" +
            ", readed='" + isReaded() + "'" +
            "}";
    }
}
