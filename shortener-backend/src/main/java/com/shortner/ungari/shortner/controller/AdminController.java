package com.shortner.ungari.shortner.controller;

import com.shortner.ungari.shortner.model.Url;
import com.shortner.ungari.shortner.service.UrlServiceDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UrlServiceDao urlServiceDao;

    @GetMapping("/all-urls")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Url>> getAllUrls() {
        return ResponseEntity.ok(urlServiceDao.findAll());
    }
}
