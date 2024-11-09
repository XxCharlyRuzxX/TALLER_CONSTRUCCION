package com.taller.sistema_taller.service.user_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taller.sistema_taller.dto.LoginDTO;
import com.taller.sistema_taller.dto.UserDTO;
import com.taller.sistema_taller.model.UserAccounts.AdminAccount;
import com.taller.sistema_taller.model.UserAccounts.ClientAccount;
import com.taller.sistema_taller.model.UserAccounts.UserAccount;
import com.taller.sistema_taller.model.UserAccounts.WorkerAccount;
import com.taller.sistema_taller.repositories.UserAccountRepository;
import com.taller.sistema_taller.service.user_service.interfaces.UserServiceInterface;
import jakarta.transaction.Transactional;



@Service
public class UserService implements UserServiceInterface {

    private final UserAccountRepository userAccountRepository;

    @Autowired
    public UserService(UserAccountRepository userAccountRepository) {
        this.userAccountRepository = userAccountRepository;
    }

    @Override
    @Transactional
    public UserAccount registerUser(UserDTO userDto, String userType) {
        UserAccount newUser;

        switch (userType.toLowerCase()) {
            case "admin":
                newUser = new AdminAccount(null, userDto.getUserName(), userDto.getPhone(), userDto.getEmail(), userDto.getPassword());
                break;
            case "client":
                newUser = new ClientAccount(null, userDto.getUserName(), userDto.getPhone(), userDto.getEmail(), userDto.getPassword());
                break;
            case "worker":
                newUser = new WorkerAccount(null, userDto.getUserName(), userDto.getPhone(), userDto.getEmail(), userDto.getPassword());
                break;
            default:
                throw new IllegalArgumentException("Tipo de usuario no válido.");
        }

        return userAccountRepository.save(newUser);
    }

    @Override
    @Transactional
    public UserAccount updateUser(Long id, UserDTO userDto) {
        return userAccountRepository.findById(id).map(existingUser -> {
            existingUser.setUserName(userDto.getUserName());
            existingUser.setUserPhone(userDto.getPhone());
            existingUser.getAccessCredentials().setEmail(userDto.getEmail());
            existingUser.getAccessCredentials().setPassword(userDto.getPassword());
            return userAccountRepository.save(existingUser);
        }).orElse(null);
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        userAccountRepository.deleteById(id);
    }

    @Override
    public UserAccount findUserById(Long id) {
        return userAccountRepository.findById(id).orElse(null);
    }

    @Override
    public boolean authenticateUser(LoginDTO loginDto) {
        return userAccountRepository.findAll().stream()
                .anyMatch(user -> user.getAccessCredentials().validateCredentials(loginDto.getEmail(), loginDto.getPassword()));
    }
}
