package com.taller.sistema_taller.model.UserAccounts;

import com.taller.sistema_taller.model.InvoiceGeneration.Invoice;
import com.taller.sistema_taller.model.InvoiceGeneration.InvoiceGenerator;
import com.taller.sistema_taller.model.MaintenanceManagement.MaintenanceAdvance;
import com.taller.sistema_taller.model.MaintenanceManagement.MaintenanceStatus;
import com.taller.sistema_taller.model.SatisfactionSurveys.SatisfactionSurvey;
import com.taller.sistema_taller.model.VehicleManagement.ClientVehicle;
import java.util.List;

public class AdminAccount extends UserAccount {

    public AdminAccount(Long userId, String name, String phone, AccessCredentials accessCredentials) {
        super(userId, name, phone, accessCredentials);
    }

    public void authorizeVehicleMaintenance(ClientVehicle vehicle) {
        vehicle.getMaintenanceManager().setMaintenanceStatus(MaintenanceStatus.IN_PROGRESS);
        // checar que mas hace
    }

    public List<SatisfactionSurvey> viewSatisfactionSurveys() {

        return null;
    }

    public Invoice generateInvoiceForClient(ClientAccount client, ClientVehicle vehicle) {
        InvoiceGenerator invoiceGenerator = new InvoiceGenerator();
        invoiceGenerator.generateInvoice(client, vehicle, vehicle.getDiagnosisManager().calculateAuthorizedTotalCost());
        return null;
    }

    public void completeVehicleMaintenance(ClientVehicle vehicle) {
        vehicle.getMaintenanceManager().setMaintenanceStatus(MaintenanceStatus.COMPLETED);
    }

    public List<MaintenanceAdvance> getVehicleAdvances(ClientVehicle vehicle) {
        vehicle.getMaintenanceManager().getMaintenanceProgresses();
        return null;
    }
}
