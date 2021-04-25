USE emr_group_c;

INSERT INTO `emr_group_c`.`patient`
(`HealthCardNumberID`,
`firstName`,
`lastName`,
`Phone`,
`Phone2`,
`Email`,
`Language`,
`BirthDate`,
`Gender`,
`EthnicBackground`,
`InsuranceProvider`,
`Smoker`,
`ActiveFlag`)
VALUES
(123456789,
'Jane',
'Doe',
3065505500,
NULL,
'jane@doe.com',
'EN',
'1968-12-10',
'F',
'Caucasian',
'Group Medical Services',
0,
1);

INSERT INTO `emr_group_c`.`patient`
(`HealthCardNumberID`,
`firstName`,
`lastName`,
`Phone`,
`Phone2`,
`Email`,
`Language`,
`BirthDate`,
`Gender`,
`EthnicBackground`,
`InsuranceProvider`,
`Smoker`,
`ActiveFlag`)
VALUES
(999999999,
'Bill',
'Doe',
6045555500,
NULL,
'bill@doe.com',
'EN',
'1979-10-01',
'M',
'Caucasian',
'Group Medical Services',
1,
1);

INSERT INTO `emr_group_c`.`patient`
(`HealthCardNumberID`,
`firstName`,
`lastName`,
`Phone`,
`Phone2`,
`Email`,
`Language`,
`BirthDate`,
`Gender`,
`EthnicBackground`,
`InsuranceProvider`,
`Smoker`,
`ActiveFlag`)
VALUES
(456789123,
'Henry',
'Billman',
7905565500,
6405551945,
'henrybillman@gmail.com',
'CF',
'1945-02-01',
'M',
'Irish',
'Manulife Financial',
1,
1);

INSERT INTO `emr_group_c`.`careprovider`
(`MedicalLicenseID`,
`firstName`,
`lastName`,
`Email`,
`AreaofPractice`,
`Phone`,
`ActiveFlag`)
VALUES
(999,
'Wanda',
'Doctor',
'wdctry@health.com',
'General Practice',
3065551949,
1);

INSERT INTO `emr_group_c`.`careprovider`
(`MedicalLicenseID`,
`firstName`,
`lastName`,
`Email`,
`AreaofPractice`,
`Phone`,
`ActiveFlag`)
VALUES
(9468,
'Stephen',
'Strange',
'otherplace@hell.com',
'Surgeon',
6066661949,
1);

INSERT INTO `emr_group_c`.`patienttocareprovider`
(`PatientID`,
`CareProviderID`,
`ActiveFlag`)
VALUES
(123456789,
9468,
1);

INSERT INTO `emr_group_c`.`patienttocareprovider`
(`PatientID`,
`CareProviderID`,
`ActiveFlag`)
VALUES
(999999999,
9468,
1);

INSERT INTO `emr_group_c`.`patienttocareprovider`
(`PatientID`,
`CareProviderID`,
`ActiveFlag`)
VALUES
(456789123,
9468,
1);

INSERT INTO `emr_group_c`.`patienttocareprovider`
(`PatientID`,
`CareProviderID`,
`ActiveFlag`)
VALUES
(456789123,
999,
1);

INSERT INTO `emr_group_c`.`address`
(`PatientID`,
`CareProviderID`,
`AddressLine1`,
`AddressLine2`,
`AddressLine3`,
`City`,
`Province`,
`PostalCode`,
`Category`,
`ActiveFlag`)
VALUES
(123456789,
NULL,
'123 Fake Street',
NULL,
NULL,
'Faketown',
'SK',
'S6H1Z7',
'Home',
1);

INSERT INTO `emr_group_c`.`address`
(`PatientID`,
`CareProviderID`,
`AddressLine1`,
`AddressLine2`,
`AddressLine3`,
`City`,
`Province`,
`PostalCode`,
`Category`,
`ActiveFlag`)
VALUES
(123456789,
NULL,
'999 Faker Ave',
NULL,
NULL,
'Faketown',
'SK',
'S6H1Z7',
'Work',
1);

INSERT INTO `emr_group_c`.`address`
(`PatientID`,
`CareProviderID`,
`AddressLine1`,
`AddressLine2`,
`AddressLine3`,
`City`,
`Province`,
`PostalCode`,
`Category`,
`ActiveFlag`)
VALUES
(999999999,
NULL,
'123 Fake Street',
NULL,
NULL,
'Faketown',
'SK',
'S6H1Z7',
'Home',
1);

INSERT INTO `emr_group_c`.`address`
(`PatientID`,
`CareProviderID`,
`AddressLine1`,
`AddressLine2`,
`AddressLine3`,
`City`,
`Province`,
`PostalCode`,
`Category`,
`ActiveFlag`)
VALUES
(456789123,
NULL,
'9849 Real Street',
'PO Box 12',
'RR 2',
'Realtown',
'PE',
'C2H1Z7',
'Home',
1);

INSERT INTO `emr_group_c`.`address`
(`PatientID`,
`CareProviderID`,
`AddressLine1`,
`AddressLine2`,
`AddressLine3`,
`City`,
`Province`,
`PostalCode`,
`Category`,
`ActiveFlag`)
VALUES
(NULL,
999,
'4523 Blue Ave',
'PO Box 2222',
NULL,
'Baytown',
'AB',
'T2H1Z7',
'Work',
1);

INSERT INTO `emr_group_c`.`address`
(`PatientID`,
`CareProviderID`,
`AddressLine1`,
`AddressLine2`,
`AddressLine3`,
`City`,
`Province`,
`PostalCode`,
`Category`,
`ActiveFlag`)
VALUES
(NULL,
9468,
'177 Bleeker St',
NULL,
NULL,
'New York City',
'BC',
'V2H1Z7',
'Work',
1);

INSERT INTO `emr_group_c`.`emergencycontact`
(`PatientID`,
`firstName`,
`lastName`,
`Phone`,
`Email`,
`Relationship`,
`ActiveFlag`)
VALUES
(123456789,
'Jim',
'Doe',
6095551483,
'jim@doe.com',
'Father-in-law',
1);

INSERT INTO `emr_group_c`.`emergencycontact`
(`PatientID`,
`firstName`,
`lastName`,
`Phone`,
`Email`,
`Relationship`,
`ActiveFlag`)
VALUES
(999999999,
'Jim',
'Doe',
6095551483,
'jim@doe.com',
'Father',
1);

INSERT INTO `emr_group_c`.`emergencycontact`
(`PatientID`,
`firstName`,
`lastName`,
`Phone`,
`Email`,
`Relationship`,
`ActiveFlag`)
VALUES
(456789123,
'Anna',
'Billman',
6095619483,
'anna23@bill.com',
'Mother',
1);

INSERT INTO `emr_group_c`.`superadmin`
(`Email`,
`firstName`,
`lastName`,
`Phone`,
`ActiveFlag`)
VALUES
('super@admin.com',
'Supe',
'Adder',
3061324589,
1);

INSERT INTO `emr_group_c`.`user`
(`CareProviderID`,
`SuperAdminID`,
`Username`,
`Password`,
`ActiveFlag`)
VALUES
(9468,
NULL,
'SSTRANGE',
123,
1);

INSERT INTO `emr_group_c`.`user`
(`CareProviderID`,
`SuperAdminID`,
`Username`,
`Password`,
`ActiveFlag`)
VALUES
(999,
NULL,
'WDOCTOR',
321,
1);

INSERT INTO `emr_group_c`.`user`
(`CareProviderID`,
`SuperAdminID`,
`Username`,
`Password`,
`ActiveFlag`)
VALUES
(NULL,
'super@admin.com',
'SSUPER',
333,
1);
