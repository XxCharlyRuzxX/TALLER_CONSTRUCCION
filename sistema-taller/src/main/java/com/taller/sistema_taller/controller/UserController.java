package com.taller.sistema_taller.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.taller.sistema_taller.dto.LoginDTO;
import com.taller.sistema_taller.dto.UserDTO;
import com.taller.sistema_taller.model.UserAccounts.UserAccount;
import com.taller.sistema_taller.service.user_service.interfaces.UserServiceInterface;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserServiceInterface userService;

    public UserController(UserServiceInterface userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserAccount> registerUser(@Valid @RequestBody UserDTO userDto,
            @RequestParam String userType) {
        UserAccount createdUser = userService.registerUser(userDto, userType);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserAccount> updateUser(@PathVariable Long id, @Valid @RequestBody UserDTO userDto) {
        UserAccount updatedUser = userService.updateUser(id, userDto);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserAccount> findUserById(@PathVariable Long id) {
        UserAccount user = userService.findUserById(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<UserAccount> authenticateUser(@Valid @RequestBody LoginDTO loginDto) {
        UserAccount authenticatedUser = userService.authenticateUser(loginDto);
        return ResponseEntity.ok(authenticatedUser);
    }

    @GetMapping("/{id}/type")
    public ResponseEntity<String> getUserType(@PathVariable Long id) {
        String userType = userService.findUserTypeById(id);
        return ResponseEntity.ok(userType);
    }

}
