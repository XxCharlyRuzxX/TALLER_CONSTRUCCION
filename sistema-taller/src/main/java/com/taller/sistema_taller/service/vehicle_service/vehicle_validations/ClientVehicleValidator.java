package com.taller.sistema_taller.service.vehicle_service.vehicle_validations;


import com.taller.sistema_taller.dto.ClientVehicleDTO;
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

    public void validateClientVehicleData(ClientVehicleDTO clientVehicleDTO) {
        if (clientVehicleDTO == null) {
            throw new InvalidVehicleDataException("El vehículo no puede ser nulo");
        }
        validateVehicleYear(clientVehicleDTO.getYear());
        validateVehicleMileage(clientVehicleDTO.getMileage());
        validateVehicleFuelLevel(clientVehicleDTO.getFuelLevel());
        validateVehicleLicensePlate(clientVehicleDTO.getLicensePlate());
    }

    private void validateVehicleYear(int year) {
        if (year < 1860 || year > 2025) {
            throw new InvalidVehicleDataException("Año inválido");
        }
    }

    private void validateVehicleMileage(int mileage) {
        if (mileage < 0) {
            throw new InvalidVehicleDataException("El kilometraje no puede ser negativo");
        }
    }

    private void validateVehicleFuelLevel(float fuelLevel) {
        if (fuelLevel < 0) {
            throw new InvalidVehicleDataException("El nivel de gasolina no puede ser negativa");
        }
    }

    private static void validateVehicleLicensePlate(String licensePlate) {
        if (licensePlate == null || licensePlate.length() != 6) {
            throw new InvalidVehicleDataException("La matrícula debe contener 6 caracteres");
        }
    }
}

