package com.taller.sistema_taller.model.InvoiceGeneration;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.PdfWriter;
import com.taller.sistema_taller.model.UserAccounts.UserAccount;
import com.taller.sistema_taller.model.VehicleManagement.ClientVehicle;
import com.taller.sistema_taller.model.VehicleManagement.VehicleDiagnosis;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

public class InvoiceGenerator {

    private final InvoicePDFSectionBuilder pdfSectionBuilder;

    public InvoiceGenerator() {
        this.pdfSectionBuilder = new InvoicePDFSectionBuilder();
    }

    public Invoice generateInvoice(UserAccount client, ClientVehicle vehicle, float total) {
        List<VehicleDiagnosis> authorizedDiagnoses = vehicle.getDiagnosisManager().getAuthorizedDiagnoses();
        return new Invoice(client, vehicle, authorizedDiagnoses, total);
    }

    public byte[] exportInvoiceToPDF(Invoice invoice) {
        try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {
            Document document = new Document();
            PdfWriter.getInstance(document, byteArrayOutputStream);
            document.open();

            pdfSectionBuilder.addInvoiceHeader(document);
            pdfSectionBuilder.addClientDetails(document, invoice.getClient());
            pdfSectionBuilder.addVehicleDetails(document, invoice.getVehicle());
            pdfSectionBuilder.addAuthorizedDiagnoses(document, invoice.getAuthorizedDiagnoses());
            pdfSectionBuilder.addInvoiceTotal(document, invoice.getTotal());

            document.close();
            return byteArrayOutputStream.toByteArray();
        } catch (DocumentException | IOException e) {
            throw new RuntimeException("Error generating PDF invoice", e);
        }
    }
}
