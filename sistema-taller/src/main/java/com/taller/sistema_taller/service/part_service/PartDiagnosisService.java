package com.taller.sistema_taller.service.part_service;

import com.taller.sistema_taller.dto.PartDiagnosisDTO;
import com.taller.sistema_taller.exceptions.diagnosis_exceptions.DiagnosisManagerNotFoundException;
import com.taller.sistema_taller.exceptions.part_diagnosis_exceptions.PartNotFoundException;
import com.taller.sistema_taller.model.VehicleManagement.DiagnosisManager;
import com.taller.sistema_taller.model.VehicleManagement.PartDiagnosis;
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
  public PartDiagnosisDTO addPart(Long diagnosisId, PartDiagnosisDTO partDto) {
    partDiagnosisValidator.validatePartData(partDto); // Validación de datos
    DiagnosisManager diagnosisManager = diagnosisManagerRepository.findById(diagnosisId)
        .orElseThrow(
            () -> new DiagnosisManagerNotFoundException("Diagnosis Manager with ID " + diagnosisId + " not found"));

    PartDiagnosis part = convertToPartDiagnosis(partDto);
    diagnosisManager.getDiagnoses().stream()
        .filter(diagnosis -> diagnosis.getIdDiagnosis().equals(diagnosisId))
        .findFirst()
        .orElseThrow(() -> new PartNotFoundException("Diagnosis with ID " + diagnosisId + " not found"))
        .addPart(part);

    diagnosisManagerRepository.save(diagnosisManager);
    return convertToPartDiagnosisDTO(part);
  }

  @Override
  @Transactional
  public boolean removePartById(Long diagnosisId, Long partId) {
    DiagnosisManager diagnosisManager = diagnosisManagerRepository.findById(diagnosisId)
        .orElseThrow(
            () -> new DiagnosisManagerNotFoundException("Diagnosis Manager with ID " + diagnosisId + " not found"));

    boolean removed = diagnosisManager.getDiagnoses().stream()
        .filter(diagnosis -> diagnosis.getIdDiagnosis().equals(diagnosisId))
        .findFirst()
        .orElseThrow(() -> new PartNotFoundException("Diagnosis with ID " + diagnosisId + " not found"))
        .getPartsList()
        .removeIf(part -> part.getIdPart().equals(partId));

    diagnosisManagerRepository.save(diagnosisManager);
    return removed;
  }

  @Override
  public PartDiagnosisDTO getPartById(Long diagnosisId, Long partId) {
    DiagnosisManager diagnosisManager = diagnosisManagerRepository.findById(diagnosisId)
        .orElseThrow(
            () -> new DiagnosisManagerNotFoundException("Diagnosis Manager with ID " + diagnosisId + " not found"));

    PartDiagnosis part = diagnosisManager.getDiagnoses().stream()
        .filter(diagnosis -> diagnosis.getIdDiagnosis().equals(diagnosisId))
        .findFirst()
        .orElseThrow(() -> new PartNotFoundException("Diagnosis with ID " + diagnosisId + " not found"))
        .getPartsList().stream()
        .filter(p -> p.getIdPart().equals(partId))
        .findFirst()
        .orElseThrow(() -> new PartNotFoundException("Part with ID " + partId + " not found"));

    return convertToPartDiagnosisDTO(part);
  }

  @Override
  public List<PartDiagnosisDTO> getAllParts(Long diagnosisId) {
    DiagnosisManager diagnosisManager = diagnosisManagerRepository.findById(diagnosisId)
        .orElseThrow(
            () -> new DiagnosisManagerNotFoundException("Diagnosis Manager with ID " + diagnosisId + " not found"));

    return diagnosisManager.getDiagnoses().stream()
        .filter(diagnosis -> diagnosis.getIdDiagnosis().equals(diagnosisId))
        .findFirst()
        .orElseThrow(() -> new PartNotFoundException("Diagnosis with ID " + diagnosisId + " not found"))
        .getPartsList().stream()
        .map(this::convertToPartDiagnosisDTO)
        .collect(Collectors.toList());
  }

  @Override
  @Transactional
  public void updatePartStatus(Long diagnosisId, Long partId, PartDiagnosis.ShippingStatus status) {
    DiagnosisManager diagnosisManager = diagnosisManagerRepository.findById(diagnosisId)
        .orElseThrow(
            () -> new DiagnosisManagerNotFoundException("Diagnosis Manager with ID " + diagnosisId + " not found"));

    PartDiagnosis part = diagnosisManager.getDiagnoses().stream()
        .filter(diagnosis -> diagnosis.getIdDiagnosis().equals(diagnosisId))
        .findFirst()
        .orElseThrow(() -> new PartNotFoundException("Diagnosis with ID " + diagnosisId + " not found"))
        .getPartsList().stream()
        .filter(p -> p.getIdPart().equals(partId))
        .findFirst()
        .orElseThrow(() -> new PartNotFoundException("Part with ID " + partId + " not found"));

    part.setShippingStatus(status);
    diagnosisManagerRepository.save(diagnosisManager);
  }

  @Override
  public float calculateTotalPartCost(Long diagnosisId) {
    DiagnosisManager diagnosisManager = diagnosisManagerRepository.findById(diagnosisId)
        .orElseThrow(
            () -> new DiagnosisManagerNotFoundException("Diagnosis Manager with ID " + diagnosisId + " not found"));

    return (float) diagnosisManager.getDiagnoses().stream()
        .filter(diagnosis -> diagnosis.getIdDiagnosis().equals(diagnosisId))
        .findFirst()
        .orElseThrow(() -> new PartNotFoundException("Diagnosis with ID " + diagnosisId + " not found"))
        .getPartsList().stream()
        .mapToDouble(PartDiagnosis::getPartCost)
        .sum();
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
