package com.example.onlineshopping.controller;

import com.example.onlineshopping.model.ERole;
import com.example.onlineshopping.model.Role;
import com.example.onlineshopping.model.User;
import com.example.onlineshopping.payload.request.LoginRequest;
import com.example.onlineshopping.payload.request.RegisterRequest;
import com.example.onlineshopping.repository.RoleRepository;
import com.example.onlineshopping.service.CartService;
import com.example.onlineshopping.service.UserService;
import com.example.onlineshopping.service.jwt.JwtUtils;
import com.example.onlineshopping.payload.response.MessageResponse;
import com.example.onlineshopping.service.userDetails.UserDetailsImpl;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.Set;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000/")
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserService userService;

    @Autowired
    private CartService cartService;

    @Autowired
    private RoleRepository roleRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        try {
            Authentication authentication = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.getUsername(), request.getPassword()
                            )
                    );

            UserDetailsImpl user = (UserDetailsImpl) authentication.getPrincipal();
            user.setPassword(null);

            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
            LocalDateTime now = LocalDateTime.now();

            User loginedUser = userService.findUserById(user.getId());
            loginedUser.setLoginedAt(dtf.format(now));
            userService.save(loginedUser);

            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.AUTHORIZATION,
                            jwtUtils.generateJwtToken(authentication)
                    )
                    .body(user);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

        if(userService.isUsernameExist(request.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }

        User user = new User(request.getUsername(), request.getPassword(), request.getFirstName(), request.getLastName(), request.getAddress());

        Set<String> strRoles = request.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is Null."));
            roles.add(userRole);
        }
        else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Admin Role is Not Found."));
                        roles.add(adminRole);

                        break;
                    case "manager":
                        Role modRole = roleRepository.findByName(ERole.ROLE_MANAGER)
                                .orElseThrow(() -> new RuntimeException("Error: Manager Role is Not Found."));
                        roles.add(modRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: User Role is Not Found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userService.saveUser(user);

        return ResponseEntity.ok().body(user);
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestParam String token, @AuthenticationPrincipal User user) {
        try {
            Boolean isTokenValid = jwtUtils.validateJwtToken(token);
            return ResponseEntity.ok(isTokenValid);
        }
        catch (ExpiredJwtException e) {
            return ResponseEntity.ok(false);
        }
    }

}