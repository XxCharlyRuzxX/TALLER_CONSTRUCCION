package com.taller.sistema_taller.service.user_service;

import org.springframework.stereotype.Service;

import com.taller.sistema_taller.dto.LoginDTO;
import com.taller.sistema_taller.dto.UserDTO;
import com.taller.sistema_taller.model.UserAccounts.AccessCredentials;
import com.taller.sistema_taller.model.UserAccounts.AdminAccount;
import com.taller.sistema_taller.model.UserAccounts.ClientAccount;
import com.taller.sistema_taller.model.UserAccounts.UserAccount;
import com.taller.sistema_taller.model.UserAccounts.WorkerAccount;
import com.taller.sistema_taller.service.user_service.interfaces.UserServiceInterface;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserService implements UserServiceInterface {

    private final Map<Long, UserAccount> userDatabase = new HashMap<>();
    private Long userIdCounter = 1L;

    @Override
    public UserAccount registerUser(UserDTO userDto, String userType) {
        AccessCredentials credentials = new AccessCredentials(userDto.getEmail(), userDto.getPassword());
        UserAccount newUser;

        switch (userType.toLowerCase()) {
            case "admin":
                newUser = new AdminAccount(userIdCounter++, userDto.getName(), userDto.getPhone(), credentials);
                break;
            case "client":
                newUser = new ClientAccount(userIdCounter++, userDto.getName(), userDto.getPhone(), credentials);
                break;
            case "worker":
                newUser = new WorkerAccount(userIdCounter++, userDto.getName(), userDto.getPhone(), credentials);
                break;
            default:
                throw new IllegalArgumentException("Tipo de usuario no válido.");
        }

        userDatabase.put(newUser.getUserId(), newUser);
        return newUser;
    }

    @Override
    public UserAccount updateUser(Long id, UserDTO userDto) {
        UserAccount existingUser = userDatabase.get(id);
        if (existingUser != null) {
            existingUser.setName(userDto.getName());
            existingUser.setPhone(userDto.getPhone());
            existingUser.getAccessCredentials().setEmail(userDto.getEmail());
            existingUser.getAccessCredentials().setPassword(userDto.getPassword());
            return existingUser;
        }
        return null;
    }

    @Override
    public void deleteUser(Long id) {
        userDatabase.remove(id);
    }

    @Override
    public UserAccount findUserById(Long id) {
        return userDatabase.get(id);
    }

    @Override
    public boolean authenticateUser(LoginDTO loginDto) {
        for (UserAccount user : userDatabase.values()) {
            if (user.getAccessCredentials().validateCredentials(loginDto.getEmail(), loginDto.getPassword())) {
                return true;
            }
        }
        return false;
    }

}


