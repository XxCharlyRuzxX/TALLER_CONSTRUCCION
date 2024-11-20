package com.taller.sistema_taller.service.user_service.user_validations;

import org.springframework.stereotype.Component;

import com.taller.sistema_taller.dto.UserDTO;
import com.taller.sistema_taller.exceptions.user_exceptions.InvalidCredentialsException;
import com.taller.sistema_taller.exceptions.user_exceptions.InvalidDataException;
import com.taller.sistema_taller.exceptions.user_exceptions.InvalidUserTypeException;
import com.taller.sistema_taller.exceptions.user_exceptions.UserNotFoundException;
import com.taller.sistema_taller.repositories.UserAccountRepository;

@Component
public class UserValidator {

    private final UserAccountRepository userAccountRepository;

    public UserValidator(UserAccountRepository userAccountRepository) {
        this.userAccountRepository = userAccountRepository;
    }

    public void validateUserType(String userType) {
        if (!userType.equalsIgnoreCase("admin") && !userType.equalsIgnoreCase("client") && !userType.equalsIgnoreCase("worker")) {
            throw new InvalidUserTypeException("Tipo de usuario no válido: " + userType);
        }
    }

    public void validateEmailUniqueness(String email) {
        if (userAccountRepository.existsByAccessCredentials_Email(email)) {
            throw new InvalidDataException("El email ya está en uso");
        }
    }

    public void validateUserExists(Long userId) {
        if (!userAccountRepository.existsById(userId)) {
            throw new UserNotFoundException("Usuario con ID " + userId + " no encontrado");
        }
    }

    public void validateLoginCredentials(String email, String password) {
        boolean isValid = userAccountRepository.findAll().stream()
                .anyMatch(user -> user.getAccessCredentials().validateCredentials(email, password));
        if (!isValid) {
            throw new InvalidCredentialsException("Credenciales inválidas");
        }
    }

    public void validateUserData(UserDTO userDTO) {
        if (userDTO == null) {
            throw new InvalidDataException("El usuario no puede ser nulo.");
        }
        validatePassword(userDTO.getPassword());
        validateUserPhone(userDTO.getPhone());
    }

    private void validatePassword(String password) {
        if (password == null || password.length() < 8) {
            throw new InvalidDataException("La contraseña debe contener al menos 8 caracteres");
        }
    }

    private void validateUserPhone(String phone) {
        if (phone == null || phone.length() != 10 || !phone.matches("\\d+")) {
            throw new InvalidDataException("El teléfono debe tener exactamente 10 caracteres numéricos");
        }
    }
}

