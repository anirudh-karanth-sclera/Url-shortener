package com.shortner.ungari.shortner.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "name"})
)
public class Url {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int shortUrl;

    @Column(length = 10048) // Increase length to handle long URLs
    @NotBlank(message = "url should not be empty")
    private String url;

    private String name;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false) // Foreign key reference
    @JsonIgnore
    private Users user;

    // Constructors
    public Url() {
    }

    public Url(String url, String name) {
        this.url = url;
        this.name = name;
    }

    // Getters and Setters
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getShortUrl() {
        return shortUrl;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Url{" +
                "shortUrl=" + shortUrl +
                ", url='" + url + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
