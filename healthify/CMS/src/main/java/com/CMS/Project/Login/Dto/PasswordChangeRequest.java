package com.CMS.Project.Login.Dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PasswordChangeRequest
{
    private String oldPassword;
    private String newPassword;


}
