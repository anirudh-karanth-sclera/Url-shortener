package com.shortner.ungari.shortner.controller;

import com.shortner.ungari.shortner.Repository.UserRepo;
import com.shortner.ungari.shortner.model.ForgotPasswordDto;
import com.shortner.ungari.shortner.model.PasswordResetToken;
import com.shortner.ungari.shortner.model.Users;
import com.shortner.ungari.shortner.service.EmailService;
import com.shortner.ungari.shortner.service.PasswordResetTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PasswordResetController {

    @Autowired
    private PasswordResetTokenService tokenService;


    @Autowired
    private UserRepo userRepository;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @Autowired
    private EmailService emailService;

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordDto req) {

        String email = req.getEmail();
        String clientUrl = req.getClientUrl();
        String resetToken = tokenService.createResetToken(email);
        emailService.sendResetEmail(email, resetToken, clientUrl);
        return ResponseEntity.ok("Password reset email sent!");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        if (!tokenService.validateResetToken(token)) {
            return ResponseEntity.badRequest().body("Invalid or expired token");
        }

        PasswordResetToken resetToken = tokenService.getToken(token);
        Users user = resetToken.getUser();
        user.setPassword(encoder.encode(newPassword));
        userRepository.save(user);

        return ResponseEntity.ok("Password reset successful!");
    }
}
