package com.taller.sistema_taller.service.vehicle_service.interfaces;

import java.util.List;

import com.taller.sistema_taller.dto.ClientVehicleDTO;
import com.taller.sistema_taller.model.VehicleManagement.ClientVehicle;
import com.taller.sistema_taller.model.VehicleManagement.DiagnosisManager;

public interface ClientVehicleServiceInterface {
    ClientVehicle registerVehicle(ClientVehicleDTO vehicleDto);
    ClientVehicle updateVehicle(String vehicleId, ClientVehicleDTO vehicleDto);
    void deleteVehicle(String vehicleId);
    ClientVehicle findVehicleById(String vehicleId);
    List<ClientVehicle> findAllVehiclesByClient(Long clientId);
    DiagnosisManager getDiagnosisManagerByUserId(Long userId);
    List<ClientVehicle> findAllVehicles();
}
