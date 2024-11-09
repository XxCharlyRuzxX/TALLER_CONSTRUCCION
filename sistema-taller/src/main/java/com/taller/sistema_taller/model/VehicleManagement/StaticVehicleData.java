package com.taller.sistema_taller.model.VehicleManagement;

import jakarta.persistence.Embeddable;

@Embeddable
public class StaticVehicleData {
    private String brand;
    private String model;
    private int year;
    private String licensePlate;

    public StaticVehicleData(String brand, String model, int year, String licensePlate) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.licensePlate = licensePlate;
    }

    public StaticVehicleData() {
    }

    public String getBrand() {
        return brand;
    }

    public String getModel() {
        return model;
    }

    public int getYear() {
        return year;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void updateLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

}
