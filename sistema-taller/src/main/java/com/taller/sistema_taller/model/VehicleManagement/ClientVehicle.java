package com.taller.sistema_taller.model.VehicleManagement;

import com.taller.sistema_taller.model.MaintenanceManagement.MaintenanceManager;

public class ClientVehicle {
    private final Long idClient;
    private StaticVehicleData staticVehicleData;
    private NonStaticVehicleData nonStaticVehicleData;
    private final DiagnosisManager diagnosisManager;
    private final MaintenanceManager maintenanceManager;

    public ClientVehicle(Long idClient, StaticVehicleData staticVehicleData, NonStaticVehicleData nonStaticVehicleData) {
        this.idClient = idClient;
        this.staticVehicleData = staticVehicleData;
        this.nonStaticVehicleData = nonStaticVehicleData;
        this.diagnosisManager = new DiagnosisManager();
        this.maintenanceManager = new MaintenanceManager();
    }

    public Long getIdClient() {
        return idClient;
    }

    public StaticVehicleData getStaticVehicleData() {
        return staticVehicleData;
    }

    public void updateStaticVehicleData(StaticVehicleData staticVehicleData) {
        this.staticVehicleData = staticVehicleData;
    }

    public NonStaticVehicleData getDynamicVehicleData() {
        return nonStaticVehicleData;
    }

    public NonStaticVehicleData getNonStaticVehicleData() {
      return nonStaticVehicleData;
    }

    public DiagnosisManager getDiagnosisManager() {
        return diagnosisManager;
    }

    public MaintenanceManager getMaintenanceManager() {
        return maintenanceManager;
    }

}
