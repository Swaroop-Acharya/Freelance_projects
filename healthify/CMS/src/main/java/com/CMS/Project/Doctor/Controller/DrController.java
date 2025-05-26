package com.CMS.Project.Doctor.Controller;

import com.CMS.Project.Admin.Model.Role;
import com.CMS.Project.Admin.Model.User;
import com.CMS.Project.Admin.Repository.UserRepo;
import com.CMS.Project.Configuration.JwtUtil.JwtUtil;
import com.CMS.Project.Doctor.DTO.DoctorProfileResponse;
import com.CMS.Project.Doctor.DTO.DoctorScheduleRequestDTO;
import com.CMS.Project.Doctor.Service.DrService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/doctor")
public class DrController
{
    @Autowired
    private DrService service;

    private final JwtUtil jwtUtil;
    private final UserRepo userRepository;


    @GetMapping("/home")
    public String home()
    {
        return "Doctor home";
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getAdminProfile(@RequestHeader("Authorization") String token) {
        try {
            String username = jwtUtil.extractUsername(token.substring(7));

            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Build response
            DoctorProfileResponse response = new DoctorProfileResponse(
                    user.getId(),
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


    @PostMapping("/scheduleAvailability")
    public ResponseEntity<String> saveAvailability(@RequestHeader("Authorization") String token,
                                                   @RequestBody DoctorScheduleRequestDTO request) {
        try {
            String username = jwtUtil.extractUsername(token.substring(7));

            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            Long id = user.getId();

            service.saveDoctorSchedule(request,id);
            return ResponseEntity.ok("Doctor availability saved successfully");
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    //total number of patients under doctor care
    @GetMapping("dashboard/totalPatients")
    public ResponseEntity<?> totalPatientsUnderCare()
    {
       return ResponseEntity.ok(service.totalPatientsUnderDoctorCare());
    }

    @GetMapping("dashboard/todayConsultations")
    public ResponseEntity<Long> todayConsultations()
    {
        return ResponseEntity.ok(service.todayPatientsConsultations());
    }



}
