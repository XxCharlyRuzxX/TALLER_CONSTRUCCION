package com.taller.sistema_taller.service.maintenance_service.maintenance_validations;

import com.taller.sistema_taller.dto.MaintenanceAdvanceDTO;
import com.taller.sistema_taller.exceptions.maintenance_exceptions.*;
import com.taller.sistema_taller.model.MaintenanceManagement.MaintenanceStatus;

import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.List;

@Component
public class MaintenanceValidator {

    public void validateAdvance(MaintenanceAdvanceDTO advanceDTO) {
        if (advanceDTO.getDescription() == null || advanceDTO.getDescription().isEmpty()) {
            throw new InvalidMaintenanceAdvanceException("Description cannot be empty.");
        }
    }

    public void validateStatus(String status) {
        try {
            MaintenanceStatus.valueOf(status);
        } catch (IllegalArgumentException e) {
            throw new InvalidMaintenanceStatusException("Invalid maintenance status.");
        }
    }

    private void validateImages(List<String> imagesAdvance) {
        if (imagesAdvance == null || imagesAdvance.isEmpty()) {
            throw new InvalidMaintenanceAdvanceException("At least one image must be provided.");
        }

        for (String image : imagesAdvance) {
            try {
                // Verifica que cada imagen pueda ser decodificada como Base64 válida
                Base64.getDecoder().decode(image);
            } catch (IllegalArgumentException e) {
                throw new InvalidImageFormatException("Invalid Base64 format for one or more images.");
            }
        }
    }
}
