package com.CMS.Project.Doctor.DTO;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class DoctorLeaveRequestDTO {
    private Long doctorId;
    private List<LocalDate> leaveDates;
    private String reason;
}
