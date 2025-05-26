package com.CMS.Project.Login.Controller;


import com.CMS.Project.Login.Dto.PasswordChangeRequest;
import com.CMS.Project.Login.Dto.RegisterRequest;
import com.CMS.Project.Admin.Model.Role;
import com.CMS.Project.Admin.Model.User;
import com.CMS.Project.Admin.Repository.RoleRepo;
import com.CMS.Project.Admin.Repository.UserRepo;
import com.CMS.Project.Login.Service.TokenBlacklistService;
import com.CMS.Project.Configuration.JwtUtil.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepo userRepository;
    private final RoleRepo roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenBlacklistService tokenBlacklistService;


    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserRepo userRepository, RoleRepo roleRepository, PasswordEncoder passwordEncoder, TokenBlacklistService tokenBlacklistService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenBlacklistService = tokenBlacklistService;

    }


    //Default Admin Register ***SAM
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest) {

        User user = new User();
        user.setUsername(registerRequest.getUsername());

        String encodePassword = passwordEncoder.encode(registerRequest.getPassword());
        user.setPassword(encodePassword);

        Set<Role> roles = new HashSet<>();

        for (String rolename : registerRequest.getRoles()) {
            Role role = roleRepository.findByName(rolename).orElseThrow(() -> new RuntimeException("role is not found"));
            roles.add(role);
        }

        user.setRoles(roles);
        userRepository.save(user);
        return ResponseEntity.ok().body("user Register successfully");

    }


    //login
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginRequest) {
        try {
            // Step 1: Check if username exists
            Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername());
            if (userOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Username not found");
            }

            // Step 2: Authenticate password using Spring Security
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            // Step 3: Generate token if success
            String token = jwtUtil.generateToken(loginRequest.getUsername());
            return ResponseEntity.ok(token);

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }


    //logout
    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String token) {

        if (token != null && token.startsWith("Bearer ")) {
            String actualToken = token.substring(7);
            tokenBlacklistService.blacklistToken(actualToken);
            return ResponseEntity.ok("Logout successful");
        }
        return ResponseEntity.badRequest().body("Token not provided or invalid");
    }

    //change password
    @PostMapping("/changepassword")
    public ResponseEntity<String> changepassword(@RequestHeader("Authorization") String token,@RequestBody PasswordChangeRequest request) {
        try {
            // Extract the username from the JWT token
            String username = jwtUtil.extractUsername(token.substring(7)); // Remove "Bearer " prefix

            // Fetch the user from the database
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Validate the old password
            if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
                return ResponseEntity.badRequest().body("Old password is incorrect");
            }

            // Check if the new password is the same as the old password
            if (passwordEncoder.matches(request.getNewPassword(), user.getPassword())) {
                return ResponseEntity.badRequest().body("New password must be different from the old password");
            }

            // Encode and save the new password
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            userRepository.save(user);

            // Clear the security context (optional)
            SecurityContextHolder.clearContext();

            // Return success response
            return ResponseEntity.ok("Password changed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }


}
