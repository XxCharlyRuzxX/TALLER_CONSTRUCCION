package com.taller.sistema_taller.exceptions;

import java.util.Collections;
import java.util.Map;

public class ApiErrorResponse {

    private final String message;
    private final Map<String, String> fieldErrors;

    public ApiErrorResponse(String message) {
        this(message, Collections.emptyMap());
    }

    public ApiErrorResponse(String message, Map<String, String> fieldErrors) {
        this.message = message;
        this.fieldErrors = fieldErrors == null ? Collections.emptyMap() : fieldErrors;
    }

    public String getMessage() {
        return message;
    }

    public Map<String, String> getFieldErrors() {
        return fieldErrors;
    }
}