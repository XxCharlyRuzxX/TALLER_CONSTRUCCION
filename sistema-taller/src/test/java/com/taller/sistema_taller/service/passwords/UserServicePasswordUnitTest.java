package com.taller.sistema_taller.service.passwords;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.taller.sistema_taller.dto.UserDTO;
import com.taller.sistema_taller.model.UserAccounts.UserAccount;
import com.taller.sistema_taller.repositories.UserAccountRepository;
import com.taller.sistema_taller.service.user_service.UserService;
import com.taller.sistema_taller.service.user_service.user_validations.UserValidator;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServicePasswordUnitTest {

    @Mock
    private UserAccountRepository userAccountRepository;

    @Mock
    private UserValidator userValidator;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private UserService userService;

    @BeforeEach
    void setUp() {
        userService = new UserService(userAccountRepository, userValidator, passwordEncoder);
    }

    @Test
    void registerUser_ShouldHashPasswordCorrectly() {
        String plainPassword = "PasswordSeguro123";
        UserDTO userDto = new UserDTO();
        userDto.setEmail("nuevo@test.com");
        userDto.setPassword(plainPassword);
        when(userAccountRepository.save(any(UserAccount.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));
        userService.registerUser(userDto, "CLIENT");
        ArgumentCaptor<UserAccount> userCaptor = ArgumentCaptor.forClass(UserAccount.class);
        verify(userAccountRepository).save(userCaptor.capture());
        UserAccount savedUser = userCaptor.getValue();
        String savedHash = savedUser.getAccessCredentials().getPassword();
        assertNotEquals(plainPassword, savedHash, "La contraseña guardada NO debe ser texto plano");
        assertTrue(savedHash.startsWith("$2a$"), "El hash debe tener el formato de BCrypt");
        assertTrue(passwordEncoder.matches(plainPassword, savedHash),
                "El encoder debe reconocer la contraseña original");
    }
}