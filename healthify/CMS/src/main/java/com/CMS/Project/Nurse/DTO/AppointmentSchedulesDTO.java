package com.CMS.Project.Nurse.DTO;

import com.CMS.Project.Nurse.Enum.PatientStatus;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AppointmentSchedulesDTO {
    private Long id;
    private String patientName;
    private String phoneNumber;
    private String age;
    private String bookingId;
    private LocalDate date;
    private LocalTime time;
    private String purpose;
    private String doctor;
    private int room;
    private PatientStatus status;
    private LocalTime duration;
}
