package com.CMS.Project.Nurse.Repo;

import com.CMS.Project.Nurse.Model.RegisterPatient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface RegisterPatientRepo extends JpaRepository<RegisterPatient, Long> {


    @Query("SELECT u FROM RegisterPatient u WHERE u.contactNumber1 = :number")
    Optional<RegisterPatient> findByContactNumber1(@Param("number") Long number);

    @Query("SELECT u FROM RegisterPatient u WHERE u.contactNumber2 = :number2")
    Optional<RegisterPatient> findByContactNumber2(@Param("number2") Long contactNumber2);

    @Query("SELECT COUNT(s) FROM RegisterPatient s WHERE s.date BETWEEN :weekStart AND :weekEnd")
    int findByMonthAndYearFirst(@Param("weekStart") LocalDate weekStart,
                                                  @Param("weekEnd") LocalDate weekEnd);
    @Query("SELECT COUNT(s) FROM RegisterPatient s WHERE s.date BETWEEN :weekStart AND :weekEnd")
    int findByMonthAndYearSecond(@Param("weekStart") LocalDate weekStart,
                                                   @Param("weekEnd") LocalDate weekEnd);
    @Query("SELECT COUNT(s) FROM RegisterPatient s WHERE s.date BETWEEN :weekStart AND :weekEnd")
    int findByMonthAndYearThird(@Param("weekStart") LocalDate weekStart,
                                                  @Param("weekEnd") LocalDate weekEnd);
    @Query("SELECT COUNT(s) FROM RegisterPatient s WHERE s.date BETWEEN :weekStart AND :weekEnd")
    int findByMonthAndYearFour(@Param("weekStart") LocalDate weekStart,
                                                 @Param("weekEnd") LocalDate weekEnd);

    @Query("SELECT s.date, COUNT(s) FROM RegisterPatient s " +
            "WHERE s.date BETWEEN :startDate AND :endDate " +
            "GROUP BY s.date ORDER BY s.date ASC")
    List<Object[]> countPatientsPerDay(@Param("startDate") LocalDate startDate,
                                       @Param("endDate") LocalDate endDate);


}
