package com.taller.sistema_taller.service.survey_service.survey_validations;


import com.taller.sistema_taller.dto.SatisfactionSurveyDTO;
import com.taller.sistema_taller.exceptions.survey_exceptions.SurveyValidationException;

import org.springframework.stereotype.Component;

@Component
public class SatisfactionSurveyValidator {

    public void validateSurveyData(SatisfactionSurveyDTO surveyDTO) {
        if (surveyDTO.getRating() < 1 || surveyDTO.getRating() > 5) {
            throw new SurveyValidationException("La calificación debe estar entre 1 y 5.");
        }

        if (surveyDTO.getFeedback() != null && surveyDTO.getFeedback().length() > 500) {
            throw new SurveyValidationException("Los comentarios no pueden superar los 500 caracteres.");
        }

        if (surveyDTO.getClientId() == null) {
            throw new SurveyValidationException("El ID del cliente no puede estar vacío.");
        }
    }
}
