-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 20, 2018 at 11:27 AM
-- Server version: 5.7.19
-- PHP Version: 7.0.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_kareer`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_acadinfo`
--

DROP TABLE IF EXISTS `tbl_acadinfo`;
CREATE TABLE IF NOT EXISTS `tbl_acadinfo` (
  `id` varchar(60) NOT NULL,
  `applicant_id` varchar(60) DEFAULT NULL,
  `level` varchar(500) DEFAULT NULL,
  `schoolattended` varchar(500) DEFAULT NULL,
  `degree` varchar(500) DEFAULT NULL COMMENT 'BASIC EDUCATION/DEGREE/COURSE',
  `periodofattendance` varchar(50) DEFAULT NULL,
  `highestlevel` varchar(500) DEFAULT NULL COMMENT 'HIGHEST LEVEL/UNITS EARNED',
  `yeargraduated` varchar(4) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_acadinfo`
--

INSERT INTO `tbl_acadinfo` (`id`, `applicant_id`, `level`, `schoolattended`, `degree`, `periodofattendance`, `highestlevel`, `yeargraduated`, `date`) VALUES
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '1574bddb75c78a6fd2251d61e2993b5146201319', 'Elementary', 'Name of School', 'Degree', '0', 'Units', '2017', '2017-09-29 15:45:05'),
('356a192b7913b04c54574d18c28d46e6395428ab', '1574bddb75c78a6fd2251d61e2993b5146201319', 'High School', 'School', 'Course', '2017-09-03 : 2017-09-28', 'Units', '2017', '2017-09-29 15:49:38'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', '91032ad7bbcb6cf72875e8e8207dcfba80173f7c', 'College', 'PSU', 'BS Computer Science', '2013-06-06 : 2017-06-06', '300', '2017', '2017-10-24 13:12:09'),
('1b6453892473a467d07372d45eb05abc2031647a', '91032ad7bbcb6cf72875e8e8207dcfba80173f7c', 'Masteral', 'University of the Philippines', 'Computer Science', '2018-06-06 : 2019-06-06', '120', '2019', '2017-10-23 23:56:17'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'Elementary', 'Bongalon, Elementary School', 'Grade 6', '2003-06-01 : 2009-04-01', '122', '2009', '2017-11-21 00:39:07'),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'High School', 'Labrador National High School', 'Fourth Year', '2009-06-06 : 2013-06-06', '360', '2013', '2017-11-27 19:13:27'),
('fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'College', 'Pangasinan State University Lingayen Campus', 'Bachelor of Science in Computer Science', '2013-06 : 2017-06', '360', '2017', '2017-12-15 22:29:52'),
('c1dfd96eea8cc2b62785275bca38ac261256e278', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Elementary', 'Bongalon, Elementary, Pangasinan', '', '2003-06 : 2009-06', '', '2009', '2017-12-15 22:27:06'),
('902ba3cda1883801594b6e1b452790cc53948fda', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'High School', 'Labrador, National, High School', '', '2009-06 : 2013-06', '', '2013', '2017-12-15 22:28:12'),
('0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '', '', '', ' : ', '', 'ull', '2017-12-19 21:35:31');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_accountinfo`
--

DROP TABLE IF EXISTS `tbl_accountinfo`;
CREATE TABLE IF NOT EXISTS `tbl_accountinfo` (
  `id` varchar(60) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

DROP TABLE IF EXISTS `tbl_admin`;
CREATE TABLE IF NOT EXISTS `tbl_admin` (
  `id` varchar(50) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
  `fname` varchar(20) DEFAULT NULL,
  `lname` varchar(20) DEFAULT NULL,
  `image` varchar(60) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `level` varchar(1) DEFAULT NULL,
  `password` varchar(50) CHARACTER SET latin1 COLLATE latin1_general_cs DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_admin`
--

INSERT INTO `tbl_admin` (`id`, `fname`, `lname`, `image`, `username`, `level`, `password`) VALUES
('admin_id', 'Othan', 'Millet', 'admin_id-1509616097.apr', 'admin', '1', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_applicant`
--

DROP TABLE IF EXISTS `tbl_applicant`;
CREATE TABLE IF NOT EXISTS `tbl_applicant` (
  `id` varchar(50) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL,
  `auth_type` varchar(20) DEFAULT NULL COMMENT 'fb,google,organic',
  `auth_id` varchar(100) DEFAULT NULL COMMENT 'account id',
  `status` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_applicant`
--

INSERT INTO `tbl_applicant` (`id`, `description`, `email`, `password`, `auth_type`, `auth_id`, `status`) VALUES
('356a192b7913b04c54574d18c28d46e6395428ab', '', '', '$2y$11$yxgAyTSn/hMhBOmXgxq2GeOrxZCO0oxrDMddWRxdqBkJFwhpsl8Y.', 'fb-oauth', '1695213090568737', '1'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '', 'rufo.gabrillo@gmail.com', '$2y$11$sGQLIqYCebYWP6QGl6kedOxsaWzWLPfWRpkjBXELkblxNLQ2kUWF2', '', '', '1'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', '', 'rufo.gabrillo@rnrdigitalconsultancy.com', '$2y$11$kIZiLyveWEzHeAtfss5UUeSrE2I1lUs8iR/TZIL3m69dNQFHa/hQ.', 'google-auth', '118066499412256745838', '1');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_application`
--

DROP TABLE IF EXISTS `tbl_application`;
CREATE TABLE IF NOT EXISTS `tbl_application` (
  `id` varchar(50) NOT NULL,
  `vacancy_id` varchar(50) DEFAULT NULL,
  `applicant_id` varchar(1000) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL,
  `status` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_bookmark`
--

DROP TABLE IF EXISTS `tbl_bookmark`;
CREATE TABLE IF NOT EXISTS `tbl_bookmark` (
  `id` varchar(60) NOT NULL,
  `vacancy_id` varchar(60) DEFAULT NULL,
  `applicant_id` varchar(60) DEFAULT NULL,
  `date` varchar(60) DEFAULT NULL,
  `status` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_bookmark`
--

INSERT INTO `tbl_bookmark` (`id`, `vacancy_id`, `applicant_id`, `date`, `status`) VALUES
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '1574bddb75c78a6fd2251d61e2993b5146201319', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2017-09-28 18:33:11', '1'),
('356a192b7913b04c54574d18c28d46e6395428ab', '0716d9708d321ffb6a00818614779e779925365c', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2017-09-28 18:36:28', '1'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', '0716d9708d321ffb6a00818614779e779925365c', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2017-09-28 18:43:12', '1'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', '91032ad7bbcb6cf72875e8e8207dcfba80173f7c', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2017-09-28 18:43:20', '1'),
('1b6453892473a467d07372d45eb05abc2031647a', '9e6a55b6b4563e652a23be9d623ca5055c356940', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2017-09-28 18:43:35', '1'),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', '91032ad7bbcb6cf72875e8e8207dcfba80173f7c', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '2017-09-28 20:26:51', '1'),
('c1dfd96eea8cc2b62785275bca38ac261256e278', '91032ad7bbcb6cf72875e8e8207dcfba80173f7c', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '2017-09-28 20:26:53', '1'),
('902ba3cda1883801594b6e1b452790cc53948fda', '1574bddb75c78a6fd2251d61e2993b5146201319', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '2017-09-28 20:26:55', '1'),
('fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '0716d9708d321ffb6a00818614779e779925365c', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '2017-09-28 20:26:58', '1'),
('0ade7c2cf97f75d009975f4d720d1fa6c19f4897', '0716d9708d321ffb6a00818614779e779925365c', 'b1d5781111d84f7b3fe45a0852e59758cd7a87e5', '2017-09-28 20:31:42', '1'),
('b1d5781111d84f7b3fe45a0852e59758cd7a87e5', '9e6a55b6b4563e652a23be9d623ca5055c356940', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2017-09-28 21:48:59', '1'),
('17ba0791499db908433b80f37c5fbc89b870084b', '4d134bc072212ace2df385dae143139da74ec0ef', '0716d9708d321ffb6a00818614779e779925365c', '2017-09-29 14:57:47', '1'),
('7b52009b64fd0a2a49e6d8a939753077792b0554', '91032ad7bbcb6cf72875e8e8207dcfba80173f7c', '7b52009b64fd0a2a49e6d8a939753077792b0554', '2017-09-29 15:41:03', '1'),
('bd307a3ec329e10a2cff8fb87480823da114f8f4', '4d134bc072212ace2df385dae143139da74ec0ef', '7b52009b64fd0a2a49e6d8a939753077792b0554', '2017-09-29 15:41:08', '1'),
('1574bddb75c78a6fd2251d61e2993b5146201319', '17ba0791499db908433b80f37c5fbc89b870084b', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', '2017-10-23 21:00:03', '1'),
('f1abd670358e036c31296e66b3b66c382ac00812', '472b07b9fcf2c2451e8781e944bf5f77cd8457c8', '91032ad7bbcb6cf72875e8e8207dcfba80173f7c', '2017-10-17 02:48:41', '1'),
('fa35e192121eabf3dabf9f5ea6abdbcbc107ac3b', '17ba0791499db908433b80f37c5fbc89b870084b', '91032ad7bbcb6cf72875e8e8207dcfba80173f7c', '2017-10-17 02:48:19', '1'),
('0716d9708d321ffb6a00818614779e779925365c', '356a192b7913b04c54574d18c28d46e6395428ab', '0716d9708d321ffb6a00818614779e779925365c', '2017-10-16 15:18:22', '1'),
('9e6a55b6b4563e652a23be9d623ca5055c356940', '356a192b7913b04c54574d18c28d46e6395428ab', '0716d9708d321ffb6a00818614779e779925365c', '2017-10-16 15:18:47', '1'),
('b3f0c7f6bb763af1be91d9e74eabfeb199dc1f1f', '356a192b7913b04c54574d18c28d46e6395428ab', '0716d9708d321ffb6a00818614779e779925365c', '2017-10-16 15:20:18', '1'),
('91032ad7bbcb6cf72875e8e8207dcfba80173f7c', '356a192b7913b04c54574d18c28d46e6395428ab', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2017-12-11 15:11:23', '1'),
('472b07b9fcf2c2451e8781e944bf5f77cd8457c8', '472b07b9fcf2c2451e8781e944bf5f77cd8457c8', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2017-12-11 15:11:35', '1'),
('12c6fc06c99a462375eeb3f43dfd832b08ca9e17', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2017-12-12 01:57:39', '1'),
('d435a6cdd786300dff204ee7c2ef942d3e9034e2', '17ba0791499db908433b80f37c5fbc89b870084b', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2017-12-12 01:58:05', '1'),
('4d134bc072212ace2df385dae143139da74ec0ef', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2017-12-12 01:58:22', '1'),
('f6e1126cedebf23e1463aee73f9df08783640400', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2017-12-12 01:58:28', '1'),
('887309d048beef83ad3eabf2a79a64a389ab1c9f', 'f6e1126cedebf23e1463aee73f9df08783640400', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2017-12-13 13:38:36', '1'),
('bc33ea4e26e5e1af1408321416956113a4658763', '356a192b7913b04c54574d18c28d46e6395428ab', '356a192b7913b04c54574d18c28d46e6395428ab', '2017-12-13 22:25:32', '1'),
('0a57cb53ba59c46fc4b692527a38a87c78d84028', '7b52009b64fd0a2a49e6d8a939753077792b0554', '356a192b7913b04c54574d18c28d46e6395428ab', '2017-12-13 22:25:38', '1'),
('7719a1c782a1ba91c031a682a0a2f8658209adbf', '887309d048beef83ad3eabf2a79a64a389ab1c9f', '356a192b7913b04c54574d18c28d46e6395428ab', '2017-12-13 22:25:41', '1'),
('22d200f8670dbdb3e253a90eee5098477c95c23d', '887309d048beef83ad3eabf2a79a64a389ab1c9f', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2017-12-19 10:29:58', '1'),
('632667547e7cd3e0466547863e1207a8c0c0c549', '7b52009b64fd0a2a49e6d8a939753077792b0554', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2017-12-19 21:31:35', '1');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_career`
--

DROP TABLE IF EXISTS `tbl_career`;
CREATE TABLE IF NOT EXISTS `tbl_career` (
  `id` varchar(60) NOT NULL,
  `applicant_id` varchar(60) DEFAULT NULL,
  `inclusive_fromdate` varchar(20) DEFAULT NULL,
  `inclusive_todate` varchar(20) DEFAULT NULL,
  `position_title` varchar(300) DEFAULT NULL,
  `agency` varchar(300) DEFAULT NULL,
  `monthly_salary` varchar(6) DEFAULT NULL,
  `appointment_status` varchar(300) DEFAULT NULL,
  `govt_service` varchar(50) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_career`
--

INSERT INTO `tbl_career` (`id`, `applicant_id`, `inclusive_fromdate`, `inclusive_todate`, `position_title`, `agency`, `monthly_salary`, `appointment_status`, `govt_service`, `date`) VALUES
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '1574bddb75c78a6fd2251d61e2993b5146201319', '2017-09-19', '2017-09-22', 'Position', 'Agency', '12000', 'Appointment', '', '2017-09-29'),
('356a192b7913b04c54574d18c28d46e6395428ab', '91032ad7bbcb6cf72875e8e8207dcfba80173f7c', '2014-06-06', '2015-06-06', 'Graphic Artist', 'Pixar', '15,000', 'Interview', '', '2017-10-24 13:47:55'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', '91032ad7bbcb6cf72875e8e8207dcfba80173f7c', '2003-06-06', '2016-06-06', 'Graphic Designer', 'Dreamworks', '20,000', 'Initial Interview', '', '2017-10-24 13:32:38'),
('902ba3cda1883801594b6e1b452790cc53948fda', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', '2016-02-02', '2017-11-01', 'Graphic Designer', 'Dreamworks', '12000', 'Resigned', '', '2017-11-23 15:01:17'),
('fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', '2012-02-22', '2014-02-22', 'Janitor', 'PSU', '1200', 'Resigned', '', '2017-11-27 11:48:31'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2014-06', '2015-06', 'Cook', 'Mc Donalds', '12000', 'Resigned', 'No', '2017-12-19 14:18:37'),
('c1dfd96eea8cc2b62785275bca38ac261256e278', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2017-08', '2015-05', 'Car wash boy', 'Car Wash', '3000', 'Resigned', 'No', '2017-12-14 17:15:59'),
('0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2015-01', '2016-01', 'Security Guard', '7Eleven', '5000', 'Resigned', 'No', '2017-12-15 04:06:40');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_employer`
--

DROP TABLE IF EXISTS `tbl_employer`;
CREATE TABLE IF NOT EXISTS `tbl_employer` (
  `id` varchar(50) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
  `lname` varchar(20) DEFAULT NULL,
  `fname` varchar(20) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `contactno` varchar(20) DEFAULT NULL,
  `company_name` varchar(50) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `dti` varchar(50) DEFAULT NULL,
  `bir` varchar(50) DEFAULT NULL,
  `image` varchar(60) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(50) CHARACTER SET latin1 COLLATE latin1_general_cs DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_employer`
--

INSERT INTO `tbl_employer` (`id`, `lname`, `fname`, `address`, `contactno`, `company_name`, `description`, `dti`, `bir`, `image`, `email`, `password`, `status`) VALUES
('1', 'Junior', 'Rufo', 'Las Vegas Street Lingayen', '090101010101', 'Rufo Coco', 'Description', '0111-1100-01101-11010', '1100-01010-1110-0001', '1-1506744785.apr', 'emp', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', '1'),
('1b6453892473a467d07372d45eb05abc2031647a', 'Boy', 'Water', 'Lingayen', '099999999', 'Gabrillo Enterprise 2', 'Tubig kayo dyan', '122112', '211221', '1b6453892473a467d07372d45eb05abc2031647a-1506745483.apr', 'rufo.gabrillo@gmail.com', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', '1'),
('356a192b7913b04c54574d18c28d46e6395428ab', 'Tubig', 'Ice', '', '', 'Gabrillo Enterprisess', '', '', '', '356a192b7913b04c54574d18c28d46e6395428ab-1506745571.apr', 'rufogabrillo@gmail.com', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', '1'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', '', '', '', '', 'Gabrillo Enterprises', '', '', '', '77de68daecd823babbb58edb1c8e14d7106e83bb-1507300053.apr', 'rufo.gabrillo2@gmail.com', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', '1'),
('902ba3cda1883801594b6e1b452790cc53948fda', NULL, NULL, NULL, NULL, 'Great Company', NULL, NULL, NULL, 'profile_avatar.jpg', 'gc@gmail.com', '25c2c9afdd83b8d34234aa2881cc341c09689aaa', '0'),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'Moko', 'Kowpiko', 'Lingayen', '0999', 'Kopiko', 'Coffee', '221', '353', 'profile_avatar.jpg', 'kopiko@gmail.com', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', '0'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'asdsd', 'Rufo', 'Poblacion East, Calasiao Pangasinan', '09484993958', 'asdsdsds', 'This is Description', '00-10010-10010', '101110-001-01110', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c-1507518045.apr', 'emp123', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', '1'),
('c1dfd96eea8cc2b62785275bca38ac261256e278', 'Tom', 'Boy', NULL, NULL, 'e-Machines', NULL, NULL, NULL, 'profile_avatar.jpg', 'emach@gmail.com', '25c2c9afdd83b8d34234aa2881cc341c09689aaa', '1'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Fishy', 'Fish', 'Dagupan', '09', 'Boneless Bangus', 'Walang tinik', '345657890-', '09876543', 'da4b9237bacccdf19c0760cab7aec4a8359010b0-1507913543.apr', 'bone@gmail.com', '25c2c9afdd83b8d34234aa2881cc341c09689aaa', '1'),
('pHilMont123', 'Wilson', 'Andy', 'Manaoag', '09481234567', 'PhilMont', 'beauty products', '097645', '456678', 'pHilMont123-1458551347.apr', 'donaldduck@gmail.com', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', '1'),
('ToyotaCars', 'De Vera', 'Richard', 'Calasiao, Pangasinan', '09129837641', 'Toyota ', 'Cars and Vehicle for you and Me. Forever.', '09876543', '23456', 'toyota.jpg', 'richardMercy@gmail.com', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', '1');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_personalinfo`
--

DROP TABLE IF EXISTS `tbl_personalinfo`;
CREATE TABLE IF NOT EXISTS `tbl_personalinfo` (
  `id` varchar(50) NOT NULL,
  `given_name` varchar(50) DEFAULT NULL,
  `family_name` varchar(50) DEFAULT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `age` varchar(2) DEFAULT NULL,
  `date_of_birth` varchar(10) DEFAULT NULL,
  `permanent_address` varchar(100) DEFAULT NULL,
  `citizenship` varchar(20) DEFAULT NULL,
  `height` varchar(10) DEFAULT NULL,
  `weight` varchar(10) DEFAULT NULL,
  `religion` varchar(20) DEFAULT NULL,
  `picture` varchar(100) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_personalinfo`
--

INSERT INTO `tbl_personalinfo` (`id`, `given_name`, `family_name`, `middle_name`, `gender`, `age`, `date_of_birth`, `permanent_address`, `citizenship`, `height`, `weight`, `religion`, `picture`, `date`) VALUES
('356a192b7913b04c54574d18c28d46e6395428ab', 'Rufo', 'Gabrillo Jr.', NULL, '', NULL, '', '', '', '', '', '', 'http://graph.facebook.com/1695213090568737/picture?type=large', '2018-02-20 14:33:57'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Rufo', 'Gabrillo', NULL, '', NULL, '', '', '', '', '', '', '', '2018-02-20 10:05:48'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Rufo', 'Gabrillo Jr', NULL, '', NULL, '', '', '', '', '', '', 'https://lh5.googleusercontent.com/-h-QNWKxPuNw/AAAAAAAAAAI/AAAAAAAAAAs/UEzHjTUm8Oo/s96-c/photo.jpg', '2018-02-20 15:00:59');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_skills`
--

DROP TABLE IF EXISTS `tbl_skills`;
CREATE TABLE IF NOT EXISTS `tbl_skills` (
  `id` varchar(60) NOT NULL,
  `applicant_id` varchar(60) DEFAULT NULL,
  `skill` varchar(60) DEFAULT NULL,
  `level` varchar(20) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_vacancies`
--

DROP TABLE IF EXISTS `tbl_vacancies`;
CREATE TABLE IF NOT EXISTS `tbl_vacancies` (
  `id` varchar(50) NOT NULL,
  `employer_id` varchar(50) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `vacancy_date` varchar(50) DEFAULT NULL,
  `job_title` varchar(100) DEFAULT NULL,
  `skills` varchar(1000) DEFAULT NULL,
  `salary_range` varchar(10) DEFAULT NULL,
  `contract` varchar(20) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL,
  `status` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
