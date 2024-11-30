CREATE DATABASE progress_Tracker_DB;
USE progress_Tracker_DB;

CREATE TABLE user (
    id int AUTO_INCREMENT PRIMARY KEY, 
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    address varchar(255),
    email varchar(255),
    password CHAR(64) NOT NULL,
    isAdmin BOOLEAN NOT NULL DEFAULT FALSE, 
    profie_picture BLOB
);

ALTER TABLE user
ADD created TIMESTAMP NOT NULL DEFAULT NOW();

INSERT INTO user(firstName,lastName, address, email, password)
VALUES 
("Bikash","Neupane","Sydney, NSW","thisisbikkash@gmail.com","12345"),
("Jon","Doe","Melbourne, VIC","jondoe@gmail.com","11111");