package com.taller.sistema_taller.service.report_service;

import com.taller.sistema_taller.model.ReportGeneration.*;
import com.taller.sistema_taller.model.VehicleManagement.ClientVehicle;
import com.taller.sistema_taller.service.report_service.interfaces.ReportServiceInterface;
import com.taller.sistema_taller.service.vehicle_service.ClientVehicleService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService implements ReportServiceInterface {
    private final ReportGenerator reportGenerator;
    private final ClientVehicleService clientVehicleService;

    public ReportService(ReportGenerator reportGenerator, ClientVehicleService clientVehicleService) {
        this.reportGenerator = reportGenerator;
        this.clientVehicleService = clientVehicleService;
    }

    @Override
    public byte[] generateReport(String vehicleId, ReportType reportType) {
        ClientVehicle vehicle = clientVehicleService.findVehicleById(vehicleId);
        List<ReportSection> sections = ReportBuilder.buildReportSections(vehicle, reportType);
        return reportGenerator.generatePDF(sections, reportType);
    }
}
