package com.taller.sistema_taller.model.ReportGeneration;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.ByteArrayOutputStream;
import java.util.List;

import org.springframework.stereotype.Component;
@Component
public class ReportGenerator {

    public byte[] generatePDF(List<ReportSection> sections, ReportType reportType) {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Document document = new Document();

        try {
            PdfWriter.getInstance(document, outputStream);
            document.open();
            ReportWriter reportWriter = new ReportWriter(document);
            reportWriter.addMainTitle(getMainTitleForReportType(reportType));
            for (ReportSection section : sections) {
                section.generateSection(reportWriter);
            }

            document.close();
        } catch (DocumentException e) {
            e.printStackTrace();
        }

        return outputStream.toByteArray();
    }

    private String getMainTitleForReportType(ReportType reportType) {
        switch (reportType) {
            case FULL_REPORT:
                return "Reporte General";
            case VEHICLE_DATA_REPORT:
                return "Reporte de Datos del Vehículo";
            case DIAGNOSES_REPORT:
                return "Reporte de Diagnósticos";
            case MAINTENANCE_REPORT:
                return "Reporte de Mantenimiento";
            default:
                return "Report";
        }
    }
}
