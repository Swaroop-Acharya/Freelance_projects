package com.healthify.backend.model;

import java.time.LocalDate;
import java.time.LocalTime;

import com.healthify.backend.enums.AppointmentPurpose;
import com.healthify.backend.enums.AppointmentType;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private String patientName;

    @NonNull
    private LocalDate appointmentDate;

    @NonNull
    private LocalTime appointmentTime;

    @Enumerated(EnumType.STRING)        
    private AppointmentPurpose appointmentPurpose;

    @NonNull
    private String duration;

    @Enumerated(EnumType.STRING)
    private AppointmentType appointmentType;

    @NonNull
    private String doctor;

}
