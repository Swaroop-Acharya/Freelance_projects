package com.healthify.backend.service;

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
}
