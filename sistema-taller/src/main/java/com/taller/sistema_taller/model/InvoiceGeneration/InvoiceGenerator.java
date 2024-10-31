package com.taller.sistema_taller.model.InvoiceGeneration;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import com.taller.sistema_taller.model.UserAccounts.ClientAccount;
import com.taller.sistema_taller.model.VehicleManagement.ClientVehicle;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Date;

public class InvoiceGenerator {

    public Invoice generateInvoice(ClientAccount client, ClientVehicle vehicle, float total) {
        Date generationDate = new Date();
        return new Invoice(client, vehicle, total, generationDate);
    }

    public byte[] generateInvoiceToPDF(Invoice invoice) {
        try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {
            Document document = new Document();
            PdfWriter.getInstance(document, byteArrayOutputStream);
            document.open();

            // Encabezado del PDF
            Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            document.add(new Paragraph("Invoice", headerFont));

            Font regularFont = FontFactory.getFont(FontFactory.HELVETICA, 12);
            document.add(new Paragraph("Date: " + invoice.getGenerationDate(), regularFont));

            // Detalles del cliente
            Font subHeaderFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14);
            document.add(new Paragraph("Client Details:", subHeaderFont));
            document.add(new Paragraph("Name: " + invoice.getClient().getUserName(), regularFont));
            document.add(new Paragraph("Email: " + invoice.getClient().getAccessCredentials().getEmail(), regularFont));

            // Detalles del vehículo
            document.add(new Paragraph("Vehicle Details:", subHeaderFont));
            document.add(new Paragraph("Vehicle ID: " + invoice.getVehicle().getIdClient(), regularFont));
            document.add(new Paragraph("Vehicle Model: " + invoice.getVehicle().getStaticVehicleData().getModel(),
                    regularFont));

            // Total de la factura
            document.add(new Paragraph("Total: $" + invoice.getTotal(), subHeaderFont));

            document.close();
            return byteArrayOutputStream.toByteArray();
        } catch (DocumentException | IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
