CREATE TABLE Club (
    clubname VARCHAR(255) PRIMARY KEY,
    type ENUM('Dance', 'Technical', 'Sports', 'Music', 'Others') DEFAULT NULL,
    facultyid  VARCHAR(4),
    headSRN VARCHAR(13) NOT NULL
);

CREATE TABLE Member (
    SRN VARCHAR(13) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sem INT,
    dept VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phoneno VARCHAR(15),
    gender ENUM('Male', 'Female')
);

CREATE TABLE ClubMember (
    id INT AUTO_INCREMENT PRIMARY KEY,
    SRN VARCHAR(13),
    clubname VARCHAR(255)
);

CREATE TABLE Event (
    clubname VARCHAR(255),
    eventname VARCHAR(255) PRIMARY KEY,
    description TEXT,
    loc VARCHAR(255),
    type VARCHAR(255),
    timestamp TIMESTAMP,
    budget DECIMAL(10, 2),
    registrationlink VARCHAR(255),
    banner BLOB
);

CREATE TABLE Volunteer (
    volunteerid INT AUTO_INCREMENT PRIMARY KEY,
    SRN VARCHAR(13),
    eventname VARCHAR(255)
);

CREATE TABLE Domain (
    domainid INT AUTO_INCREMENT PRIMARY KEY ,
    domainname VARCHAR(255)
);

CREATE TABLE ClubDomain (
    id INT AUTO_INCREMENT PRIMARY KEY,
    clubname VARCHAR(255),
    SRN VARCHAR(13),
    domainid INT
);

CREATE TABLE Faculty (
    facultyid VARCHAR(4) PRIMARY KEY,
    facultyname VARCHAR(255)  NOT NULL
);



ALTER TABLE Club
ADD FOREIGN KEY (facultyid) REFERENCES Faculty(facultyid) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Club
ADD FOREIGN KEY (headSRN) REFERENCES Member(SRN) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Event
ADD FOREIGN KEY (clubname) REFERENCES Club(clubname) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE ClubMember
ADD FOREIGN KEY (SRN) REFERENCES Member(SRN) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE ClubMember
ADD FOREIGN KEY (clubname) REFERENCES Club(clubname) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Volunteer
ADD FOREIGN KEY (SRN) REFERENCES Member(SRN) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Volunteer
ADD FOREIGN KEY (eventname) REFERENCES Event(eventname) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE ClubDomain
ADD FOREIGN KEY (clubname) REFERENCES Club(clubname) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE ClubDomain
ADD FOREIGN KEY (domainid) REFERENCES Domain(domainid) ON DELETE CASCADE ON UPDATE CASCADE;

--FUNCTION
DELIMITER //

CREATE FUNCTION getTotalBudgetForClub(clubName VARCHAR(255))
RETURNS DECIMAL(10,2)
BEGIN
  DECLARE totalBudget DECIMAL(10,2);

  SELECT SUM(budget) INTO totalBudget
  FROM event
  WHERE clubname = clubName;

  -- If the sum is NULL, return 0
  IF totalBudget IS NULL THEN
    SET totalBudget = 0;
  END IF;

  RETURN totalBudget;
END //

DELIMITER ;

--PROCEDURE
DELIMITER //
CREATE PROCEDURE changeSem()
BEGIN
  UPDATE member SET sem = sem + 1;
END //
DELIMITER ;
DELIMITER //
 
--TRIGGER
CREATE TRIGGER after_delete_event
AFTER DELETE ON event
FOR EACH ROW
BEGIN
  DELETE FROM volunteer
  WHERE eventname = OLD.eventname;
END;

//

DELIMITER ;

