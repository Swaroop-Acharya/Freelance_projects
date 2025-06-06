package com.CMS.Project.Login.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest
{
    private String username;
    private String password;
    private Set<String> roles;
}
