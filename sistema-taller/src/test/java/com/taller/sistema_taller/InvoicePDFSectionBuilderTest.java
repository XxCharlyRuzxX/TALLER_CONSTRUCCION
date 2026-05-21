package com.taller.sistema_taller;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.PdfWriter;
import com.taller.sistema_taller.model.InvoiceGeneration.InvoicePDFSectionBuilder;
import com.taller.sistema_taller.model.UserAccounts.UserAccount;
import com.taller.sistema_taller.model.VehicleManagement.ClientVehicle;
import com.taller.sistema_taller.model.VehicleManagement.NonStaticVehicleData;
import com.taller.sistema_taller.model.VehicleManagement.StaticVehicleData;
import com.taller.sistema_taller.model.VehicleManagement.VehicleDiagnosis;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.ByteArrayOutputStream;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class InvoicePDFSectionBuilderTest {

    private InvoicePDFSectionBuilder invoicePDFSectionBuilder;

    @BeforeEach
    public void setUp() {
        invoicePDFSectionBuilder = new InvoicePDFSectionBuilder();
    }

    private Document createOpenDocument(ByteArrayOutputStream outputStream) throws DocumentException {
        Document document = new Document();
        PdfWriter.getInstance(document, outputStream);
        document.open();
        return document;
    }

    @Test
    public void testAddInvoiceHeader() throws DocumentException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Document document = createOpenDocument(outputStream);
        invoicePDFSectionBuilder.addInvoiceHeader(document);
        document.close();
        assertTrue(outputStream.size() > 0);
    }

    @Test
    public void testAddClientDetails() throws DocumentException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Document document = createOpenDocument(outputStream);
        UserAccount client = new UserAccount(1L, "John Doe", "5550000", "john.doe@example.com", "password");

        invoicePDFSectionBuilder.addClientDetails(document, client);
        document.close();
        assertTrue(outputStream.size() > 0);
    }

    @Test
    public void testAddVehicleDetails() throws DocumentException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Document document = createOpenDocument(outputStream);
        StaticVehicleData staticVehicleData = new StaticVehicleData("Toyota", "Corolla", 2022, "XYZ123");
        NonStaticVehicleData nonStaticVehicleData = new NonStaticVehicleData(10000, 0.5f, "No observations");
        ClientVehicle vehicle = new ClientVehicle(1L, staticVehicleData, nonStaticVehicleData);
        vehicle.setIdVehicle("12345");

        invoicePDFSectionBuilder.addVehicleDetails(document, vehicle);
        document.close();
        assertTrue(outputStream.size() > 0);
    }

    @Test
    public void testAddAuthorizedDiagnoses() throws DocumentException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Document document = createOpenDocument(outputStream);
        VehicleDiagnosis diagnosis1 = new VehicleDiagnosis("Engine issue", 500.0f, new Date());
        VehicleDiagnosis diagnosis2 = new VehicleDiagnosis("Brake issue", 300.0f, new Date());

        List<VehicleDiagnosis> diagnoses = Arrays.asList(diagnosis1, diagnosis2);

        invoicePDFSectionBuilder.addAuthorizedDiagnoses(document, diagnoses);
        document.close();
        assertTrue(outputStream.size() > 0);
    }

    @Test
    public void testAddInvoiceTotal() throws DocumentException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Document document = createOpenDocument(outputStream);
        invoicePDFSectionBuilder.addInvoiceTotal(document, 800.0f);
        document.close();
        assertTrue(outputStream.size() > 0);
    }
}