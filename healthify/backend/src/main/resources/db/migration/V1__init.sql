create table `users` (
    `id` bigint(20) not null auto_increment,
    `name` varchar(255) ,
    `email` varchar(255),
    `password` varchar(255),
    `role` varchar(255),
    PRIMARY KEY (`id`)
);