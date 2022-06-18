package com.example.onlineshopping.repository;

import com.example.onlineshopping.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByUsername(String username);
    User findUserById(Long id);
    User findByUsername(String username);
    Boolean existsByUsername(String username);
}
