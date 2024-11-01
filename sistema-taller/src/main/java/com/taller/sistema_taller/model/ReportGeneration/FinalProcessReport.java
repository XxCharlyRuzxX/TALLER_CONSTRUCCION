package com.taller.sistema_taller.model.ReportGeneration;

import com.taller.sistema_taller.model.VehicleManagement.PartsDiagnosis;
import com.taller.sistema_taller.model.MaintenanceManagement.MaintenanceAdvance;
import com.taller.sistema_taller.model.VehicleManagement.VehicleDiagnosis;
import java.util.Date;
import java.util.List;

public class FinalProcessReport {
    private final List<VehicleDiagnosis> vehicleDiagnoses;
    private final List<PartsDiagnosis> partsDiagnoses;
    private final List<MaintenanceAdvance> advances;
    private final float totalCost;
    private final Date finalizationDate;

    public FinalProcessReport(List<VehicleDiagnosis> vehicleDiagnoses, List<PartsDiagnosis> partsDiagnoses, List<MaintenanceAdvance> advances, float totalCost, Date finalizationDate) {
        this.vehicleDiagnoses = vehicleDiagnoses;
        this.partsDiagnoses = partsDiagnoses;
        this.advances = advances;
        this.totalCost = totalCost;
        this.finalizationDate = finalizationDate;
    }

    public List<VehicleDiagnosis> getMaintenanceDiagnoses() {
        return vehicleDiagnoses;
    }

    public List<PartsDiagnosis> getPartsDiagnoses() {
        return partsDiagnoses;
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
