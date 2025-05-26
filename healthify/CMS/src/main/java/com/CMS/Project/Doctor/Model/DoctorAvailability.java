package com.CMS.Project.Doctor.Model;

import com.CMS.Project.Admin.Model.User;
import com.CMS.Project.Doctor.Enum.DayofWeekEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class DoctorAvailability {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "doctor_id", referencedColumnName = "user_id")
    private User doctor;
    private String empCode;
    private String fullName;
    //available working days
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "doctor_working_days", joinColumns = @JoinColumn(name = "availability_id"))
    @Column(name = "day_of_week")
    @Enumerated(EnumType.STRING)
    private List<DayOfWeek> workingDays;
    // specific day for availability
    private LocalDate date;
    // Full working hours of the doctor for this day
    private LocalTime startTime;
    private LocalTime endTime;
    //// If doctor is taking a break in between working hours
    private LocalTime clockInTime;
    private LocalTime clockOutTime;
    private String clockOutReason;
    // Indicates if the doctor is on leave for the full day
    private boolean isTimeOff;
    private String reasonForTimeOff;
    private String createdBy;
    private LocalDateTime createdTime;

}
