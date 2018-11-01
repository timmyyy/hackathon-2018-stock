package io.github.hackathon2018.stock.service.dto;

import java.util.Set;

public class NotificationsToEmployeesDTO {

    private Set<Long> employeeIds;

    private Long requestId;

    public Set<Long> getEmployeeIds() {
        return employeeIds;
    }

    public void setEmployeeIds(Set<Long> employeeIds) {
        this.employeeIds = employeeIds;
    }

    public Long getRequestId() {
        return requestId;
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

    @Override
    public String toString() {
        return "NotificationsToEmployeesDTO{" +
            "employeeIds=" + employeeIds +
            ", requestId=" + requestId +
            '}';
    }
}
