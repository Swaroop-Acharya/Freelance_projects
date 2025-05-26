package com.CMS.Project.Nurse.DTO;

import com.CMS.Project.Nurse.Enum.PatientStatus;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AppointmentSchedulesDTO {
    private String patientName;
    private String bookingID;
    private LocalDate date;
    private LocalTime time;
    private String purpose;
    private String doctor;
    private int room;
    private LocalTime duration;
    private PatientStatus status;
}
