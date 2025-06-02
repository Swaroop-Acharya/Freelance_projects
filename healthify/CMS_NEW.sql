/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.7.2-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: cms_db
-- ------------------------------------------------------
-- Server version	11.7.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `create_appointment`
--

DROP TABLE IF EXISTS `create_appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `create_appointment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `age` int(11) NOT NULL,
  `appointment_date_time` datetime(6) DEFAULT NULL,
  `appointment_types` enum('Consultation','Follow_up','ScheduledAppointment','Walkin') DEFAULT NULL,
  `duration` time(6) DEFAULT NULL,
  `patient_name` varchar(255) DEFAULT NULL,
  `doctor_id` bigint(20) DEFAULT NULL,
  `ph_no` bigint(20) DEFAULT NULL,
  `bookingid` varchar(255) DEFAULT NULL,
  `purpose` varchar(255) DEFAULT NULL,
  `status` enum('Cancelled','Confirmed','Pending','Finished') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKe3nyq171k21n2ckiw8ohj5moq` (`ph_no`),
  KEY `FKdb5xg3oqch6rn2fl4vwtpin9k` (`doctor_id`),
  CONSTRAINT `FKdb5xg3oqch6rn2fl4vwtpin9k` FOREIGN KEY (`doctor_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKk6ghacx8yvlj4upu9b4brvnf5` FOREIGN KEY (`ph_no`) REFERENCES `register_patient` (`contact_number1`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `create_appointment`
--

LOCK TABLES `create_appointment` WRITE;
/*!40000 ALTER TABLE `create_appointment` DISABLE KEYS */;
INSERT INTO `create_appointment` VALUES
(18,22,'2025-06-01 04:00:00.000000','Walkin','00:30:00.000000','Kane',2,24254342,'BK202506010003','Checkup','Finished');
/*!40000 ALTER TABLE `create_appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor_availability`
--

DROP TABLE IF EXISTS `doctor_availability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor_availability` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `clock_in_time` time(6) DEFAULT NULL,
  `clock_out_reason` varchar(255) DEFAULT NULL,
  `clock_out_time` time(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_time` datetime(6) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `endtime` time(6) DEFAULT NULL,
  `is_time_off` bit(1) NOT NULL,
  `reason_for_time_off` varchar(255) DEFAULT NULL,
  `starttime` time(6) DEFAULT NULL,
  `doctor_id` bigint(20) DEFAULT NULL,
  `doctorid` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `epm_code` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `emp_code` varchar(255) DEFAULT NULL,
  `end_time` time(6) DEFAULT NULL,
  `start_time` time(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1mfkjo7s5ct426dm5a2hyiur0` (`doctor_id`),
  KEY `FKn0y4sk55qsq0yteqmw6jb460e` (`doctorid`),
  CONSTRAINT `FK1mfkjo7s5ct426dm5a2hyiur0` FOREIGN KEY (`doctor_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKn0y4sk55qsq0yteqmw6jb460e` FOREIGN KEY (`doctorid`) REFERENCES `users` (`employee_code`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor_availability`
--

LOCK TABLES `doctor_availability` WRITE;
/*!40000 ALTER TABLE `doctor_availability` DISABLE KEYS */;
INSERT INTO `doctor_availability` VALUES
(1,'09:00:00.000000','Half-day clinic','17:00:00.000000','doctor_6','2025-04-22 15:47:28.058055','2025-04-22','10:00:00.000000',0x01,NULL,'09:00:00.000000',6,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(2,'09:00:00.000000','Half-day clinic','17:00:00.000000','doctor_6','2025-04-22 15:47:28.200731','2025-04-22','11:00:00.000000',0x01,'Meeting','10:00:00.000000',6,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(3,'09:00:00.000000','Half-day clinic','17:00:00.000000','doctor_6','2025-04-22 15:53:57.447395','2025-04-21','10:00:00.000000',0x01,NULL,'09:00:00.000000',6,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(4,'09:00:00.000000','Half-day clinic','17:00:00.000000','doctor_6','2025-04-22 15:53:57.465327','2025-04-21','11:00:00.000000',0x01,'Meeting','10:00:00.000000',6,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(5,'09:00:00.000000','Half-day clinic','17:00:00.000000','doctor_6','2025-04-22 15:54:18.477938','2025-04-26','10:00:00.000000',0x01,NULL,'09:00:00.000000',6,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(6,'09:00:00.000000','Half-day clinic','17:00:00.000000','doctor_6','2025-04-22 15:54:18.494952','2025-04-26','11:00:00.000000',0x01,'Meeting','10:00:00.000000',6,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(7,'09:00:00.000000','Half-day clinic','17:00:00.000000','doctor_6','2025-04-22 15:57:36.791714','2025-03-29','10:00:00.000000',0x01,NULL,'09:00:00.000000',6,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(8,'09:00:00.000000','Half-day clinic','17:00:00.000000','doctor_6','2025-04-22 15:57:36.824624','2025-03-29','11:00:00.000000',0x01,'Meeting','10:00:00.000000',6,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(9,'08:45:00.000000','Shift End','17:00:00.000000','doctor_9','2025-06-01 18:05:24.003219','2025-06-05',NULL,0x01,NULL,NULL,9,NULL,NULL,NULL,'Dr. John Smith','EMP12345','10:00:00.000000','09:00:00.000000'),
(10,'08:45:00.000000','Shift End','17:00:00.000000','doctor_9','2025-06-01 18:05:24.051771','2025-06-05',NULL,0x01,'Attending seminar',NULL,9,NULL,NULL,NULL,'Dr. John Smith','EMP12345','11:30:00.000000','10:30:00.000000'),
(15,'09:00:00.000000','End of shift','17:00:00.000000','doctor_9','2025-06-01 18:24:32.748483','2025-06-01',NULL,0x01,NULL,NULL,9,NULL,NULL,NULL,'Dr. Shiva','D001','11:00:00.000000','10:00:00.000000');
/*!40000 ALTER TABLE `doctor_availability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor_working_days`
--

DROP TABLE IF EXISTS `doctor_working_days`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor_working_days` (
  `availability_id` bigint(20) NOT NULL,
  `day_of_week` enum('FRIDAY','MONDAY','SATURDAY','SUNDAY','THURSDAY','TUESDAY','WEDNESDAY') DEFAULT NULL,
  KEY `FKddh121etho6tjm27libghexfo` (`availability_id`),
  CONSTRAINT `FKddh121etho6tjm27libghexfo` FOREIGN KEY (`availability_id`) REFERENCES `doctor_availability` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor_working_days`
--

LOCK TABLES `doctor_working_days` WRITE;
/*!40000 ALTER TABLE `doctor_working_days` DISABLE KEYS */;
INSERT INTO `doctor_working_days` VALUES
(15,'MONDAY'),
(15,'TUESDAY'),
(15,'WEDNESDAY'),
(15,'THURSDAY'),
(15,'FRIDAY');
/*!40000 ALTER TABLE `doctor_working_days` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `general_settings`
--

DROP TABLE IF EXISTS `general_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `general_settings` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `hospital_address` varchar(255) DEFAULT NULL,
  `hospital_email` varchar(255) DEFAULT NULL,
  `hospital_name` varchar(255) DEFAULT NULL,
  `hospital_phone` bigint(20) DEFAULT NULL,
  `time_zone_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKodrtn2bfrdiescw9tbb80yr1t` (`time_zone_id`),
  CONSTRAINT `FKodrtn2bfrdiescw9tbb80yr1t` FOREIGN KEY (`time_zone_id`) REFERENCES `time_zone` (`time_zone_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `general_settings`
--

LOCK TABLES `general_settings` WRITE;
/*!40000 ALTER TABLE `general_settings` DISABLE KEYS */;
INSERT INTO `general_settings` VALUES
(1,'2025-04-15 11:58:47.996011','123 Health Street','info@citycare.com','City Care Hospital',9876543210,2);
/*!40000 ALTER TABLE `general_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `expiry_date` datetime(6) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKk3ndxg5xp6v7wd4gjyusp15gq` (`user_id`),
  CONSTRAINT `FKk3ndxg5xp6v7wd4gjyusp15gq` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `register_patient`
--

DROP TABLE IF EXISTS `register_patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `register_patient` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `dob` date DEFAULT NULL,
  `booking_id` varchar(255) NOT NULL,
  `contact_number1` bigint(20) NOT NULL,
  `contact_number2` bigint(20) DEFAULT NULL,
  `country_of_origin` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_time` datetime(6) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `identification_number` bigint(20) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `salutation` varchar(255) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `verification_type` enum('LocalID','Passport') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKb8sf0attdisrfi8bweclae51i` (`booking_id`),
  UNIQUE KEY `UKe9poixwjv3w5dm4kphp6rq2th` (`contact_number1`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `register_patient`
--

LOCK TABLES `register_patient` WRITE;
/*!40000 ALTER TABLE `register_patient` DISABLE KEYS */;
INSERT INTO `register_patient` VALUES
(6,'1999-05-24','BK202505140001',50123775789,50198775432,'India','NURSE','2025-05-13 18:15:00.000000','2025-05-14','Ramesh','Male',123456489023,'Reddy Garu','Mr.','Online','LocalID'),
(7,'2022-01-01','BK202505300002',9876543210,9123456780,'India','admin_user','2025-05-29 22:15:00.000000','2025-05-30','Jane','Male',987654321012,'Doe','Ms.','Online','Passport'),
(8,NULL,'BK202505300003',9876542210,91232332380,'India','NURSE','2025-05-30 09:15:00.000000','2025-05-30','Karthik','Female',987654321012,'Doe','Ms.','Online','Passport'),
(9,'1990-05-15','BK202505300004',1421424524,13134525323,'India','NURSE','2025-05-30 09:15:00.000000','2025-05-30','Sanjaya','Female',1231412432,'Dat','Ms.','Online','Passport'),
(10,'2004-02-20','BK202505300005',932932923232,427894294789,'India','NURSE','2025-05-30 09:55:12.921000','2025-05-30','Shara','Male',428947298472,'Rai','Mr','Online','LocalID'),
(11,'2002-01-22','BK202505300006',424242525235,414142525252,'US','NURSE','2025-05-30 10:13:40.848000','2025-05-30','Albert','Male',313132414,'Husain','Mr','Online','LocalID'),
(12,'2023-02-01','BK202505310006',42424252343,242355424324,'China','NURSE','2025-05-31 00:50:22.185000','2025-05-31','Ching ','Male',4242424242142,'brothers','Mr.','Online','LocalID'),
(13,'2002-12-11','BK202506010003',24254342,2425635423,'afaf','NURSE','2025-05-31 16:56:34.609000','2025-06-01','Karthik','Male',42424252,'Kumar','Mr.','Online','LocalID'),
(14,'2002-02-22','BK202506010004',242424242,2424242424,'New Zeland','NURSE','2025-06-01 01:13:32.336000','2025-06-01','Kane','Female',2342453242,'William','Mr.','Online','LocalID');
/*!40000 ALTER TABLE `register_patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `UK716hgxp60ym1lifrdgp67xt5k` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES
(5,NULL),
(1,'ADMIN'),
(2,'DOCTOR'),
(3,'NURSE'),
(4,'PHARMACIST');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `time_zone`
--

DROP TABLE IF EXISTS `time_zone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `time_zone` (
  `time_zone_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `time_zone_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`time_zone_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `time_zone`
--

LOCK TABLES `time_zone` WRITE;
/*!40000 ALTER TABLE `time_zone` DISABLE KEYS */;
INSERT INTO `time_zone` VALUES
(1,'America/Los Angeles (GMT-8)'),
(2,'Europe/Londen (GMT-0)');
/*!40000 ALTER TABLE `time_zone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKh8ciramu9cc9q3qcqiv4ue8a6` (`role_id`),
  CONSTRAINT `FKh8ciramu9cc9q3qcqiv4ue8a6` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`),
  CONSTRAINT `FKhfh9dx7w3ubf1co1vdev94g3f` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES
(1,1),
(8,1),
(2,2),
(3,2),
(5,2),
(6,2),
(9,2),
(4,3),
(7,3);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `date_of_birth` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `last_active` datetime(6) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` bigint(20) NOT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `status` enum('AVAILABLE','UNAVAILABLE') DEFAULT NULL,
  `employee_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UKpwrpg821nujmmnavoq7s420jn` (`email_id`),
  UNIQUE KEY `UKob2dx53vn966ek0roock2539f` (`employee_code`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,NULL,NULL,'sam',NULL,'$2a$10$2BxNDe.r24TxvcNUY5KT4.FWDjjyBITiCL2EztqTAGOT2ARJyC17m',0,'samkutty873@gmail.com',NULL,NULL),
(2,'123 Main Street','1990-01-01','John Doe','2025-04-11 10:34:22.228663','$2a$10$RgGTmjG.tdDUMluQhWAqxu9GnUWUO75COHLoCVBIp0JATxIDgQMKC',0,'john.doe@example.com',NULL,NULL),
(3,'123 Main Street','1990-01-01','sam Doe','2025-04-11 11:12:02.493046','$2a$10$QMOPxwmq.LFzj/Meo2A7zu.mwTTapNqLH8Fynet8TpnCY8OUXwRLi',9876543210,'sam.doe@example.com',NULL,NULL),
(4,'123 Main Street','1990-01-01','John Doe','2025-04-11 11:25:31.247583','$2a$10$UQm0DWv6Yo8N9MJdzmOJ.Of0a1XwzwEPNGMkrByzvD5VAjl2NEIxm',9876543210,'test.doe@example.com','UNAVAILABLE',NULL),
(5,NULL,NULL,NULL,NULL,'$2a$10$AWpqCuWcGMwa.ASvSvustufBF7hoTPg0m1wmYCStK3H99wXVUW3Kq',0,'yashodha.ramaradder@gmail.com',NULL,NULL),
(6,'123 Main Street','1990-01-01','lochan---','2025-04-22 15:06:00.599607','$2a$10$VAPgPPWXky9g2nQ9b7NnGOwTyWgJhyc0IalKVPtH3qeErwzKbwtl6',9876543210,'dcotor@gmail.com','AVAILABLE',NULL),
(7,'mangalore',NULL,'Swaroop acharya',NULL,'$2a$10$oCu3g/qAccLm6BT9itb/kuEqA2TxMNKNF/tX7/9Ac10lrRni6VYzK',0,'swaroop','AVAILABLE','EMP1'),
(8,NULL,NULL,NULL,NULL,'$2a$10$lrLCAnth5oWsw/u5wh4LEuGWdJ1Dd6pGkjgoUv.KvC6e5/3tWsKWO',0,'sudeep',NULL,NULL),
(9,'Bangalore','2002-04-20','Dr. Shiva','2025-05-30 12:52:06.805784','$2a$10$3ep63ICB/1lFXEr4WaSOQuCzsmsa7HTAVMweWDt0XSSUTRHYKxazG',1234567890,'shiva@email.com','AVAILABLE',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-06-02 10:36:46
