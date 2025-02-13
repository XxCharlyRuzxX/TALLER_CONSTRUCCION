package com.taller.sistema_taller;

import com.taller.sistema_taller.dto.UserDTO;
import com.taller.sistema_taller.model.UserAccounts.UserAccount;
import com.taller.sistema_taller.repositories.UserAccountRepository;
import com.taller.sistema_taller.service.user_service.UserService;
import com.taller.sistema_taller.service.user_service.user_validations.UserValidator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class SistemaTallerApplicationTests {

    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private UserValidator userValidator;

    @Test
    void testRegisterAndFindUserById() {
        UserDTO testUser = new UserDTO();
        testUser.setUserName("usuario_prueba");
        testUser.setPhone("9995455373");
        testUser.setEmail("usuario@prueba.com");
        testUser.setPassword("password123456");

        UserService userService = new UserService(userAccountRepository, userValidator);

        UserAccount savedUser = userService.registerUser(testUser, "CLIENT");

        assertNotNull(savedUser);
        assertEquals(testUser.getUserName(), savedUser.getUserName());
        assertEquals(testUser.getPhone(), savedUser.getPhone());
        assertEquals(testUser.getEmail(), savedUser.getAccessCredentials().getEmail());

        UserAccount foundUser = userService.findUserById(savedUser.getUserId());

        assertNotNull(foundUser);
        assertEquals(testUser.getUserName(), foundUser.getUserName());
        assertEquals(testUser.getPhone(), foundUser.getPhone());
        assertEquals(testUser.getEmail(), foundUser.getAccessCredentials().getEmail());
        userAccountRepository.delete(savedUser);
    }
}
