package com.taller.sistema_taller.exceptions.part_diagnosis_exceptions;

public class InvalidPartDataException extends RuntimeException {
  public InvalidPartDataException(String message) {
      super(message);
  }
}
