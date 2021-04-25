
CREATE USER 'emr_site'@'localhost' IDENTIFIED WITH mysql_native_password BY 'site123';

GRANT SELECT, INSERT, TRIGGER ON TABLE `emr_group_c`.* TO 'emr_site';

FLUSH PRIVILEGES;
