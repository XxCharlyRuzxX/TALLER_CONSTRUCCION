package com.taller.sistema_taller.dto;


public class SatisfactionSurveyDTO {

    private int rating;
    private String feedback;
    private Long clientId;

    public SatisfactionSurveyDTO() {
    }

    public SatisfactionSurveyDTO(int rating, String feedback, Long clientId) {
        this.rating = rating;
        this.feedback = feedback;
        this.clientId = clientId;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }
}

