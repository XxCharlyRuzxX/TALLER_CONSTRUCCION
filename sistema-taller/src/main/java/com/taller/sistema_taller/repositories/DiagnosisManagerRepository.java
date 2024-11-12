package com.taller.sistema_taller.repositories;

import com.taller.sistema_taller.model.VehicleManagement.DiagnosisManager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiagnosisManagerRepository extends JpaRepository<DiagnosisManager, Long> {

}

