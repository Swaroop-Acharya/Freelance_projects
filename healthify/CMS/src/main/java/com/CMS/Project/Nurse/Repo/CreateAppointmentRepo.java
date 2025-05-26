package com.CMS.Project.Nurse.Repo;

import com.CMS.Project.Nurse.Model.CreateAppointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CreateAppointmentRepo extends JpaRepository<CreateAppointment,Long> {

    @Query("SELECT count(c) FROM CreateAppointment c WHERE c.status = 'Confirmed' OR c.status = 'Pending'")
    Long countPatients();

    @Query("SELECT COUNT(r) FROM CreateAppointment r WHERE r.appointmentDateTime >= :start AND r.appointmentDateTime < :end")
    Long  todayPatientsConsultations(
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );

    @Query("SELECT r FROM CreateAppointment r WHERE r.appointmentDateTime IS NOT NULL AND" +
            " r.appointmentDateTime >= :start AND r.appointmentDateTime < :end ORDER BY r.appointmentDateTime ASC")
    List<CreateAppointment> getTodayPatientSchedule(
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );


    @Query("SELECT COUNT(a) FROM CreateAppointment a WHERE DATE(a.appointmentDateTime) = :today")
    Long countTodayAppointments(@Param("today") LocalDate today);

    @Query("SELECT a FROM CreateAppointment a WHERE a.appointmentDateTime BETWEEN :start AND :end ORDER BY a.appointmentDateTime ASC")
    List<CreateAppointment> findUpcomingAppointments(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

}
