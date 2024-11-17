package com.taller.sistema_taller.exceptions.part_diagnosis_exceptions;

public class PartNotFoundException extends RuntimeException {
  public PartNotFoundException(String message) {
      super(message);
  }
}
