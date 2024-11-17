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
    private final ClientVehicleServiceInterface clientVehicleService;

    @Autowired
    public DiagnosisManagerController(DiagnosisManagerServiceInterface diagnosisManagerService,
            ClientVehicleServiceInterface clientVehicleService) {
        this.diagnosisManagerService = diagnosisManagerService;
        this.clientVehicleService = clientVehicleService;
    }

    @PostMapping("/{diagnosisManagerId}")
    public ResponseEntity<Void> addDiagnosis(
            @PathVariable Long diagnosisManagerId,
            @RequestBody VehicleDiagnosisDTO diagnosisDto) {
        diagnosisManagerService.addDiagnosis(diagnosisManagerId, diagnosisDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/user/{userId}/diagnosis/{diagnosisId}")
    public ResponseEntity<VehicleDiagnosisDTO> getDiagnosisById(
            @PathVariable Long userId,
            @PathVariable Long diagnosisId) {
        Long diagnosisManagerId = clientVehicleService.getDiagnosisManagerByUserId(userId).getIdDiagnosisManager();
        VehicleDiagnosisDTO diagnosis = diagnosisManagerService.getDiagnosisById(diagnosisManagerId, diagnosisId);
        return ResponseEntity.ok(diagnosis);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<VehicleDiagnosisDTO>> getAllDiagnoses(
            @PathVariable Long userId) {
        Long diagnosisManagerId = clientVehicleService.getDiagnosisManagerByUserId(userId).getIdDiagnosisManager();
        return ResponseEntity.ok(diagnosisManagerService.getAllDiagnoses(diagnosisManagerId));
    }

    @GetMapping("/user/{userId}/authorized")
    public ResponseEntity<List<VehicleDiagnosisDTO>> getAuthorizedDiagnoses(
            @PathVariable Long userId) {
        Long diagnosisManagerId = clientVehicleService.getDiagnosisManagerByUserId(userId).getIdDiagnosisManager();
        return ResponseEntity.ok(diagnosisManagerService.getAuthorizedDiagnoses(diagnosisManagerId));
    }

    @DeleteMapping("/user/{userId}/diagnosis/{diagnosisId}")
    public ResponseEntity<Void> removeDiagnosisById(
            @PathVariable Long userId,
            @PathVariable Long diagnosisId) {
        Long diagnosisManagerId = clientVehicleService.getDiagnosisManagerByUserId(userId).getIdDiagnosisManager();
        boolean removed = diagnosisManagerService.removeDiagnosisById(diagnosisManagerId, diagnosisId);
        return removed ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @PutMapping("/user/{userId}/diagnosis/{diagnosisId}")
    public ResponseEntity<Void> updateDiagnosis(
            @PathVariable Long userId,
            @PathVariable Long diagnosisId,
            @RequestBody VehicleDiagnosisDTO updatedDiagnosisDto) {
        Long diagnosisManagerId = clientVehicleService.getDiagnosisManagerByUserId(userId).getIdDiagnosisManager();
        boolean updated = diagnosisManagerService.updateDiagnosis(diagnosisManagerId, diagnosisId, updatedDiagnosisDto);
        return updated ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/user/{userId}/total-cost")
    public ResponseEntity<Float> calculateTotalDiagnosisCost(
            @PathVariable Long userId) {
        Long diagnosisManagerId = clientVehicleService.getDiagnosisManagerByUserId(userId).getIdDiagnosisManager();
        return ResponseEntity.ok(diagnosisManagerService.calculateTotalDiagnosisCost(diagnosisManagerId));
    }

    @GetMapping("/user/{userId}/authorized-cost")
    public ResponseEntity<Float> calculateAuthorizedDiagnosisCost(
            @PathVariable Long userId) {
        Long diagnosisManagerId = clientVehicleService.getDiagnosisManagerByUserId(userId).getIdDiagnosisManager();
        return ResponseEntity.ok(diagnosisManagerService.calculateAuthorizedDiagnosisCost(diagnosisManagerId));
    }
}
