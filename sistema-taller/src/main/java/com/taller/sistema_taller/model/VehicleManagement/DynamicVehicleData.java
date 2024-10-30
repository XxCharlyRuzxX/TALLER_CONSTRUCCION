
package com.taller.sistema_taller.model.VehicleManagement;

public class DynamicVehicleData {
    private int mileage;
    private float fuelLevel;
    private String additionalObservations;

    public DynamicVehicleData(int mileage, float fuelLevel, String additionalObservations) {
        this.mileage = mileage;
        this.fuelLevel = fuelLevel;
        this.additionalObservations = additionalObservations;
    }

    public int getMileage() {
        return mileage;
    }

    public float getFuelLevel() {
        return fuelLevel;
    }

    public String getAdditionalObservations() {
        return additionalObservations;
    }

    public void updateMileage(int newMileage) {
        this.mileage = newMileage;
    }

    public void updateFuelLevel(float newFuelLevel) {
        this.fuelLevel = newFuelLevel;
    }

    public void updateObservations(String newObservations) {
        this.additionalObservations = newObservations;
    }

}
