package com.taller.sistema_taller.model.ReportGeneration;

import com.taller.sistema_taller.model.VehicleManagement.ClientVehicle;

import java.util.ArrayList;
import java.util.List;

public class ReportBuilder {

    public static List<ReportSection> buildReportSections(ClientVehicle vehicle, ReportType reportType) {
        List<ReportSection> sections = new ArrayList<>();

        switch (reportType) {
            case FULL_REPORT:
                sections.add(new VehicleDataReport(vehicle));
                sections.add(new DiagnosticsReport(vehicle.getDiagnosisManager().getDiagnoses()));
                sections.add(new MaintenanceReport(vehicle.getMaintenanceManager()));
                break;

            case VEHICLE_DATA_REPORT:
                sections.add(new VehicleDataReport(vehicle));
                break;

            case DIAGNOSES_REPORT:
                sections.add(new DiagnosticsReport(vehicle.getDiagnosisManager().getDiagnoses()));
                break;

            case MAINTENANCE_REPORT:
                sections.add(new MaintenanceReport(vehicle.getMaintenanceManager()));
                break;

            default:
                throw new IllegalArgumentException("Unknown report type: " + reportType);
        }

        return sections;
    }
}
