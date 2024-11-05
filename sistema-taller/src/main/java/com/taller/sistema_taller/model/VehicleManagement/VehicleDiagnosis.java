package com.taller.sistema_taller.model.VehicleManagement;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class VehicleDiagnosis {
    private Long idDiagnosis;
    private String problemDetail;
    private float maintenanceCost;
    private Date evaluationDate;
    private boolean isAuthorized;
    private List<PartDiagnosis> partsList;

    public VehicleDiagnosis(String problemDetail, float maintenanceCost, Date evaluationDate) {
        this.problemDetail = problemDetail;
        this.maintenanceCost = maintenanceCost;
        this.evaluationDate = evaluationDate;
        this.isAuthorized = false;
        this.partsList = new ArrayList<>();
    }

    public Long getIdDiagnosis() {
        return idDiagnosis;
    }

    public String getProblemDetail() {
        return problemDetail;
    }

    public float getMaintenanceCost() {
        return maintenanceCost;
    }


    public Date getEvaluationDate() {
        return evaluationDate;
    }

    public boolean isAuthorized() {
        return isAuthorized;
    }

    public void setProblemDetail(String problemDetail) {
        this.problemDetail = problemDetail;
    }

    public void setMaintenanceCost(float maintenanceCost) {
        this.maintenanceCost = maintenanceCost;
    }

    public void setEvaluationDate(Date evaluationDate) {
        this.evaluationDate = evaluationDate;
    }

    public void setAuthorized(boolean isAccepted) {
        this.isAuthorized = isAccepted;
    }

    public void addPart(PartDiagnosis part) {
        this.partsList.add(part);
    }

    public List<PartDiagnosis> getPartsList() {
        return partsList;
    }

    public float getTotalCost() {
        float totalPartCost = 0;
        for (PartDiagnosis part : partsList) {
            totalPartCost += part.getPartCost();
        }
        return maintenanceCost + totalPartCost;
    }
}
