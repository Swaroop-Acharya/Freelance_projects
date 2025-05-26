package com.CMS.Project.Admin.Service;


import com.CMS.Project.Admin.DTO.GeneralSettingsDto;
import com.CMS.Project.Admin.Model.GeneralSettings;
import com.CMS.Project.Admin.Model.TimeZone;
import com.CMS.Project.Admin.Repository.GeneralSettingRepo;
import com.CMS.Project.Admin.Repository.TimeZoneRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class GeneralSettingsService
{
    @Autowired
    private GeneralSettingRepo generalSettingsRepo;

    @Autowired
    private TimeZoneRepo timeZoneRepo;


    //create General Settings
    public GeneralSettings addGeneralSetting(GeneralSettingsDto addGeneralSettings) {

        GeneralSettings createGeneralSettings = new GeneralSettings();
        createGeneralSettings.setHospitalName(addGeneralSettings.getHospitalName());
        createGeneralSettings.setHospitalAddress(addGeneralSettings.getHospitalAddress());
        createGeneralSettings.setHospitalPhone(addGeneralSettings.getHospitalPhone());
        createGeneralSettings.setHospitalEmail(addGeneralSettings.getHospitalEmail());
        createGeneralSettings.setCreatedAt(LocalDateTime.now());

        TimeZone timezone = timeZoneRepo.findByName(addGeneralSettings.getName()).orElseThrow(()-> new RuntimeException("Timezone is not found"));
        createGeneralSettings.setTimeZone(timezone);

        return generalSettingsRepo.save(createGeneralSettings);

    }
}
