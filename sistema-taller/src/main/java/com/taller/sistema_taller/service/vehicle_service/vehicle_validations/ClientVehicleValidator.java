package com.taller.sistema_taller.service.vehicle_service.vehicle_validations;

import com.taller.sistema_taller.dto.ClientVehicleDTO;
import com.taller.sistema_taller.exceptions.vehicle_exceptions.*;
import com.taller.sistema_taller.repositories.ClientVehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.Year;

@Component
public class ClientVehicleValidator {

    private final ClientVehicleRepository clientVehicleRepository;
    private static final String VEHICLE_LICENSE_PLATE_REGEX = "[A-Z0-9]{6}";
    private static final int MIN_VEHICLE_YEAR = 1886;
    private static final int MAX_MILEAGE = 1_000_000;

    @Autowired
    public ClientVehicleValidator(ClientVehicleRepository clientVehicleRepository) {
        this.clientVehicleRepository = clientVehicleRepository;
    }

    public void validateClientVehicle(ClientVehicleDTO clientVehicleDTO) {
        validateClientVehicleData(clientVehicleDTO);
        validateLicensePlateUniqueness(clientVehicleDTO.getLicensePlate());
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

    public void validateLicensePlateUniqueness(String licensePlate) {
        if (licensePlate == null || licensePlate.isBlank()) {
            throw new InvalidVehicleDataException("La matrícula no puede ser nula o vacía");
        }
        if (clientVehicleRepository.existsByLicensePlate(licensePlate)) {
            throw new DuplicateLicensePlateException("La matrícula ya está en uso");
        }
    }

    public void validateVehicleExists(String vehicleId) {
        if (vehicleId == null || vehicleId.isBlank()) {
            throw new InvalidVehicleDataException("El ID del vehículo no puede ser nulo o vacío");
        }
        if (!clientVehicleRepository.existsById(vehicleId)) {
            throw new VehicleNotFoundException("Vehículo con ID " + vehicleId + " no encontrado");
        }
    }

    private void validateVehicleYear(int year) {
        int currentYear = Year.now().getValue();
        if (year < MIN_VEHICLE_YEAR || year > currentYear + 1) {
            throw new InvalidVehicleDataException("El año del vehículo debe estar entre 1886 y " + (currentYear + 1));
        }
    }

    private void validateVehicleMileage(int mileage) {
        if (mileage < 0 || mileage > MAX_MILEAGE) {
            throw new InvalidVehicleDataException("El kilometraje debe estar entre 0 y 1,000,000 km");
        }
    }

    private void validateVehicleFuelLevel(float fuelLevel) {
        if (fuelLevel < 0) {
            throw new InvalidVehicleDataException("El nivel de gasolina debe ser mayor a 0");
        }
    }

    private void validateVehicleLicensePlate(String licensePlate) {
        if (licensePlate == null || licensePlate.isBlank()) {
            throw new InvalidVehicleDataException("La matrícula no puede ser nula o vacía");
        }
        if (!licensePlate.matches(VEHICLE_LICENSE_PLATE_REGEX)) {
            throw new InvalidVehicleDataException("La matrícula debe contener exactamente 6 caracteres alfanuméricos");
        }
    }
}
