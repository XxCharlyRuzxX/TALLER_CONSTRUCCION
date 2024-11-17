package com.taller.sistema_taller.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.taller.sistema_taller.model.VehicleManagement.ClientVehicle;

public interface ClientVehicleRepository extends JpaRepository<ClientVehicle, String> {
  List<ClientVehicle> findAllByClientId(Long clientId);

  Optional<ClientVehicle> findByClientId(Long clientId);

  @Query("SELECT CASE WHEN COUNT(v) > 0 THEN true ELSE false END FROM ClientVehicle v WHERE v.staticVehicleData.licensePlate = :licensePlate")
  boolean existsByLicensePlate(@Param("licensePlate") String licensePlate);
}
