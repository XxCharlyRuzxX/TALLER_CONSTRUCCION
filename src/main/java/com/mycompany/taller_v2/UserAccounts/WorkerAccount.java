package com.mycompany.taller_v2.UserAccounts;

import com.mycompany.taller_v2.MaintenanceManagement.MaintenanceStatus;
import com.mycompany.taller_v2.VehicleManagement.ClientVehicle;
import java.util.List;


public class WorkerAccount extends UserAccount {

    public WorkerAccount(Long userId , String name, String phone, AccessCredentials accessCredentials) {
        super(userId , name, phone, accessCredentials);
    }

    public void registerMaintenanceProgress(ClientVehicle vehicle , String descrpition , List<byte[]> imagesAdvance) {
        if (imagesAdvance != null){
            vehicle.getMaintenanceManager().addMaintenanceAdvance(descrpition);
        }
        else{
            vehicle.getMaintenanceManager().addMaintenanceAdvance(descrpition , imagesAdvance);
        }
    }

    public MaintenanceStatus viewVehicleStatus(ClientVehicle vehicle) {
        return vehicle.getMaintenanceManager().getMaintenanceStatus();
    }
}

