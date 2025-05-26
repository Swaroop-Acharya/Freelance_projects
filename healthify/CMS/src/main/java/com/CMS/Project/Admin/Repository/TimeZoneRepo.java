package com.CMS.Project.Admin.Repository;

import com.CMS.Project.Admin.Model.TimeZone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Time;
import java.util.Optional;

@Repository
public interface TimeZoneRepo extends JpaRepository<TimeZone,Long>
{
      Optional<TimeZone> findByName(String name);
}
