package com.CMS.Project.Admin.DTO;


import lombok.Data;

import java.time.LocalDateTime;

@Data
public class GeneralSettingsDto
{
    private String hospitalName;
    private String hospitalAddress;
    private Long hospitalPhone;
    private String hospitalEmail;
    private LocalDateTime createdDate;
    private String name;
}
