-- Create Club Table
CREATE TABLE Club (
    clubid INT PRIMARY KEY,
    clubname VARCHAR(255) NOT NULL,
    type ENUM('cultural', 'technical'),
    facultyid INT NOT NULL,
    headid VARCHAR(13) NOT NULL
);

-- Create Domain Table
CREATE TABLE Domain (
    domainid INT PRIMARY KEY,
    clubid INT,
    domainheadid VARCHAR(20),
    domainname VARCHAR(255) 
);

-- Create Member Table
CREATE TABLE Member (
    SRN VARCHAR(13) PRIMARY KEY,
    fname VARCHAR(255) NOT NULL,
    mname VARCHAR(255),
    lname VARCHAR(255),
    sem INT,
    dept VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(15) NOT NULL,
    phoneno VARCHAR(15),
    clubid INT,
    domainid INT,
    gender ENUM('Male', 'Female')
);

-- Create Faculty Table
CREATE TABLE Faculty (
    facultyid INT PRIMARY KEY,
    facultyname VARCHAR(255)  NOT NULL,
    clubid INT
);

-- Create Event Table
CREATE TABLE Event (
    eventid INT PRIMARY KEY,
    clubid INT,
    eventname VARCHAR(255)  NOT NULL,
    date DATE  NOT NULL,
    description TEXT  NOT NULL,
    loc VARCHAR(255)  NOT NULL,
    type VARCHAR(255)  NOT NULL,
    timestamp TIMESTAMP  NOT NULL,
    budget DECIMAL(10, 2),
    registrationlink VARCHAR(255),
    banner LONGBLOB  NOT NULL
);

-- Create Volunteer Table
CREATE TABLE Volunteer (
    eventid INT,
    memberid VARCHAR(13),
    PRIMARY KEY (eventid, memberid)
);

-- Create Budget Table
CREATE TABLE Budget (
    budgetid INT PRIMARY KEY,
    eventid INT,
    given DECIMAL(10, 2),
    used DECIMAL(10, 2),
    earned DECIMAL(10, 2)
);

-- Create Participant Table
CREATE TABLE Participant (
    SRN VARCHAR(20),
    eventid INT,
    PRIMARY KEY (SRN, eventid)
);

-- Create ClubAward Table
CREATE TABLE ClubAward (
    clubid INT,
    award VARCHAR(255),
    description TEXT,
    date DATE,
    PRIMARY KEY (clubid, award)
);

-- Create Pictures Table
CREATE TABLE Pictures (
    eventid INT PRIMARY KEY,
    picture LONGBLOB
);


-- Club Table
ALTER TABLE Club
ADD CONSTRAINT fk_club_faculty
FOREIGN KEY (facultyid) REFERENCES Faculty(facultyid),
ADD CONSTRAINT fk_club_head
FOREIGN KEY (headid) REFERENCES Member(SRN);

-- Domain Table
ALTER TABLE Domain
ADD CONSTRAINT fk_domain_club
FOREIGN KEY (clubid) REFERENCES Club(clubid);

-- Member Table
ALTER TABLE Member
ADD CONSTRAINT fk_member_club
FOREIGN KEY (clubid) REFERENCES Club(clubid),
ADD CONSTRAINT fk_member_domain
FOREIGN KEY (domainid) REFERENCES Domain(domainid);

-- Faculty Table
ALTER TABLE Faculty
ADD CONSTRAINT fk_faculty_club
FOREIGN KEY (clubid) REFERENCES Club(clubid);

-- Event Table
ALTER TABLE Event
ADD CONSTRAINT fk_event_club
FOREIGN KEY (clubid) REFERENCES Club(clubid);

-- Volunteer Table
ALTER TABLE Volunteer
ADD CONSTRAINT fk_volunteer_event
FOREIGN KEY (eventid) REFERENCES Event(eventid),
ADD CONSTRAINT fk_volunteer_member
FOREIGN KEY (memberid) REFERENCES Member(SRN);

-- Budget Table
ALTER TABLE Budget
ADD CONSTRAINT fk_budget_event
FOREIGN KEY (eventid) REFERENCES Event(eventid);

-- Participant Table
ALTER TABLE Participant
ADD CONSTRAINT fk_participant_event
FOREIGN KEY (eventid) REFERENCES Event(eventid),
ADD CONSTRAINT fk_participant_member
FOREIGN KEY (SRN) REFERENCES Member(SRN);

-- ClubAward Table
ALTER TABLE ClubAward
ADD CONSTRAINT fk_clubaward_club
FOREIGN KEY (clubid) REFERENCES Club(clubid);

-- Pictures Table
ALTER TABLE Pictures
ADD CONSTRAINT fk_pictures_event
FOREIGN KEY (eventid) REFERENCES Event(eventid);
