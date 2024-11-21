package com.taller.sistema_taller.service.report_service;

import com.taller.sistema_taller.model.ReportGeneration.*;
import com.taller.sistema_taller.model.VehicleManagement.ClientVehicle;
import com.taller.sistema_taller.service.report_service.interfaces.ReportServiceInterface;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService implements ReportServiceInterface {
    private final ReportGenerator reportGenerator;

    public ReportService() {
        this.reportGenerator = new ReportGenerator();
    }

    @Override
    public byte[] generateReport(ClientVehicle vehicle, ReportType reportType) {
        List<ReportSection> sections = ReportBuilder.buildReportSections(vehicle, reportType);

        return reportGenerator.generatePDF(sections , reportType);
    }
}
