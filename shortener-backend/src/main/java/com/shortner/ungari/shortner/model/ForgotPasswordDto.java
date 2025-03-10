package com.shortner.ungari.shortner.model;

public class ForgotPasswordDto {
    private String email;
    private String clientUrl;

    public ForgotPasswordDto() {

    }

    public ForgotPasswordDto(String email, String clientUrl) {
        this.email = email;
        this.clientUrl = clientUrl;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getClientUrl() {
        return clientUrl;
    }

    public void setClientUrl(String clientUrl) {
        this.clientUrl = clientUrl;
    }

    @Override
    public String toString() {
        return "ForgotPasswordDto{" +
                "email='" + email + '\'' +
                ", clientUrl='" + clientUrl + '\'' +
                '}';
    }
}
