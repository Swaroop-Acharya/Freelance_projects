package com.healthify.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthify.backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    
}
