package com.taller.sistema_taller.model.VehicleManagement;

public class StaticVehicleData {
    private final String brand;
    private final String model;
    private final int year;
    private String licensePlate;

    public StaticVehicleData(String brand, String model, int year, String licensePlate) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.licensePlate = licensePlate;
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
