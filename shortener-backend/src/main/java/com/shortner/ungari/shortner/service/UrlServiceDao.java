package com.shortner.ungari.shortner.service;

import com.shortner.ungari.shortner.Repository.UrlRepo;
import com.shortner.ungari.shortner.model.Url;
import com.shortner.ungari.shortner.model.Users;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UrlServiceDao {
    private UrlRepo urlRepo;
    private  UserService userService;

    public UrlServiceDao(UrlRepo urlRepo, UserService userService) {
        this.urlRepo = urlRepo;
        this.userService = userService;
    }

    public Url findByShortUrl(String shortUrl){

        return urlRepo.findById(Integer.parseInt(shortUrl))
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Short URL not found: " + shortUrl
                ));
    }

    public Url createShortUrl(String url,String name, Users user, int daysToExpire){
        LocalDateTime expiryDate = LocalDateTime.now().plusDays(daysToExpire);
        Url newShortUrl = new Url(url, name, expiryDate);
        newShortUrl.setUser(user);
        try {
            return urlRepo.save(newShortUrl);
        } catch (DataIntegrityViolationException e) {

            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,e.getMessage());
        }
    }

    public Url update(String shortUrl, String newUrl) {
        Url existingUrl = urlRepo.findById(Integer.parseInt(shortUrl))
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Short URL not found: " + shortUrl
                ));

        existingUrl.setUrl(newUrl);  // Update the URL
        return urlRepo.save(existingUrl);  // Save back to DB
    }

    public boolean isOwnerOfUrl(String username, String shortUrl) {
        Url existingUrl = urlRepo.findById(Integer.parseInt(shortUrl))
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Short URL not found: " + shortUrl
                ));

        return existingUrl.getUser().getEmail().equals(username);

    }


    public List<Url> getAllUrlsOfUser(String username) {
        Users user = userService.findUserByEmail(username);
        return  urlRepo.findByUser(user);
    }

    public List<Url> findAll() {
        return urlRepo.findAll();
    }

    public void delete(String shortUrl) {
        Url existingUrl = urlRepo.findById(Integer.parseInt(shortUrl))
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Short URL not found: " + shortUrl
                ));

        urlRepo.delete(existingUrl);
    }

    public List<Url> getAllUrlsOfUserHavingName(String username, String name) {
        Users user = userService.findUserByEmail(username);
        return urlRepo.findByUserAndNameContainingIgnoreCase(user, name);
    }

}
