package com.shortner.ungari.shortner.service;

import com.shortner.ungari.shortner.Repository.UserRepo;
import com.shortner.ungari.shortner.model.Role;
import com.shortner.ungari.shortner.model.UserDTO;
import com.shortner.ungari.shortner.model.Users;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserService {
    private final UserRepo userRepo;
    private final AuthenticationManager authManager;
    private final JWTService jwtService;

    public UserService(UserRepo userRepo, AuthenticationManager authManager, JWTService jwtService) {
        this.userRepo = userRepo;
        this.authManager = authManager;
        this.jwtService = jwtService;
    }

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public UserDTO createUser(Users user) {
        if (userRepo.existsByEmail(user.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User with username '" + user.getEmail() + "' already exists!");
        }
        user.setPassword(encoder.encode(user.getPassword()));
        Users newUser = userRepo.save(user);
        String token = jwtService.generateToken(newUser.getEmail(), newUser.getRole().name());

        return new UserDTO(newUser.getId(), newUser.getEmail(), token);
    }

    public String verify(Users user, Role role) {
        Users storedUser = userRepo.findByEmail(user.getEmail())
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "User does not exist"));

        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
            );
        } catch (BadCredentialsException ex) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password");
        }

        return jwtService.generateToken(storedUser.getEmail(), storedUser.getRole().name());
    }

    public Users findUserByEmail(String email) {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }
}
