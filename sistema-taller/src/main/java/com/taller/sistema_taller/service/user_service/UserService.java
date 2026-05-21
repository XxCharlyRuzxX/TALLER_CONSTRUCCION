package com.taller.sistema_taller.service.user_service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taller.sistema_taller.dto.LoginDTO;
import com.taller.sistema_taller.dto.UserDTO;
import com.taller.sistema_taller.exceptions.user_exceptions.InvalidUserTypeException;
import com.taller.sistema_taller.exceptions.user_exceptions.UserNotFoundException;
import com.taller.sistema_taller.model.UserAccounts.*;
import com.taller.sistema_taller.repositories.UserAccountRepository;
import com.taller.sistema_taller.service.user_service.interfaces.UserAccountType;
import com.taller.sistema_taller.service.user_service.interfaces.UserServiceInterface;
import com.taller.sistema_taller.service.user_service.user_validations.UserValidator;

import jakarta.transaction.Transactional;

@Service
public class UserService implements UserServiceInterface {

    private final UserAccountRepository userAccountRepository;
    private final UserValidator userValidator;

    @Autowired
    public UserService(UserAccountRepository userAccountRepository, UserValidator userValidator) {
        this.userAccountRepository = userAccountRepository;
        this.userValidator = userValidator;
    }

    @Override
    @Transactional
    public UserAccount registerUser(UserDTO userDto, String userType) {
        userValidator.validateRegisterData(userDto, userType);
        UserAccount newUser = createUserByType(userType, userDto);
        return userAccountRepository.save(newUser);
    }

    @Override
    @Transactional
    public UserAccount updateUser(Long id, UserDTO userDto) {
        UserAccount existingUser = findUserById(id);
        userValidator.validateUserData(userDto);
        updateUserAccountDetails(existingUser, userDto);
        return userAccountRepository.save(existingUser);
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        UserAccount user = findUserById(id);
        userAccountRepository.delete(user);
    }

    @Override
    public UserAccount findUserById(Long id) {
        return userAccountRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Usuario con ID " + id + " no encontrado"));
    }

    @Override
    public UserAccount authenticateUser(LoginDTO loginDto) {
        return userAccountRepository.findByAccessCredentialsEmail(loginDto.getEmail())
                .filter(user -> user.getAccessCredentials().validateCredentials(loginDto.getEmail(),
                        loginDto.getPassword()))
                .orElseThrow(() -> new UserNotFoundException("El email o la contraseña son incorrectos."));
    }

    @Override
    public String findUserTypeById(Long id) {
        UserAccount userAccount = findUserById(id);
        return determineUserType(userAccount);
    }

    @Override
    @Transactional
    public List<UserAccount> findAllUsers() {
        return userAccountRepository.findAll();
    }

    private String determineUserType(UserAccount userAccount) {
        if (userAccount instanceof AdminAccount) {
            return UserAccountType.ADMIN.name().toLowerCase();
        } else if (userAccount instanceof ClientAccount) {
            return UserAccountType.CLIENT.name().toLowerCase();
        } else if (userAccount instanceof WorkerAccount) {
            return UserAccountType.WORKER.name().toLowerCase();
        } else {
            throw new IllegalStateException("Tipo de usuario no reconocido para el ID");
        }
    }

    private void updateUserAccountDetails(UserAccount existingUser, UserDTO userDto) {
        existingUser.setUserName(userDto.getUserName());
        existingUser.setUserPhone(userDto.getPhone());
        existingUser.getAccessCredentials().setEmail(userDto.getEmail());
        existingUser.getAccessCredentials().setPassword(userDto.getPassword());
    }

    private UserAccount createUserByType(String userType, UserDTO userDto) {
        UserAccountType type = UserAccountType.valueOf(userType.toUpperCase());
        switch (type) {
            case ADMIN:
                return new AdminAccount(null, userDto.getUserName(), userDto.getPhone(), userDto.getEmail(),
                        userDto.getPassword());
            case CLIENT:
                return new ClientAccount(null, userDto.getUserName(), userDto.getPhone(), userDto.getEmail(),
                        userDto.getPassword());
            case WORKER:
                return new WorkerAccount(null, userDto.getUserName(), userDto.getPhone(), userDto.getEmail(),
                        userDto.getPassword());
            default:
                throw new InvalidUserTypeException("Tipo de usuario no válido: " + userType);
        }
    }

}