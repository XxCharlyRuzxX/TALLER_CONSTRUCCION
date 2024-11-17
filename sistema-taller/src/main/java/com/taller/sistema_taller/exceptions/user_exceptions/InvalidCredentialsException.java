package com.taller.sistema_taller.exceptions.user_exceptions;

public class InvalidCredentialsException extends RuntimeException {
  public InvalidCredentialsException(String message) {
      super(message);
  }
}