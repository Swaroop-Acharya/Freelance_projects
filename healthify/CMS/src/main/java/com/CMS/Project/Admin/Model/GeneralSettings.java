package com.CMS.Project.Admin.Model;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "general_settings")
public class GeneralSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "hospital_name")
    private String hospitalName;
    @Column(name = "hospital_address")
    private String hospitalAddress;
    @Column(name = "hospital_phone")
    private Long hospitalPhone;
    @Column(name = "hospital_email")
    private String hospitalEmail;
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "time_zone_id")
    private TimeZone timeZone;

}
