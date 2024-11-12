package com.taller.sistema_taller.service.diagnosis_service;

import com.taller.sistema_taller.dto.VehicleDiagnosisDTO;
import com.taller.sistema_taller.dto.PartDiagnosisDTO;
import com.taller.sistema_taller.model.VehicleManagement.DiagnosisManager;
import com.taller.sistema_taller.model.VehicleManagement.VehicleDiagnosis;
import com.taller.sistema_taller.model.VehicleManagement.PartDiagnosis;
import com.taller.sistema_taller.repositories.DiagnosisManagerRepository;
import com.taller.sistema_taller.service.diagnosis_service.interfaces.DiagnosisManagerServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DiagnosisManagerService implements DiagnosisManagerServiceInterface {

  private final DiagnosisManagerRepository diagnosisManagerRepository;

  @Autowired
  public DiagnosisManagerService(DiagnosisManagerRepository diagnosisManagerRepository) {
    this.diagnosisManagerRepository = diagnosisManagerRepository;
  }

  @Override
  @Transactional
  public void addDiagnosis(Long diagnosisManagerId, VehicleDiagnosisDTO diagnosisDto) {
    DiagnosisManager diagnosisManager = getDiagnosisManagerById(diagnosisManagerId);
    VehicleDiagnosis diagnosis = convertToVehicleDiagnosis(diagnosisDto);
    diagnosisManager.addDiagnosis(diagnosis);
    diagnosisManagerRepository.save(diagnosisManager);
  }

  @Override
  @Transactional
  public boolean removeDiagnosisById(Long diagnosisManagerId, Long diagnosisId) {
    DiagnosisManager diagnosisManager = getDiagnosisManagerById(diagnosisManagerId);
    boolean removed = diagnosisManager.removeDiagnosisById(diagnosisId);
    diagnosisManagerRepository.save(diagnosisManager);
    return removed;
  }

  @Override
  public VehicleDiagnosisDTO getDiagnosisById(Long diagnosisManagerId, Long diagnosisId) {
    DiagnosisManager diagnosisManager = getDiagnosisManagerById(diagnosisManagerId);
    return diagnosisManager.getDiagnoses().stream()
        .filter(diagnosis -> diagnosis.getIdDiagnosis().equals(diagnosisId))
        .map(this::convertToVehicleDiagnosisDTO)
        .findFirst()
        .orElseThrow(() -> new IllegalArgumentException("Diagnosis with ID " + diagnosisId + " not found."));
  }

  @Override
  public List<VehicleDiagnosisDTO> getAllDiagnoses(Long diagnosisManagerId) {
    DiagnosisManager diagnosisManager = getDiagnosisManagerById(diagnosisManagerId);
    return diagnosisManager.getDiagnoses().stream()
        .map(this::convertToVehicleDiagnosisDTO)
        .collect(Collectors.toList());
  }

  @Override
  public List<VehicleDiagnosisDTO> getAuthorizedDiagnoses(Long diagnosisManagerId) {
    DiagnosisManager diagnosisManager = getDiagnosisManagerById(diagnosisManagerId);
    return diagnosisManager.getAuthorizedDiagnoses().stream()
        .map(this::convertToVehicleDiagnosisDTO)
        .collect(Collectors.toList());
  }

  @Override
  public float calculateTotalDiagnosisCost(Long diagnosisManagerId) {
    DiagnosisManager diagnosisManager = getDiagnosisManagerById(diagnosisManagerId);
    return diagnosisManager.calculateTotalDiagnosisCost();
  }

  @Override
  public float calculateAuthorizedDiagnosisCost(Long diagnosisManagerId) {
    DiagnosisManager diagnosisManager = getDiagnosisManagerById(diagnosisManagerId);
    return diagnosisManager.calculateAuthorizedDiagnosisCost();
  }

  @Override
  @Transactional
  public boolean updateDiagnosis(Long diagnosisManagerId, Long diagnosisId, VehicleDiagnosisDTO updatedDiagnosisDto) {
    DiagnosisManager diagnosisManager = getDiagnosisManagerById(diagnosisManagerId);
    Optional<VehicleDiagnosis> diagnosisOptional = diagnosisManager.getDiagnoses().stream()
        .filter(diagnosis -> diagnosis.getIdDiagnosis().equals(diagnosisId))
        .findFirst();

    if (diagnosisOptional.isPresent()) {
      VehicleDiagnosis diagnosis = diagnosisOptional.get();
      diagnosis.setProblemDetail(updatedDiagnosisDto.getProblemDetail());
      diagnosis.setMaintenanceCost(updatedDiagnosisDto.getMaintenanceCost());
      diagnosis.setEvaluationDate(updatedDiagnosisDto.getEvaluationDate());
      diagnosis.setAuthorized(updatedDiagnosisDto.isAuthorized());
      diagnosis.getPartsList().clear();
      diagnosis.getPartsList().addAll(updatedDiagnosisDto.getPartsList().stream()
          .map(this::convertToPartDiagnosis)
          .collect(Collectors.toList()));
      diagnosisManagerRepository.save(diagnosisManager);
      return true;
    } else {
      return false;
    }
  }

  private DiagnosisManager getDiagnosisManagerById(Long id) {
    return diagnosisManagerRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Diagnosis Manager with ID " + id + " not found."));
  }

  private VehicleDiagnosis convertToVehicleDiagnosis(VehicleDiagnosisDTO dto) {
    VehicleDiagnosis diagnosis = new VehicleDiagnosis();
    diagnosis.setProblemDetail(dto.getProblemDetail());
    diagnosis.setMaintenanceCost(dto.getMaintenanceCost());
    diagnosis.setEvaluationDate(dto.getEvaluationDate());
    diagnosis.setAuthorized(dto.isAuthorized());
    if (dto.getPartsList() != null) {
      diagnosis.getPartsList().addAll(dto.getPartsList().stream()
          .map(this::convertToPartDiagnosis)
          .collect(Collectors.toList()));
    }
    return diagnosis;
  }

  private VehicleDiagnosisDTO convertToVehicleDiagnosisDTO(VehicleDiagnosis diagnosis) {
    VehicleDiagnosisDTO dto = new VehicleDiagnosisDTO();
    dto.setIdDiagnosis(diagnosis.getIdDiagnosis());
    dto.setProblemDetail(diagnosis.getProblemDetail());
    dto.setMaintenanceCost(diagnosis.getMaintenanceCost());
    dto.setEvaluationDate(diagnosis.getEvaluationDate());
    dto.setAuthorized(diagnosis.isAuthorized());
    dto.setPartsList(diagnosis.getPartsList().stream()
        .map(this::convertToPartDiagnosisDTO)
        .collect(Collectors.toList()));
    return dto;
  }

  private PartDiagnosis convertToPartDiagnosis(PartDiagnosisDTO dto) {
    PartDiagnosis part = new PartDiagnosis();
    part.setPartDetail(dto.getPartDetail());
    part.setPartCost(dto.getPartCost());
    part.setEstimatedArrivalDate(dto.getEstimatedArrivalDate());
    part.setShippingStatus(dto.getShippingStatus());
    return part;
  }

  private PartDiagnosisDTO convertToPartDiagnosisDTO(PartDiagnosis part) {
    PartDiagnosisDTO dto = new PartDiagnosisDTO();
    dto.setIdPart(part.getIdPart());
    dto.setPartDetail(part.getPartDetail());
    dto.setPartCost(part.getPartCost());
    dto.setEstimatedArrivalDate(part.getEstimatedArrivalDate());
    dto.setShippingStatus(part.getShippingStatus());
    return dto;
  }
}
