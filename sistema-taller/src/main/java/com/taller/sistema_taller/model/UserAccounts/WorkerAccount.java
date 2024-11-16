package com.taller.sistema_taller.model.UserAccounts;

import com.taller.sistema_taller.model.MaintenanceManagement.MaintenanceStatus;
import com.taller.sistema_taller.model.VehicleManagement.ClientVehicle;
import java.util.List;
import jakarta.persistence.Entity;

@Entity
public class WorkerAccount extends UserAccount {

    public WorkerAccount(Long userId, String userName, String phone, String email, String password) {
        super(userId, userName, phone, email, password);
    }

    public WorkerAccount() {
    }

    public void registerMaintenanceProgress(ClientVehicle vehicle, String descrpition, List<String>imagesAdvance) {
        if (imagesAdvance != null) {
            vehicle.getMaintenanceManager().addMaintenanceAdvanceWithoutImage(descrpition);
        } else {
            vehicle.getMaintenanceManager().addMaintenanceAdvanceWithImages(descrpition, imagesAdvance);
        }
    }

    public MaintenanceStatus viewVehicleStatus(ClientVehicle vehicle) {
        return vehicle.getMaintenanceManager().getMaintenanceStatus();
    }
}
