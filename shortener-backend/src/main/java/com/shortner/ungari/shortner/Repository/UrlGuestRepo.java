package com.shortner.ungari.shortner.Repository;

import com.shortner.ungari.shortner.model.Url;
import com.shortner.ungari.shortner.model.UrlGuest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface UrlGuestRepo extends JpaRepository<UrlGuest, Integer> {
    List<Url> findByExpiryDateBefore(LocalDateTime now);
}
