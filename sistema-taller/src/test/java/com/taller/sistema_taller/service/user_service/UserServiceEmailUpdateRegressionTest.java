package com.taller.sistema_taller.service.user_service;

import com.taller.sistema_taller.dto.UserDTO;
import com.taller.sistema_taller.exceptions.user_exceptions.InvalidDataException;
import com.taller.sistema_taller.model.UserAccounts.UserAccount;
import com.taller.sistema_taller.repositories.UserAccountRepository;
import com.taller.sistema_taller.service.user_service.user_validations.UserValidator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceEmailUpdateRegressionTest {

    @Mock
    private UserAccountRepository userAccountRepository;

    private UserValidator userValidator;
    private UserService userService;

    @BeforeEach
    void setUp() {
        userValidator = new UserValidator(userAccountRepository);
        userService = new UserService(userAccountRepository, userValidator);
    }

    // ¡BORRA ESTA LÍNEA!

    @Test
    void updateUserWithSameEmailShouldSucceed() {
        // 1. Stub the repository so registerUser successfully returns a UserAccount
        // instead of null
        when(userAccountRepository.save(any(UserAccount.class))).thenAnswer(i -> i.getArgument(0));
        when(userAccountRepository.existsByAccessCredentials_Email(anyString())).thenReturn(false);

        UserDTO userDTO = new UserDTO();
        userDTO.setUserName("Usuario Existente");
        userDTO.setPhone("1111111111");
        userDTO.setEmail("original@test.com"); // Fixed: Matched to the updateDto email
        userDTO.setPassword("oldpassword");

        UserAccount existingUser = userService.registerUser(userDTO, "CLIENT");

        // 2. Setup mock for the update
        when(userAccountRepository.findById(1L)).thenReturn(Optional.of(existingUser));
        UserDTO updateDto = new UserDTO();
        updateDto.setUserName("Nombre Actualizado");
        updateDto.setPhone("1234567890");
        updateDto.setEmail("original@test.com"); // Same email
        updateDto.setPassword("newpassword123");

        // When
        UserAccount updatedUser = userService.updateUser(1L, updateDto);

        // Then
        assertNotNull(updatedUser);
        assertEquals("original@test.com", updatedUser.getAccessCredentials().getEmail());
        verify(userAccountRepository, atLeastOnce()).save(any(UserAccount.class));
    }

    @Test
    void updateUserWithNewUniqueEmailShouldSucceed() {
        when(userAccountRepository.save(any(UserAccount.class))).thenAnswer(i -> i.getArgument(0));
        when(userAccountRepository.existsByAccessCredentials_Email("old@test.com")).thenReturn(false);

        UserDTO userDTO = new UserDTO();
        userDTO.setUserName("Usuario Existente");
        userDTO.setPhone("1111111111");
        userDTO.setEmail("old@test.com");
        userDTO.setPassword("oldpassword");

        UserAccount existingUser = userService.registerUser(userDTO, "CLIENT");

        when(userAccountRepository.findById(1L)).thenReturn(Optional.of(existingUser));
        when(userAccountRepository.existsByAccessCredentials_Email("new@test.com")).thenReturn(false);

        UserDTO updateDto = new UserDTO();
        updateDto.setUserName("Nombre Actualizado");
        updateDto.setPhone("1234567890");
        updateDto.setEmail("new@test.com");
        updateDto.setPassword("newpassword123");

        // When
        UserAccount updatedUser = userService.updateUser(1L, updateDto);

        // Then
        assertNotNull(updatedUser);
        assertEquals("new@test.com", updatedUser.getAccessCredentials().getEmail());
        verify(userAccountRepository, atLeastOnce()).save(any(UserAccount.class));
    }

    @Test
    void updateUserWithEmailOfAnotherUserShouldFail() {
        when(userAccountRepository.save(any(UserAccount.class))).thenAnswer(i -> i.getArgument(0));
        when(userAccountRepository.existsByAccessCredentials_Email("old@test.com")).thenReturn(false);

        UserDTO userDTO = new UserDTO();
        userDTO.setUserName("Usuario Existente");
        userDTO.setPhone("1111111111");
        userDTO.setEmail("old@test.com");
        userDTO.setPassword("oldpassword");

        UserAccount existingUser = userService.registerUser(userDTO, "CLIENT");

        when(userAccountRepository.findById(1L)).thenReturn(java.util.Optional.of(existingUser));

        when(userAccountRepository.existsByAccessCredentials_Email("other@test.com")).thenReturn(true);

        UserAccount mockOtherUser = mock(UserAccount.class);
        when(mockOtherUser.getUserId()).thenReturn(2L);
        when(userAccountRepository.findByAccessCredentialsEmail("other@test.com"))
                .thenReturn(java.util.Optional.of(mockOtherUser));

        UserDTO updateDto = new UserDTO();
        updateDto.setUserName("Nombre Actualizado");
        updateDto.setPhone("1234567890");
        updateDto.setEmail("other@test.com");
        updateDto.setPassword("newpassword123");

        // When & Then
        InvalidDataException exception = assertThrows(
                InvalidDataException.class,
                () -> userService.updateUser(1L, updateDto));

        assertEquals("El email ya está en uso", exception.getMessage());
        verify(userAccountRepository, times(1)).save(any());
    }

    @Test
    void registerNewUserWithExistingEmailShouldStillFail() {
        when(userAccountRepository.existsByAccessCredentials_Email("existing@test.com")).thenReturn(true);

        UserDTO newUserDto = new UserDTO();
        newUserDto.setUserName("Nuevo Usuario");
        newUserDto.setPhone("3333333333");
        newUserDto.setEmail("existing@test.com");
        newUserDto.setPassword("password123");

        InvalidDataException exception = assertThrows(
                InvalidDataException.class,
                () -> userService.registerUser(newUserDto, "CLIENT"));

        assertEquals("El email ya está en uso", exception.getMessage());
    }
}