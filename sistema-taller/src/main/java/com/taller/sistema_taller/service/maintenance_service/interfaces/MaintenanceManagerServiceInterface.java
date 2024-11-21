package com.taller.sistema_taller.service.maintenance_service.interfaces;

import java.util.List;

import com.taller.sistema_taller.dto.MaintenanceAdvanceDTO;
import com.taller.sistema_taller.dto.MaintenanceManagerDTO;

public interface MaintenanceManagerServiceInterface {

    MaintenanceManagerDTO addMaintenanceAdvance(Long managerId, MaintenanceAdvanceDTO advanceDTO);

    boolean updateMaintenanceStatus(Long managerId, String status);

    MaintenanceManagerDTO getMaintenanceManager(Long managerId);

    MaintenanceAdvanceDTO getMaintenanceAdvanceById(Long managerId, Long advanceId);

    boolean deleteMaintenanceAdvanceById(Long managerId, Long advanceId);

    MaintenanceAdvanceDTO updateMaintenanceAdvance(Long managerId, Long advanceId, MaintenanceAdvanceDTO advanceDTO);

    List<MaintenanceAdvanceDTO> getAllMaintenanceAdvances();

}
