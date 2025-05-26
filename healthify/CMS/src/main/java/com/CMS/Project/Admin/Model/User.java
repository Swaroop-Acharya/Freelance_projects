package com.CMS.Project.Admin.Model;

import com.CMS.Project.Admin.Enum.UserStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table(name = "users")
public class User
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;
    @Column(name="employee_code", unique = true,updatable = false)
    private String employeeCode;
    @Column(name = "email_id", unique = true)
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name = "full_name")
    private String fullName;
    @Column(name = "address")
    private String address;
    private long phoneNumber;
    @Column(name ="last_active")
    private LocalDateTime lastActive;
    @Column(name = "Date_of_birth")
    private String dateOfBirth;
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private UserStatus status;
     @ManyToMany(fetch = FetchType.EAGER,cascade = CascadeType.PERSIST)
     @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"),
     inverseJoinColumns = @JoinColumn(name = "role_id"))
     private Set<Role> roles = new HashSet<>();

    public User()
    {
    }

    public User(Long id, String username, String password, String fullName, long phoneNumber, LocalDateTime lastActive, String address, String dateOfBirth) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.lastActive = lastActive;
        this.address = address;
        this.dateOfBirth = dateOfBirth;
    }


}
