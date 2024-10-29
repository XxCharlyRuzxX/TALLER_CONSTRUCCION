package com.mycompany.taller_v2.UserAccounts;


import com.mycompany.taller_v2.VehicleManagement.ClientVehicle;
import java.util.List;

public class AdminAccount extends UserAccount {

    public AdminAccount(String name, String phone, AccessCredentials accessCredentials) {
        super(name, phone, accessCredentials);
    }

    public void authorizeVehicleMaintenance(Client client, Diagnostic diagnostic) {
        // Logic to authorize maintenance
    }

    public List<SatisfactionSurvey> viewSatisfactionSurveys() {
        // Logic to get satisfaction surveys
        return null;
    }

    public Invoice generateInvoiceForClient(Client client) {
        // Logic to generate invoice
        return null;
    }

    public void completeVehicleMaintenance(ClientVehicle vehicle) {
        // Logic to complete maintenance
    }

    public List<MaintenanceReport> getVehicleReports() {
        // Logic to get vehicle maintenance reports
        return null;
    }
}

