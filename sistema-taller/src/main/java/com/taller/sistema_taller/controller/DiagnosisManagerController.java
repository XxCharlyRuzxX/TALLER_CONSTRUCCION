package com.taller.sistema_taller.controller;

import com.taller.sistema_taller.dto.VehicleDiagnosisDTO;
import com.taller.sistema_taller.service.diagnosis_service.interfaces.DiagnosisManagerServiceInterface;
import com.taller.sistema_taller.service.vehicle_service.interfaces.ClientVehicleServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diagnosis")
public class DiagnosisManagerController {

    private final DiagnosisManagerServiceInterface diagnosisManagerService;

    @Autowired
    public DiagnosisManagerController(DiagnosisManagerServiceInterface diagnosisManagerService,
            ClientVehicleServiceInterface clientVehicleService) {
        this.diagnosisManagerService = diagnosisManagerService;
    }

    @PostMapping("/{diagnosisManagerId}")
    public ResponseEntity<Void> addDiagnosis(
            @PathVariable Long diagnosisManagerId,
            @RequestBody VehicleDiagnosisDTO diagnosisDto) {
        diagnosisManagerService.addDiagnosis(diagnosisManagerId, diagnosisDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/diagnosisManager/{diagnosisManagerId}/diagnosis/{diagnosisId}")
    public ResponseEntity<VehicleDiagnosisDTO> getDiagnosisById(
            @PathVariable Long diagnosisManagerId,
            @PathVariable Long diagnosisId) {
        VehicleDiagnosisDTO diagnosis = diagnosisManagerService.getDiagnosisById(diagnosisManagerId, diagnosisId);
        return ResponseEntity.ok(diagnosis);
    }

    @GetMapping("/diagnosisManager/{diagnosisManagerId}")
    public ResponseEntity<List<VehicleDiagnosisDTO>> getAllVehicleDiagnoses(
            @PathVariable Long diagnosisManagerId) {
        return ResponseEntity.ok(diagnosisManagerService.getAllVehicleDiagnoses(diagnosisManagerId));
    }

    @GetMapping("/diagnosisManager/{diagnosisManagerId}/authorized")
    public ResponseEntity<List<VehicleDiagnosisDTO>> getAuthorizedDiagnoses(
            @PathVariable Long diagnosisManagerId) {
        return ResponseEntity.ok(diagnosisManagerService.getAuthorizedDiagnoses(diagnosisManagerId));
    }

    @DeleteMapping("/diagnosisManager/{diagnosisManagerId}/diagnosis/{diagnosisId}")
    public ResponseEntity<Void> removeDiagnosisById(
            @PathVariable Long diagnosisManagerId,
            @PathVariable Long diagnosisId) {
        boolean removed = diagnosisManagerService.removeDiagnosisById(diagnosisManagerId, diagnosisId);
        return removed ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @PutMapping("/diagnosisManager/{diagnosisManagerId}/diagnosis/{diagnosisId}")
    public ResponseEntity<Void> updateDiagnosis(
            @PathVariable Long diagnosisManagerId,
            @PathVariable Long diagnosisId,
            @RequestBody VehicleDiagnosisDTO updatedDiagnosisDto) {
        boolean updated = diagnosisManagerService.updateDiagnosis(diagnosisManagerId, diagnosisId, updatedDiagnosisDto);
        return updated ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/diagnosisManager/{diagnosisManagerId}/total-cost")
    public ResponseEntity<Float> calculateTotalDiagnosisCost(
            @PathVariable Long diagnosisManagerId) {
        return ResponseEntity.ok(diagnosisManagerService.calculateTotalDiagnosisCost(diagnosisManagerId));
    }

    @GetMapping("/diagnosisManager/{diagnosisManagerId}/authorized-cost")
    public ResponseEntity<Float> calculateAuthorizedDiagnosisCost(
            @PathVariable Long diagnosisManagerId) {
        return ResponseEntity.ok(diagnosisManagerService.calculateAuthorizedDiagnosisCost(diagnosisManagerId));
    }

    @GetMapping("/all-diagnoses")
    public ResponseEntity<List<VehicleDiagnosisDTO>> getAllDiagnoses() {
        List<VehicleDiagnosisDTO> allDiagnoses = diagnosisManagerService.getAllDiagnoses();
        return ResponseEntity.ok(allDiagnoses);
    }

}
