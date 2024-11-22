package com.taller.sistema_taller.service.report_service.interfaces;

import com.taller.sistema_taller.model.ReportGeneration.ReportType;

public interface ReportServiceInterface {

  byte[] generateReport(String vehicleId, ReportType reportType);

}
