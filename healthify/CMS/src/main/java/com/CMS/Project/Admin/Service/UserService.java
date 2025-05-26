package com.CMS.Project.Admin.Service;

import com.CMS.Project.Admin.DTO.UserDto;
import com.CMS.Project.Admin.DTO.UserSummaryDto;
import com.CMS.Project.Admin.Enum.UserStatus;
import com.CMS.Project.Admin.Model.Role;
import com.CMS.Project.Admin.Model.User;
import com.CMS.Project.Admin.Repository.RoleRepo;
import com.CMS.Project.Admin.Repository.UserRepo;
import com.CMS.Project.GlobalExceptionHandler.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private RoleRepo roleRepo;

    private final PasswordEncoder passwordEncoder;

    public UserService(PasswordEncoder passwordEncoder)
    {
        this.passwordEncoder = passwordEncoder;
    }

    //adduser
    public User createUser(UserDto userDto)
    {
        User addUser = new User();

        addUser.setUsername(userDto.getUsername());

        String encodePassword = passwordEncoder.encode("c2c@123");

        addUser.setPassword(encodePassword);
        addUser.setFullName(userDto.getFullName());
        addUser.setDateOfBirth(userDto.getDateOfBirth());
        addUser.setAddress(userDto.getAddress());
        addUser.setPhoneNumber(userDto.getPhoneNumber());
        addUser.setLastActive(LocalDateTime.now());
        addUser.setStatus(userDto.getStatus());

        Set<Role> roles = new HashSet<>();

        for(String rolenames:userDto.getRoles())
        {
            Role role = roleRepo.findByName(rolenames).orElseThrow(()-> new RuntimeException("Role is not found "+ rolenames));
            roles.add(role);
        }

        addUser.setRoles(roles);

        return userRepo.save(addUser);

    }

    //view
    public User viewbyId(long id)
    {
        return userRepo.findById(id).orElseThrow(()-> new RuntimeException("User not found with this id" + id));
    }

    //edite
    public void userEdite(long id, UserDto userDto) {
        User updateUser = userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found this id" + id));

        updateUser.setFullName(userDto.getFullName());
        updateUser.setAddress(userDto.getAddress());
        updateUser.setPhoneNumber(userDto.getPhoneNumber());
        updateUser.setDateOfBirth(userDto.getDateOfBirth());
        updateUser.setStatus(userDto.getStatus());

        // Update roles if needed
        Set<Role> updatedRoles = new HashSet<>();
        for (String roleName : userDto.getRoles()) {
            Role role = roleRepo.findByName(roleName)
                    .orElseThrow(() -> new RuntimeException("Role not found: " + roleName));
            updatedRoles.add(role);
        }
        updateUser.setRoles(updatedRoles);
        userRepo.save(updateUser);
    }

    //Search
    public List<User> searchUsers(String name, String email, Long phone)
    {
        return userRepo.searchUsers(name, email, phone);
    }

    //Filter
    public List<User> filterUsers(String role, UserStatus status, LocalDateTime lastActive) {
        return userRepo.filterUsers(role, status, lastActive);
    }

    //active
    public UserSummaryDto getUserSummary()
    {
        UserSummaryDto dto = new UserSummaryDto();

        dto.setTotalUsers(userRepo.count());
        dto.setTotalDoctors(userRepo.countByRole("DOCTOR"));
        dto.setTotalNurses(userRepo.countByRole("NURSE"));
        dto.setTotalPharmacy(userRepo.countByRole("PHARMACIST"));

        return dto;
    }

    //total user count display to admin dashboard
    public long count()
    {
        return userRepo.count();
    }

}
