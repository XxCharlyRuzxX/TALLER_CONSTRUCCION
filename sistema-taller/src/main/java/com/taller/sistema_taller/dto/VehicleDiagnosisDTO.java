package com.taller.sistema_taller.dto;

import java.util.Date;
import java.util.List;
import jakarta.validation.constraints.NotNull;

public class VehicleDiagnosisDTO {

    private Long idDiagnosis;

    @NotNull
    private String problemDetail;

    @NotNull
    private float maintenanceCost;

    @NotNull
    private Date evaluationDate;

    private boolean isAuthorized;

    private List<PartDiagnosisDTO> partsList;

    public VehicleDiagnosisDTO() {
    }

    public VehicleDiagnosisDTO(Long idDiagnosis, String problemDetail, float maintenanceCost, Date evaluationDate, boolean isAuthorized, List<PartDiagnosisDTO> partsList) {
        this.idDiagnosis = idDiagnosis;
        this.problemDetail = problemDetail;
        this.maintenanceCost = maintenanceCost;
        this.evaluationDate = evaluationDate;
        this.isAuthorized = isAuthorized;
        this.partsList = partsList;
    }

    public Long getIdDiagnosis() {
        return idDiagnosis;
    }

    public void setIdDiagnosis(Long idDiagnosis) {
        this.idDiagnosis = idDiagnosis;
    }

    public String getProblemDetail() {
        return problemDetail;
    }

    public void setProblemDetail(String problemDetail) {
        this.problemDetail = problemDetail;
    }

    public float getMaintenanceCost() {
        return maintenanceCost;
    }

    public void setMaintenanceCost(float maintenanceCost) {
        this.maintenanceCost = maintenanceCost;
    }

    public Date getEvaluationDate() {
        return evaluationDate;
    }

    public void setEvaluationDate(Date evaluationDate) {
        this.evaluationDate = evaluationDate;
    }

    public boolean isAuthorized() {
        return isAuthorized;
    }

    public void setAuthorized(boolean authorized) {
        isAuthorized = authorized;
    }

    public List<PartDiagnosisDTO> getPartsList() {
        return partsList;
    }

    public void setPartsList(List<PartDiagnosisDTO> partsList) {
        this.partsList = partsList;
    }
}
