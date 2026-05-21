package com.taller.sistema_taller.service.user_service.user_validations;

import com.taller.sistema_taller.exceptions.user_exceptions.InvalidDataException;
import com.taller.sistema_taller.model.UserAccounts.UserAccount;
import com.taller.sistema_taller.repositories.UserAccountRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserValidatorTest {

    @Mock
    private UserAccountRepository userAccountRepository;

    @InjectMocks
    private UserValidator userValidator;

    @Test
    void validateEmailIsUniqueExcludingSelf_WithDuplicateEmail_ShouldThrowException() {
        // Given
        // 1. Mockeamos un usuario que simula ser el "otro" dueño del correo (ID 2)
        UserAccount mockOtherUser = mock(UserAccount.class);
        when(mockOtherUser.getUserId()).thenReturn(2L);

        // 2. Le decimos al repositorio que el correo existe
        when(userAccountRepository.existsByAccessCredentials_Email("duplicate@test.com")).thenReturn(true);

        // 3. Y que cuando lo busque, devuelva al "otro" usuario
        when(userAccountRepository.findByAccessCredentialsEmail("duplicate@test.com"))
                .thenReturn(java.util.Optional.of(mockOtherUser));

        // When & Then - Excluimos el ID 1. Como el dueño es el ID 2, DEBE lanzar
        // excepción
        InvalidDataException exception = assertThrows(
                InvalidDataException.class,
                () -> userValidator.validateEmailIsUniqueExcludingSelf("duplicate@test.com", 1L));

        assertEquals("El email ya está en uso", exception.getMessage());
    }

    @Test
    void validateEmailIsUniqueExcludingSelf_WithUniqueEmail_ShouldNotThrowException() {
        when(userAccountRepository.existsByAccessCredentials_Email("unique@test.com"))
                .thenReturn(false);

        userValidator.validateEmailIsUniqueExcludingSelf("unique@test.com", 1L);

        verify(userAccountRepository).existsByAccessCredentials_Email("unique@test.com");
    }

    // ¡BORRA ESTA LÍNEA!
}