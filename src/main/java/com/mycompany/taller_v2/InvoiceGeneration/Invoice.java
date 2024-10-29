package com.mycompany.taller_v2.InvoiceGeneration;

import com.mycompany.taller_v2.UserAccounts.UserAccount;
import com.mycompany.taller_v2.VehicleManagement.ClientVehicle;
import com.mycompany.taller_v2.VehicleManagement.DiagnosisManager;
import com.mycompany.taller_v2.VehicleManagement.PartsDiagnosis;
import com.mycompany.taller_v2.VehicleManagement.VehicleDiagnosis;
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
