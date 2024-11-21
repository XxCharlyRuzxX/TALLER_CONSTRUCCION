package com.taller.sistema_taller.repositories;


import com.taller.sistema_taller.model.SatisfactionSurveys.SatisfactionSurvey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SatisfactionSurveyRepository extends JpaRepository<SatisfactionSurvey, Long> {

    List<SatisfactionSurvey> findByRespondent_UserId(Long userId);
}

