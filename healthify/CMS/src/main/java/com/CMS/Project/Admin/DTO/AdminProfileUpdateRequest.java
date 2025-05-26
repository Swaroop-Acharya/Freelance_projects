package com.CMS.Project.Admin.DTO;

import lombok.Data;

@Data
public class AdminProfileUpdateRequest
{
    private String fullName;
    private String email;
    private String roleName;
    private String oldPassword;
    private String newPassword;
}
