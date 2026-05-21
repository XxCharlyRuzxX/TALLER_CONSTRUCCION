package com.taller.sistema_taller.service.user_service;

import com.taller.sistema_taller.dto.LoginDTO;
import com.taller.sistema_taller.dto.UserDTO;
import com.taller.sistema_taller.model.UserAccounts.ClientAccount;
import com.taller.sistema_taller.model.UserAccounts.UserAccount;
import com.taller.sistema_taller.repositories.UserAccountRepository;
import com.taller.sistema_taller.service.user_service.user_validations.UserValidator;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserAccountRepository userAccountRepository;

    @Mock
    private UserValidator userValidator;

    @InjectMocks
    private UserService userService;

    @Test
    @DisplayName("Debería registrar un cliente exitosamente cuando los datos son válidos")
    void registerUser_ShouldReturnSavedUser_WhenDataIsValid() {
        
        UserDTO userDTO = new UserDTO();
        userDTO.setUserName("Juan Perez");
        userDTO.setPhone("9999999999");
        userDTO.setEmail("juan.perez@test.com");
        userDTO.setPassword("Password123!");

        String userType = "CLIENT";

        UserAccount expectedUser = new ClientAccount(
                1L,
                userDTO.getUserName(),
                userDTO.getPhone(),
                userDTO.getEmail(),
                userDTO.getPassword()
        );

        doNothing().when(userValidator).validateRegisterData(userDTO, userType);
        when(userAccountRepository.save(any(UserAccount.class))).thenReturn(expectedUser);

        
        UserAccount result = userService.registerUser(userDTO, userType);

        
        assertNotNull(result);
        assertTrue(result instanceof ClientAccount);
        assertEquals("Juan Perez", result.getUserName());
        assertEquals("juan.perez@test.com", result.getAccessCredentials().getEmail());

        verify(userValidator, times(1)).validateRegisterData(userDTO, userType);
        verify(userAccountRepository, times(1)).save(any(UserAccount.class));
    }

    @Test
    @DisplayName("Debería autenticar un usuario exitosamente")
    void authenticateUser_ShouldReturnUser_WhenCredentialsAreValid() {
        
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setEmail("juan.perez@test.com");
        loginDTO.setPassword("Password123!");

        UserAccount existingUser = new ClientAccount(
                1L, "Juan Perez", "9999999999", "juan.perez@test.com", "Password123!"
        );

        when(userAccountRepository.findByAccessCredentialsEmail(loginDTO.getEmail()))
                .thenReturn(Optional.of(existingUser));

        
        UserAccount result = userService.authenticateUser(loginDTO);

        
        assertNotNull(result);
        assertEquals(existingUser.getUserId(), result.getUserId());
        assertEquals(existingUser.getAccessCredentials().getEmail(), result.getAccessCredentials().getEmail());
        
        verify(userAccountRepository, times(1)).findByAccessCredentialsEmail(loginDTO.getEmail());
    }
}
