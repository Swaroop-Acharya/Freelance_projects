package com.healthify.backend.service;

import java.util.List;
import org.springframework.stereotype.Service;

import com.healthify.backend.dto.AppointmentRequest;
import com.healthify.backend.model.Appointment;
import com.healthify.backend.repository.AppointmentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public Appointment createAppointment(AppointmentRequest appointmentRequest) {
        Appointment appointment = Appointment.builder()
            .patientName(appointmentRequest.patientName())
            .appointmentDate(appointmentRequest.appointmentDate())
            .appointmentTime(appointmentRequest.appointmentTime())
            .appointmentPurpose(appointmentRequest.appointmentPurpose())
            .duration(appointmentRequest.duration())
            .appointmentType(appointmentRequest.appointmentType())
            .doctor(appointmentRequest.doctor())
            .build();
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Appointment updateAppointment(Long id, AppointmentRequest appointmentRequest) {
        Appointment appointment = appointmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Appointment not found"));  
        appointment.setPatientName(appointmentRequest.patientName());
        appointment.setAppointmentDate(appointmentRequest.appointmentDate());
        appointment.setAppointmentTime(appointmentRequest.appointmentTime());
        appointment.setAppointmentPurpose(appointmentRequest.appointmentPurpose());
        appointment.setDuration(appointmentRequest.duration());
        appointment.setAppointmentType(appointmentRequest.appointmentType());
        return appointmentRepository.save(appointment);
    }

    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }


}    