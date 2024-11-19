package com.taller.sistema_taller.model.ReportGeneration;

import com.taller.sistema_taller.model.MaintenanceManagement.MaintenanceAdvance;
import com.taller.sistema_taller.model.VehicleManagement.VehicleDiagnosis;
import java.util.Date;
import java.util.List;

public class FinalProcessReport {
    private final List<VehicleDiagnosis> vehicleDiagnoses;
    private final List<MaintenanceAdvance> advances;
    private final float totalCost;
    private final Date finalizationDate;

    public FinalProcessReport(List<VehicleDiagnosis> vehicleDiagnoses, List<MaintenanceAdvance> advances,
        float totalCost, Date finalizationDate) {
        this.vehicleDiagnoses = vehicleDiagnoses;
        this.advances = advances;
        this.totalCost = totalCost;
        this.finalizationDate = finalizationDate;
    }

    public List<VehicleDiagnosis> getMaintenanceDiagnoses() {
        return vehicleDiagnoses;
    }

    public List<MaintenanceAdvance> getAdvances() {
        return advances;
    }

    public List<VehicleDiagnosis> getVehicleDiagnoses() {
        return vehicleDiagnoses;
    }

    public float getTotalCost() {
        return totalCost;
    }

    public Date getFinalizationDate() {
        return finalizationDate;
    }

}
