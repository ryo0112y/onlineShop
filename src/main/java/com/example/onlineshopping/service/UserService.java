package com.example.onlineshopping.service;

import com.example.onlineshopping.model.Cart;
import com.example.onlineshopping.model.User;
import com.example.onlineshopping.payload.request.RegisterRequest;
import com.example.onlineshopping.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class UserService  {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Optional<User> findUserByUsername(String username){
        return userRepository.findUserByUsername(username);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public void save(User user) {
        userRepository.save(user);
    }

    public void saveUser(User request) {

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();

        User newUser = new User();

        String encodedPassword = passwordEncoder.encode(request.getPassword());

        newUser.setUsername(request.getUsername());
        newUser.setPassword(encodedPassword);
        newUser.setAddress(request.getAddress());
        newUser.setFirstName(request.getFirstName());
        newUser.setLastName(request.getLastName());
        newUser.setCreatedAt(dtf.format(now));

        userRepository.save(newUser);
    }

    public List<User> findAll(){
        return userRepository.findAll();
    }

    public boolean isUsernameExist(String username){
        return userRepository.existsByUsername(username);
    }


    public void updateUser(Long id ,RegisterRequest user) {

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();

        String encodedPassword = passwordEncoder.encode(user.getPassword());

        User updatedUser = userRepository.findUserById(id);

        updatedUser.setPassword(encodedPassword);
        updatedUser.setFirstName(user.getFirstName());
        updatedUser.setLastName(user.getLastName());
        updatedUser.setUsername(user.getUsername());
        updatedUser.setUpdatedAt(dtf.format(now));

        userRepository.save(updatedUser);

    }

    public User findUserById(Long id){
        return userRepository.findUserById(id);
    }

    public void deleteUser(User user){
        userRepository.delete(user);
    }

}