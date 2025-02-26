package com.shortner.ungari.shortner.service;

import com.shortner.ungari.shortner.Repository.UserRepo;
import com.shortner.ungari.shortner.model.Users;
import com.shortner.ungari.shortner.model.UserPrincipal;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class MyUserDetailsService implements UserDetailsService {
    private UserRepo userRepo;

    public MyUserDetailsService(UserRepo userRepo){
        this.userRepo=userRepo;
    }
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       Users user= userRepo.findByUsername(username).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "user not found: " + username
        ));

       return new UserPrincipal(user);
    }
}
