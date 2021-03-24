emr_group_c for db name
emr_dev @ dev123
emr_site @ site123

CREATE USER 'emr_site'@'localhost' IDENTIFIED WITH mysql_native_password 'site123';

DATABASE emr_group_c

USE emr_group_c

CREATE TABLE test (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), detail VARCHAR(255));


INSERT INTO test (name, detail) VALUES 
("Bob", "This is the first entry"),
("Marla", "This is another entry"),
("Sam", "These names were taken from cat cafe"),
("Cheeto", "chip"),
("Toby", "Siamese Male");