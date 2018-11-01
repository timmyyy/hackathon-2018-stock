package io.github.hackathon2018.stock.service.dto;

public class FeedbackDTO {

    private Long id;

    private Integer rank;

    private RequestDTO request;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getRank() {
        return rank;
    }

    public void setRank(Integer rank) {
        this.rank = rank;
    }

    public RequestDTO getRequest() {
        return request;
    }

    public void setRequest(RequestDTO request) {
        this.request = request;
    }
}
