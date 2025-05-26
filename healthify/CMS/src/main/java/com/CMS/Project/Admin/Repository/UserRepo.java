package com.CMS.Project.Admin.Repository;

import com.CMS.Project.Admin.Enum.UserStatus;
import com.CMS.Project.Admin.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User,Long>
{
    Optional<User> findByUsername(String username);


    @Query("SELECT u FROM User u WHERE " +
            "(:name IS NOT NULL AND LOWER(u.fullName) LIKE LOWER(CONCAT('%', :name, '%'))) OR " +
            "(:email IS NOT NULL AND LOWER(u.username) LIKE LOWER(CONCAT('%', :email, '%'))) OR " +
            "(:phone IS NOT NULL AND u.phoneNumber = :phone)")
    List<User> searchUsers(@Param("name") String name,
                           @Param("email") String email,
                           @Param("phone") Long phone);

    @Query("SELECT DISTINCT u FROM User u JOIN u.roles r WHERE " +
            "(:role IS NULL OR LOWER(r.name) = LOWER(:role)) AND " +
            "(:status IS NULL OR u.status = :status) AND " +
            "(:lastActive IS NULL OR u.lastActive >= :lastActive)")
    List<User> filterUsers(@Param("role") String role,
                           @Param("status") UserStatus status,
                           @Param("lastActive") LocalDateTime lastActive);



    @Query("SELECT COUNT(u) FROM User u JOIN u.roles r WHERE r.name = :roleName")
    long countByRole(@Param("roleName") String roleName);

    @Query("SELECT u FROM User u JOIN u.roles r WHERE r.name = 'DOCTOR'")
    List<User> findAllDoctors();@Query("SELECT n.fullName FROM User n WHERE n.id = :doctorID")
          String getDoctorName(@Param("doctorID") Long doctorID);


//    long count();

    @Query("SELECT u FROM User u where u.employeeCode = :empCode")
    User findByEmployeeCode(@Param("empCode") String empCode);
}
