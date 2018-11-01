package io.github.hackathon2018.stock.service.dto;

import io.github.hackathon2018.stock.domain.enumeration.ResponseStatus;

public class RespondDTO {
    private Long id;

    private ResponseStatus status;

    private EmployeeDTO employee;

    private RequestDTO request;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ResponseStatus getStatus() {
        return status;
    }

    public void setStatus(ResponseStatus status) {
        this.status = status;
    }

    public EmployeeDTO getEmployee() {
        return employee;
    }

    public void setEmployee(EmployeeDTO employee) {
        this.employee = employee;
    }

    public RequestDTO getRequest() {
        return request;
    }

    public void setRequest(RequestDTO request) {
        this.request = request;
    }
}
