package com.taller.sistema_taller.model.InvoiceGeneration;

import com.taller.sistema_taller.model.UserAccounts.UserAccount;
import com.taller.sistema_taller.model.VehicleManagement.ClientVehicle;
import com.taller.sistema_taller.model.VehicleManagement.DiagnosisManager;
import com.taller.sistema_taller.model.VehicleManagement.PartsDiagnosis;
import com.taller.sistema_taller.model.VehicleManagement.VehicleDiagnosis;
import java.util.Date;
import java.util.List;

public class Invoice {
    private final UserAccount client;
    private final ClientVehicle vehicle;
    private final DiagnosisManager diagnosisManager;
    private final float total;
    private final Date generationDate;

    public Invoice(UserAccount client, ClientVehicle vehicle, float total, Date generationDate) {
        this.client = client;
        this.vehicle = vehicle;
        this.total = total;
        this.generationDate = generationDate;
        this.diagnosisManager = vehicle.getDiagnosisManager();
    }

    public UserAccount getClient() {
        return client;
    }

    public ClientVehicle getVehicle() {
        return vehicle;
    }

    public float getTotal() {
        return total;
    }

    public Date getGenerationDate() {
        return generationDate;
    }

    public List<VehicleDiagnosis> getAuthorizedMaintenanceDiagnoses() {
        return diagnosisManager.getMaintenanceDiagnoses();
    }

    public List<PartsDiagnosis> getAuthorizedPartsDiagnoses() {
        return diagnosisManager.getAuthorizedPartsDiagnoses();
    }
}
