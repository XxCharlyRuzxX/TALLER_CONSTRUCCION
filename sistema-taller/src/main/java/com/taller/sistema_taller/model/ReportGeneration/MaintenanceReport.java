package com.taller.sistema_taller.model.ReportGeneration;

import com.itextpdf.text.DocumentException;
import com.taller.sistema_taller.model.MaintenanceManagement.MaintenanceAdvance;
import com.taller.sistema_taller.model.MaintenanceManagement.MaintenanceManager;
import com.taller.sistema_taller.model.MaintenanceManagement.MaintenanceStatus;

import java.util.List;

public class MaintenanceReport implements ReportSection {
    private final List<MaintenanceAdvance> advances;
    private final MaintenanceStatus maintenanceStatus;

    public MaintenanceReport(MaintenanceManager maintenanceManager) {
        this.advances = maintenanceManager.getMaintenanceProgresses();
        this.maintenanceStatus = maintenanceManager.getMaintenanceStatus();
    }

    @Override
    public void generateSection(ReportWriter reportWriter) throws DocumentException {
        reportWriter.addTitle("Proceso de Mantenimiento");
        reportWriter.addBoldKeyValue("Estatus del Mantenimineto", maintenanceStatus.name());

        if (advances.isEmpty()) {
            reportWriter.addNoDataMessage(" sin datosdatos de mantenimeinto.");
        } else {
            String[] headers = {"Fecha", "Descripcion"};
            String[][] data = advances.stream().map(advance -> new String[]{
                    advance.getDate().toString(),
                    advance.getDescription()
            }).toArray(String[][]::new);

            reportWriter.addTable(headers, data);
        }
    }
}
