package com.taller.sistema_taller.service.vehicle_service.vehicle_validations;


import com.taller.sistema_taller.exceptions.vehicle_exceptions.*;
import com.taller.sistema_taller.repositories.ClientVehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ClientVehicleValidator {

    private final ClientVehicleRepository clientVehicleRepository;

    @Autowired
    public ClientVehicleValidator(ClientVehicleRepository clientVehicleRepository) {
        this.clientVehicleRepository = clientVehicleRepository;
    }

    public void validateLicensePlateUniqueness(String licensePlate) {
        if (clientVehicleRepository.existsByLicensePlate(licensePlate)) {
            throw new DuplicateLicensePlateException("La matrícula ya está en uso");
        }
    }

    public void validateVehicleExists(String vehicleId) {
        if (!clientVehicleRepository.existsById(vehicleId)) {
            throw new VehicleNotFoundException("Vehículo con ID " + vehicleId + " no encontrado");
        }
    }
}

