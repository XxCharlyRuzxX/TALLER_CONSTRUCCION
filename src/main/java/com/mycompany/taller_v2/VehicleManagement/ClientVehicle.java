package com.mycompany.taller_v2.VehicleManagement;

import com.mycompany.taller_v2.MaintenanceManagement.MaintenanceManager;

public class ClientVehicle {
    private final Long idClient;
    private StaticVehicleData staticVehicleData;
    private DynamicVehicleData dynamicVehicleData;
    private final DiagnosisManager diagnosisManager;    
    private final MaintenanceManager maintenanceManager; 

    public ClientVehicle(Long idClient, StaticVehicleData staticVehicleData, DynamicVehicleData dynamicVehicleData) {
        this.idClient = idClient;
        this.staticVehicleData = staticVehicleData;
        this.dynamicVehicleData = dynamicVehicleData;
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

    public DynamicVehicleData getDynamicVehicleData() {
        return dynamicVehicleData;
    }

    public void updateDynamicVehicleData(DynamicVehicleData dynamicVehicleData) {
        this.dynamicVehicleData = dynamicVehicleData;
    }

    public DiagnosisManager getDiagnosisManager() {
        return diagnosisManager;
    }

    public MaintenanceManager getMaintenanceManager() {
        return maintenanceManager;
    }
    
    

    
}
