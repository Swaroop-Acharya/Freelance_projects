package com.CMS.Project.Nurse.Model;

import com.CMS.Project.Admin.Model.User;
import com.CMS.Project.Nurse.Enum.AppointmentTypes;
import com.CMS.Project.Nurse.Enum.PatientStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Data
public class CreateAppointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String patientName;
    private int age;
    private String bookingID;

    @OneToOne
    @JoinColumn(name = "phNo", referencedColumnName = "contact_number1")
    private RegisterPatient phoneNumber;

    private LocalDateTime appointmentDateTime;
    private LocalTime duration;

    @ManyToOne
    @JoinColumn(name = "doctor_id", referencedColumnName = "user_id")
    private User doctor;

    @Enumerated(EnumType.STRING)
    private AppointmentTypes appointmentTypes;

    private String purpose;

    @Enumerated(EnumType.STRING)
    private PatientStatus status;
}
