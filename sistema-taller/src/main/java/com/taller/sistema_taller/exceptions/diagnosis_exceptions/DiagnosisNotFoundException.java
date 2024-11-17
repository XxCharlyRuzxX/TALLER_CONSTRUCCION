package com.taller.sistema_taller.exceptions.diagnosis_exceptions;

public class DiagnosisNotFoundException extends RuntimeException {
  public DiagnosisNotFoundException(String message) {
      super(message);
  }
}
