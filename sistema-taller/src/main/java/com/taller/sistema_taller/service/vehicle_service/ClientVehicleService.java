package com.taller.sistema_taller.service.vehicle_service;

import com.taller.sistema_taller.dto.ClientVehicleDTO;
import com.taller.sistema_taller.model.VehicleManagement.ClientVehicle;
import com.taller.sistema_taller.model.VehicleManagement.StaticVehicleData;
import com.taller.sistema_taller.repositories.ClientVehicleRepository;
import com.taller.sistema_taller.model.VehicleManagement.NonStaticVehicleData;
import com.taller.sistema_taller.service.vehicle_service.interfaces.ClientVehicleServiceInterface;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientVehicleService implements ClientVehicleServiceInterface {

    private final ClientVehicleRepository clientVehicleRepository;

    @Autowired
    public ClientVehicleService(ClientVehicleRepository clientVehicleRepository) {
        this.clientVehicleRepository = clientVehicleRepository;
    }

    @Override
    @Transactional
    public ClientVehicle registerVehicle(ClientVehicleDTO vehicleDto) {
        StaticVehicleData staticData = new StaticVehicleData(
                vehicleDto.getBrand(),
                vehicleDto.getModel(),
                vehicleDto.getYear(),
                vehicleDto.getLicensePlate()
        );
        NonStaticVehicleData nonStaticData = new NonStaticVehicleData(
                vehicleDto.getMileage(),
                vehicleDto.getFuelLevel(),
                vehicleDto.getAdditionalObservations()
        );

        ClientVehicle newVehicle = new ClientVehicle(vehicleDto.getClientId(), staticData, nonStaticData);
        return clientVehicleRepository.save(newVehicle);
    }

    @Override
    @Transactional
    public ClientVehicle updateVehicle(String vehicleId, ClientVehicleDTO vehicleDto) {
        Optional<ClientVehicle> vehicleOptional = clientVehicleRepository.findById(vehicleId);
        if (vehicleOptional.isPresent()) {
            ClientVehicle existingVehicle = vehicleOptional.get();

            StaticVehicleData updatedStaticData = new StaticVehicleData(
                    vehicleDto.getBrand(),
                    vehicleDto.getModel(),
                    vehicleDto.getYear(),
                    vehicleDto.getLicensePlate()
            );
            existingVehicle.updateStaticVehicleData(updatedStaticData);

            NonStaticVehicleData updatedNonStaticData = new NonStaticVehicleData(
                    vehicleDto.getMileage(),
                    vehicleDto.getFuelLevel(),
                    vehicleDto.getAdditionalObservations()
            );
            existingVehicle.updateNonStaticVehicleData(updatedNonStaticData);

            return clientVehicleRepository.save(existingVehicle);
        } else {
            throw new IllegalArgumentException("Vehicle with ID " + vehicleId + " not found.");
        }
    }

    @Override
    @Transactional
    public void deleteVehicle(String vehicleId) {
        clientVehicleRepository.deleteById(vehicleId);
    }

    @Override
    public ClientVehicle findVehicleById(String vehicleId) {
        return clientVehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new IllegalArgumentException("Vehicle with ID " + vehicleId + " not found."));
    }

    @Override
    public List<ClientVehicle> findAllVehiclesByClient(Long clientId) {
        return clientVehicleRepository.findAllByClientId(clientId);
    }
}
