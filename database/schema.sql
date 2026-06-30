-- Career Bridge Database Schema
-- Version 1.0

CREATE DATABASE IF NOT EXISTS career_bridge;
USE career_bridge;

-- Users Table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstName VARCHAR(100) NOT NULL,
  surname VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  age INT,
  currentGrade VARCHAR(50),
  province VARCHAR(100),
  careerInterests TEXT,
  profileCompleted BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_createdAt (createdAt)
);

-- Careers Table
CREATE TABLE careers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  requiredQualifications TEXT,
  universities TEXT,
  tvetAlternatives TEXT,
  skillsRequired TEXT,
  salaryMin DECIMAL(10, 2),
  salaryMax DECIMAL(10, 2),
  demandLevel ENUM('Low', 'Medium', 'High', 'Very High') DEFAULT 'Medium',
  careerGrowth ENUM('Poor', 'Fair', 'Good', 'Excellent') DEFAULT 'Good',
  industry VARCHAR(100),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_name (name),
  INDEX idx_demandLevel (demandLevel)
);

-- Career Assessments Table
CREATE TABLE careerAssessments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  subjects JSON,
  subjectMarks JSON,
  apsScore INT,
  interests TEXT,
  skills TEXT,
  workEnvironment VARCHAR(255),
  recommendedCareers JSON,
  completedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id),
  INDEX idx_userId (userId)
);

-- Study Plans Table
CREATE TABLE studyPlans (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  careerGoal VARCHAR(255),
  subjects TEXT,
  currentMarks JSON,
  availableHours INT,
  weeklyPlan JSON,
  progressTracking JSON,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id),
  INDEX idx_userId (userId)
);

-- Bursaries Table
CREATE TABLE bursaries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  provider VARCHAR(255),
  fieldOfStudy VARCHAR(255),
  gradeAverage DECIMAL(5, 2),
  fundingType ENUM('Full', 'Partial') DEFAULT 'Full',
  province VARCHAR(100),
  closingDate DATE,
  description TEXT,
  link VARCHAR(500),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_closingDate (closingDate),
  INDEX idx_province (province)
);

-- Saved Bursaries Table
CREATE TABLE savedBursaries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  bursaryId INT NOT NULL,
  savedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (bursaryId) REFERENCES bursaries(id),
  UNIQUE KEY unique_user_bursary (userId, bursaryId)
);

-- Internships Table
CREATE TABLE internships (
  id INT PRIMARY KEY AUTO_INCREMENT,
  company VARCHAR(255) NOT NULL,
  position VARCHAR(255),
  industry VARCHAR(100),
  location VARCHAR(255),
  province VARCHAR(100),
  duration VARCHAR(50),
  stipend DECIMAL(10, 2),
  description TEXT,
  qualifications TEXT,
  closingDate DATE,
  link VARCHAR(500),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_closingDate (closingDate),
  INDEX idx_province (province)
);

-- Saved Internships Table
CREATE TABLE savedInternships (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  internshipId INT NOT NULL,
  savedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (internshipId) REFERENCES internships(id),
  UNIQUE KEY unique_user_internship (userId, internshipId)
);

-- Applications Table
CREATE TABLE applications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  institution VARCHAR(255),
  course VARCHAR(255),
  status ENUM('Draft', 'In Progress', 'Submitted', 'Accepted', 'Rejected') DEFAULT 'Draft',
  applicationDeadline DATE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id),
  INDEX idx_userId (userId),
  INDEX idx_status (status)
);

-- Documents Table
CREATE TABLE documents (
  id INT PRIMARY KEY AUTO_INCREMENT,
  applicationId INT NOT NULL,
  documentType VARCHAR(255),
  uploadStatus ENUM('Required', 'Uploaded', 'Verified') DEFAULT 'Required',
  filePath VARCHAR(500),
  uploadedAt TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (applicationId) REFERENCES applications(id),
  INDEX idx_applicationId (applicationId)
);

-- Eligibility Check Table
CREATE TABLE eligibilityChecks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  applicationId INT NOT NULL,
  courseRequirements JSON,
  studentResults JSON,
  eligible BOOLEAN,
  checkedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (applicationId) REFERENCES applications(id)
);

-- Generated Emails Table
CREATE TABLE generatedEmails (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  company VARCHAR(255),
  position VARCHAR(255),
  emailContent TEXT,
  generatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id),
  INDEX idx_userId (userId)
);

-- Application Checklists Table
CREATE TABLE applicationChecklists (
  id INT PRIMARY KEY AUTO_INCREMENT,
  applicationId INT NOT NULL,
  checklist JSON,
  completionPercentage INT DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (applicationId) REFERENCES applications(id)
);

-- Salary Data Table
CREATE TABLE salaryData (
  id INT PRIMARY KEY AUTO_INCREMENT,
  careerName VARCHAR(255),
  averageSalary DECIMAL(10, 2),
  entryLevelSalary DECIMAL(10, 2),
  seniorLevelSalary DECIMAL(10, 2),
  province VARCHAR(100),
  year INT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_careerName (careerName),
  INDEX idx_province (province)
);

-- Create sample indexes for common queries
CREATE INDEX idx_user_dashboard ON applications(userId, status);
CREATE INDEX idx_career_explorer ON careers(industry, demandLevel);
CREATE INDEX idx_bursary_search ON bursaries(fieldOfStudy, province, closingDate);
CREATE INDEX idx_internship_search ON internships(industry, province, closingDate);
