package io.github.hackathon2018.stock.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import io.github.hackathon2018.stock.domain.enumeration.EmployeeRole;

import io.github.hackathon2018.stock.domain.enumeration.CommandRole;

/**
 * Сотрудник организации,
 * может быть заказчиком и исполнителем
 */
@ApiModel(description = "Сотрудник организации, может быть заказчиком и исполнителем")
@Entity
@Table(name = "employee")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Employee implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_role")
    private EmployeeRole role;

    @Enumerated(EnumType.STRING)
    @Column(name = "command_role")
    private CommandRole commandRole;

    @Column(name = "username")
    private String username;

    @Column(name = "firstname")
    private String firstname;

    @Column(name = "secondname")
    private String secondname;

    @Column(name = "surename")
    private String surename;

    @Column(name = "email")
    private String email;

    @Column(name = "mobile_phone")
    private String mobilePhone;

    @Column(name = "jhi_organization")
    private String organization;

    @Column(name = "department")
    private String department;

    @Column(name = "country")
    private String country;

    @Column(name = "street_address")
    private String streetAddress;

    @Column(name = "postal_code")
    private String postalCode;

    @Column(name = "city")
    private String city;

    @Column(name = "state_province")
    private String stateProvince;

    @Column(name = "jhi_rank")
    private Integer rank;

    @OneToMany(mappedBy = "performer")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Task> completedTasks = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EmployeeRole getRole() {
        return role;
    }

    public Employee role(EmployeeRole role) {
        this.role = role;
        return this;
    }

    public void setRole(EmployeeRole role) {
        this.role = role;
    }

    public CommandRole getCommandRole() {
        return commandRole;
    }

    public Employee commandRole(CommandRole commandRole) {
        this.commandRole = commandRole;
        return this;
    }

    public void setCommandRole(CommandRole commandRole) {
        this.commandRole = commandRole;
    }

    public String getUsername() {
        return username;
    }

    public Employee username(String username) {
        this.username = username;
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstname() {
        return firstname;
    }

    public Employee firstname(String firstname) {
        this.firstname = firstname;
        return this;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getSecondname() {
        return secondname;
    }

    public Employee secondname(String secondname) {
        this.secondname = secondname;
        return this;
    }

    public void setSecondname(String secondname) {
        this.secondname = secondname;
    }

    public String getSurename() {
        return surename;
    }

    public Employee surename(String surename) {
        this.surename = surename;
        return this;
    }

    public void setSurename(String surename) {
        this.surename = surename;
    }

    public String getEmail() {
        return email;
    }

    public Employee email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobilePhone() {
        return mobilePhone;
    }

    public Employee mobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
        return this;
    }

    public void setMobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
    }

    public String getOrganization() {
        return organization;
    }

    public Employee organization(String organization) {
        this.organization = organization;
        return this;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getDepartment() {
        return department;
    }

    public Employee department(String department) {
        this.department = department;
        return this;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getCountry() {
        return country;
    }

    public Employee country(String country) {
        this.country = country;
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public Employee streetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
        return this;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public Employee postalCode(String postalCode) {
        this.postalCode = postalCode;
        return this;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return city;
    }

    public Employee city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStateProvince() {
        return stateProvince;
    }

    public Employee stateProvince(String stateProvince) {
        this.stateProvince = stateProvince;
        return this;
    }

    public void setStateProvince(String stateProvince) {
        this.stateProvince = stateProvince;
    }

    public Integer getRank() {
        return rank;
    }

    public Employee rank(Integer rank) {
        this.rank = rank;
        return this;
    }

    public void setRank(Integer rank) {
        this.rank = rank;
    }

    public Set<Task> getCompletedTasks() {
        return completedTasks;
    }

    public Employee completedTasks(Set<Task> tasks) {
        this.completedTasks = tasks;
        return this;
    }

    public Employee addCompletedTasks(Task task) {
        this.completedTasks.add(task);
        task.setPerformer(this);
        return this;
    }

    public Employee removeCompletedTasks(Task task) {
        this.completedTasks.remove(task);
        task.setPerformer(null);
        return this;
    }

    public void setCompletedTasks(Set<Task> tasks) {
        this.completedTasks = tasks;
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
        Employee employee = (Employee) o;
        if (employee.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), employee.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Employee{" +
            "id=" + getId() +
            ", role='" + getRole() + "'" +
            ", commandRole='" + getCommandRole() + "'" +
            ", username='" + getUsername() + "'" +
            ", firstname='" + getFirstname() + "'" +
            ", secondname='" + getSecondname() + "'" +
            ", surename='" + getSurename() + "'" +
            ", email='" + getEmail() + "'" +
            ", mobilePhone='" + getMobilePhone() + "'" +
            ", organization='" + getOrganization() + "'" +
            ", department='" + getDepartment() + "'" +
            ", country='" + getCountry() + "'" +
            ", streetAddress='" + getStreetAddress() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", city='" + getCity() + "'" +
            ", stateProvince='" + getStateProvince() + "'" +
            ", rank=" + getRank() +
            "}";
    }
}
