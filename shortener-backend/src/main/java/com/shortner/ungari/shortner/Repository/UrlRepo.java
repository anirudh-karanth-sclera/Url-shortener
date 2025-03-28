package com.shortner.ungari.shortner.Repository;

import com.shortner.ungari.shortner.model.Url;
import com.shortner.ungari.shortner.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface UrlRepo extends JpaRepository<Url, Integer> {
    Optional<Url> findByUrl(String url);
    List<Url> findByUser(Users user);
    List<Url> findByUserAndNameContainingIgnoreCase(Users user, String name);


    List<Url> findByExpiryDateBefore(LocalDateTime now);
}
