package com.taller.sistema_taller.service.diagnosis_service.diagnosis_validations;

import com.taller.sistema_taller.dto.VehicleDiagnosisDTO;
import com.taller.sistema_taller.exceptions.diagnosis_exceptions.*;
import com.taller.sistema_taller.model.VehicleManagement.DiagnosisManager;

import org.springframework.stereotype.Component;

@Component
public class DiagnosisValidator {

    public void validateDiagnosisData(VehicleDiagnosisDTO diagnosisDto) {
        validateProblemDetail(diagnosisDto.getProblemDetail());
        validateMaintenanceCost(diagnosisDto.getMaintenanceCost());
        validateEvaluationDate(diagnosisDto.getEvaluationDate());
    }

    public void validateDiagnosisExists(Long diagnosisId, DiagnosisManager diagnosisManager) {
        if (!diagnosisExists(diagnosisId, diagnosisManager)) {
            throw new DiagnosisNotFoundException("Diagnóstico con ID " + diagnosisId + " no encontrado.");
        }
    }

    private void validateProblemDetail(String problemDetail) {
        if (problemDetail == null || problemDetail.isEmpty()) {
            throw new InvalidDiagnosisDataException("El detalle del problema es obligatorio.");
        }
    }

    private void validateMaintenanceCost(float maintenanceCost) {
        if (maintenanceCost < 0) {
            throw new InvalidDiagnosisDataException("El costo de mantenimiento no puede ser negativo.");
        }
    }

    private void validateEvaluationDate(Object evaluationDate) {
        if (evaluationDate == null) {
            throw new InvalidDiagnosisDataException("La fecha de evaluación es obligatoria.");
        }
    }

    private boolean diagnosisExists(Long diagnosisId, DiagnosisManager diagnosisManager) {
        return diagnosisManager.getDiagnoses().stream()
                .anyMatch(diagnosis -> diagnosis.getIdDiagnosis().equals(diagnosisId));
    }
}


