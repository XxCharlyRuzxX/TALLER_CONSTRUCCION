package com.taller.sistema_taller.service.part_service.part_diagnosis_validations;


import com.taller.sistema_taller.dto.PartDiagnosisDTO;
import com.taller.sistema_taller.exceptions.part_diagnosis_exceptions.InvalidPartDataException;

import org.springframework.stereotype.Component;

@Component
public class PartDiagnosisValidator {

    public void validatePartData(PartDiagnosisDTO partDto) {
        if (partDto.getPartDetail() == null || partDto.getPartDetail().isEmpty()) {
            throw new InvalidPartDataException("Part detail cannot be null or empty");
        }
        if (partDto.getPartCost() < 0) {
            throw new InvalidPartDataException("Part cost cannot be negative");
        }
        if (partDto.getEstimatedArrivalDate() == null) {
            throw new InvalidPartDataException("Estimated arrival date cannot be null");
        }
        if (partDto.getShippingStatus() == null) {
            throw new InvalidPartDataException("Shipping status cannot be null");
        }
    }
}

