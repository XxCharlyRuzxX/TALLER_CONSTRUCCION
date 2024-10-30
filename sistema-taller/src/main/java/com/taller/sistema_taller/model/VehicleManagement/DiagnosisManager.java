package com.taller.sistema_taller.model.VehicleManagement;

import java.util.ArrayList;
import java.util.List;

public class DiagnosisManager {
    private final List<VehicleDiagnosis> vehicleDiagnoses;
    private final List<PartsDiagnosis> partsDiagnoses;

    public DiagnosisManager() {
        this.vehicleDiagnoses = new ArrayList<>();
        this.partsDiagnoses = new ArrayList<>();
    }

    public void addMaintenanceDiagnosis(VehicleDiagnosis diagnosis) {
        this.vehicleDiagnoses.add(diagnosis);
    }

    public List<VehicleDiagnosis> getMaintenanceDiagnoses() {
        return vehicleDiagnoses;
    }

    public boolean removeMaintenanceDiagnosisById(Long id) {
        return vehicleDiagnoses.removeIf(diagnosis -> diagnosis.getIdDiagnosis().equals(id));
    }

    public boolean removePartsDiagnosisById(Long id) {
        return partsDiagnoses.removeIf(diagnosis -> diagnosis.getIdPartDiagnosis().equals(id));
    }

    public void addPartsDiagnosis(PartsDiagnosis diagnosis) {
        this.partsDiagnoses.add(diagnosis);
    }

    public List<PartsDiagnosis> getPartsDiagnoses() {
        return partsDiagnoses;
    }

    public List<VehicleDiagnosis> getAuthorizedMaintenanceDiagnoses() {
        List<VehicleDiagnosis> authorizedDiagnoses = new ArrayList<>();

        for (VehicleDiagnosis diagnosis : vehicleDiagnoses) {
            if (diagnosis.isAuthorized()) {
                authorizedDiagnoses.add(diagnosis);
            }
        }

        return authorizedDiagnoses;
    }

    public List<PartsDiagnosis> getAuthorizedPartsDiagnoses() {
        List<PartsDiagnosis> authorizedParts = new ArrayList<>();

        for (PartsDiagnosis diagnosis : partsDiagnoses) {
            if (diagnosis.isAuthorized()) {
                authorizedParts.add(diagnosis);
            }
        }

        return authorizedParts;
    }

    public float calculateTotalCost() {
        float totalCost = 0;
        for (VehicleDiagnosis diagnosis : vehicleDiagnoses) {
            totalCost += diagnosis.getMaintenanceCost();
        }
        for (PartsDiagnosis part : partsDiagnoses) {
            totalCost += part.getPartCost();
        }
        return totalCost;
    }

    public float calculateAuthorizedTotalCost() {
        float authorizedTotalCost = 0;
        for (VehicleDiagnosis diagnosis : getAuthorizedMaintenanceDiagnoses()) {
            authorizedTotalCost += diagnosis.getMaintenanceCost();
        }
        for (PartsDiagnosis part : getAuthorizedPartsDiagnoses()) {
            authorizedTotalCost += part.getPartCost();
        }
        return authorizedTotalCost;
    }

}
