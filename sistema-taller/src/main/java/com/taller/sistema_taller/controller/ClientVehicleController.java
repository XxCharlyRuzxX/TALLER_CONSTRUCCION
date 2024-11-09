package com.taller.sistema_taller.controller;

import com.taller.sistema_taller.dto.ClientVehicleDTO;
import com.taller.sistema_taller.model.VehicleManagement.ClientVehicle;
import com.taller.sistema_taller.service.vehicle_service.ClientVehicleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
        try {
            ClientVehicle newVehicle = clientVehicleService.registerVehicle(vehicleDto);
            return new ResponseEntity<>(newVehicle, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid data for vehicle registration", e);
        }
    }

    @PutMapping("/{vehicleId}")
    public ResponseEntity<ClientVehicle> updateVehicle(@PathVariable String vehicleId, @Valid @RequestBody ClientVehicleDTO vehicleDto) {
        try {
            ClientVehicle updatedVehicle = clientVehicleService.updateVehicle(vehicleId, vehicleDto);
            return new ResponseEntity<>(updatedVehicle, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Vehicle not found", e);
        }
    }

    @DeleteMapping("/{vehicleId}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable String vehicleId) {
        clientVehicleService.deleteVehicle(vehicleId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{vehicleId}")
    public ResponseEntity<ClientVehicle> findVehicleById(@PathVariable String vehicleId) {
        ClientVehicle vehicle = clientVehicleService.findVehicleById(vehicleId);
        if (vehicle != null) {
            return ResponseEntity.ok(vehicle);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Vehicle not found");
        }
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<ClientVehicle>> findAllVehiclesByClient(@PathVariable Long clientId) {
        List<ClientVehicle> vehicles = clientVehicleService.findAllVehiclesByClient(clientId);
        return ResponseEntity.ok(vehicles);
    }
}
