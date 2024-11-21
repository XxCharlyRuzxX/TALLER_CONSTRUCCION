package com.taller.sistema_taller.model.SatisfactionSurveys;

import com.taller.sistema_taller.model.UserAccounts.ClientAccount;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class SatisfactionSurvey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long surveyId;

    @Column(nullable = false)
    private int rating;

    @Column(length = 500)
    private String feedback;

    @Column(nullable = false, updatable = false)
    private LocalDateTime submittedAt;

    @ManyToOne(optional = false)
    @JoinColumn(name = "client_id", nullable = false)
    private ClientAccount respondent;

    public SatisfactionSurvey() {
        this.submittedAt = LocalDateTime.now();
    }

    public SatisfactionSurvey(int rating, String feedback, ClientAccount respondent) {
        this.rating = rating;
        this.feedback = feedback;
        this.respondent = respondent;
        this.submittedAt = LocalDateTime.now();
    }

    public Long getId() {
        return surveyId;
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

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public ClientAccount getClientAccount() {
        return respondent;
    }

    public void setClientAccount(ClientAccount respondent) {
        this.respondent = respondent;
    }
}

