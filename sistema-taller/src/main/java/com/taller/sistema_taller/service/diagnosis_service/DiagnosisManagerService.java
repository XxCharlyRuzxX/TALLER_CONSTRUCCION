package com.taller.sistema_taller.service.diagnosis_service;

import com.taller.sistema_taller.dto.VehicleDiagnosisDTO;
import com.taller.sistema_taller.dto.PartDiagnosisDTO;
import com.taller.sistema_taller.model.VehicleManagement.DiagnosisManager;
import com.taller.sistema_taller.model.VehicleManagement.VehicleDiagnosis;
import com.taller.sistema_taller.model.VehicleManagement.PartDiagnosis;
import com.taller.sistema_taller.repositories.DiagnosisManagerRepository;
import com.taller.sistema_taller.service.diagnosis_service.diagnosis_validations.DiagnosisValidator;
import com.taller.sistema_taller.service.diagnosis_service.interfaces.DiagnosisManagerServiceInterface;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DiagnosisManagerService implements DiagnosisManagerServiceInterface {

  private final DiagnosisManagerRepository diagnosisManagerRepository;
  private final DiagnosisValidator diagnosisValidator;

  @Autowired
  public DiagnosisManagerService(DiagnosisManagerRepository diagnosisManagerRepository,
      DiagnosisValidator diagnosisValidator) {
    this.diagnosisManagerRepository = diagnosisManagerRepository;
    this.diagnosisValidator = diagnosisValidator;
  }

  @Override
  @Transactional
  public void addDiagnosis(Long diagnosisManagerId, VehicleDiagnosisDTO diagnosisDto) {
    diagnosisValidator.validateDiagnosisData(diagnosisDto);
    DiagnosisManager diagnosisManager = findDiagnosisManagerById(diagnosisManagerId);
    VehicleDiagnosis diagnosis = mapToVehicleDiagnosis(diagnosisDto);
    diagnosisManager.addDiagnosis(diagnosis);
    saveDiagnosisManager(diagnosisManager);
  }

  @Override
  @Transactional
  public boolean removeDiagnosisById(Long diagnosisManagerId, Long diagnosisId) {
    DiagnosisManager diagnosisManager = findDiagnosisManagerById(diagnosisManagerId);
    boolean isRemoved = diagnosisManager.removeDiagnosisById(diagnosisId);
    if (isRemoved) {
      saveDiagnosisManager(diagnosisManager);
    }
    return isRemoved;
  }

  @Override
  public VehicleDiagnosisDTO getDiagnosisById(Long diagnosisManagerId, Long diagnosisId) {
    DiagnosisManager diagnosisManager = findDiagnosisManagerById(diagnosisManagerId);
    VehicleDiagnosis diagnosis = findDiagnosisById(diagnosisManager, diagnosisId);
    return mapToVehicleDiagnosisDTO(diagnosis);
  }

  @Override
  public List<VehicleDiagnosisDTO> getAllVehicleDiagnoses(Long diagnosisManagerId) {
    DiagnosisManager diagnosisManager = findDiagnosisManagerById(diagnosisManagerId);
    return diagnosisManager.getDiagnoses().stream()
        .map(this::mapToVehicleDiagnosisDTO)
        .collect(Collectors.toList());
  }

  @Override
  public List<VehicleDiagnosisDTO> getAuthorizedDiagnoses(Long diagnosisManagerId) {
    DiagnosisManager diagnosisManager = findDiagnosisManagerById(diagnosisManagerId);
    return diagnosisManager.getAuthorizedDiagnoses().stream()
        .map(this::mapToVehicleDiagnosisDTO)
        .collect(Collectors.toList());
  }

  @Override
  public float calculateTotalDiagnosisCost(Long diagnosisManagerId) {
    DiagnosisManager diagnosisManager = findDiagnosisManagerById(diagnosisManagerId);
    return diagnosisManager.calculateTotalDiagnosisCost();
  }

  @Override
  public float calculateAuthorizedDiagnosisCost(Long diagnosisManagerId) {
    DiagnosisManager diagnosisManager = findDiagnosisManagerById(diagnosisManagerId);
    return diagnosisManager.calculateAuthorizedDiagnosisCost();
  }

  @Override
  @Transactional
  public boolean updateDiagnosis(Long diagnosisManagerId, Long diagnosisId, VehicleDiagnosisDTO updatedDiagnosisDto) {
    DiagnosisManager diagnosisManager = findDiagnosisManagerById(diagnosisManagerId);
    VehicleDiagnosis diagnosis = findDiagnosisById(diagnosisManager, diagnosisId);

    diagnosisValidator.validateDiagnosisData(updatedDiagnosisDto);
    updateVehicleDiagnosis(diagnosis, updatedDiagnosisDto);
    saveDiagnosisManager(diagnosisManager);
    return true;
  }

  @Override
  public List<VehicleDiagnosisDTO> getAllDiagnoses() {
    return diagnosisManagerRepository.findAll().stream()
        .flatMap(manager -> manager.getDiagnoses().stream())
        .map(this::mapToVehicleDiagnosisDTO)
        .collect(Collectors.toList());
  }

  private DiagnosisManager findDiagnosisManagerById(Long id) {
    return diagnosisManagerRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Diagnosis Manager with ID " + id + " not found."));
  }

  private VehicleDiagnosis findDiagnosisById(DiagnosisManager diagnosisManager, Long diagnosisId) {
    return diagnosisManager.getDiagnoses().stream()
        .filter(diagnosis -> diagnosis.getIdDiagnosis().equals(diagnosisId))
        .findFirst()
        .orElseThrow(() -> new IllegalArgumentException("Diagnosis with ID " + diagnosisId + " not found."));
  }

  private void saveDiagnosisManager(DiagnosisManager diagnosisManager) {
    diagnosisManagerRepository.save(diagnosisManager);
  }

  private VehicleDiagnosis mapToVehicleDiagnosis(VehicleDiagnosisDTO dto) {
    VehicleDiagnosis diagnosis = new VehicleDiagnosis();
    diagnosis.setProblemDetail(dto.getProblemDetail());
    diagnosis.setMaintenanceCost(dto.getMaintenanceCost());
    diagnosis.setEvaluationDate(dto.getEvaluationDate());
    diagnosis.setAuthorized(dto.isAuthorized());
    if (dto.getPartsList() != null) {
      diagnosis.getPartsList().clear();
      diagnosis.getPartsList().addAll(dto.getPartsList().stream()
          .map(this::mapToPartDiagnosis)
          .collect(Collectors.toList()));
    }
    return diagnosis;
  }

  private void updateVehicleDiagnosis(VehicleDiagnosis diagnosis, VehicleDiagnosisDTO updatedDto) {
    diagnosis.setProblemDetail(updatedDto.getProblemDetail());
    diagnosis.setMaintenanceCost(updatedDto.getMaintenanceCost());
    diagnosis.setEvaluationDate(updatedDto.getEvaluationDate());
    diagnosis.setAuthorized(updatedDto.isAuthorized());
    diagnosis.getPartsList().clear();
    diagnosis.getPartsList().addAll(updatedDto.getPartsList().stream()
        .map(this::mapToPartDiagnosis)
        .collect(Collectors.toList()));
  }

  private VehicleDiagnosisDTO mapToVehicleDiagnosisDTO(VehicleDiagnosis diagnosis) {
    VehicleDiagnosisDTO dto = new VehicleDiagnosisDTO();
    dto.setIdDiagnosis(diagnosis.getIdDiagnosis());
    dto.setProblemDetail(diagnosis.getProblemDetail());
    dto.setMaintenanceCost(diagnosis.getMaintenanceCost());
    dto.setEvaluationDate(diagnosis.getEvaluationDate());
    dto.setAuthorized(diagnosis.isAuthorized());
    dto.setPartsList(diagnosis.getPartsList().stream()
        .map(this::mapToPartDiagnosisDTO)
        .collect(Collectors.toList()));
    return dto;
  }

  private PartDiagnosis mapToPartDiagnosis(PartDiagnosisDTO dto) {
    PartDiagnosis part = new PartDiagnosis();
    part.setPartDetail(dto.getPartDetail());
    part.setPartCost(dto.getPartCost());
    part.setEstimatedArrivalDate(dto.getEstimatedArrivalDate());
    part.setShippingStatus(dto.getShippingStatus());
    return part;
  }

  private PartDiagnosisDTO mapToPartDiagnosisDTO(PartDiagnosis part) {
    PartDiagnosisDTO dto = new PartDiagnosisDTO();
    dto.setIdPart(part.getIdPart());
    dto.setPartDetail(part.getPartDetail());
    dto.setPartCost(part.getPartCost());
    dto.setEstimatedArrivalDate(part.getEstimatedArrivalDate());
    dto.setShippingStatus(part.getShippingStatus());
    return dto;
  }
}
