package com.taller.sistema_taller.service.maintenance_service;

import com.taller.sistema_taller.dto.MaintenanceAdvanceDTO;
import com.taller.sistema_taller.dto.MaintenanceManagerDTO;
import com.taller.sistema_taller.exceptions.maintenance_exceptions.*;
import com.taller.sistema_taller.model.MaintenanceManagement.MaintenanceAdvance;
import com.taller.sistema_taller.model.MaintenanceManagement.MaintenanceManager;
import com.taller.sistema_taller.model.MaintenanceManagement.MaintenanceStatus;
import com.taller.sistema_taller.repositories.MaintenanceManagerRepository;
import com.taller.sistema_taller.service.maintenance_service.interfaces.MaintenanceManagerServiceInterface;
import com.taller.sistema_taller.service.maintenance_service.maintenance_validations.MaintenanceValidator;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.stream.Collectors;

@Service
public class MaintenanceManagerService implements MaintenanceManagerServiceInterface {

    private final MaintenanceManagerRepository maintenanceManagerRepository;
    private final MaintenanceValidator maintenanceValidator;

    @Autowired
    public MaintenanceManagerService(MaintenanceManagerRepository maintenanceManagerRepository,
            MaintenanceValidator maintenanceValidator) {
        this.maintenanceManagerRepository = maintenanceManagerRepository;
        this.maintenanceValidator = maintenanceValidator;
    }

    @Override
    @Transactional
    public MaintenanceManagerDTO addMaintenanceAdvance(Long managerId, MaintenanceAdvanceDTO advanceDTO) {
        MaintenanceManager manager = maintenanceManagerRepository.findById(managerId)
                .orElseThrow(() -> new MaintenanceManagerNotFoundException("Maintenance Manager not found"));

        maintenanceValidator.validateAdvance(advanceDTO);

        MaintenanceAdvance advance = new MaintenanceAdvance(advanceDTO.getDate(), advanceDTO.getDescription());
        //advanceDTO.getImagesAdvance().forEach(advance::addImage);

        manager.getMaintenanceProgresses().add(advance);
        maintenanceManagerRepository.save(manager);

        return convertToDTO(manager);
    }

    @Override
    @Transactional
    public boolean updateMaintenanceStatus(Long managerId, String status) {
        MaintenanceManager manager = maintenanceManagerRepository.findById(managerId)
                .orElseThrow(() -> new MaintenanceManagerNotFoundException("Maintenance Manager not found"));

        maintenanceValidator.validateStatus(status);

        manager.setMaintenanceStatus(MaintenanceStatus.valueOf(status));
        maintenanceManagerRepository.save(manager);
        return true;
    }

    @Override
    public MaintenanceManagerDTO getMaintenanceManager(Long managerId) {
        MaintenanceManager manager = maintenanceManagerRepository.findById(managerId)
                .orElseThrow(() -> new MaintenanceManagerNotFoundException("Maintenance Manager not found"));
        return convertToDTO(manager);
    }

    @Override
    public MaintenanceAdvanceDTO getMaintenanceAdvanceById(Long managerId, Long advanceId) {
        MaintenanceManager manager = maintenanceManagerRepository.findById(managerId)
                .orElseThrow(() -> new MaintenanceManagerNotFoundException("Maintenance Manager not found"));

        MaintenanceAdvance advance = manager.getMaintenanceAdvanceById(advanceId);
        if (advance == null) {
            throw new MaintenanceAdvanceNotFoundException("Maintenance Advance not found");
        }
        return convertAdvanceToDTO(advance);
    }

    @Override
    @Transactional
    public boolean deleteMaintenanceAdvanceById(Long managerId, Long advanceId) {
        MaintenanceManager manager = maintenanceManagerRepository.findById(managerId)
                .orElseThrow(() -> new MaintenanceManagerNotFoundException("Maintenance Manager not found"));

        boolean removed = manager.removeMaintenanceAdvancebyId(advanceId);
        maintenanceManagerRepository.save(manager);
        if (!removed) {
            throw new MaintenanceAdvanceNotFoundException("Maintenance Advance not found");
        }
        return true;
    }

    @Override
    @Transactional
    public MaintenanceAdvanceDTO updateMaintenanceAdvance(Long managerId, Long advanceId,
            MaintenanceAdvanceDTO advanceDTO) {
        MaintenanceManager manager = maintenanceManagerRepository.findById(managerId)
                .orElseThrow(() -> new MaintenanceManagerNotFoundException("Maintenance Manager not found"));

        MaintenanceAdvance advance = manager.getMaintenanceAdvanceById(advanceId);
        if (advance == null) {
            throw new MaintenanceAdvanceNotFoundException("Maintenance Advance not found");
        }

        maintenanceValidator.validateAdvance(advanceDTO);

        advance.setDescription(advanceDTO.getDescription());
        advance.getImagesAdvance().clear();
        advance.getImagesAdvance().addAll(advanceDTO.getImagesAdvance());
        maintenanceManagerRepository.save(manager);

        return convertAdvanceToDTO(advance);
    }

    private MaintenanceManagerDTO convertToDTO(MaintenanceManager manager) {
        MaintenanceManagerDTO dto = new MaintenanceManagerDTO();
        dto.setIdMaintenanceManager(manager.getIdMaintenanceManager());
        dto.setMaintenanceStatus(manager.getMaintenanceStatus().name());
        dto.setMaintenanceProgresses(manager.getMaintenanceProgresses().stream()
                .map(this::convertAdvanceToDTO)
                .collect(Collectors.toList()));
        return dto;
    }

    @Transactional
    private MaintenanceAdvanceDTO convertAdvanceToDTO(MaintenanceAdvance advance) {
        MaintenanceAdvanceDTO dto = new MaintenanceAdvanceDTO();
        dto.setIdMaintenanceAdvance(advance.getIdMaintenanceAdvance());
        dto.setDate(advance.getDate());
        dto.setDescription(advance.getDescription());
        //dto.setImagesAdvance(advance.getImagesAdvance());
        return dto;
    }
}
