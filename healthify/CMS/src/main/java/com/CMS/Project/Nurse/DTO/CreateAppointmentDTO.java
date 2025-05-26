package com.CMS.Project.Nurse.DTO;

import com.CMS.Project.Nurse.Enum.AppointmentTypes;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
public class CreateAppointmentDTO
{

    private Long id;
    private String patientName;
    private int age;
    private Long phoneNumber;
    private String bookingId;
    private String appointmentStatus;
    private LocalDateTime appointmentTime;
    private AppointmentTypes appointmentType;
    private Long doctorId;
    private LocalTime duration;
    private int queNumber;
    private String purpose;

}
