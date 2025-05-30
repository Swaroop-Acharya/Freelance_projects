package com.CMS.Project.Nurse.Controller;

import com.CMS.Project.Admin.Model.Role;
import com.CMS.Project.Admin.Model.User;
import com.CMS.Project.Admin.Repository.UserRepo;
import com.CMS.Project.Configuration.JwtUtil.JwtUtil;
import com.CMS.Project.Doctor.DTO.DoctorProfileResponse;
import com.CMS.Project.Doctor.Model.DoctorAvailability;
import com.CMS.Project.Doctor.Service.DrService;
import com.CMS.Project.GlobalExceptionHandler.ApiResponse;
import com.CMS.Project.Nurse.DTO.*;
import com.CMS.Project.Nurse.Model.CreateAppointment;
import com.CMS.Project.Nurse.Model.RegisterPatient;
import com.CMS.Project.Nurse.Service.NurseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/nurse")
public class NurseController {

    @Autowired
    private NurseService service;

    @Autowired
    private DrService drService;

    private final JwtUtil jwtUtil;
    private final UserRepo userRepository;

    @GetMapping("/home")
    public String home() {
        return "Nurse home";
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getAdminProfile(@RequestHeader("Authorization") String token) {
        try {
            String username = jwtUtil.extractUsername(token.substring(7));

            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Build response
            NurseProfileResponse response = new NurseProfileResponse(
                    user.getFullName(),
                    user.getEmployeeCode(),
                    user.getUsername(), // assuming username = email
                    user.getRoles().stream().findFirst().map(Role::getName).orElse("N/A"),
                    null, // oldPassword (not needed now)
                    null  // newPassword (not needed now)
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred: " + e.getMessage());
        }
    }

    //registering the patient
    @PostMapping("/registerPatient")
    public ResponseEntity<List<RegisterPatient>> registerPatient(@RequestBody RegisterPatientDTO registerPatientDTO) {
        List<RegisterPatient> registeredPatients = service.registerPatient(registerPatientDTO);
        return ResponseEntity.ok(registeredPatients);
    }

    //showing the doctor availability
    @RequestMapping("/availableSchedules")
    public ResponseEntity<List<DoctorAvailability>> showAvailability() {
        List<DoctorAvailability> doctorAvailabilities = drService.showAvailability();
        return ResponseEntity.ok(doctorAvailabilities);
    }

    //creating an appointment
    @PostMapping("/appointment")
    public ResponseEntity<?> createAppointment
    (@RequestBody CreateAppointmentDTO createAppointmentDTO) {
        service.createAppointment(createAppointmentDTO);
        return ResponseEntity
                .ok(new ApiResponse("Appointment created successfully", null, 200));
    }

    //list of all appointment schedules
    @RequestMapping("appointmentSchedules")
    public ResponseEntity<List<AppointmentSchedulesDTO>> getSchedules() {
        return ResponseEntity.ok(service.showSchedules());
    }

    @GetMapping("dashboard/countCurrentlyAvailableDoctors")
    public ResponseEntity<?> countCurrentlyAvailableDoctors() {
        return ResponseEntity.ok(service.getAvailableDoctorCount());
    }

    @GetMapping("dashboard/countTodayAppointments")
    public ResponseEntity<?> countTodayAppointments() {
        return ResponseEntity.ok(service.countTodayAppointments());
    }

    @GetMapping("dashboard/registeredPatients")
    public ResponseEntity<?> countRegisteredPatients() {
        return ResponseEntity.ok(service.countRegisteredPatients());
    }

    @GetMapping("dashboard/upcomingAppointments")
    public ResponseEntity<List<CreateAppointment>> findUpcomingAppointments(@RequestParam(defaultValue = "1") int hours) {
        return ResponseEntity.ok(service.findUpcomingAppointments(hours));
    }

    @GetMapping("doctorSchedules/search")
    public ResponseEntity<DoctorSchedulesDTO> searchDoctorSchedules(@RequestParam(required = false) String id,
                                                                          @RequestParam(required = false) String name) {
        if (id != null) {
         DoctorSchedulesDTO dto = service.searchDoctorSchedulesByID(id);
         return ResponseEntity.ok(dto);
        } else if (name!=null) {
            DoctorSchedulesDTO dto = service.searchDoctorScheduleByName(name);
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(null); // Or create a custom error DTO
        }

    }
    // showing all the registered patients
    @GetMapping("/registerPatient")
    public ResponseEntity<List<RegisterPatient>> showRegisteredPatients()
    {
        return ResponseEntity.ok(service.showRegisteredPatients());
    }

    //calender filter
    @GetMapping("/doctorSchedulesByCalender/{date}")
    public ResponseEntity<List<DoctorSchedulesDTO>> calenderSearch(@PathVariable LocalDate date)
    {
        return ResponseEntity.ok(service.searchByCalender(date));
    }

    //doctors available now
    @GetMapping("doctorSchedules/availableNow")
    public ResponseEntity<List<DoctorSchedulesDTO>> schedulesAvailableNow()
    {
        List<DoctorSchedulesDTO> list = service.doctorsAvailableNow();
        return ResponseEntity.ok(list);
    }

    //doctors available now
    @GetMapping("doctorSchedules/unAvailableNow")
    public ResponseEntity<List<DoctorSchedulesDTO>> schedulesUnAvailableNow()
    {
        List<DoctorSchedulesDTO> list = service.doctorsUnAvailableNow();
        return ResponseEntity.ok(list);
    }

    // Endpoint to get monthly patient counts (weekly + daily)
    @GetMapping("/dashboard")
    public ResponseEntity<MonthlyPatientCountResponseDTO> monthlyPatientCount() {
        MonthlyPatientCountResponseDTO response = service.monthlyPatientCount();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/doctors")
    public ResponseEntity<List<User>> getAllDoctors() {
        List<User> doctors = userRepository.findAllDoctors();
        return ResponseEntity.ok(doctors);
    }
}
