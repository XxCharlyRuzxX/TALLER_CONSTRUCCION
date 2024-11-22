package com.taller.sistema_taller.model.InvoiceGeneration;

import com.taller.sistema_taller.model.UserAccounts.UserAccount;
import com.taller.sistema_taller.model.VehicleManagement.ClientVehicle;
import com.taller.sistema_taller.model.VehicleManagement.VehicleDiagnosis;

import java.util.Date;
import java.util.List;

public class Invoice {
    private final UserAccount client;
    private final ClientVehicle vehicle;
    private final List<VehicleDiagnosis> authorizedDiagnoses;
    private final float total;
    private final Date generationDate;

    public Invoice(UserAccount client, ClientVehicle vehicle, List<VehicleDiagnosis> authorizedDiagnoses, float total) {
        this.client = client;
        this.vehicle = vehicle;
        this.authorizedDiagnoses = authorizedDiagnoses;
        this.total = total;
        this.generationDate = new Date();
    }

    public UserAccount getClient() {
        return client;
    }

    public ClientVehicle getVehicle() {
        return vehicle;
    }

    public List<VehicleDiagnosis> getAuthorizedDiagnoses() {
        return authorizedDiagnoses;
    }

    public float getTotal() {
        return total;
    }

    public Date getGenerationDate() {
        return generationDate;
    }
}
