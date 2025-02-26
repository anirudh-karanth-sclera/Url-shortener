package com.shortner.ungari.shortner.service;

import com.shortner.ungari.shortner.Repository.UrlRepo;
import com.shortner.ungari.shortner.model.Url;
import com.shortner.ungari.shortner.model.Users;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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

    public Url createShortUrl(String url,String name, Users user){
        Url newShortUrl = new Url(url, name);
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

        if(existingUrl.getUser().getUsername().equals(username)){
            return true;
        }else{
            return false;
        }

    }


    public List<Url> getAllUrlsOfUser(String username) {
        Users user = userService.findUserByName(username);
        return  urlRepo.findByUser(user);
    }

    public List<Url> findAll() {
        return urlRepo.findAll();
    }
}
