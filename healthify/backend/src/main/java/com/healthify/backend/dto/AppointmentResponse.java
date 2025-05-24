package com.healthify.backend.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.healthify.backend.enums.AppointmentPurpose;
import com.healthify.backend.enums.AppointmentType;

public record AppointmentResponse(
    Long id, String patientName, LocalDate appointmentDate, LocalTime appointmentTime, AppointmentPurpose appointmentPurpose, String duration, AppointmentType appointmentType, String doctor) {
}
