package com.CMS.Project.Nurse.DTO;

import lombok.Data;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Data
public class DoctorSchedulesDTO {

    String name;
    Long id;
    LocalTime startTime;
    LocalTime endTime;
    List<String> workingDays;
    LocalDateTime nxtAvailableSlot;
}
