package com.taller.sistema_taller.controller;

import com.taller.sistema_taller.model.ReportGeneration.ReportType;
import com.taller.sistema_taller.model.VehicleManagement.ClientVehicle;
import com.taller.sistema_taller.service.report_service.ReportService;
import com.taller.sistema_taller.service.vehicle_service.ClientVehicleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;
    private final ClientVehicleService clientVehicleService;

    @Autowired
    public ReportController(ReportService reportService , ClientVehicleService clientVehicleService) {
        this.reportService = reportService;
        this.clientVehicleService = clientVehicleService;
    }

    @GetMapping("/generate")
    public ResponseEntity<byte[]> generateReport(
            @RequestParam("vehicleId") String vehicleId,
            @RequestParam("reportType") ReportType reportType) {
        ClientVehicle vehicle = clientVehicleService.findVehicleById(vehicleId);
        byte[] pdf = reportService.generateReport(vehicle, reportType);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=report.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(org.springframework.http.MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}
