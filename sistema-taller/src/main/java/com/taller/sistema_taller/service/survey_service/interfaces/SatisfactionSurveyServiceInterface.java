package com.taller.sistema_taller.service.survey_service.interfaces;

import com.taller.sistema_taller.dto.SatisfactionSurveyDTO;
import com.taller.sistema_taller.model.SatisfactionSurveys.SatisfactionSurvey;

import java.util.List;

public interface SatisfactionSurveyServiceInterface {

    SatisfactionSurvey createSurvey(SatisfactionSurveyDTO surveyDTO);

    List<SatisfactionSurvey> getSurveysByClientId(Long clientId);
}
