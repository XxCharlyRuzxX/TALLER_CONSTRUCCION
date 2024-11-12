package com.taller.sistema_taller.service.diagnosis_service.interfaces;

import com.taller.sistema_taller.dto.VehicleDiagnosisDTO;
import java.util.List;

public interface DiagnosisManagerServiceInterface {

  void addDiagnosis(Long diagnosisManagerId, VehicleDiagnosisDTO diagnosisDto);

  boolean removeDiagnosisById(Long diagnosisManagerId, Long diagnosisId);

  VehicleDiagnosisDTO getDiagnosisById(Long diagnosisManagerId, Long diagnosisId);

  List<VehicleDiagnosisDTO> getAllDiagnoses(Long diagnosisManagerId);

  List<VehicleDiagnosisDTO> getAuthorizedDiagnoses(Long diagnosisManagerId);

  float calculateTotalDiagnosisCost(Long diagnosisManagerId);

  float calculateAuthorizedDiagnosisCost(Long diagnosisManagerId);

  boolean updateDiagnosis(Long diagnosisManagerId, Long diagnosisId, VehicleDiagnosisDTO updatedDiagnosisDto);

}
