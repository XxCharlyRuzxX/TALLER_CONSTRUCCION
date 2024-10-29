package com.mycompany.taller_v2.SatisfactionSurveys;

import com.mycompany.taller_v2.UserAccounts.ClientAccount;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class SatisfactionSurvey {
    private ClientAccount client;
    private Map<String, String> responses;
    private Date surveyDate;

    public SatisfactionSurvey(ClientAccount client, Map<String, String> responses, Date surveyDate) {
        this.client = client;
        this.responses = responses;
        this.surveyDate = surveyDate;
    }

    public SatisfactionSurvey showSurveyForClient(ClientAccount client) {
        // Lógica para obtener y devolver la encuesta de satisfacción del cliente
        // Este método debe implementar lógica adicional para buscar la encuesta del cliente en la base de datos o lista
        return this; // Devuelve la encuesta actual, podría ser reemplazado por la lógica de búsqueda
    }

    // Método para guardar las respuestas de la encuesta de un cliente específico
    public void saveSurveyResponses(ClientAccount client, Map<String, String> responses) {
        // Lógica para almacenar las respuestas de la encuesta en el sistema
        this.responses = responses; // Guarda las respuestas proporcionadas
    }

    // Método para consultar todas las respuestas de satisfacción
    public List<SatisfactionSurvey> getSurveyResponses() {
        // Lógica para devolver todas las encuestas de satisfacción almacenadas en el sistema
        // Esto podría ser un acceso a base de datos en una implementación real
        return List.of(this);
    }

    // Getters y Setters
    public ClientAccount getClient() {
        return client;
    }

    public void setClient(ClientAccount client) {
        this.client = client;
    }

    public Map<String, String> getResponses() {
        return responses;
    }

    public void setResponses(Map<String, String> responses) {
        this.responses = responses;
    }

    public Date getSurveyDate() {
        return surveyDate;
    }

    public void setSurveyDate(Date surveyDate) {
        this.surveyDate = surveyDate;
    }
}
