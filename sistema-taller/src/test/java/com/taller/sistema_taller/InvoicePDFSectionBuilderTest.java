package com.taller.sistema_taller;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.taller.sistema_taller.model.InvoiceGeneration.InvoicePDFSectionBuilder;
import com.taller.sistema_taller.model.UserAccounts.AccessCredentials;
import com.taller.sistema_taller.model.UserAccounts.UserAccount;
import com.taller.sistema_taller.model.VehicleManagement.ClientVehicle;
import com.taller.sistema_taller.model.VehicleManagement.StaticVehicleData;
import com.taller.sistema_taller.model.VehicleManagement.VehicleDiagnosis;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;



public class InvoicePDFSectionBuilderTest {

    private InvoicePDFSectionBuilder invoicePDFSectionBuilder;
    private Document document;

    @BeforeEach
    public void setUp() {
        invoicePDFSectionBuilder = new InvoicePDFSectionBuilder();
        document = mock(Document.class);
    }

    @Test
    public void testAddInvoiceHeader() throws DocumentException {
        invoicePDFSectionBuilder.addInvoiceHeader(document);
        verify(document, times(2)).add(any(Paragraph.class));
    }

    @Test
    public void testAddClientDetails() throws DocumentException {
        UserAccount client = mock(UserAccount.class);
        when(client.getUserName()).thenReturn("John Doe");
        AccessCredentials accessCredentials = mock(AccessCredentials.class);
        when(client.getAccessCredentials()).thenReturn(accessCredentials);
        when(accessCredentials.getEmail()).thenReturn("john.doe@example.com");
        when(client.getAccessCredentials()).thenReturn(accessCredentials);
        when(accessCredentials.getEmail()).thenReturn("john.doe@example.com");

        invoicePDFSectionBuilder.addClientDetails(document, client);
        verify(document, times(4)).add(any(Paragraph.class));
    }

    @Test
    public void testAddVehicleDetails() throws DocumentException {
        ClientVehicle vehicle = mock(ClientVehicle.class);
        when(vehicle.getIdVehicle()).thenReturn("12345");
        StaticVehicleData staticVehicleData = mock(StaticVehicleData.class);
        when(vehicle.getStaticVehicleData()).thenReturn(staticVehicleData);
        when(staticVehicleData.getModel()).thenReturn("Toyota Corolla");
        when(vehicle.getStaticVehicleData()).thenReturn(staticVehicleData);
        when(staticVehicleData.getModel()).thenReturn("Toyota Corolla");

        invoicePDFSectionBuilder.addVehicleDetails(document, vehicle);
        verify(document, times(4)).add(any(Paragraph.class));
    }

    @Test
    public void testAddAuthorizedDiagnoses() throws DocumentException {
        VehicleDiagnosis diagnosis1 = mock(VehicleDiagnosis.class);
        when(diagnosis1.getIdDiagnosis()).thenReturn(1L);
        when(diagnosis1.getProblemDetail()).thenReturn("Engine issue");
        when(diagnosis1.getMaintenanceCost()).thenReturn(500.0f);

        VehicleDiagnosis diagnosis2 = mock(VehicleDiagnosis.class);
        when(diagnosis2.getIdDiagnosis()).thenReturn(2L);
        when(diagnosis2.getProblemDetail()).thenReturn("Brake issue");
        when(diagnosis2.getMaintenanceCost()).thenReturn(300.0f);

        List<VehicleDiagnosis> diagnoses = Arrays.asList(diagnosis1, diagnosis2);

        invoicePDFSectionBuilder.addAuthorizedDiagnoses(document, diagnoses);
        verify(document, times(9)).add(any(Paragraph.class));
    }

    @Test
    public void testAddInvoiceTotal() throws DocumentException {
        invoicePDFSectionBuilder.addInvoiceTotal(document, 800.0f);
        verify(document, times(1)).add(any(Paragraph.class));
    }
}