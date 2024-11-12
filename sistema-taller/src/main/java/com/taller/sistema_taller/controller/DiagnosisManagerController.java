package com.taller.sistema_taller.controller;

import com.taller.sistema_taller.dto.VehicleDiagnosisDTO;
import com.taller.sistema_taller.service.diagnosis_service.interfaces.DiagnosisManagerServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/diagnosis")
public class DiagnosisManagerController {

    private final DiagnosisManagerServiceInterface diagnosisManagerService;

    @Autowired
    public DiagnosisManagerController(DiagnosisManagerServiceInterface diagnosisManagerService) {
        this.diagnosisManagerService = diagnosisManagerService;
    }

    @PostMapping("/{diagnosisManagerId}")
    public ResponseEntity<Void> addDiagnosis(
            @PathVariable Long diagnosisManagerId,
            @RequestBody VehicleDiagnosisDTO diagnosisDto) {
        try {
            diagnosisManagerService.addDiagnosis(diagnosisManagerId, diagnosisDto);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping("/{diagnosisManagerId}/{diagnosisId}")
    public ResponseEntity<VehicleDiagnosisDTO> getDiagnosisById(
            @PathVariable Long diagnosisManagerId,
            @PathVariable Long diagnosisId) {
        try {
            VehicleDiagnosisDTO diagnosis = diagnosisManagerService.getDiagnosisById(diagnosisManagerId, diagnosisId);
            return ResponseEntity.ok(diagnosis);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @GetMapping("/{diagnosisManagerId}")
    public ResponseEntity<List<VehicleDiagnosisDTO>> getAllDiagnoses(
            @PathVariable Long diagnosisManagerId) {
        return ResponseEntity.ok(diagnosisManagerService.getAllDiagnoses(diagnosisManagerId));
    }

    @GetMapping("/{diagnosisManagerId}/authorized")
    public ResponseEntity<List<VehicleDiagnosisDTO>> getAuthorizedDiagnoses(
            @PathVariable Long diagnosisManagerId) {
        return ResponseEntity.ok(diagnosisManagerService.getAuthorizedDiagnoses(diagnosisManagerId));
    }

    @DeleteMapping("/{diagnosisManagerId}/{diagnosisId}")
    public ResponseEntity<Void> removeDiagnosisById(
            @PathVariable Long diagnosisManagerId,
            @PathVariable Long diagnosisId) {
        boolean removed = diagnosisManagerService.removeDiagnosisById(diagnosisManagerId, diagnosisId);
        return removed ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @PutMapping("/{diagnosisManagerId}/{diagnosisId}")
    public ResponseEntity<Void> updateDiagnosis(
            @PathVariable Long diagnosisManagerId,
            @PathVariable Long diagnosisId,
            @RequestBody VehicleDiagnosisDTO updatedDiagnosisDto) {
        boolean updated = diagnosisManagerService.updateDiagnosis(diagnosisManagerId, diagnosisId, updatedDiagnosisDto);
        return updated ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/{diagnosisManagerId}/total-cost")
    public ResponseEntity<Float> calculateTotalDiagnosisCost(
            @PathVariable Long diagnosisManagerId) {
        return ResponseEntity.ok(diagnosisManagerService.calculateTotalDiagnosisCost(diagnosisManagerId));
    }

    @GetMapping("/{diagnosisManagerId}/authorized-cost")
    public ResponseEntity<Float> calculateAuthorizedDiagnosisCost(
            @PathVariable Long diagnosisManagerId) {
        return ResponseEntity.ok(diagnosisManagerService.calculateAuthorizedDiagnosisCost(diagnosisManagerId));
    }
}
