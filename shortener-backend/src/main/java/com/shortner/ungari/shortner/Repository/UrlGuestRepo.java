package com.shortner.ungari.shortner.Repository;

import com.shortner.ungari.shortner.model.UrlGuest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UrlGuestRepo extends JpaRepository<UrlGuest, Integer> {
}
