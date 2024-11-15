package com.taller.sistema_taller.exceptions.user_exceptions;

public class InvalidDataException extends RuntimeException {
  public InvalidDataException(String message) {
      super(message);
  }
}