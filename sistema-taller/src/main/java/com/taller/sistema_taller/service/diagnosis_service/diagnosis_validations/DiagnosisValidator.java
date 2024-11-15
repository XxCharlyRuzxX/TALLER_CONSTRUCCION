package com.taller.sistema_taller.service.diagnosis_service.diagnosis_validations;

import com.taller.sistema_taller.dto.VehicleDiagnosisDTO;
import com.taller.sistema_taller.exceptions.diagnosis_exceptions.*;
import com.taller.sistema_taller.model.VehicleManagement.DiagnosisManager;

import org.springframework.stereotype.Component;

@Component
public class DiagnosisValidator {

    public void validateDiagnosisData(VehicleDiagnosisDTO diagnosisDto) {
        if (diagnosisDto.getProblemDetail() == null || diagnosisDto.getProblemDetail().isEmpty()) {
            throw new InvalidDiagnosisDataException("El detalle del problema es obligatorio.");
        }
        if (diagnosisDto.getMaintenanceCost() < 0) {
            throw new InvalidDiagnosisDataException("El costo de mantenimiento no puede ser negativo.");
        }
        if (diagnosisDto.getEvaluationDate() == null) {
            throw new InvalidDiagnosisDataException("La fecha de evaluación es obligatoria.");
        }
    }

    public void validateDiagnosisExists(Long diagnosisId, DiagnosisManager diagnosisManager) {
        boolean exists = diagnosisManager.getDiagnoses().stream()
                .anyMatch(diagnosis -> diagnosis.getIdDiagnosis().equals(diagnosisId));
        if (!exists) {
            throw new DiagnosisNotFoundException("Diagnóstico con ID " + diagnosisId + " no encontrado.");
        }
    }
}

