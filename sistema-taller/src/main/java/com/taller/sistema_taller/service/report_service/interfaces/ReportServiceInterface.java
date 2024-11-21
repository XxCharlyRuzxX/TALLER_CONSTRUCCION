package com.taller.sistema_taller.service.report_service.interfaces;

import com.taller.sistema_taller.model.ReportGeneration.ReportType;
import com.taller.sistema_taller.model.VehicleManagement.ClientVehicle;

public interface ReportServiceInterface {

  byte[] generateReport(ClientVehicle vehicle, ReportType reportType);

}
