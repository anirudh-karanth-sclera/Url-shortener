package com.shortner.ungari.shortner.Repository;

import com.shortner.ungari.shortner.model.PasswordResetToken;
import com.shortner.ungari.shortner.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer> {
    Optional<PasswordResetToken> findByToken(String token);

    Optional<PasswordResetToken> findByUser(Users user);
}
