package com.taller.sistema_taller.model.ReportGeneration;

import com.itextpdf.text.DocumentException;
import com.taller.sistema_taller.model.VehicleManagement.VehicleDiagnosis;

import java.util.List;

public class DiagnosticsReport implements ReportSection {
    private final List<VehicleDiagnosis> diagnoses;

    public DiagnosticsReport(List<VehicleDiagnosis> diagnoses) {
        this.diagnoses = diagnoses;
    }

    @Override
    public void generateSection(ReportWriter reportWriter) throws DocumentException {
        reportWriter.addTitle("Diagnosticos");

        if (diagnoses.isEmpty()) {
            reportWriter.addNoDataMessage("sin datos de diagnosticos ");
        } else {
            String[] headers = {"Detalle del problema", "Costo", "Partes"};
            String[][] data = diagnoses.stream().map(diagnosis -> new String[]{
                    diagnosis.getProblemDetail(),
                    "$" + diagnosis.getMaintenanceCost(),
                    diagnosis.getPartsList().isEmpty() ? "None" : String.valueOf(diagnosis.getPartsList().size())
            }).toArray(String[][]::new);

            reportWriter.addTable(headers, data);
        }
    }
}
