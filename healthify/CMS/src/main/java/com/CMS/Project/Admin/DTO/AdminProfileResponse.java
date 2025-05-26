package com.CMS.Project.Admin.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminProfileResponse {

    private String fullName;
    private String email;
    private String roleName;
    private String oldPassword;
    private String newPassword;
}
