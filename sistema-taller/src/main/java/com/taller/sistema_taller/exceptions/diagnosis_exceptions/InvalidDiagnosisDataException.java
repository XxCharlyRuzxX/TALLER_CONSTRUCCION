package com.taller.sistema_taller.exceptions.diagnosis_exceptions;

public class InvalidDiagnosisDataException extends RuntimeException {
  public InvalidDiagnosisDataException(String message) {
      super(message);
  }
}
