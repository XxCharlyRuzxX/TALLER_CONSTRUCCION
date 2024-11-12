package com.taller.sistema_taller.model.VehicleManagement;

import com.taller.sistema_taller.model.MaintenanceManagement.MaintenanceManager;
import jakarta.persistence.*;

@Entity
public class ClientVehicle {
    @Id
    private String idVehicle ;
    private Long clientId;
    @Embedded
    private StaticVehicleData staticVehicleData;
    @Embedded
    private NonStaticVehicleData nonStaticVehicleData;
    @OneToOne(cascade = CascadeType.ALL)
    private DiagnosisManager diagnosisManager;
    @OneToOne(cascade = CascadeType.ALL)
    private MaintenanceManager maintenanceManager;

    public ClientVehicle(Long idClient, StaticVehicleData staticVehicleData,NonStaticVehicleData nonStaticVehicleData) {
        this.idVehicle =  idClient + staticVehicleData.getLicensePlate();
        this.clientId = idClient;
        this.staticVehicleData = staticVehicleData;
        this.nonStaticVehicleData = nonStaticVehicleData;
        this.diagnosisManager = new DiagnosisManager();
        this.maintenanceManager = new MaintenanceManager();
    }

    public ClientVehicle() {
    }

    public String getIdVehicle() {
        return idVehicle;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public void setIdVehicle(String idVehicle) {
        this.idVehicle = idVehicle;
    }

    public StaticVehicleData getStaticVehicleData() {
        return staticVehicleData;
    }

    public void updateStaticVehicleData(StaticVehicleData staticVehicleData) {
        this.staticVehicleData = staticVehicleData;
    }

    public void updateNonStaticVehicleData(NonStaticVehicleData nonStaticVehicleData) {
        this.nonStaticVehicleData = nonStaticVehicleData;
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
