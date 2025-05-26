package com.CMS.Project.Doctor.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorProfileResponse {

    private Long userID;
    private String fullName;
    private String employeeCode;
    private String email;
    private String roleName;
    private String oldPassword;
    private String newPassword;

}
