package com.taller.sistema_taller.exceptions.vehicle_exceptions;


public class DuplicateLicensePlateException extends RuntimeException {
    public DuplicateLicensePlateException(String message) {
        super(message);
    }
}

