package com.taller.sistema_taller.model.ReportGeneration;

import com.itextpdf.text.DocumentException;
import com.taller.sistema_taller.model.VehicleManagement.ClientVehicle;

public class VehicleDataReport implements ReportSection {
    private final ClientVehicle vehicle;

    public VehicleDataReport(ClientVehicle vehicle) {
        this.vehicle = vehicle;
    }

    @Override
    public void generateSection(ReportWriter reportWriter) throws DocumentException {
        reportWriter.addTitle("Datos del Vehículo");
        reportWriter.addBoldKeyValue("Marca", vehicle.getStaticVehicleData().getBrand());
        reportWriter.addBoldKeyValue("Modelo", vehicle.getStaticVehicleData().getModel());
        reportWriter.addBoldKeyValue("Año", String.valueOf(vehicle.getStaticVehicleData().getYear()));
        reportWriter.addBoldKeyValue("Placa", vehicle.getStaticVehicleData().getLicensePlate());
    }
}
