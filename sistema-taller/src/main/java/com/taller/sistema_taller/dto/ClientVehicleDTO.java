package com.taller.sistema_taller.dto;

public class ClientVehicleDTO {
  private String idVehicle;
  private Long clientId;
  private String brand;
  private String model;
  private int year;
  private String licensePlate;
  private int mileage;
  private float fuelLevel;
  private String additionalObservations;

  public String getIdVehicle() {
    return idVehicle;
  }

  public void setIdVehicle(String idVehicle) {
    this.idVehicle = idVehicle;
  }

  public Long getClientId() {
    return clientId;
  }

  public void setClientId(Long clientId) {
    this.clientId = clientId;
  }

  public String getBrand() {
    return brand;
  }

  public void setBrand(String brand) {
    this.brand = brand;
  }

  public String getModel() {
    return model;
  }

  public void setModel(String model) {
    this.model = model;
  }

  public int getYear() {
    return year;
  }

  public void setYear(int year) {
    this.year = year;
  }

  public String getLicensePlate() {
    return licensePlate;
  }

  public void setLicensePlate(String licensePlate) {
    this.licensePlate = licensePlate;
  }

  public String getAdditionalObservations() {
    return additionalObservations;
  }

  public void setAdditionalObservations(String additionalObservations) {
    this.additionalObservations = additionalObservations;
  }

  public float getFuelLevel() {
    return fuelLevel;
  }

  public void setFuelLevel(float fuelLevel) {
    this.fuelLevel = fuelLevel;
  }

  public int getMileage() {
    return mileage;
  }

  public void setMileage(int mileage) {
    this.mileage = mileage;
  }
}
