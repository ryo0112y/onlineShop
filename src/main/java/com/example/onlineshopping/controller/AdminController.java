package com.example.onlineshopping.controller;

import com.example.onlineshopping.model.User;
import com.example.onlineshopping.payload.request.RegisterRequest;
import com.example.onlineshopping.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000/")
public class AdminController {

    @Autowired
    private UserService userService;

    @GetMapping("/list")
    public ResponseEntity<?> getAllUsers(){
        List<User> users = userService.findAll();
        return ResponseEntity.ok().body(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findUserById(@PathVariable Long id) {
        User user = userService.findUserById(id);
        return ResponseEntity.ok().body(user);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody RegisterRequest registerRequest){
        userService.updateUser(id, registerRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id){
        User user = userService.findUserById(id);
        userService.deleteUser(user);
        return ResponseEntity.ok().build();
    }

}