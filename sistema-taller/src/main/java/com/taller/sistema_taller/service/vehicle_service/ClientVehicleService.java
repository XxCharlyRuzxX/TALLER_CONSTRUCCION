package com.taller.sistema_taller.service.vehicle_service;

import com.taller.sistema_taller.dto.ClientVehicleDTO;
import com.taller.sistema_taller.exceptions.vehicle_exceptions.*;
import com.taller.sistema_taller.model.VehicleManagement.ClientVehicle;
import com.taller.sistema_taller.model.VehicleManagement.DiagnosisManager;
import com.taller.sistema_taller.model.VehicleManagement.StaticVehicleData;
import com.taller.sistema_taller.model.VehicleManagement.NonStaticVehicleData;
import com.taller.sistema_taller.repositories.ClientVehicleRepository;
import com.taller.sistema_taller.service.vehicle_service.interfaces.ClientVehicleServiceInterface;
import com.taller.sistema_taller.service.vehicle_service.vehicle_validations.ClientVehicleValidator;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientVehicleService implements ClientVehicleServiceInterface {

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
        clientVehicleValidator.validateClientVehicleData(vehicleDto);
        clientVehicleValidator.validateLicensePlateUniqueness(vehicleDto.getLicensePlate());
        clientVehicleValidator.validateClientVehicleData(vehicleDto);

        StaticVehicleData staticData = new StaticVehicleData(
                vehicleDto.getBrand(),
                vehicleDto.getModel(),
                vehicleDto.getYear(),
                vehicleDto.getLicensePlate());
        NonStaticVehicleData nonStaticData = new NonStaticVehicleData(
                vehicleDto.getMileage(),
                vehicleDto.getFuelLevel(),
                vehicleDto.getAdditionalObservations());

        ClientVehicle newVehicle = new ClientVehicle(vehicleDto.getClientId(), staticData, nonStaticData);
        return clientVehicleRepository.save(newVehicle);
    }

    @Override
    @Transactional
    public ClientVehicle updateVehicle(String vehicleId, ClientVehicleDTO vehicleDto) {
        clientVehicleValidator.validateVehicleExists(vehicleId);
        clientVehicleValidator.validateClientVehicleData(vehicleDto);

        ClientVehicle existingVehicle = clientVehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new VehicleNotFoundException("Vehículo con ID " + vehicleId + " no encontrado"));

        StaticVehicleData updatedStaticData = new StaticVehicleData(
                vehicleDto.getBrand(),
                vehicleDto.getModel(),
                vehicleDto.getYear(),
                vehicleDto.getLicensePlate());
        existingVehicle.updateStaticVehicleData(updatedStaticData);

        NonStaticVehicleData updatedNonStaticData = new NonStaticVehicleData(
                vehicleDto.getMileage(),
                vehicleDto.getFuelLevel(),
                vehicleDto.getAdditionalObservations());
        existingVehicle.updateNonStaticVehicleData(updatedNonStaticData);

        return clientVehicleRepository.save(existingVehicle);
    }

    @Override
    @Transactional
    public void deleteVehicle(String vehicleId) {
        clientVehicleValidator.validateVehicleExists(vehicleId);
        clientVehicleRepository.deleteById(vehicleId);
    }

    @Override
    public ClientVehicle findVehicleById(String vehicleId) {
        clientVehicleValidator.validateVehicleExists(vehicleId);
        return clientVehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new VehicleNotFoundException("Vehículo con ID " + vehicleId + " no encontrado"));
    }

    @Override
    public List<ClientVehicle> findAllVehiclesByClient(Long clientId) {
        return clientVehicleRepository.findAllByClientId(clientId);
    }

    public DiagnosisManager getDiagnosisManagerByUserId(Long userId) {
        return clientVehicleRepository.findByClientId(userId)
                .map(ClientVehicle::getDiagnosisManager)
                .orElseThrow(() -> new VehicleNotFoundException(
                        "Diagnóstico no encontrado para el usuario con ID " + userId));
    }

    @Override
    public List<ClientVehicle> findAllVehicles() {
        return clientVehicleRepository.findAll();
    }

}
