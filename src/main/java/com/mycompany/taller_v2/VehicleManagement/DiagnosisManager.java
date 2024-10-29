package com.mycompany.taller_v2.VehicleManagement;

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
}
