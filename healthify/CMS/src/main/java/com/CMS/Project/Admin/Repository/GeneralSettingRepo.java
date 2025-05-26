package com.CMS.Project.Admin.Repository;

import com.CMS.Project.Admin.Model.GeneralSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeneralSettingRepo extends JpaRepository<GeneralSettings,Long>
{

}
