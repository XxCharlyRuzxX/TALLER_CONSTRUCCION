package com.taller.sistema_taller.exceptions;

import java.util.LinkedHashMap;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.MethodArgumentNotValidException;

import com.taller.sistema_taller.exceptions.diagnosis_exceptions.DiagnosisManagerNotFoundException;
import com.taller.sistema_taller.exceptions.diagnosis_exceptions.DiagnosisNotFoundException;
import com.taller.sistema_taller.exceptions.diagnosis_exceptions.InvalidDiagnosisDataException;
import com.taller.sistema_taller.exceptions.maintenance_exceptions.InvalidImageFormatException;
import com.taller.sistema_taller.exceptions.maintenance_exceptions.InvalidMaintenanceAdvanceException;
import com.taller.sistema_taller.exceptions.maintenance_exceptions.InvalidMaintenanceStatusException;
import com.taller.sistema_taller.exceptions.maintenance_exceptions.MaintenanceAdvanceNotFoundException;
import com.taller.sistema_taller.exceptions.maintenance_exceptions.MaintenanceManagerNotFoundException;
import com.taller.sistema_taller.exceptions.part_diagnosis_exceptions.InvalidPartDataException;
import com.taller.sistema_taller.exceptions.part_diagnosis_exceptions.PartNotFoundException;
import com.taller.sistema_taller.exceptions.survey_exceptions.SurveyValidationException;
import com.taller.sistema_taller.exceptions.user_exceptions.*;
import com.taller.sistema_taller.exceptions.vehicle_exceptions.DuplicateLicensePlateException;
import com.taller.sistema_taller.exceptions.vehicle_exceptions.InvalidVehicleDataException;
import com.taller.sistema_taller.exceptions.vehicle_exceptions.VehicleNotFoundException;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final String DEFAULT_VALIDATION_MESSAGE = "Corrige los campos marcados.";

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        Map<String, String> fieldErrors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .collect(Collectors.toMap(
                        FieldError::getField,
                        FieldError::getDefaultMessage,
                        (current, replacement) -> current,
                        LinkedHashMap::new));

        return buildResponse(HttpStatus.BAD_REQUEST, DEFAULT_VALIDATION_MESSAGE, fieldErrors);
    }

    // User exceptions
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleUserNotFoundException(UserNotFoundException ex) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(InvalidUserTypeException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidUserTypeException(InvalidUserTypeException ex) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(InvalidDataException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidDataException(InvalidDataException ex) {
        Map<String, String> fieldErrors = inferFieldErrorsFromMessage(ex.getMessage());
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage(), fieldErrors);
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidCredentialsException(InvalidCredentialsException ex) {
        return buildResponse(HttpStatus.UNAUTHORIZED, ex.getMessage());
    }

    // Vehicle exceptions
    @ExceptionHandler(VehicleNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleVehicleNotFoundException(VehicleNotFoundException ex) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(DuplicateLicensePlateException.class)
    public ResponseEntity<ApiErrorResponse> handleDuplicateLicensePlateException(DuplicateLicensePlateException ex) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(InvalidVehicleDataException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidVehicleDataException(InvalidVehicleDataException ex) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    // Diagnosis exceptions
    @ExceptionHandler(DiagnosisNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleDiagnosisNotFoundException(DiagnosisNotFoundException ex) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(DiagnosisManagerNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleDiagnosisManagerNotFoundException(DiagnosisManagerNotFoundException ex) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(InvalidDiagnosisDataException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidDiagnosisDataException(InvalidDiagnosisDataException ex) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

     // Part exceptions
    @ExceptionHandler(PartNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handlePartNotFoundException(PartNotFoundException ex) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(InvalidPartDataException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidPartDataException(InvalidPartDataException ex) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    // Maintenance exceptions
    @ExceptionHandler(MaintenanceManagerNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleMaintenanceManagerNotFound(MaintenanceManagerNotFoundException ex) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(MaintenanceAdvanceNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleMaintenanceAdvanceNotFound(MaintenanceAdvanceNotFoundException ex) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(InvalidMaintenanceAdvanceException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidMaintenanceAdvance(InvalidMaintenanceAdvanceException ex) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(InvalidMaintenanceStatusException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidMaintenanceStatus(InvalidMaintenanceStatusException ex) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(InvalidImageFormatException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidImageFormat(InvalidImageFormatException ex) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    // Survey exceptions
    @ExceptionHandler(SurveyValidationException.class)
    public ResponseEntity<ApiErrorResponse> handleValidationException(SurveyValidationException ex) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    private ResponseEntity<ApiErrorResponse> buildResponse(HttpStatus status, String message) {
        return buildResponse(status, message, Map.of());
    }

    private ResponseEntity<ApiErrorResponse> buildResponse(HttpStatus status, String message, Map<String, String> fieldErrors) {
        return ResponseEntity.status(status).body(new ApiErrorResponse(message, fieldErrors));
    }

    private Map<String, String> inferFieldErrorsFromMessage(String message) {
        if (message == null || message.isBlank()) {
            return Map.of();
        }

        String normalizedMessage = message.toLowerCase(Locale.ROOT);
        if (normalizedMessage.contains("email") || normalizedMessage.contains("correo")) {
            return Map.of("email", message);
        }
        if (normalizedMessage.contains("contraseña") || normalizedMessage.contains("contrasena")
                || normalizedMessage.contains("password")) {
            return Map.of("password", message);
        }
        if (normalizedMessage.contains("teléfono") || normalizedMessage.contains("telefono")
                || normalizedMessage.contains("phone")) {
            return Map.of("phone", message);
        }
        if (normalizedMessage.contains("nombre") || normalizedMessage.contains("usuario")) {
            return Map.of("userName", message);
        }
        return Map.of();
    }

}

