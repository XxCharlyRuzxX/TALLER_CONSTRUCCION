package com.taller.sistema_taller.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.taller.sistema_taller.model.VehicleManagement.ClientVehicle;

public interface ClientVehicleRepository extends JpaRepository<ClientVehicle, String> {
  List<ClientVehicle> findAllByClientId(Long clientId);
}
