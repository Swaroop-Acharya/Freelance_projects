package com.CMS.Project.Admin.Controller;

import com.CMS.Project.Admin.DTO.*;
import com.CMS.Project.Admin.Enum.UserStatus;
import com.CMS.Project.Admin.Model.Role;
import com.CMS.Project.Admin.Model.User;
import com.CMS.Project.Admin.Repository.RoleRepo;
import com.CMS.Project.Admin.Repository.UserRepo;
import com.CMS.Project.Admin.Service.GeneralSettingsService;
import com.CMS.Project.Admin.Service.UserService;
import com.CMS.Project.Configuration.JwtUtil.JwtUtil;
import com.CMS.Project.Login.Dto.PasswordChangeRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin")
public class AdminController
{

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private GeneralSettingsService generalSettingsService;

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepo userRepository;
    private final RoleRepo roleRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminController(AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserRepo userRepository, RoleRepo roleRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    //test
    @GetMapping("/home")
    public String home() {
        return "Admin home";
    }

    //addUser
    @PostMapping("/addUser")
    public ResponseEntity<User> addUser(@RequestBody UserDto userDto) {

        User SavedUser = userService.createUser(userDto);
        return ResponseEntity.ok(SavedUser);

    }

    //viewUsers
    @GetMapping("/view/{id}")
    public ResponseEntity<User> view(@PathVariable long id)
    {
        User userid = userService.viewbyId(id);

        if(userid != null)
        {
            return ResponseEntity.ok(userid);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    //edite by id
    @PutMapping("/editeUser/{id}")
    public ResponseEntity<String> updateUser(@PathVariable long id, @RequestBody UserDto userDto)
    {
        userService.userEdite(id,userDto);
        return ResponseEntity.ok("user updated successfully");
    }

    //search
    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUsers(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) Long phone) {

        List<User> users = userService.searchUsers(name, email, phone);
        return ResponseEntity.ok(users);
    }

    //Filter
    @GetMapping("/filter")
    public ResponseEntity<List<User>> filterUsers(
            @RequestParam(required = false) String role,
            @RequestParam(required = false) UserStatus status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime lastActive) {

        List<User> users = userService.filterUsers(role, status, lastActive);
        return ResponseEntity.ok(users);
    }

    //active user summary
    @GetMapping("/user-summary")
    public ResponseEntity<UserSummaryDto> getSummary() {
        return ResponseEntity.ok(userService.getUserSummary());
    }

    //addGeneralSettings
    @PostMapping("/addGeneralSettings")
    public ResponseEntity<?> createGeneralSettings(@RequestBody GeneralSettingsDto addGeneralSettings)
    {
        return ResponseEntity.ok(generalSettingsService.addGeneralSetting(addGeneralSettings));
    }

    @PostMapping("/update-profile")
    public ResponseEntity<?> updateAdminProfile(
            @RequestHeader("Authorization") String token,
            @RequestBody AdminProfileUpdateRequest request) {
        try {
            String username = jwtUtil.extractUsername(token.substring(7));

            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Validate old password
            if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
                return ResponseEntity.badRequest().body("Old password is incorrect");
            }

            // Update profile info
            user.setFullName(request.getFullName());
            user.setUsername(request.getEmail());

            // Optional: update role if needed
            Role role = roleRepository.findByName(request.getRoleName())
                    .orElseThrow(() -> new RuntimeException("Role not found"));

            Set<Role> roles = new HashSet<>();
            roles.add(role);
            user.setRoles(roles);


            // Change password if different
            if (!passwordEncoder.matches(request.getNewPassword(), user.getPassword())) {
                user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            }

            userRepository.save(user);
            SecurityContextHolder.clearContext();

            return ResponseEntity.ok("Admin profile updated and password changed successfully");

        }catch (Exception e) {
    e.printStackTrace(); // <-- Add this line for console debugging
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("An error occurred: " + e.getClass().getSimpleName());
}
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getAdminProfile(@RequestHeader("Authorization") String token) {
        try {
            String username = jwtUtil.extractUsername(token.substring(7));

            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Build response
            AdminProfileResponse response = new AdminProfileResponse(
                    user.getFullName(),
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


    //total user count display to admin dashboard
    @GetMapping("/usercount")
    public ResponseEntity<Long> usercount()
    {
        long totalUser = userService.count();
        return ResponseEntity.ok(totalUser);

    }


}
