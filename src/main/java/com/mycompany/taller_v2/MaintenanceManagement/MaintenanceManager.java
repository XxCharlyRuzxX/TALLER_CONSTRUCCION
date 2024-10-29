
package com.mycompany.taller_v2.MaintenanceManagement;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MaintenanceManager {
    private final List<MaintenanceAdvance> maintenanceProgresses;
    private MaintenanceStatus maintenanceStatus;

    public MaintenanceManager() {
        this.maintenanceProgresses = new ArrayList<>();
        this.maintenanceStatus = MaintenanceStatus.PENDING; // Estado inicial
    }

    public void addMaintenanceProgress(Date date, String description, Image image) {
        this.maintenanceProgresses.add(new MaintenanceAdvance(date, description, image));
    }

    public List<MaintenanceAdvance> getMaintenanceProgresses() {
        return maintenanceProgresses;
    }

    // Métodos para manejar el estado de mantenimiento
    public MaintenanceStatus getMaintenanceStatus() {
        return maintenanceStatus;
    }

    public void setMaintenanceStatus(MaintenanceStatus newStatus) {
        this.maintenanceStatus = newStatus;
    }
}

