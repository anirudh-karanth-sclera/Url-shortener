package com.shortner.ungari.shortner.service;

import com.shortner.ungari.shortner.Repository.UrlGuestRepo;
import com.shortner.ungari.shortner.model.Url;
import com.shortner.ungari.shortner.model.UrlGuest;
import jakarta.persistence.Entity;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

@Service
public class UrlGuestServiceDao {
    private final UrlGuestRepo urlGuestRepo;

    public UrlGuestServiceDao(UrlGuestRepo urlGuestRepo) {
        this.urlGuestRepo = urlGuestRepo;
    }

    public UrlGuest createGuestUrl(String url){
        LocalDateTime expiryDate = LocalDateTime.now().plusDays(5);
        UrlGuest urlGuest = new UrlGuest(url, expiryDate);
        return urlGuestRepo.save(urlGuest);
    }

    public UrlGuest findByShortUrl(String shortUrl){

        return urlGuestRepo.findById(Integer.parseInt(shortUrl))
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Short URL not found: " + shortUrl
                ));
    }
}
