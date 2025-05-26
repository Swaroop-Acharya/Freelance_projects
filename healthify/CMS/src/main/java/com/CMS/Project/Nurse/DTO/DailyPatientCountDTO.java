package com.CMS.Project.Nurse.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DailyPatientCountDTO {
    private LocalDate date;
    private Long count;

}
