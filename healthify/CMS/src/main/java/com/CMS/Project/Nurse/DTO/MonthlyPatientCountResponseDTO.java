package com.CMS.Project.Nurse.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MonthlyPatientCountResponseDTO {
    private WeeklyPatientCountDTO weeklySummary;
    private List<DailyPatientCountDTO> dailyCounts;
}
