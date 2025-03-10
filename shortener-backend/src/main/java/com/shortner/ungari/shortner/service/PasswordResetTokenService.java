package com.shortner.ungari.shortner.service;

import com.shortner.ungari.shortner.Repository.PasswordResetTokenRepository;
import com.shortner.ungari.shortner.Repository.UserRepo;
import com.shortner.ungari.shortner.model.PasswordResetToken;
import com.shortner.ungari.shortner.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordResetTokenService {

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private UserRepo userRepository;

    public String createResetToken(String email) {
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Optional<PasswordResetToken> existingTokenOpt = tokenRepository.findByUser(user);

        if (existingTokenOpt.isPresent()) {
            PasswordResetToken existingToken = existingTokenOpt.get();
            if (!existingToken.isExpired()) {
                // Return existing token if it is still valid
                return existingToken.getToken();
            }
        }

        // If no valid token exists, create a new one
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken(token, user, LocalDateTime.now().plusMinutes(30));

        tokenRepository.save(resetToken);
        return token;
    }


    public boolean validateResetToken(String token) {
        PasswordResetToken resetToken = getToken(token);

        return !resetToken.isExpired();
    }

    public PasswordResetToken getToken(String token) {
        return tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));
    }
}
