package com.taller.sistema_taller.service.maintenance_service.maintenance_validations;

import com.taller.sistema_taller.dto.MaintenanceAdvanceDTO;
import com.taller.sistema_taller.exceptions.maintenance_exceptions.*;
import com.taller.sistema_taller.model.MaintenanceManagement.MaintenanceStatus;

import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.List;

@Component
public class MaintenanceValidator {

    public void validateMaintenanceAdvance(MaintenanceAdvanceDTO advanceDTO) {
        validateDescription(advanceDTO.getDescription());
        //validateImages(advanceDTO.getImagesAdvance());  desabilitada por el momento
    }

    public void validateMaintenanceStatus(String status) {
        if (!isValidStatus(status)) {
            throw new InvalidMaintenanceStatusException("Invalid maintenance status: " + status);
        }
    }

    private void validateDescription(String description) {
        if (description == null || description.isEmpty()) {
            throw new InvalidMaintenanceAdvanceException("Description cannot be empty.");
        }
    }

    @SuppressWarnings("unused")
    private void validateImages(List<String> imagesAdvance) {
        if (imagesAdvance == null || imagesAdvance.isEmpty()) {
            throw new InvalidMaintenanceAdvanceException("At least one image must be provided.");
        }

        for (String image : imagesAdvance) {
            validateBase64Image(image);
        }
    }

    private void validateBase64Image(String image) {
        try {
            Base64.getDecoder().decode(image);
        } catch (IllegalArgumentException e) {
            throw new InvalidImageFormatException("Invalid Base64 format for image: " + image);
        }
    }

    private boolean isValidStatus(String status) {
        try {
            MaintenanceStatus.valueOf(status);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}

