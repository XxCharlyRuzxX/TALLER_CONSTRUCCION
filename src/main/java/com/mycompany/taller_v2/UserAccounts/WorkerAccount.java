package com.mycompany.taller_v2.UserAccounts;

import com.mycompany.taller_v2.VehicleManagement.ClientVehicle;


public class WorkerAccount extends UserAccount {

    public WorkerAccount(String name, String phone, AccessCredentials accessCredentials) {
        super(name, phone, accessCredentials);
    }

    public void registerMaintenanceProgress(Maintenance maintenance, String description, Image image) {
        // Logic to register maintenance progress
    }

    public String viewVehicleStatus(ClientVehicle vehicle) {
        // Logic to view the status of the vehicle
        return null;
    }
}

