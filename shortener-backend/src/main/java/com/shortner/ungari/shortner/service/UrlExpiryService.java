package com.shortner.ungari.shortner.service;

import com.shortner.ungari.shortner.Repository.UrlGuestRepo;
import com.shortner.ungari.shortner.Repository.UrlRepo;
import com.shortner.ungari.shortner.model.Url;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class UrlExpiryService {
    private final UrlRepo urlRepo;
    private final UrlGuestRepo urlGuestRepo;

    public UrlExpiryService(UrlRepo urlRepo, UrlGuestRepo urlGuestRepo) {
        this.urlRepo = urlRepo;
        this.urlGuestRepo = urlGuestRepo;
    }

    @Scheduled(cron = "0 0 * * * *") // Runs every hour
    public void deleteExpiredUrls() {
        List<Url> expiredUrls = urlRepo.findByExpiryDateBefore(LocalDateTime.now());

        if (!expiredUrls.isEmpty()) {
            urlRepo.deleteAll(expiredUrls);
            System.out.println("Deleted expired URLs: " + expiredUrls.size());
        }
    }

    @Scheduled(cron = "0 0 * * * *") // Runs every hour
    public void deleteExpiredGuestUrls() {
        List<Url> expiredUrls = urlGuestRepo.findByExpiryDateBefore(LocalDateTime.now());

        if (!expiredUrls.isEmpty()) {
            urlRepo.deleteAll(expiredUrls);
            System.out.println("Deleted expired URLs: " + expiredUrls.size());
        }
    }
}