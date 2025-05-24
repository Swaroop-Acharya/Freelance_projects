create table `appointments` (
    `id` bigint not null auto_increment,
    `patient_name` varchar(255) not null,
    `appointment_date` datetime not null,
    `appointment_time` datetime not null,
    `appointment_purpose` varchar(255) not null,
    `duration` varchar(255) not null,
    `appointment_type` varchar(255) not null,
    `doctor` varchar(255) not null,
    primary key (`id`)
);