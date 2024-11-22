package com.taller.sistema_taller.service.vehicle_service;

import com.taller.sistema_taller.dto.ClientVehicleDTO;
import com.taller.sistema_taller.exceptions.vehicle_exceptions.*;
import com.taller.sistema_taller.model.VehicleManagement.*;
import com.taller.sistema_taller.repositories.ClientVehicleRepository;
import com.taller.sistema_taller.service.vehicle_service.interfaces.ClientVehicleServiceInterface;
import com.taller.sistema_taller.service.vehicle_service.vehicle_validations.ClientVehicleValidator;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientVehicleService implements ClientVehicleServiceInterface {

    private static final String VEHICLE_NOT_FOUND_MSG = "Vehículo con ID %s no encontrado";
    private static final String DIAGNOSIS_NOT_FOUND_MSG = "Diagnóstico no encontrado para el usuario con ID %s";

    private final ClientVehicleRepository clientVehicleRepository;
    private final ClientVehicleValidator clientVehicleValidator;

    @Autowired
    public ClientVehicleService(ClientVehicleRepository clientVehicleRepository,
            ClientVehicleValidator clientVehicleValidator) {
        this.clientVehicleRepository = clientVehicleRepository;
        this.clientVehicleValidator = clientVehicleValidator;
    }

    @Override
    @Transactional
    public ClientVehicle registerVehicle(ClientVehicleDTO vehicleDto) {
        clientVehicleValidator.validateClientVehicle(vehicleDto);
        ClientVehicle newVehicle = createClientVehicleFromDTO(vehicleDto);
        return clientVehicleRepository.save(newVehicle);
    }

    @Override
    @Transactional
    public ClientVehicle updateVehicle(String vehicleId, ClientVehicleDTO vehicleDto) {
        ClientVehicle existingVehicle = findVehicleById(vehicleId);
        clientVehicleValidator.validateClientVehicleData(vehicleDto);
        updateClientVehicleFromDTO(existingVehicle, vehicleDto);
        return clientVehicleRepository.save(existingVehicle);
    }

    @Override
    @Transactional
    public void deleteVehicle(String vehicleId) {
        clientVehicleRepository.delete(findVehicleById(vehicleId));
    }

    @Override
    public ClientVehicle findVehicleById(String vehicleId) {
        return clientVehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new VehicleNotFoundException(String.format(VEHICLE_NOT_FOUND_MSG, vehicleId)));
    }

    @Override
    public List<ClientVehicle> findAllVehiclesByClient(Long clientId) {
        return clientVehicleRepository.findAllByClientId(clientId);
    }

    @Override
    public DiagnosisManager getDiagnosisManagerByUserId(Long userId) {
        return clientVehicleRepository.findByClientId(userId)
                .map(ClientVehicle::getDiagnosisManager)
                .orElseThrow(() -> new VehicleNotFoundException(String.format(DIAGNOSIS_NOT_FOUND_MSG, userId)));
    }

    @Override
    public List<ClientVehicle> findAllVehicles() {
        return clientVehicleRepository.findAll();
    }

    private ClientVehicle createClientVehicleFromDTO(ClientVehicleDTO vehicleDto) {
        StaticVehicleData staticData = new StaticVehicleData(
                vehicleDto.getBrand(),
                vehicleDto.getModel(),
                vehicleDto.getYear(),
                vehicleDto.getLicensePlate());
        NonStaticVehicleData nonStaticData = new NonStaticVehicleData(
                vehicleDto.getMileage(),
                vehicleDto.getFuelLevel(),
                vehicleDto.getAdditionalObservations());
        return new ClientVehicle(vehicleDto.getClientId(), staticData, nonStaticData);
    }

    private void updateClientVehicleFromDTO(ClientVehicle vehicle, ClientVehicleDTO vehicleDto) {
        StaticVehicleData updatedStaticData = new StaticVehicleData(
                vehicleDto.getBrand(),
                vehicleDto.getModel(),
                vehicleDto.getYear(),
                vehicleDto.getLicensePlate());
        vehicle.updateStaticVehicleData(updatedStaticData);

        NonStaticVehicleData updatedNonStaticData = new NonStaticVehicleData(
                vehicleDto.getMileage(),
                vehicleDto.getFuelLevel(),
                vehicleDto.getAdditionalObservations());
        vehicle.updateNonStaticVehicleData(updatedNonStaticData);
    }
}
