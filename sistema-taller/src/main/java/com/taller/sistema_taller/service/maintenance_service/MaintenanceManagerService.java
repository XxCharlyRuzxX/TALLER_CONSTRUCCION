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

import java.util.List;
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
        MaintenanceManager manager = findMaintenanceManagerById(managerId);

        maintenanceValidator.validateMaintenanceAdvance(advanceDTO);

        if (advanceDTO.getImagesAdvance() == null || advanceDTO.getImagesAdvance().isEmpty()) {
            manager.addMaintenanceAdvanceWithoutImage(advanceDTO.getDescription());
        } else {
            manager.addMaintenanceAdvanceWithImages(advanceDTO.getDescription(), advanceDTO.getImagesAdvance());
        }

        saveMaintenanceManager(manager);

        return mapToMaintenanceManagerDTO(manager);
    }

    @Override
    @Transactional
    public boolean updateMaintenanceStatus(Long managerId, String status) {
        MaintenanceManager manager = findMaintenanceManagerById(managerId);

        maintenanceValidator.validateMaintenanceStatus(status);

        manager.setMaintenanceStatus(MaintenanceStatus.valueOf(status));

        saveMaintenanceManager(manager);
        return true;
    }

    @Override
    public MaintenanceManagerDTO getMaintenanceManager(Long managerId) {
        MaintenanceManager manager = findMaintenanceManagerById(managerId);
        return mapToMaintenanceManagerDTO(manager);
    }

    @Override
    public MaintenanceAdvanceDTO getMaintenanceAdvanceById(Long managerId, Long advanceId) {
        MaintenanceManager manager = findMaintenanceManagerById(managerId);

        MaintenanceAdvance advance = findMaintenanceAdvanceById(manager, advanceId);

        return mapToMaintenanceAdvanceDTO(advance);
    }

    @Override
    @Transactional
    public boolean deleteMaintenanceAdvanceById(Long managerId, Long advanceId) {
        MaintenanceManager manager = findMaintenanceManagerById(managerId);

        boolean removed = manager.removeMaintenanceAdvancebyId(advanceId);

        if (!removed) {
            throw new MaintenanceAdvanceNotFoundException("Maintenance Advance not found with ID: " + advanceId);
        }

        saveMaintenanceManager(manager);
        return true;
    }

    @Override
    @Transactional
    public MaintenanceAdvanceDTO updateMaintenanceAdvance(Long managerId, Long advanceId,
            MaintenanceAdvanceDTO advanceDTO) {
        MaintenanceManager manager = findMaintenanceManagerById(managerId);
        MaintenanceAdvance advance = findMaintenanceAdvanceById(manager, advanceId);

        maintenanceValidator.validateMaintenanceAdvance(advanceDTO);

        updateMaintenanceAdvanceDetails(advance, advanceDTO);

        saveMaintenanceManager(manager);

        return mapToMaintenanceAdvanceDTO(advance);
    }

    @Override
    public List<MaintenanceAdvanceDTO> getAllMaintenanceAdvances() {
        return maintenanceManagerRepository.findAll().stream()
                .flatMap(manager -> manager.getMaintenanceProgresses().stream())
                .map(this::mapToMaintenanceAdvanceDTO)
                .collect(Collectors.toList());
    }

    private MaintenanceManager findMaintenanceManagerById(Long managerId) {
        return maintenanceManagerRepository.findById(managerId)
                .orElseThrow(() -> new MaintenanceManagerNotFoundException(
                        "Maintenance Manager not found with ID: " + managerId));
    }

    private MaintenanceAdvance findMaintenanceAdvanceById(MaintenanceManager manager, Long advanceId) {
        MaintenanceAdvance advance = manager.getMaintenanceAdvanceById(advanceId);
        if (advance == null) {
            throw new MaintenanceAdvanceNotFoundException("Maintenance Advance not found with ID: " + advanceId);
        }
        return advance;
    }

    private void saveMaintenanceManager(MaintenanceManager manager) {
        maintenanceManagerRepository.save(manager);
    }

    private void updateMaintenanceAdvanceDetails(MaintenanceAdvance advance, MaintenanceAdvanceDTO dto) {
        advance.setDescription(dto.getDescription());
        advance.getImagesAdvance().clear();
    }

    private MaintenanceManagerDTO mapToMaintenanceManagerDTO(MaintenanceManager manager) {
        MaintenanceManagerDTO dto = new MaintenanceManagerDTO();
        dto.setIdMaintenanceManager(manager.getIdMaintenanceManager());
        dto.setMaintenanceStatus(manager.getMaintenanceStatus().name());
        dto.setMaintenanceProgresses(manager.getMaintenanceProgresses().stream()
                .map(this::mapToMaintenanceAdvanceDTO)
                .collect(Collectors.toList()));
        return dto;
    }

    private MaintenanceAdvanceDTO mapToMaintenanceAdvanceDTO(MaintenanceAdvance advance) {
        MaintenanceAdvanceDTO dto = new MaintenanceAdvanceDTO();
        dto.setIdMaintenanceAdvance(advance.getIdMaintenanceAdvance());
        dto.setDate(advance.getDate());
        dto.setDescription(advance.getDescription());
        return dto;
    }
}
