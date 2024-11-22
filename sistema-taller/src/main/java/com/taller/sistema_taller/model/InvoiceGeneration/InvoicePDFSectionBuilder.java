package com.taller.sistema_taller.model.InvoiceGeneration;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Paragraph;
import com.taller.sistema_taller.model.UserAccounts.UserAccount;
import com.taller.sistema_taller.model.VehicleManagement.ClientVehicle;
import com.taller.sistema_taller.model.VehicleManagement.VehicleDiagnosis;

import java.util.List;

public class InvoicePDFSectionBuilder {

    public void addInvoiceHeader(Document document) throws DocumentException {
        Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
        document.add(new Paragraph("Invoice", headerFont));
        document.add(new Paragraph(" "));
    }

    public void addClientDetails(Document document, UserAccount client) throws DocumentException {
        Font subHeaderFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14);
        Font regularFont = FontFactory.getFont(FontFactory.HELVETICA, 12);

        document.add(new Paragraph("Client Details:", subHeaderFont));
        document.add(new Paragraph("Name: " + client.getUserName(), regularFont));
        document.add(new Paragraph("Email: " + client.getAccessCredentials().getEmail(), regularFont));
        document.add(new Paragraph(" "));
    }

    public void addVehicleDetails(Document document, ClientVehicle vehicle) throws DocumentException {
        Font subHeaderFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14);
        Font regularFont = FontFactory.getFont(FontFactory.HELVETICA, 12);

        document.add(new Paragraph("Vehicle Details:", subHeaderFont));
        document.add(new Paragraph("Vehicle ID: " + vehicle.getIdVehicle(), regularFont));
        document.add(new Paragraph("Vehicle Model: " + vehicle.getStaticVehicleData().getModel(), regularFont));
        document.add(new Paragraph(" "));
    }

    public void addAuthorizedDiagnoses(Document document, List<VehicleDiagnosis> diagnoses) throws DocumentException {
        Font subHeaderFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14);
        Font regularFont = FontFactory.getFont(FontFactory.HELVETICA, 12);

        document.add(new Paragraph("Authorized Diagnoses:", subHeaderFont));
        for (VehicleDiagnosis diagnosis : diagnoses) {
            document.add(new Paragraph("Diagnosis ID: " + diagnosis.getIdDiagnosis(), regularFont));
            document.add(new Paragraph("Problem Detail: " + diagnosis.getProblemDetail(), regularFont));
            document.add(new Paragraph("Cost: $" + diagnosis.getMaintenanceCost(), regularFont));
            document.add(new Paragraph(" "));
        }
    }

    public void addInvoiceTotal(Document document, float total) throws DocumentException {
        Font subHeaderFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14);
        document.add(new Paragraph("Total: $" + total, subHeaderFont));
    }
}

