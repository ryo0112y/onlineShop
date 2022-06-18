package com.example.onlineshopping.payload.request;

import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class RegisterRequest {

    private String username;
    private String password;
    private String address;
    private String firstName;
    private String lastName;

    private Set<String> role = new HashSet<>();

    public Set<String> getRole() {
        return role;
    }

}
