package com.taller.sistema_taller.controller;

import com.taller.sistema_taller.dto.MaintenanceAdvanceDTO;
import com.taller.sistema_taller.dto.MaintenanceManagerDTO;
import com.taller.sistema_taller.service.maintenance_service.MaintenanceManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceManagerController {

    private final MaintenanceManagerService maintenanceManagerService;

    @Autowired
    public MaintenanceManagerController(MaintenanceManagerService maintenanceManagerService) {
        this.maintenanceManagerService = maintenanceManagerService;
    }

    @GetMapping("/{managerId}")
    public ResponseEntity<MaintenanceManagerDTO> getMaintenanceManager(@PathVariable Long managerId) {
        MaintenanceManagerDTO managerDTO = maintenanceManagerService.getMaintenanceManager(managerId);
        return ResponseEntity.ok(managerDTO);
    }

    @PostMapping("/{managerId}/advance")
    public ResponseEntity<MaintenanceManagerDTO> addMaintenanceAdvance(
            @PathVariable Long managerId,
            @RequestBody MaintenanceAdvanceDTO advanceDTO) {
        MaintenanceManagerDTO managerDTO = maintenanceManagerService.addMaintenanceAdvance(managerId, advanceDTO);
        return new ResponseEntity<>(managerDTO, HttpStatus.CREATED);
    }

    @GetMapping("/{managerId}/advance/{advanceId}")
    public ResponseEntity<MaintenanceAdvanceDTO> getMaintenanceAdvanceById(
            @PathVariable Long managerId,
            @PathVariable Long advanceId) {
        MaintenanceAdvanceDTO advanceDTO = maintenanceManagerService.getMaintenanceAdvanceById(managerId, advanceId);
        return ResponseEntity.ok(advanceDTO);
    }

    @PutMapping("/{managerId}/advance/{advanceId}")
    public ResponseEntity<MaintenanceAdvanceDTO> updateMaintenanceAdvance(
            @PathVariable Long managerId,
            @PathVariable Long advanceId,
            @RequestBody MaintenanceAdvanceDTO advanceDTO) {
        MaintenanceAdvanceDTO updatedAdvance = maintenanceManagerService.updateMaintenanceAdvance(managerId, advanceId,
                advanceDTO);
        return ResponseEntity.ok(updatedAdvance);
    }

    @DeleteMapping("/{managerId}/advance/{advanceId}")
    public ResponseEntity<Void> deleteMaintenanceAdvanceById(
            @PathVariable Long managerId,
            @PathVariable Long advanceId) {
        maintenanceManagerService.deleteMaintenanceAdvanceById(managerId, advanceId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{managerId}/status")
    public ResponseEntity<Void> updateMaintenanceStatus(
            @PathVariable Long managerId,
            @RequestParam String status) {
        maintenanceManagerService.updateMaintenanceStatus(managerId, status);
        return ResponseEntity.ok().build();
    }
}
