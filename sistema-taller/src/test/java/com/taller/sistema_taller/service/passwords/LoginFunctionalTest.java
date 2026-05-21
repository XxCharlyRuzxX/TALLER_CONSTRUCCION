package com.taller.sistema_taller.service.passwords;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.taller.sistema_taller.dto.LoginDTO;
import com.taller.sistema_taller.model.UserAccounts.UserAccount;
import com.taller.sistema_taller.repositories.UserAccountRepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class LoginFunctionalTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void login_WithValidCredentials_ShouldReturnOk() throws Exception {
        String plainPassword = "MiPassFuncional8";
        UserAccount testUser = new UserAccount(
                null,
                "Usuario Funcional",
                "9991234567",
                "funcional@test.com",
                passwordEncoder.encode(plainPassword));

        userAccountRepository.save(testUser);
        LoginDTO loginDto = new LoginDTO();
        loginDto.setEmail("funcional@test.com");
        loginDto.setPassword(plainPassword);
        mockMvc.perform(post("/api/users/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginDto)))
                .andExpect(status().isOk());
    }
}