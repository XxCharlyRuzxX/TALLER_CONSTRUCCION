package com.taller.sistema_taller.dto;

import java.util.List;

public class MaintenanceManagerDTO {
    private Long idMaintenanceManager;
    private String maintenanceStatus;
    private List<MaintenanceAdvanceDTO> maintenanceProgresses;

    // Getters y setters
    public Long getIdMaintenanceManager() {
        return idMaintenanceManager;
    }

    public void setIdMaintenanceManager(Long idMaintenanceManager) {
        this.idMaintenanceManager = idMaintenanceManager;
    }

    public String getMaintenanceStatus() {
        return maintenanceStatus;
    }

    public void setMaintenanceStatus(String maintenanceStatus) {
        this.maintenanceStatus = maintenanceStatus;
    }

    public List<MaintenanceAdvanceDTO> getMaintenanceProgresses() {
        return maintenanceProgresses;
    }

    public void setMaintenanceProgresses(List<MaintenanceAdvanceDTO> maintenanceProgresses) {
        this.maintenanceProgresses = maintenanceProgresses;
    }
}
