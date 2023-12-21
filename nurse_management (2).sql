-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 21, 2023 at 02:31 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nurse_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `nurseinfo`
--

CREATE TABLE `nurseinfo` (
  `NurseID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `LicenseNumber` varchar(50) NOT NULL,
  `DOB` timestamp NULL DEFAULT current_timestamp(),
  `Age` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nurseinfo`
--

INSERT INTO `nurseinfo` (`NurseID`, `Name`, `LicenseNumber`, `DOB`, `Age`) VALUES
(1, 'jeni', 'Nurse123', '0000-00-00 00:00:00', 25),
(2, 'Kavya', 'Nurse002', '2023-12-08 18:30:00', 25);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `nurseinfo`
--
ALTER TABLE `nurseinfo`
  ADD PRIMARY KEY (`NurseID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `nurseinfo`
--
ALTER TABLE `nurseinfo`
  MODIFY `NurseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
