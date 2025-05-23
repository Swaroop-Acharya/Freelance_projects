package com.healthify.backend.dto;

public record UserRequest(String name, String email, String password, String role) {
    
}
