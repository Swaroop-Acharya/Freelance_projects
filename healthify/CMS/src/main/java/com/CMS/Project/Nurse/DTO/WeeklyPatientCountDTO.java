package com.CMS.Project.Nurse.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WeeklyPatientCountDTO {
    private int firstWeekCount;
    private int secondWeekCount;
    private int thirdWeekCount;
    private int fourthWeekCount;

}
