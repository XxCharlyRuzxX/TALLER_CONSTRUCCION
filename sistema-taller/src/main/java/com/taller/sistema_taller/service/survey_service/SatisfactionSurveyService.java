package com.taller.sistema_taller.service.survey_service;

import com.taller.sistema_taller.dto.SatisfactionSurveyDTO;
import com.taller.sistema_taller.model.SatisfactionSurveys.SatisfactionSurvey;
import com.taller.sistema_taller.model.UserAccounts.ClientAccount;
import com.taller.sistema_taller.repositories.SatisfactionSurveyRepository;
import com.taller.sistema_taller.repositories.UserAccountRepository;
import com.taller.sistema_taller.service.survey_service.interfaces.SatisfactionSurveyServiceInterface;
import com.taller.sistema_taller.service.survey_service.survey_validations.SatisfactionSurveyValidator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SatisfactionSurveyService implements SatisfactionSurveyServiceInterface {

    private final SatisfactionSurveyRepository surveyRepository;
    private final UserAccountRepository userAccountRepository;
    private final SatisfactionSurveyValidator validator;

    @Autowired
    public SatisfactionSurveyService(SatisfactionSurveyRepository surveyRepository,
            UserAccountRepository userAccountRepository,
            SatisfactionSurveyValidator validator) {
        this.surveyRepository = surveyRepository;
        this.userAccountRepository = userAccountRepository;
        this.validator = validator;
    }

    @Override
    public SatisfactionSurvey registerSurvey(SatisfactionSurveyDTO surveyDTO) {
        validator.validateSurveyData(surveyDTO);
        ClientAccount client = validator.validateClientExists(surveyDTO.getClientId(), userAccountRepository);

        SatisfactionSurvey survey = new SatisfactionSurvey(
                surveyDTO.getRating(),
                surveyDTO.getFeedback(),
                client);

        return surveyRepository.save(survey);
    }

    @Override
    public List<SatisfactionSurvey> getSurveysByClientId(Long clientId) {
        ClientAccount client = validator.validateClientExists(clientId, userAccountRepository);
        return surveyRepository.findByRespondent_UserId(client.getUserId());
    }

}
