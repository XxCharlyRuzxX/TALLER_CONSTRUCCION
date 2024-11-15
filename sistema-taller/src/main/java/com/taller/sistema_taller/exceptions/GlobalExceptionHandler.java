package com.taller.sistema_taller.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.taller.sistema_taller.exceptions.diagnosis_exceptions.DiagnosisManagerNotFoundException;
import com.taller.sistema_taller.exceptions.diagnosis_exceptions.DiagnosisNotFoundException;
import com.taller.sistema_taller.exceptions.diagnosis_exceptions.InvalidDiagnosisDataException;
import com.taller.sistema_taller.exceptions.part_diagnosis_exceptions.InvalidPartDataException;
import com.taller.sistema_taller.exceptions.part_diagnosis_exceptions.PartNotFoundException;
import com.taller.sistema_taller.exceptions.user_exceptions.*;
import com.taller.sistema_taller.exceptions.vehicle_exceptions.DuplicateLicensePlateException;
import com.taller.sistema_taller.exceptions.vehicle_exceptions.InvalidVehicleDataException;
import com.taller.sistema_taller.exceptions.vehicle_exceptions.VehicleNotFoundException;

@ControllerAdvice
public class GlobalExceptionHandler {

    // User exceptions
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleUserNotFoundException(UserNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(InvalidUserTypeException.class)
    public ResponseEntity<String> handleInvalidUserTypeException(InvalidUserTypeException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @ExceptionHandler(InvalidDataException.class)
    public ResponseEntity<String> handleInvalidDataException(InvalidDataException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<String> handleInvalidCredentialsException(InvalidCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }

    // Vehicle exceptions
    @ExceptionHandler(VehicleNotFoundException.class)
    public ResponseEntity<String> handleVehicleNotFoundException(VehicleNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(DuplicateLicensePlateException.class)
    public ResponseEntity<String> handleDuplicateLicensePlateException(DuplicateLicensePlateException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @ExceptionHandler(InvalidVehicleDataException.class)
    public ResponseEntity<String> handleInvalidVehicleDataException(InvalidVehicleDataException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    // Diagnosis exceptions
    @ExceptionHandler(DiagnosisNotFoundException.class)
    public ResponseEntity<String> handleDiagnosisNotFoundException(DiagnosisNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(DiagnosisManagerNotFoundException.class)
    public ResponseEntity<String> handleDiagnosisManagerNotFoundException(DiagnosisManagerNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(InvalidDiagnosisDataException.class)
    public ResponseEntity<String> handleInvalidDiagnosisDataException(InvalidDiagnosisDataException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

     // Part exceptions
    @ExceptionHandler(PartNotFoundException.class)
    public ResponseEntity<String> handlePartNotFoundException(PartNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(InvalidPartDataException.class)
    public ResponseEntity<String> handleInvalidPartDataException(InvalidPartDataException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

}

