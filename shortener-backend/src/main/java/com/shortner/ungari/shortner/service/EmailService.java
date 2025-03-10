package com.shortner.ungari.shortner.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendResetEmail(String to, String resetToken, String clientUrl) {
        String subject = "Password Reset Request";
        String resetUrl = clientUrl+"/reset-password?token=" + resetToken;

        String message = "Click the link below to reset your password:\n" + resetUrl;

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(to);
        email.setSubject(subject);
        email.setText(message);

        mailSender.send(email);
    }

}
