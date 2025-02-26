package com.shortner.ungari.shortner.model;

public class UserDTO {
    private int id;
    private String username;
    private String token;

    public UserDTO(int id, String username, String token) {
        this.id = id;
        this.username = username;
        this.token = token;
    }

    public int getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getToken() {
        return token;
    }
}

