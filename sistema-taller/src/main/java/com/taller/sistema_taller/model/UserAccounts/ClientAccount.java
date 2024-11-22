package com.taller.sistema_taller.model.UserAccounts;

import com.taller.sistema_taller.model.InvoiceGeneration.Invoice;
import com.taller.sistema_taller.model.InvoiceGeneration.InvoiceGenerator;
import com.taller.sistema_taller.model.MaintenanceManagement.MaintenanceStatus;
import com.taller.sistema_taller.model.VehicleManagement.ClientVehicle;

import jakarta.persistence.Entity;

@Entity
public class ClientAccount extends UserAccount {

    public ClientAccount(Long userId, String userName, String phone, String email, String password) {
        super(userId, userName, phone, email, password);
    }

    public ClientAccount(){}

    public void authorizeDiagnostic(ClientVehicle vehicle) {
        if (vehicle == null) {
            throw new IllegalArgumentException("Vehicle cannot be null");
        }

        vehicle.getDiagnosisManager().getDiagnoses().forEach(diagnosis -> {
            if (!diagnosis.isAuthorized()) {
                diagnosis.setAuthorized(true);
            }
        });
    }


    public byte[] requestInvoice(ClientVehicle vehicle, float total) {
        if (vehicle == null) {
            throw new IllegalArgumentException("Vehicle cannot be null");
        }

        InvoiceGenerator invoiceGenerator = new InvoiceGenerator();
        Invoice invoice = invoiceGenerator.generateInvoice(this, vehicle, total);
        return invoiceGenerator.exportInvoiceToPDF(invoice);
    }


    public MaintenanceStatus  checkVehicleStatus(ClientVehicle vehicle) {
        if (vehicle == null) {
            throw new IllegalArgumentException("Vehicle cannot be null");
        }

        return vehicle.getMaintenanceManager().getMaintenanceStatus();
    }
}
