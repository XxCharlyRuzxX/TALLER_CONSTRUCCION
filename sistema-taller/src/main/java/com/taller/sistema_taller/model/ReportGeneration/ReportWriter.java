package com.taller.sistema_taller.model.ReportGeneration;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPTable;

public class ReportWriter {
    private final Document document;

    public ReportWriter(Document document) {
        this.document = document;
    }

    public void addMainTitle(String title) {
        try {
            Font mainTitleFont = new Font(Font.FontFamily.HELVETICA, 20, Font.BOLD);
            Paragraph titleParagraph = new Paragraph(title, mainTitleFont);
            titleParagraph.setSpacingAfter(20);
            titleParagraph.setAlignment(Element.ALIGN_CENTER);
            document.add(titleParagraph);
        } catch (DocumentException e) {
            e.printStackTrace();
        }
    }

    public void addTitle(String title) {
        try {
            Font titleFont = new Font(Font.FontFamily.HELVETICA, 16, Font.BOLD);
            Paragraph titleParagraph = new Paragraph(title, titleFont);
            titleParagraph.setSpacingAfter(15);
            document.add(titleParagraph);
        } catch (DocumentException e) {
            e.printStackTrace();
        }
    }

    public void addBoldKeyValue(String key, String value) {
        try {
            Font boldFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD);
            Font normalFont = new Font(Font.FontFamily.HELVETICA, 12, Font.NORMAL);

            Chunk keyChunk = new Chunk(key + ": ", boldFont);
            Chunk valueChunk = new Chunk(value, normalFont);

            Paragraph paragraph = new Paragraph();
            paragraph.add(keyChunk);
            paragraph.add(valueChunk);
            paragraph.setSpacingAfter(10);

            document.add(paragraph);
        } catch (DocumentException e) {
            e.printStackTrace();
        }
    }

    public void addTable(String[] headers, String[][] data) {
        try {
            PdfPTable table = new PdfPTable(headers.length);
            table.setWidthPercentage(100);
            table.setSpacingBefore(10);
            table.setSpacingAfter(20);

            // Headers
            for (String header : headers) {
                Font headerFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD);
                table.addCell(new Phrase(header, headerFont));
            }

            // Data
            for (String[] row : data) {
                for (String cell : row) {
                    table.addCell(cell);
                }
            }

            document.add(table);
        } catch (DocumentException e) {
            e.printStackTrace();
        }
    }

    public void addNoDataMessage(String message) {
        try {
            Font italicFont = new Font(Font.FontFamily.HELVETICA, 12, Font.ITALIC);
            Paragraph noDataParagraph = new Paragraph(message, italicFont);
            noDataParagraph.setSpacingAfter(20);
            document.add(noDataParagraph);
        } catch (DocumentException e) {
            e.printStackTrace();
        }
    }
}
