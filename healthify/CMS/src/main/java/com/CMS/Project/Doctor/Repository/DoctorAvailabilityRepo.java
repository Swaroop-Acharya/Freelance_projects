package com.CMS.Project.Doctor.Repository;

import com.CMS.Project.Doctor.Model.DoctorAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorAvailabilityRepo extends JpaRepository<DoctorAvailability, Long> {

    @Query("SELECT s FROM DoctorAvailability s WHERE s.doctor.id = :id AND s.date = :date")
    List<DoctorAvailability> findByDoctorIdAndDate(@Param("id") Long id, @Param("date") LocalDate date);


    @Query(value = """
                SELECT COUNT(DISTINCT doctor_id)
                FROM doctor_availability
                WHERE date = :today
                  AND is_time_off = false
                  AND :now BETWEEN startTime AND endTime
                  AND (
                      clock_in_time IS NULL OR clock_out_time IS NULL
                      OR :now NOT BETWEEN clock_in_time AND clock_out_time
                  )
            """, nativeQuery = true)
    Long countCurrentlyAvailableDoctors(
            @Param("today") LocalDate today,
            @Param("now") LocalTime now
    );


    @Query("SELECT s.doctor.employeeCode FROM DoctorAvailability s WHERE LOWER(s.fullName) = LOWER(:name)")
    String findByFullName(@Param("name") String name);


    @Query("SELECT s FROM DoctorAvailability s WHERE LOWER(s.empCode) = LOWER(:id)")
    DoctorAvailability findByEmpCode(@Param("id") String id);

    @Query("SELECT s FROM DoctorAvailability s WHERE s.date = :date")
    List<DoctorAvailability> findByDate(@Param("date") LocalDate date);

    @Query("SELECT s FROM DoctorAvailability s WHERE s.date = :currentDate AND :currentTime BETWEEN s.startTime AND s.endTime")
    List<DoctorAvailability> findDoctorsAvailableNow(@Param("currentDate") LocalDate currentDate,
                                                     @Param("currentTime") LocalTime currentTime);

    @Query("SELECT s FROM DoctorAvailability s WHERE s.date = :currentDate AND (:currentTime NOT BETWEEN s.startTime AND s.endTime)")
    List<DoctorAvailability> findDoctorsUnAvailableNow(@Param("currentDate") LocalDate currentDate,
                                                     @Param("currentTime") LocalTime currentTime);

}
