package com.shortner.ungari.shortner.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity
public class UrlGuest {
    @Id
    @GeneratedValue
    private int shortUrl;
    @NotBlank(message ="plz enter url" )
    private String url;

    public int getShortUrl() {
        return shortUrl;
    }

    public void setShortUrl(int shortUrl) {
        this.shortUrl = shortUrl;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public String toString() {
        return "UrlGuest{" +
                "shortUrl=" + shortUrl +
                ", url='" + url + '\'' +
                '}';
    }
}
