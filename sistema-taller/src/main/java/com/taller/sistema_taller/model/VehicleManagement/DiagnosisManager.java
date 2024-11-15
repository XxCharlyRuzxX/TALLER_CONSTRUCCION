package com.taller.sistema_taller.model.VehicleManagement;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.*;

@Entity
public class DiagnosisManager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDiagnosisManager;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<VehicleDiagnosis> vehicleDiagnoses;

    public Long getIdDiagnosisManager() {
        return idDiagnosisManager;
    }

    public DiagnosisManager() {
        this.vehicleDiagnoses = new ArrayList<>();
    }

    public void addDiagnosis(VehicleDiagnosis diagnosis) {
        this.vehicleDiagnoses.add(diagnosis);
    }

    public List<VehicleDiagnosis> getDiagnoses() {
        return vehicleDiagnoses;
    }

    public boolean removeDiagnosisById(Long id) {
        return vehicleDiagnoses.removeIf(diagnosis -> diagnosis.getIdDiagnosis().equals(id));
    }

    public List<VehicleDiagnosis> getAuthorizedDiagnoses() {
        List<VehicleDiagnosis> authorizedDiagnoses = new ArrayList<>();
        for (VehicleDiagnosis diagnosis : vehicleDiagnoses) {
            if (diagnosis.isAuthorized()) {
                authorizedDiagnoses.add(diagnosis);
            }
        }
        return authorizedDiagnoses;
    }

    public float calculateTotalDiagnosisCost() {
        float totalCost = 0;
        for (VehicleDiagnosis diagnosis : vehicleDiagnoses) {
            totalCost += diagnosis.getTotalCost();
        }
        return totalCost;
    }

    public float calculateAuthorizedDiagnosisCost() {
        float authorizedTotalCost = 0;
        for (VehicleDiagnosis diagnosis : getAuthorizedDiagnoses()) {
            authorizedTotalCost += diagnosis.getTotalCost();
        }
        return authorizedTotalCost;
    }
}
