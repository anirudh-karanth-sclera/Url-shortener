package com.shortner.ungari.shortner.Repository;

import com.shortner.ungari.shortner.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<Users, Integer> {

    @Override
    Optional<Users> findById(Integer integer);
    Optional<Users> findByUsername(String username);
    boolean existsByUsername(String username);


}
