package com.taller.sistema_taller.exceptions.user_exceptions;

public class UserNotFoundException extends RuntimeException {
  public UserNotFoundException(String message) {
      super(message);
  }
}
