package com.taller.sistema_taller.controller;

import com.taller.sistema_taller.dto.ClientVehicleDTO;
import com.taller.sistema_taller.model.VehicleManagement.ClientVehicle;
import com.taller.sistema_taller.service.vehicle_service.ClientVehicleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
public class ClientVehicleController {

    private final ClientVehicleService clientVehicleService;

    @Autowired
    public ClientVehicleController(ClientVehicleService clientVehicleService) {
        this.clientVehicleService = clientVehicleService;
    }

    @PostMapping("/register")
    public ResponseEntity<ClientVehicle> registerVehicle(@Valid @RequestBody ClientVehicleDTO vehicleDto) {
        ClientVehicle newVehicle = clientVehicleService.registerVehicle(vehicleDto);
        return new ResponseEntity<>(newVehicle, HttpStatus.CREATED);
    }

    @PutMapping("/{vehicleId}")
    public ResponseEntity<ClientVehicle> updateVehicle(@PathVariable String vehicleId,
            @Valid @RequestBody ClientVehicleDTO vehicleDto) {
        ClientVehicle updatedVehicle = clientVehicleService.updateVehicle(vehicleId, vehicleDto);
        return new ResponseEntity<>(updatedVehicle, HttpStatus.OK);
    }

    @DeleteMapping("/{vehicleId}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable String vehicleId) {
        clientVehicleService.deleteVehicle(vehicleId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{vehicleId}")
    public ResponseEntity<ClientVehicle> findVehicleById(@PathVariable String vehicleId) {
        ClientVehicle vehicle = clientVehicleService.findVehicleById(vehicleId);
        return ResponseEntity.ok(vehicle);
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<ClientVehicle>> findAllVehiclesByClient(@PathVariable Long clientId) {
        List<ClientVehicle> vehicles = clientVehicleService.findAllVehiclesByClient(clientId);
        return ResponseEntity.ok(vehicles);
    }

    @GetMapping
    public ResponseEntity<List<ClientVehicle>> findAllVehicles() {
        List<ClientVehicle> vehicles = clientVehicleService.findAllVehicles();
        return ResponseEntity.ok(vehicles);
    }

}
