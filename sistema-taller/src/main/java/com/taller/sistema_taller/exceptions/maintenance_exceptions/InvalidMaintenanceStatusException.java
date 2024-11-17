package com.taller.sistema_taller.exceptions.maintenance_exceptions;

public class InvalidMaintenanceStatusException extends RuntimeException {
    public InvalidMaintenanceStatusException(String message) {
        super(message);
    }
}
