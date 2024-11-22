package com.taller.sistema_taller.service.part_service;

import com.taller.sistema_taller.dto.PartDiagnosisDTO;
import com.taller.sistema_taller.exceptions.diagnosis_exceptions.DiagnosisManagerNotFoundException;
import com.taller.sistema_taller.exceptions.part_diagnosis_exceptions.PartNotFoundException;
import com.taller.sistema_taller.model.VehicleManagement.DiagnosisManager;
import com.taller.sistema_taller.model.VehicleManagement.PartDiagnosis;
import com.taller.sistema_taller.model.VehicleManagement.VehicleDiagnosis;
import com.taller.sistema_taller.repositories.DiagnosisManagerRepository;
import com.taller.sistema_taller.service.part_service.interfaces.PartDiagnosisServiceInterface;
import com.taller.sistema_taller.service.part_service.part_diagnosis_validations.PartDiagnosisValidator;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PartDiagnosisService implements PartDiagnosisServiceInterface {

  private final DiagnosisManagerRepository diagnosisManagerRepository;
  private final PartDiagnosisValidator partDiagnosisValidator;

  @Autowired
  public PartDiagnosisService(DiagnosisManagerRepository diagnosisManagerRepository,
      PartDiagnosisValidator partDiagnosisValidator) {
    this.diagnosisManagerRepository = diagnosisManagerRepository;
    this.partDiagnosisValidator = partDiagnosisValidator;
  }

  @Override
  @Transactional
  public PartDiagnosisDTO addPartToDiagnosis(Long diagnosisId, PartDiagnosisDTO partDto) {
    partDiagnosisValidator.validatePartData(partDto);

    VehicleDiagnosis diagnosis = getVehicleDiagnosisById(diagnosisId);
    PartDiagnosis part = mapToPartDiagnosis(partDto);

    diagnosis.addPart(part);
    saveDiagnosisManager(diagnosisId);

    return mapToPartDiagnosisDTO(part);
  }

  @Override
  @Transactional
  public boolean deletePartFromDiagnosis(Long diagnosisId, Long partId) {
    VehicleDiagnosis diagnosis = getVehicleDiagnosisById(diagnosisId);

    boolean isRemoved = removePartFromDiagnosis(diagnosis, partId);
    if (isRemoved) {
      saveDiagnosisManager(diagnosisId);
    }

    return isRemoved;
  }

  @Override
  public PartDiagnosisDTO getPartById(Long diagnosisId, Long partId) {
    VehicleDiagnosis diagnosis = getVehicleDiagnosisById(diagnosisId);
    PartDiagnosis part = getPartFromDiagnosis(diagnosis, partId);

    return mapToPartDiagnosisDTO(part);
  }

  @Override
  public List<PartDiagnosisDTO> getlistAllParts(Long diagnosisId) {
    VehicleDiagnosis diagnosis = getVehicleDiagnosisById(diagnosisId);

    return diagnosis.getPartsList().stream()
        .map(this::mapToPartDiagnosisDTO)
        .collect(Collectors.toList());
  }

  @Override
  @Transactional
  public void updatePartShippingStatus(Long diagnosisId, Long partId, PartDiagnosis.ShippingStatus status) {
    VehicleDiagnosis diagnosis = getVehicleDiagnosisById(diagnosisId);
    PartDiagnosis part = getPartFromDiagnosis(diagnosis, partId);

    updateShippingStatus(part, status);
    saveDiagnosisManager(diagnosisId);
  }

  @Override
  public float calculateTotalPartCost(Long diagnosisId) {
    VehicleDiagnosis diagnosis = getVehicleDiagnosisById(diagnosisId);

    return calculateTotalCost(diagnosis);
  }

  private VehicleDiagnosis getVehicleDiagnosisById(Long diagnosisId) {
    DiagnosisManager diagnosisManager = findDiagnosisManager(diagnosisId);
    return findDiagnosis(diagnosisManager, diagnosisId);
  }

  private DiagnosisManager findDiagnosisManager(Long diagnosisId) {
    return diagnosisManagerRepository.findById(diagnosisId)
        .orElseThrow(() -> new DiagnosisManagerNotFoundException(
            "Diagnosis Manager with ID " + diagnosisId + " not found"));
  }

  private VehicleDiagnosis findDiagnosis(DiagnosisManager diagnosisManager, Long diagnosisId) {
    return diagnosisManager.getDiagnoses().stream()
        .filter(diagnosis -> diagnosis.getIdDiagnosis().equals(diagnosisId))
        .findFirst()
        .orElseThrow(() -> new PartNotFoundException(
            "Diagnosis with ID " + diagnosisId + " not found"));
  }

  private PartDiagnosis getPartFromDiagnosis(VehicleDiagnosis diagnosis, Long partId) {
    return diagnosis.getPartsList().stream()
        .filter(part -> part.getIdPart().equals(partId))
        .findFirst()
        .orElseThrow(() -> new PartNotFoundException(
            "Part with ID " + partId + " not found"));
  }

  private boolean removePartFromDiagnosis(VehicleDiagnosis diagnosis, Long partId) {
    return diagnosis.getPartsList().removeIf(part -> part.getIdPart().equals(partId));
  }

  private void updateShippingStatus(PartDiagnosis part, PartDiagnosis.ShippingStatus status) {
    part.setShippingStatus(status);
  }

  private void saveDiagnosisManager(Long diagnosisId) {
    DiagnosisManager diagnosisManager = findDiagnosisManager(diagnosisId);
    diagnosisManagerRepository.save(diagnosisManager);
  }

  private float calculateTotalCost(VehicleDiagnosis diagnosis) {
    return (float) diagnosis.getPartsList().stream()
        .mapToDouble(PartDiagnosis::getPartCost)
        .sum();
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
