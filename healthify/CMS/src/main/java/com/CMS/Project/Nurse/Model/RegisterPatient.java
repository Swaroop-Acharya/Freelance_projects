package com.CMS.Project.Nurse.Model;

import com.CMS.Project.Nurse.Enum.IDEnum;
import com.CMS.Project.Nurse.Enum.PatientStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterPatient
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private IDEnum verificationType;
    @Column(unique = true, nullable = false)
    private String bookingId;
    private String countryOfOrigin;
    private String firstname;
    private String lastname;
    private Long identificationNumber;
    private LocalDate DOB;
    private String gender;
    private String salutation;
    @Column(name = "contact_number1", unique = true, nullable = false)
    private Long contactNumber1;
    private Long contactNumber2;
    private String source;
    private LocalDate date;
    private String createdBy;
    private LocalDateTime createdTime;

}
