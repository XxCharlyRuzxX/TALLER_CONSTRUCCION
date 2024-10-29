package com.mycompany.taller_v2.VehicleManagement;



import java.util.Date;

public class VehicleDiagnosis {
    private Long idDiagnosis; 
    private String problemDetail;
    private float maintenanceCost;
    private Date evaluationDate;
    private boolean isAuthorized; 

    public VehicleDiagnosis(String problemDetail, float maintenanceCost, Date evaluationDate) {
        this.problemDetail = problemDetail;
        this.maintenanceCost = maintenanceCost;
        this.evaluationDate = evaluationDate;
        this.isAuthorized = false;
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
    
    

}

