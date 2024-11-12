package com.taller.sistema_taller.controller;

import com.taller.sistema_taller.dto.PartDiagnosisDTO;
import com.taller.sistema_taller.model.VehicleManagement.PartDiagnosis;
import com.taller.sistema_taller.service.part_service.interfaces.PartDiagnosisServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/diagnoses/{diagnosisId}/parts")
public class PartDiagnosisController {

    private final PartDiagnosisServiceInterface partDiagnosisService;

    @Autowired
    public PartDiagnosisController(PartDiagnosisServiceInterface partDiagnosisService) {
        this.partDiagnosisService = partDiagnosisService;
    }

    @PostMapping
    public ResponseEntity<PartDiagnosisDTO> addPart(
            @PathVariable Long diagnosisId,
            @RequestBody PartDiagnosisDTO partDto) {
        try {
            PartDiagnosisDTO part = partDiagnosisService.addPart(diagnosisId, partDto);
            return new ResponseEntity<>(part, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping("/{partId}")
    public ResponseEntity<PartDiagnosisDTO> getPartById(
            @PathVariable Long diagnosisId,
            @PathVariable Long partId) {
        try {
            PartDiagnosisDTO part = partDiagnosisService.getPartById(diagnosisId, partId);
            return ResponseEntity.ok(part);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<PartDiagnosisDTO>> getAllParts(
            @PathVariable Long diagnosisId) {
        return ResponseEntity.ok(partDiagnosisService.getAllParts(diagnosisId));
    }

    @DeleteMapping("/{partId}")
    public ResponseEntity<Void> removePartById(
            @PathVariable Long diagnosisId,
            @PathVariable Long partId) {
        boolean removed = partDiagnosisService.removePartById(diagnosisId, partId);
        return removed ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @PutMapping("/{partId}/status")
    public ResponseEntity<Void> updatePartStatus(
            @PathVariable Long diagnosisId,
            @PathVariable Long partId,
            @RequestParam PartDiagnosis.ShippingStatus status) {
        try {
            partDiagnosisService.updatePartStatus(diagnosisId, partId, status);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping("/total-cost")
    public ResponseEntity<Float> calculateTotalPartCost(
            @PathVariable Long diagnosisId) {
        return ResponseEntity.ok(partDiagnosisService.calculateTotalPartCost(diagnosisId));
    }
}
