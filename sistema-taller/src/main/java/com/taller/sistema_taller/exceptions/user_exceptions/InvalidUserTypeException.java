package com.taller.sistema_taller.exceptions.user_exceptions;

public class InvalidUserTypeException extends RuntimeException {
  public InvalidUserTypeException(String message) {
      super(message);
  }
}
