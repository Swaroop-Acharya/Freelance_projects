package com.CMS.Project.Doctor.Service;

import com.CMS.Project.Admin.Model.User;
import com.CMS.Project.Admin.Repository.UserRepo;
import com.CMS.Project.Doctor.DTO.DoctorScheduleRequestDTO;
import com.CMS.Project.Doctor.Model.DoctorAvailability;
import com.CMS.Project.Doctor.Repository.DoctorAvailabilityRepo;
import com.CMS.Project.Nurse.Model.CreateAppointment;
import com.CMS.Project.Nurse.Repo.CreateAppointmentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class DrService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    CreateAppointmentRepo repo;

    @Autowired
    private DoctorAvailabilityRepo availabilityRepo;

    // Save or update the doctor's availability schedule
    public void saveDoctorSchedule(DoctorScheduleRequestDTO request,Long id) {
        User doctor = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));


        List<DoctorAvailability> existingSlots = availabilityRepo
                .findByDoctorIdAndDate(id, request.getDate());

        for (DoctorScheduleRequestDTO.TimeSlot slot : request.getTimeSlots()) {

            // Check for time overlap
            for (DoctorAvailability existing : existingSlots) {
                if (!(slot.getEndTime().isBefore(existing.getStartTime())
                        || slot.getStartTime().isAfter(existing.getEndTime()))) {
                    throw new RuntimeException("Time slot overlaps with existing schedule");
                }
            }
            String empCode = request.getEmpCode();
            User user = userRepo.findByEmployeeCode(empCode);
            DoctorAvailability availability = new DoctorAvailability();
            availability.setDoctor(doctor);
            availability.setFullName(request.getFullName());
            availability.setEmpCode(request.getEmpCode());
            availability.setDate(request.getDate());
            availability.setStartTime(slot.getStartTime());
            availability.setEndTime(slot.getEndTime());
            availability.setTimeOff(!slot.isAvailable());
            availability.setReasonForTimeOff(slot.getUnavailabilityReason());
            availability.setClockInTime(request.getClogin());
            availability.setClockOutTime(request.getClogout());
            availability.setClockOutReason(request.getClogoutReason());
            availability.setCreatedBy("doctor_" + doctor.getId());
            availability.setCreatedTime(LocalDateTime.now());

            availabilityRepo.save(availability);
        }
    }

    public Long totalPatientsUnderDoctorCare() {
        return repo.countPatients();
    }

    public List<DoctorAvailability> showAvailability() {

        List<DoctorAvailability> doctorAvailabilities;
        doctorAvailabilities = availabilityRepo.findAll();

        return doctorAvailabilities;
    }

    public Long todayPatientsConsultations() {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay();                 // 2025-05-09T00:00
        LocalDateTime endOfDay = today.plusDays(1).atStartOfDay();
        return repo.todayPatientsConsultations(startOfDay, endOfDay);
    }

    public List<CreateAppointment> getTodayPatientSchedule() {
        LocalDate date = LocalDate.now();
        LocalDateTime startTime = date.atStartOfDay();
        LocalDateTime endTime = date.plusDays(1).atStartOfDay();
        return repo.getTodayPatientSchedule(startTime, endTime);
    }

}
