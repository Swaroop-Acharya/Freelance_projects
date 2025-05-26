package com.CMS.Project.Nurse.DTO;

import com.CMS.Project.Nurse.Enum.IDEnum;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class RegisterPatientDTO {

    private Long id;
    private IDEnum verificationType;
    private String countryOfOrigin;
    private String firstname;
    private String lastname;
    private Long identificationNumber;
    private LocalDate DOB;
    private String gender;
    private String salutation;
    private Long contactNumber1;
    private Long contactNumber2;
    private String source;
    private LocalDate date;
    private String createdBy;
    private LocalDateTime createdTime;

}
