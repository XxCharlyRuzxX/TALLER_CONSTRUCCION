package com.taller.sistema_taller.service.passwords;

import com.taller.sistema_taller.dto.LoginDTO;
import com.taller.sistema_taller.dto.UserDTO;
import com.taller.sistema_taller.model.UserAccounts.UserAccount;
import com.taller.sistema_taller.repositories.UserAccountRepository;
import com.taller.sistema_taller.service.user_service.UserService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class UserServicePasswordRegressionTest {

  @Autowired
  private UserService userService;

  @Autowired
  private UserAccountRepository userAccountRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Test
  void updateUser_ShouldRehashNewPassword_AndAllowLogin() {
    // 1. Precondición: Crear un usuario inicial
    String originalPassword = "PasswordAntigua123";
    UserDTO initialDto = new UserDTO();

    // Agregamos los campos obligatorios para pasar el validador
    initialDto.setUserName("Usuario Inicial");
    initialDto.setPhone("9991234567");

    initialDto.setEmail("update@test.com");
    initialDto.setPassword(originalPassword);

    UserAccount savedUser = userService.registerUser(initialDto, "CLIENT");
    Long userId = savedUser.getUserId();

    // 2. Ejecutar: Actualizar con nueva contraseña
    String newPassword = "NuevaPassUpdate456";
    UserDTO updateDto = new UserDTO();

    // Agregamos los campos obligatorios también en el update
    updateDto.setUserName("Usuario Actualizado");
    updateDto.setPhone("9997654321");

    updateDto.setEmail("update@test.com");
    updateDto.setPassword(newPassword);

    userService.updateUser(userId, updateDto);

    // 3. Validaciones
    UserAccount updatedUser = userAccountRepository.findById(userId).orElseThrow();
    String currentHash = updatedUser.getAccessCredentials().getPassword();

    assertTrue(passwordEncoder.matches(newPassword, currentHash),
        "El nuevo hash debe corresponder a la nueva contraseña");
    assertFalse(passwordEncoder.matches(originalPassword, currentHash), "La contraseña antigua ya no debe ser válida");

    LoginDTO loginDto = new LoginDTO();
    loginDto.setEmail("update@test.com");
    loginDto.setPassword(newPassword);

    assertDoesNotThrow(() -> userService.authenticateUser(loginDto),
        "El inicio de sesión debe ser exitoso con la nueva contraseña");
  }
}