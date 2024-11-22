package com.taller.sistema_taller.service.survey_service.survey_validations;

import com.taller.sistema_taller.dto.SatisfactionSurveyDTO;
import com.taller.sistema_taller.exceptions.survey_exceptions.SurveyValidationException;
import com.taller.sistema_taller.exceptions.user_exceptions.UserNotFoundException;
import com.taller.sistema_taller.model.UserAccounts.ClientAccount;
import com.taller.sistema_taller.repositories.UserAccountRepository;

import org.springframework.stereotype.Component;

@Component
public class SatisfactionSurveyValidator {

    private static final int MIN_RATING = 1;
    private static final int MAX_RATING = 5;
    private static final int MAX_FEEDBACK_LENGTH = 500;

    public void validateSurveyData(SatisfactionSurveyDTO surveyDTO) {
        validateRating(surveyDTO.getRating());
        validateFeedback(surveyDTO.getFeedback());
        validateClientId(surveyDTO.getClientId());
    }

    private void validateRating(int rating) {
        if (rating < MIN_RATING || rating > MAX_RATING) {
            throw new SurveyValidationException(
                    "La calificación debe estar entre " + MIN_RATING + " y " + MAX_RATING + ".");
        }
    }

    private void validateFeedback(String feedback) {
        if (feedback != null && feedback.length() > MAX_FEEDBACK_LENGTH) {
            throw new SurveyValidationException(
                    "Los comentarios no pueden superar los " + MAX_FEEDBACK_LENGTH + " caracteres.");
        }
    }

    private void validateClientId(Long clientId) {
        if (clientId == null) {
            throw new SurveyValidationException("El ID del cliente no puede estar vacío.");
        }
    }

    public ClientAccount validateClientExists(Long clientId, UserAccountRepository userAccountRepository) {
        return userAccountRepository.findById(clientId)
                .filter(ClientAccount.class::isInstance)
                .map(ClientAccount.class::cast)
                .orElseThrow(() -> new UserNotFoundException(
                        "No se encontró un cliente con ID " + clientId));
    }
}
