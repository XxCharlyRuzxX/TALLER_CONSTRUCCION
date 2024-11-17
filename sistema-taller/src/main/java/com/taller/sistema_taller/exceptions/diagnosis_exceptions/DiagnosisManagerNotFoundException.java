package com.taller.sistema_taller.exceptions.diagnosis_exceptions;

public class DiagnosisManagerNotFoundException extends RuntimeException {
    public DiagnosisManagerNotFoundException(String message) {
        super(message);
    }
}