package com.mycompany.taller_v2.UserAccounts;


import com.mycompany.taller_v2.InvoiceGeneration.Invoice;
import com.mycompany.taller_v2.InvoiceGeneration.InvoiceGenerator;
import com.mycompany.taller_v2.MaintenanceManagement.MaintenanceAdvance;
import com.mycompany.taller_v2.MaintenanceManagement.MaintenanceStatus;
import com.mycompany.taller_v2.SatisfactionSurveys.SatisfactionSurvey;
import com.mycompany.taller_v2.VehicleManagement.ClientVehicle;
import java.util.List;

public class AdminAccount extends UserAccount {

    public AdminAccount(Long userId , String name, String phone, AccessCredentials accessCredentials) {
        super(userId , name, phone, accessCredentials);
    }

    public void authorizeVehicleMaintenance(ClientVehicle vehicle) {
        vehicle.getMaintenanceManager().setMaintenanceStatus(MaintenanceStatus.IN_PROGRESS);
        // checar que mas hace
    }

    public List<SatisfactionSurvey> viewSatisfactionSurveys() {
        
        return null;
    }

    public Invoice generateInvoiceForClient(ClientAccount client , ClientVehicle vehicle) {
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

