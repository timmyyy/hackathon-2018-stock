package io.github.hackathon2018.stock.service.dto;

import io.github.hackathon2018.stock.domain.enumeration.CommandRole;
import io.github.hackathon2018.stock.domain.enumeration.EmployeeRole;

import java.util.HashSet;
import java.util.Set;

public class EmployeeDTO {

    private Long id;

    private EmployeeRole role;

    private CommandRole commandRole;

    private String username;

    private String firstname;

    private String secondname;

    private String surename;

    private String email;

    private String mobilePhone;

    private String organization;

    private String department;

    private String country;

    private String streetAddress;

    private String postalCode;

    private String city;

    private String stateProvince;

    private Integer rank;

    private Set<TaskDTO> completedTasks = new HashSet<>();


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EmployeeRole getRole() {
        return role;
    }

    public void setRole(EmployeeRole role) {
        this.role = role;
    }

    public CommandRole getCommandRole() {
        return commandRole;
    }

    public void setCommandRole(CommandRole commandRole) {
        this.commandRole = commandRole;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getSecondname() {
        return secondname;
    }

    public void setSecondname(String secondname) {
        this.secondname = secondname;
    }

    public String getSurename() {
        return surename;
    }

    public void setSurename(String surename) {
        this.surename = surename;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobilePhone() {
        return mobilePhone;
    }

    public void setMobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStateProvince() {
        return stateProvince;
    }

    public void setStateProvince(String stateProvince) {
        this.stateProvince = stateProvince;
    }

    public Integer getRank() {
        return rank;
    }

    public void setRank(Integer rank) {
        this.rank = rank;
    }

    public Set<TaskDTO> getCompletedTasks() {
        return completedTasks;
    }

    public void setCompletedTasks(Set<TaskDTO> completedTasks) {
        this.completedTasks = completedTasks;
    }
}
