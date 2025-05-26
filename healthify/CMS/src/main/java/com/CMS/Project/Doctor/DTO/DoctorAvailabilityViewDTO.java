package com.CMS.Project.Doctor.DTO;

import lombok.Data;

import java.time.LocalTime;
import java.util.List;

@Data
public class DoctorAvailabilityViewDTO {
    private Long doctorId;
    private String doctorName;
    private String specialty;
    private boolean isAvailable;
    private List<TimeSlot> timeSlots;

    @Data
    public static class TimeSlot {
        private LocalTime startTime;
        private LocalTime endTime;
        private String unavailabilityReason;

    }
}
