package com.taller.sistema_taller.service.user_service.interfaces;

import java.util.List;

import com.taller.sistema_taller.dto.LoginDTO;
import com.taller.sistema_taller.dto.UserDTO;
import com.taller.sistema_taller.model.UserAccounts.UserAccount;

public interface UserServiceInterface {
  UserAccount registerUser(UserDTO userDto, String userType);

  UserAccount updateUser(Long id, UserDTO userDto);

  void deleteUser(Long id);

  UserAccount findUserById(Long id);

  UserAccount authenticateUser(LoginDTO loginDto);

  String findUserTypeById(Long id);

  List<UserAccount> findAllUsers();

}
