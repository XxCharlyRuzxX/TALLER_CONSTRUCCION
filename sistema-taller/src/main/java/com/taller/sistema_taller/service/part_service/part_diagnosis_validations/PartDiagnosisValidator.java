package com.taller.sistema_taller.service.part_service.part_diagnosis_validations;

import com.taller.sistema_taller.dto.PartDiagnosisDTO;
import com.taller.sistema_taller.exceptions.part_diagnosis_exceptions.InvalidPartDataException;

import org.springframework.stereotype.Component;

@Component
public class PartDiagnosisValidator {

    public void validatePartData(PartDiagnosisDTO partDto) {
        validatePartDetail(partDto.getPartDetail());
        validatePartCost(partDto.getPartCost());
        validateEstimatedArrivalDate(partDto.getEstimatedArrivalDate());
        validateShippingStatus(partDto.getShippingStatus());
    }

    private void validatePartDetail(String partDetail) {
        if (partDetail == null || partDetail.isEmpty()) {
            throw new InvalidPartDataException("Part detail cannot be null or empty");
        }
    }

    private void validatePartCost(float partCost) {
        if (partCost < 0) {
            throw new InvalidPartDataException("Part cost cannot be negative");
        }
    }

    private void validateEstimatedArrivalDate(Object estimatedArrivalDate) {
        if (estimatedArrivalDate == null) {
            throw new InvalidPartDataException("Estimated arrival date cannot be null");
        }
    }

    private void validateShippingStatus(Object shippingStatus) {
        if (shippingStatus == null) {
            throw new InvalidPartDataException("Shipping status cannot be null");
        }
    }
}
