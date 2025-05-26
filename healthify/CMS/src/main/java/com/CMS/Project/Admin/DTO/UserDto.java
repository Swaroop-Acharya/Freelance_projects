package com.CMS.Project.Admin.DTO;

import com.CMS.Project.Admin.Enum.UserStatus;
import lombok.Data;

import java.util.Set;


@Data
public class UserDto
{
    private String username;
    private String email;
    private String password;
    private String fullName;
    private String address;
    private long phoneNumber;
    private String dateOfBirth;
    private Set<String> roles;
    private UserStatus status;


    //User summary
    private long totalUsers;
    private long activeUsers;
    private long inactiveUsers;

    private long activeDoctors;
    private long activeNurses;
    private long activePharmacy;
}
