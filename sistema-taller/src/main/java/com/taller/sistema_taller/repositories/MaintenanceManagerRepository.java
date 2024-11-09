package com.taller.sistema_taller.repositories;

import com.taller.sistema_taller.model.MaintenanceManagement.MaintenanceManager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaintenanceManagerRepository extends JpaRepository<MaintenanceManager, Long> {

}

