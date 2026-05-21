package com.taller.sistema_taller.service.vehicle_service;

import com.taller.sistema_taller.dto.ClientVehicleDTO;
import com.taller.sistema_taller.model.VehicleManagement.ClientVehicle;
import com.taller.sistema_taller.repositories.ClientVehicleRepository;
import com.taller.sistema_taller.service.vehicle_service.vehicle_validations.ClientVehicleValidator;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ClientVehicleServiceTest {

    @Mock
    private ClientVehicleRepository clientVehicleRepository;

    @Mock
    private ClientVehicleValidator clientVehicleValidator;

    @InjectMocks
    private ClientVehicleService clientVehicleService;

    @Test
    @DisplayName("Debería registrar un vehículo exitosamente cuando los datos de entrada son válidos")
    void registerVehicle_ShouldReturnSavedVehicle_WhenDataIsValid() {
        
        ClientVehicleDTO vehicleDTO = new ClientVehicleDTO();
        vehicleDTO.setClientId(1L);
        vehicleDTO.setBrand("Toyota");
        vehicleDTO.setModel("Corolla");
        vehicleDTO.setYear(2022);
        vehicleDTO.setLicensePlate("XYZ123");
        vehicleDTO.setMileage(15000);
        vehicleDTO.setFuelLevel(0.5f);
        vehicleDTO.setAdditionalObservations("Ninguna");

        
        ClientVehicle expectedVehicle = new ClientVehicle(
            vehicleDTO.getClientId(),
            new com.taller.sistema_taller.model.VehicleManagement.StaticVehicleData("Toyota", "Corolla", 2022, "XYZ123"),
            new com.taller.sistema_taller.model.VehicleManagement.NonStaticVehicleData(15000, 0.5f, "Ninguna")
        );

        
        doNothing().when(clientVehicleValidator).validateClientVehicle(vehicleDTO);
        when(clientVehicleRepository.save(any(ClientVehicle.class))).thenReturn(expectedVehicle);

        
        ClientVehicle result = clientVehicleService.registerVehicle(vehicleDTO);

        
        assertNotNull(result);
        assertEquals(1L, result.getClientId());
        assertEquals("Toyota", result.getStaticVehicleData().getBrand());
        assertEquals("Corolla", result.getStaticVehicleData().getModel());
        
        
        verify(clientVehicleValidator, times(1)).validateClientVehicle(vehicleDTO);
        verify(clientVehicleRepository, times(1)).save(any(ClientVehicle.class));
    }
    
    @Test
    @DisplayName("Debería encontrar un vehículo exitosamente por ID")
    void findVehicleById_ShouldReturnVehicle_WhenIdExists() {
        
        String vehicleId = "VEH-123";
        ClientVehicle expectedVehicle = new ClientVehicle(
            1L,
            new com.taller.sistema_taller.model.VehicleManagement.StaticVehicleData("Nissan", "Sentra", 2020, "ABC1234"),
            new com.taller.sistema_taller.model.VehicleManagement.NonStaticVehicleData(30000, 0.7f, "Todo bien")
        );
        expectedVehicle.setIdVehicle(vehicleId);

        when(clientVehicleRepository.findById(vehicleId)).thenReturn(Optional.of(expectedVehicle));

        
        ClientVehicle result = clientVehicleService.findVehicleById(vehicleId);

        
        assertNotNull(result);
        assertEquals(vehicleId, result.getIdVehicle());
        assertEquals("Nissan", result.getStaticVehicleData().getBrand());
        
        verify(clientVehicleRepository, times(1)).findById(vehicleId);
    }
}
