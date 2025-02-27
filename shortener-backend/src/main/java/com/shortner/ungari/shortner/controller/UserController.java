package com.shortner.ungari.shortner.controller;

import com.shortner.ungari.shortner.model.UserDTO;
import com.shortner.ungari.shortner.model.Users;
import com.shortner.ungari.shortner.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody Users user) {

        if((user.getUsername()== null || user.getUsername().isEmpty())
                && (user.getPassword()==null || user.getPassword().isEmpty())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid credentials");
        }

        return ResponseEntity.ok(userService.createUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody Users user) {
        if((user.getUsername()== null || user.getUsername().isEmpty())
                && (user.getPassword()==null || user.getPassword().isEmpty())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid credentials");
        }
        String token = userService.verify(user, user.getRole());
        return ResponseEntity.ok(new UserDTO(user.getId(), user.getUsername(), token));
    }


}
