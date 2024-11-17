package com.taller.sistema_taller.service.user_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.taller.sistema_taller.dto.LoginDTO;
import com.taller.sistema_taller.dto.UserDTO;
import com.taller.sistema_taller.exceptions.user_exceptions.InvalidUserTypeException;
import com.taller.sistema_taller.exceptions.user_exceptions.UserNotFoundException;
import com.taller.sistema_taller.model.UserAccounts.AdminAccount;
import com.taller.sistema_taller.model.UserAccounts.ClientAccount;
import com.taller.sistema_taller.model.UserAccounts.UserAccount;
import com.taller.sistema_taller.model.UserAccounts.WorkerAccount;
import com.taller.sistema_taller.repositories.UserAccountRepository;
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
        userValidator.validateUserType(userType);
        userValidator.validateEmailUniqueness(userDto.getEmail());

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
                throw new InvalidUserTypeException("Tipo de usuario no válido");
        }

        return userAccountRepository.save(newUser);
    }

    @Override
    @Transactional
    public UserAccount updateUser(Long id, UserDTO userDto) {
        userValidator.validateUserExists(id);

        return userAccountRepository.findById(id).map(existingUser -> {
            existingUser.setUserName(userDto.getUserName());
            existingUser.setUserPhone(userDto.getPhone());
            existingUser.getAccessCredentials().setEmail(userDto.getEmail());
            existingUser.getAccessCredentials().setPassword(userDto.getPassword());
            return userAccountRepository.save(existingUser);
        }).orElseThrow(() -> new UserNotFoundException("Usuario no encontrado"));
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        userValidator.validateUserExists(id);
        userAccountRepository.deleteById(id);
    }

    @Override
    public UserAccount findUserById(Long id) {
        userValidator.validateUserExists(id);
        return userAccountRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Usuario no encontrado"));
    }

    @Override
    public UserAccount authenticateUser(LoginDTO loginDto) {
    return userAccountRepository.findByAccessCredentialsEmail(loginDto.getEmail())
            .filter(user -> user.getAccessCredentials().validateCredentials(loginDto.getEmail(), loginDto.getPassword()))
            .orElseThrow(() -> new UserNotFoundException("Invalid email or password"));
    }
}