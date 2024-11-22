package com.taller.sistema_taller.service.part_service.interfaces;

import com.taller.sistema_taller.dto.PartDiagnosisDTO;
import com.taller.sistema_taller.model.VehicleManagement.PartDiagnosis;
import java.util.List;

public interface PartDiagnosisServiceInterface {

  PartDiagnosisDTO addPartToDiagnosis(Long diagnosisId, PartDiagnosisDTO partDto);

  boolean deletePartFromDiagnosis(Long diagnosisId, Long partId);

  PartDiagnosisDTO getPartById(Long diagnosisId, Long partId);

  List<PartDiagnosisDTO> getlistAllParts(Long diagnosisId);

  void updatePartShippingStatus(Long diagnosisId, Long partId, PartDiagnosis.ShippingStatus status);

  float calculateTotalPartCost(Long diagnosisId);
}
