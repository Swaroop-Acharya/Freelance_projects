package com.CMS.Project.Doctor.DTO;

import lombok.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorScheduleRequestDTO {

//    private Long doctorId; // The doctor who is saving the schedule
    private String empCode;
    private String fullName;
    private LocalDate date; // Date for which the availability is being set
    private List<TimeSlot> timeSlots; // List of time slots for availability
    private LocalTime clogin; // Login time for the doctor
    private LocalTime clogout; // Logout time for the doctor
    private String clogoutReason; // Reason for logout (e.g., end of shift)
    private List<DayOfWeek> workingDays;
    @Setter
    @Getter
    public static class TimeSlot {

        private LocalTime startTime; // Start time for the slot
        private boolean isAvailable; // Is the doctor available for this time slot
        private LocalTime endTime;   // End time for the slot
        private String unavailabilityReason; // If unavailable, reason for the unavailability
    }
}