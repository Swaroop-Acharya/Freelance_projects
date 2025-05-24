package com.healthify.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.healthify.backend.dto.UserRequest;
import com.healthify.backend.dto.UserResponse;
import com.healthify.backend.model.User;
import com.healthify.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    public UserResponse createUser(UserRequest userRequest) {
        User user = User.builder()
            .name(userRequest.name())
            .email(userRequest.email())
            .password(userRequest.password())
            .role(userRequest.role())
            .build();
        userRepository.save(user);
        return new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getRole());
    }

    public UserResponse updateUser(Long id, UserRequest userRequest) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));
        user.setName(userRequest.name());
        user.setEmail(userRequest.email());
        user.setPassword(userRequest.password());
        user.setRole(userRequest.role());
        userRepository.save(user);
        return new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getRole());
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
