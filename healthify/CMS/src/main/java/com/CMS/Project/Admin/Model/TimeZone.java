package com.CMS.Project.Admin.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "time_zone")
public class TimeZone
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "time_zone_id")
    private Long id;
    @Column(name = "time_zone_name")
    private String name;

}
