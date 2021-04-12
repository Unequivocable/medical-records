-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema emr_group_c
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema emr_group_c
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `emr_group_c` DEFAULT CHARACTER SET utf8 ;
USE `emr_group_c` ;

-- -----------------------------------------------------
-- Table `emr_group_c`.`Patient`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emr_group_c`.`Patient` (
  `HealthCardNumberID` INT NOT NULL,
  `Name` VARCHAR(255) NOT NULL,
  `Phone` VARCHAR(15) NULL,
  `Phone2` VARCHAR(15) NULL,
  `Email` VARCHAR(45) NULL,
  `Language` VARCHAR(2) NULL,
  `BirthDate` DATE NULL,
  `Gender` VARCHAR(45) NULL,
  `EthnicBackground` VARCHAR(45) NULL,
  `InsuranceProvider` VARCHAR(45) NULL,
  `Smoker` TINYINT NULL,
  `ActiveFlag` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`HealthCardNumberID`),
  UNIQUE INDEX `health number_UNIQUE` (`HealthCardNumberID` ASC) VISIBLE)
ENGINE = InnoDB
COMMENT = '	';


-- -----------------------------------------------------
-- Table `emr_group_c`.`CareProvider`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emr_group_c`.`CareProvider` (
  `MedicalLicenseID` INT NOT NULL,
  `Name` VARCHAR(255) NOT NULL,
  `Email` VARCHAR(45) NULL,
  `Area of Practice` VARCHAR(45) NULL,
  `Phone` VARCHAR(45) NULL,
  `ActiveFlag` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`MedicalLicenseID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emr_group_c`.`Notes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emr_group_c`.`Notes` (
  `PatientID` INT NOT NULL,
  `CareProviderID` INT NOT NULL,
  `Note ID` VARCHAR(45) NOT NULL,
  `Note Detail` LONGTEXT NULL,
  `Timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ActiveFlag` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`Note ID`),
  INDEX `medical license_idx` (`CareProviderID` ASC) VISIBLE,
  CONSTRAINT `PatientNoteKey`
    FOREIGN KEY (`PatientID`)
    REFERENCES `emr_group_c`.`Patient` (`HealthCardNumberID`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `CareProviderNoteKey`
    FOREIGN KEY (`CareProviderID`)
    REFERENCES `emr_group_c`.`CareProvider` (`MedicalLicenseID`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emr_group_c`.`PatientHealthSummary`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emr_group_c`.`PatientHealthSummary` (
  `PatientID` INT NOT NULL,
  `HealthSummaryID` INT NOT NULL AUTO_INCREMENT,
  `Category` VARCHAR(45) NOT NULL,
  `Detail` LONGTEXT NULL,
  `DetailDate` DATE NOT NULL,
  `ActiveFlag` TINYINT NOT NULL DEFAULT 1,
  INDEX `PatientID_idx` (`PatientID` ASC) VISIBLE,
  PRIMARY KEY (`HealthSummaryID`),
  UNIQUE INDEX `Timestamp_UNIQUE` (`HealthSummaryID` ASC) VISIBLE,
  CONSTRAINT `PatientHealthKey`
    FOREIGN KEY (`PatientID`)
    REFERENCES `emr_group_c`.`Patient` (`HealthCardNumberID`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `emr_group_c`.`Address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emr_group_c`.`Address` (
  `AddressID` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `PatientID` INT NULL,
  `CareProviderID` INT NULL,
  `AddressLine1` VARCHAR(255) NOT NULL,
  `AddressLine2` VARCHAR(255) NULL,
  `AddressLine3` VARCHAR(255) NULL,
  `City` VARCHAR(45) NULL,
  `Province` VARCHAR(2) NULL,
  `PostalCode` VARCHAR(7) NOT NULL,
  `Category` VARCHAR(45) NULL,
  `ActiveFlag` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`AddressID`),
  INDEX `PatientID_idx` (`PatientID` ASC) VISIBLE,
  INDEX `CareProviderID_idx` (`CareProviderID` ASC) VISIBLE,
  CONSTRAINT `PatientAddressKey`
    FOREIGN KEY (`PatientID`)
    REFERENCES `emr_group_c`.`Patient` (`HealthCardNumberID`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `CareProviderAddressKey`
    FOREIGN KEY (`CareProviderID`)
    REFERENCES `emr_group_c`.`CareProvider` (`MedicalLicenseID`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `emr_group_c`.`EmergencyContact`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emr_group_c`.`EmergencyContact` (
  `PatientID` INT NOT NULL,
  `Name` VARCHAR(255) NOT NULL,
  `Phone` VARCHAR(15) NULL,
  `Email` VARCHAR(45) NULL,
  `Relationship` VARCHAR(45) NOT NULL,
  `ActiveFlag` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`PatientID`),
  UNIQUE INDEX `PatientID_UNIQUE` (`PatientID` ASC) VISIBLE,
  CONSTRAINT `PatientContactKey`
    FOREIGN KEY (`PatientID`)
    REFERENCES `emr_group_c`.`Patient` (`HealthCardNumberID`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emr_group_c`.`SuperAdmin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emr_group_c`.`SuperAdmin` (
  `Email` VARCHAR(255) NOT NULL,
  `Name` VARCHAR(45) NULL,
  `Phone` VARCHAR(15) NULL,
  `ActiveFlag` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`Email`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emr_group_c`.`RevisionDetails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emr_group_c`.`RevisionDetails` (
  `RevisionID` INT NOT NULL AUTO_INCREMENT,
  `PatientID` INT NOT NULL,
  `CareProviderID` INT NULL,
  `SuperAdminID` VARCHAR(45) NULL,
  `RevisionDetails` LONGTEXT NOT NULL,
  `Timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`RevisionID`),
  INDEX `CareProviderID_idx` (`CareProviderID` ASC) VISIBLE,
  INDEX `SuperAdminID_idx` (`SuperAdminID` ASC) VISIBLE,
  CONSTRAINT `PatientRDKey`
    FOREIGN KEY (`PatientID`)
    REFERENCES `emr_group_c`.`Patient` (`HealthCardNumberID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `CareProviderRDKey`
    FOREIGN KEY (`CareProviderID`)
    REFERENCES `emr_group_c`.`CareProvider` (`MedicalLicenseID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `SuperAdminRDKey`
    FOREIGN KEY (`SuperAdminID`)
    REFERENCES `emr_group_c`.`SuperAdmin` (`Email`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emr_group_c`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emr_group_c`.`User` (
  `CareProviderID` INT NULL DEFAULT 0,
  `SuperAdminID` VARCHAR(45) NULL DEFAULT 0,
  `Username` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(255) NOT NULL,
  `ActiveFlag` TINYINT NOT NULL DEFAULT 1,
  INDEX `SuperAdminID_idx` (`SuperAdminID` ASC) VISIBLE,
  UNIQUE INDEX `Password_UNIQUE` (`Password` ASC) VISIBLE,
  PRIMARY KEY (`Username`),
  CONSTRAINT `CareProviderUserKey`
    FOREIGN KEY (`CareProviderID`)
    REFERENCES `emr_group_c`.`CareProvider` (`MedicalLicenseID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `SuperAdminUserKey`
    FOREIGN KEY (`SuperAdminID`)
    REFERENCES `emr_group_c`.`SuperAdmin` (`Email`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emr_group_c`.`PatienttoCareProvider`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emr_group_c`.`PatienttoCareProvider` (
  `PatientID` INT NOT NULL,
  `CareProviderID` INT NOT NULL,
  PRIMARY KEY (`PatientID`, `CareProviderID`),
  INDEX `CareProvidertoPatientID_idx` (`CareProviderID` ASC) VISIBLE,
  CONSTRAINT `PatienttoCareProviderID`
    FOREIGN KEY (`PatientID`)
    REFERENCES `emr_group_c`.`Patient` (`HealthCardNumberID`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `CareProvidertoPatientID`
    FOREIGN KEY (`CareProviderID`)
    REFERENCES `emr_group_c`.`CareProvider` (`MedicalLicenseID`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE USER 'emr_site'@'localhost' IDENTIFIED WITH mysql_native_password BY 'site123';

GRANT SELECT, INSERT, TRIGGER ON TABLE `emr_group_c`.* TO 'emr_site';

FLUSH PRIVILEGES;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
