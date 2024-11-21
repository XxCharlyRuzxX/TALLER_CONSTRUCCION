package com.taller.sistema_taller.model.ReportGeneration;

import com.itextpdf.text.DocumentException;

public interface ReportSection {
    void generateSection(ReportWriter reportWriter) throws DocumentException;
}
