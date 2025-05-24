CREATE TABLE `billing_records` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `patient_name` VARCHAR(255) NOT NULL,
    `date` DATE NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `payment_status` VARCHAR(20) NOT NULL,  -- Adjusted length
    `payment_method` VARCHAR(30) NOT NULL,  -- Adjusted length
    `description` VARCHAR(255) NOT NULL,
    `doctor` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);
