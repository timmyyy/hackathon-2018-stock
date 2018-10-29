package io.github.hackathon2018.stock.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import io.github.hackathon2018.stock.domain.enumeration.NotificationTypeCode;

/**
 * A NotificationType.
 */
@Entity
@Table(name = "notification_type")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class NotificationType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "code")
    private NotificationTypeCode code;

    @Column(name = "title")
    private String title;

    @Column(name = "text")
    private String text;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public NotificationTypeCode getCode() {
        return code;
    }

    public NotificationType code(NotificationTypeCode code) {
        this.code = code;
        return this;
    }

    public void setCode(NotificationTypeCode code) {
        this.code = code;
    }

    public String getTitle() {
        return title;
    }

    public NotificationType title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public NotificationType text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
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
        NotificationType notificationType = (NotificationType) o;
        if (notificationType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), notificationType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "NotificationType{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", title='" + getTitle() + "'" +
            ", text='" + getText() + "'" +
            "}";
    }
}
