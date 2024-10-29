package com.mycompany.taller_v2.ReportGeneration;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import com.mycompany.taller_v2.MaintenanceManagement.MaintenanceAdvance;
import com.mycompany.taller_v2.VehicleManagement.ClientVehicle;
import com.mycompany.taller_v2.VehicleManagement.PartsDiagnosis;
import com.mycompany.taller_v2.VehicleManagement.VehicleDiagnosis;
import java.io.ByteArrayOutputStream;
import java.util.Date;
import java.util.List;

public class ReportGenerator {

    public ReportGenerator() {
    }
    
    

    public FinalProcessReport generateFinalReport(ClientVehicle vehicle) {
        List<VehicleDiagnosis> vehicleDiagnoses = vehicle.getDiagnosisManager().getMaintenanceDiagnoses();
        List<PartsDiagnosis> partsDiagnoses = vehicle.getDiagnosisManager().getPartsDiagnoses();
        List<MaintenanceAdvance> advances = vehicle.getMaintenanceManager().getMaintenanceProgresses();
        float totalCost = vehicle.getDiagnosisManager().calculateTotalCost();
        Date finalizationDate = new Date();

        return new FinalProcessReport(vehicleDiagnoses, partsDiagnoses, advances, totalCost, finalizationDate);
    }

    public byte[] exportReportToPDF(FinalProcessReport report) {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Document document = new Document();

        try {
            PdfWriter.getInstance(document, outputStream);
            document.open();

            // Encabezado del reporte
            document.add(new Paragraph("Final Process Report"));
            document.add(new Paragraph("Date: " + report.getFinalizationDate().toString()));
            document.add(new Paragraph("Total Cost: $" + report.getTotalCost()));
            document.add(new Paragraph("\n"));

            // Diagnósticos de mantenimiento
            document.add(new Paragraph("Maintenance Diagnoses:"));
            for (VehicleDiagnosis diagnosis : report.getVehicleDiagnoses()) {
                document.add(new Paragraph("- " + diagnosis.getProblemDetail() + ": $" + diagnosis.getMaintenanceCost()));
            }

            document.add(new Paragraph("\n"));

            // Diagnósticos de piezas
            document.add(new Paragraph("Parts Diagnoses:"));
            for (PartsDiagnosis part : report.getPartsDiagnoses()) {
                document.add(new Paragraph("- " + part.getPartDetail() + ": $" + part.getPartCost()));
            }

            document.add(new Paragraph("\n"));

            // Avances de mantenimiento
            document.add(new Paragraph("Maintenance Advances:"));
            for (MaintenanceAdvance advance : report.getAdvances()) {
                document.add(new Paragraph("- Date: " + advance.getDate() + " | Description: " + advance.getDescription()));
            }

            document.close();
        } catch (DocumentException e) {
            e.printStackTrace();
        }

        return outputStream.toByteArray();
    }
}
