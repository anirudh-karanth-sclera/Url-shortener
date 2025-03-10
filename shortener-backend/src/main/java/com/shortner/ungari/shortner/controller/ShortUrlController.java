package com.shortner.ungari.shortner.controller;

import com.shortner.ungari.shortner.model.Url;
import com.shortner.ungari.shortner.model.UrlGuest;
import com.shortner.ungari.shortner.model.Users;
import com.shortner.ungari.shortner.service.UrlGuestServiceDao;
import com.shortner.ungari.shortner.service.UrlServiceDao;
import com.shortner.ungari.shortner.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
public class ShortUrlController {
    private final UrlServiceDao urlServiceDao;
    private final UserService userService;
    private final UrlGuestServiceDao urlGuestServiceDao;

    public ShortUrlController(UrlServiceDao urlServiceDao, UserService userService, UrlGuestServiceDao urlGuestServiceDao) {
        this.urlServiceDao = urlServiceDao;
        this.userService = userService;
        this.urlGuestServiceDao = urlGuestServiceDao;
    }


    @PostMapping("/create")
    public ResponseEntity<?> createShortUrl(@RequestBody Map<String, String> request) {
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            Users user = userService.findUserByEmail(email);

            String url = request.get("url");
            String name = request.get("name");

            if (url == null || url.trim().isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "URL cannot be empty");
            }

            Url shortenedUrl = urlServiceDao.createShortUrl(url, name, user, 30);
            return ResponseEntity.ok(shortenedUrl);


    }

    @PostMapping("/unga/create")
    public ResponseEntity<?> createShortUrlGuest(@RequestBody Map<String, String> request) {

        String url = request.get("url");

        if (url == null || url.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "URL cannot be empty");
        }

        UrlGuest shortenedUrl = urlGuestServiceDao.createGuestUrl(url);
        return ResponseEntity.ok(shortenedUrl);


    }

    @GetMapping("/urls")
    public List<Url> getAllUrls(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return urlServiceDao.getAllUrlsOfUser(username);
    }


    @GetMapping("/go/{shortUrl}")
    public ResponseEntity<Map<String, String>> redirectToLongUrl(@PathVariable String shortUrl) {
        Url url = urlServiceDao.findByShortUrl(shortUrl);
        if (url == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Short URL not found: " + shortUrl);
        }
        return ResponseEntity.ok(Map.of("longUrl", url.getUrl())); // Redirects to the original URL
    }

    @GetMapping("/unga/{shortUrl}")
    public  ResponseEntity<Map<String, String>> redirectGuestToLongUrl(@PathVariable String shortUrl) {
        UrlGuest url = urlGuestServiceDao.findByShortUrl(shortUrl);
        if (url == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Short URL not found: " + shortUrl);
        }
        return ResponseEntity.ok(Map.of("longUrl", url.getUrl()));// Redirects to the original URL
    }


    @PutMapping("/update/{shortUrl}")
    public Url updateUrl(@PathVariable String shortUrl, @RequestBody Map<String, String> req){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        if(urlServiceDao.isOwnerOfUrl(username, shortUrl)){
            return urlServiceDao.update(shortUrl, req.get("url"));

        }else{
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "po saila" );

        }
    }

    @DeleteMapping("/delete/{shortUrl}")
    public ResponseEntity<String> deleteUrl(@PathVariable String shortUrl) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        if (urlServiceDao.isOwnerOfUrl(username, shortUrl)) {
            System.out.println("ll");
            urlServiceDao.delete(shortUrl);
            return ResponseEntity.ok("URL deleted successfully");
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "po saila");
        }
    }


    @GetMapping("/search/{name}")
    public List<Url> getAllUrlByName(@PathVariable String name){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return urlServiceDao.getAllUrlsOfUserHavingName(username, name );
    }






}
