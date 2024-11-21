package com.taller.sistema_taller.controller;


import com.taller.sistema_taller.dto.SatisfactionSurveyDTO;
import com.taller.sistema_taller.model.SatisfactionSurveys.SatisfactionSurvey;
import com.taller.sistema_taller.service.survey_service.interfaces.SatisfactionSurveyServiceInterface;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/satisfaction-surveys")
public class SatisfactionSurveyController {

    private final SatisfactionSurveyServiceInterface surveyService;

    @Autowired
    public SatisfactionSurveyController(SatisfactionSurveyServiceInterface surveyService) {
        this.surveyService = surveyService;
    }

    @PostMapping
    public ResponseEntity<SatisfactionSurvey> createSurvey(@RequestBody SatisfactionSurveyDTO surveyDTO) {
        SatisfactionSurvey survey = surveyService.createSurvey(surveyDTO);
        return ResponseEntity.ok(survey);
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<SatisfactionSurvey>> getSurveysByClientId(@PathVariable Long clientId) {
        List<SatisfactionSurvey> surveys = surveyService.getSurveysByClientId(clientId);
        return ResponseEntity.ok(surveys);
    }
}
