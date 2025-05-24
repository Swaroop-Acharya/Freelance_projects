package com.healthify.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthify.backend.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    
}
