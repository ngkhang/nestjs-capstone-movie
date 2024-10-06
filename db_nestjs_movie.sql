/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `cinema`;
CREATE TABLE `cinema` (
  `cinema_id` int NOT NULL AUTO_INCREMENT,
  `cineplex_id` int DEFAULT NULL,
  `name` varchar(125) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `address` text,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `map_embed` text,
  `rating` float DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cinema_id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `slug` (`slug`),
  KEY `cineplex_id` (`cineplex_id`),
  CONSTRAINT `cinema_ibfk_1` FOREIGN KEY (`cineplex_id`) REFERENCES `cineplex` (`cineplex_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `cineplex`;
CREATE TABLE `cineplex` (
  `cineplex_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `code` varchar(20) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cineplex_id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `slug` (`slug`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `genre`;
CREATE TABLE `genre` (
  `genre_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`genre_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `movie`;
CREATE TABLE `movie` (
  `movie_id` int NOT NULL AUTO_INCREMENT,
  `genre_id` int DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `description` text,
  `short_description` text,
  `duration` int DEFAULT NULL,
  `trailer` varchar(255) DEFAULT NULL,
  `opening_date` datetime DEFAULT NULL,
  `poster_url` varchar(255) DEFAULT NULL,
  `banner_url` varchar(255) DEFAULT NULL,
  `is_now_showing` tinyint(1) DEFAULT '0',
  `is_coming_soon` tinyint(1) DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `rating` float DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`movie_id`),
  UNIQUE KEY `title` (`title`),
  UNIQUE KEY `slug` (`slug`),
  KEY `genre_id` (`genre_id`),
  CONSTRAINT `movie_ibfk_1` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`genre_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `theater`;
CREATE TABLE `theater` (
  `theater_id` int NOT NULL AUTO_INCREMENT,
  `theater_type_id` int DEFAULT NULL,
  `cinema_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `height` int NOT NULL,
  `width` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`theater_id`),
  KEY `cinema_id` (`cinema_id`),
  KEY `theater_type_id` (`theater_type_id`),
  CONSTRAINT `theater_ibfk_1` FOREIGN KEY (`cinema_id`) REFERENCES `cinema` (`cinema_id`),
  CONSTRAINT `theater_ibfk_2` FOREIGN KEY (`theater_type_id`) REFERENCES `theater_type` (`theater_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `theater_type`;
CREATE TABLE `theater_type` (
  `theater_type_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`theater_type_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `address` text,
  `avatar` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `registered_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `user` (`user_id`, `role_id`, `username`, `email`, `password`, `full_name`, `refresh_token`, `phone`, `dob`, `address`, `avatar`, `is_active`, `registered_at`, `updated_at`) VALUES
(1, 1, 'admin', 'admin@gmail.com', '$2b$10$eNJ.LGZ.UmPUFYnQXLDgd.Y3GnRi4H0W2snHEuTgFs3cIIj2X7Vx2', 'Admin 01', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImtleSI6MTcyODIzMzE0ODE4MCwiaWF0IjoxNzI4MjMzMTQ4LCJleHAiOjE3Mjg4Mzc5NDh9.RLfKCHlVRMvAaQWFskM8799R8dqoSRWcW_Z0OIj1xvQ', '0924276778', '2000-12-21', '', '', 1, '2024-10-06 16:44:46', NULL);
INSERT INTO `user` (`user_id`, `role_id`, `username`, `email`, `password`, `full_name`, `refresh_token`, `phone`, `dob`, `address`, `avatar`, `is_active`, `registered_at`, `updated_at`) VALUES
(2, 2, 'user01', 'user01@gmail.com', '$2b$10$EjXnMRM1MojzQKA9ZQQVwexiS97UERCDXcVTMBAEDvnv0fLSjO5ue', 'User 01', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImtleSI6MTcyODIzMzIwNTE2OCwiaWF0IjoxNzI4MjMzMjA1LCJleHAiOjE3Mjg4MzgwMDV9.fAoWlpeNPW3i_VJcHQA9l9TEPSjGMRAX6cDiNNlILFs', '0924276778', '2000-10-21', '', '', 1, '2024-10-06 16:46:18', NULL);

INSERT INTO `cinema` (`cinema_id`, `cineplex_id`, `name`, `slug`, `logo`, `avatar`, `address`, `latitude`, `longitude`, `map_embed`, `rating`, `is_deleted`, `created_at`) VALUES
(1, 2, 'CGV - Aeon Bình Tân', 'cgv-aeon-binh-tan', 'https://movienew.cybersoft.edu.vn/hinhanh/cgv.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/cgv.png-avatar.png', 'Tầng 3, TTTM Aeon Mall Bình Tân, Số 1 đường số 17A, khu phố 11, Bình Trị Đông B, Bình Tân', '10.83795443', '106.82482311', 'https://movie/map-embed/cgv-1.png', 4.4, 0, '2024-09-25 07:22:46');
INSERT INTO `cinema` (`cinema_id`, `cineplex_id`, `name`, `slug`, `logo`, `avatar`, `address`, `latitude`, `longitude`, `map_embed`, `rating`, `is_deleted`, `created_at`) VALUES
(2, 2, 'CGV - Aeon Tân Phú', 'cgv-aeon-tan-phu', 'https://movienew.cybersoft.edu.vn/hinhanh/cgv.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/cgv.png-avatar.png', '30 Bờ Bao Tân Thắng, Sơn Kỳ, Tân Phú', '10.72808931', '106.80070786', 'https://movie/map-embed/cgv-2.png', 4.8, 0, '2024-09-25 07:22:46');
INSERT INTO `cinema` (`cinema_id`, `cineplex_id`, `name`, `slug`, `logo`, `avatar`, `address`, `latitude`, `longitude`, `map_embed`, `rating`, `is_deleted`, `created_at`) VALUES
(3, 2, 'CGV - CGV Saigonres Nguyễn Xí', 'cgv-cgv-saigonres-nguyen-xi', 'https://movienew.cybersoft.edu.vn/hinhanh/cgv.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/cgv.png-avatar.png', 'Tầng 4-5, Saigonres Plaza, 79/81 Nguyễn Xí, P. 26, Bình Thạnh', '10.82237568', '106.68640535', 'https://movie/map-embed/cgv-3.png', 4.2, 0, '2024-09-25 07:22:46');
INSERT INTO `cinema` (`cinema_id`, `cineplex_id`, `name`, `slug`, `logo`, `avatar`, `address`, `latitude`, `longitude`, `map_embed`, `rating`, `is_deleted`, `created_at`) VALUES
(4, 2, 'CGV - Crescent Mall', 'cgv-crescent-mall', 'https://movienew.cybersoft.edu.vn/hinhanh/cgv.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/cgv.png-avatar.png', 'Lầu 5, Crescent Mall, Đại lộ Nguyễn Văn Linh, Phú Mỹ Hưng, Q. 7', '10.73164329', '106.89331612', 'https://movie/map-embed/cgv-4.png', 3.8, 0, '2024-09-25 07:22:46'),
(5, 2, 'CGV - CT Plaza', 'cgv-ct-plaza', 'https://movienew.cybersoft.edu.vn/hinhanh/cgv.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/cgv.png-avatar.png', '60A Trường Sơn,P. 2, Tân Bình', '10.72732040', '106.73234567', 'https://movie/map-embed/cgv-5.png', 4.6, 0, '2024-09-25 07:22:46'),
(6, 2, 'CGV - Golden Plaza', 'cgv-golden-plaza', 'https://movienew.cybersoft.edu.vn/hinhanh/cgv.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/cgv.png-avatar.png', 'Tầng 4, Trung tâm thương mại Golden Plaza, 922 Nguyễn Trãi, P. 14, Q. 5', '10.83126379', '106.86811883', 'https://movie/map-embed/cgv-6.png', 4, 0, '2024-09-25 07:22:46'),
(7, 2, 'CGV - Hoàng Văn Thụ', 'cgv-hoang-van-thu', 'https://movienew.cybersoft.edu.vn/hinhanh/cgv.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/cgv.png-avatar.png', 'Tầng 1 và 2 Gala Center, 415 Hoàng Văn Thụ, P. 2, Tân Bình', '10.86345270', '106.77617393', 'https://movie/map-embed/cgv-7.png', 4, 0, '2024-09-25 07:22:46'),
(8, 2, 'CGV - Hùng Vương Plaza', 'cgv-hung-vuong-plaza', 'https://movienew.cybersoft.edu.vn/hinhanh/cgv.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/cgv.png-avatar.png', 'Lầu 7, 126 Hùng Vương, Q. 5', '10.83209380', '106.85470602', 'https://movie/map-embed/cgv-8.png', 3.5, 0, '2024-09-25 07:22:46'),
(9, 2, 'CGV - IMC Trần Quang Khải', 'cgv-imc-tran-quang-khai', 'https://movienew.cybersoft.edu.vn/hinhanh/cgv.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/cgv.png-avatar.png', 'T2&3, TTVH Đa Năng, 62 Trần Quang Khải, P.Tân Định, Q.1', '10.85428141', '106.61978648', 'https://movie/map-embed/cgv-9.png', 3, 0, '2024-09-25 07:22:46'),
(10, 2, 'CGV - Liberty Citypoint', 'cgv-liberty-citypoint', 'https://movienew.cybersoft.edu.vn/hinhanh/cgv.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/cgv.png-avatar.png', 'Tầng M - 1, khách sạn Liberty Center Saigon Citypoint, 59 - 61 Pateur, Q. 1', '10.87598060', '106.70585629', 'https://movie/map-embed/cgv-10.png', 3.2, 0, '2024-09-25 07:22:46'),
(11, 2, 'CGV - Pandora City', 'cgv-pandora-city', 'https://movienew.cybersoft.edu.vn/hinhanh/cgv.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/cgv.png-avatar.png', 'Lầu 3, Pandora City, 1/1 Trường Chinh, Tân Phú', '10.81285005', '106.73426900', 'https://movie/map-embed/cgv-11.png', 4.1, 0, '2024-09-25 07:22:46'),
(12, 2, 'CGV - Paragon', 'cgv-paragon', 'https://movienew.cybersoft.edu.vn/hinhanh/cgv.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/cgv.png-avatar.png', 'Tầng 5, toà nhà Parkson Paragon, 03 Nguyễn Lương Bằng, Q. 7', '10.77652796', '106.68340034', 'https://movie/map-embed/cgv-12.png', 3.5, 0, '2024-09-25 07:22:46'),
(13, 2, 'CGV - Parkson Đồng Khởi', 'cgv-parkson-dong-khoi', 'https://movienew.cybersoft.edu.vn/hinhanh/cgv.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/cgv.png-avatar.png', 'Tầng 5 Parkson Đồng Khởi, 35bis-45 Lê Thánh Tôn, Bến Nghé, Q.1', '10.77528560', '106.64676438', 'https://movie/map-embed/cgv-13.png', 4.3, 0, '2024-09-25 07:22:46'),
(14, 2, 'CGV - Pearl Plaza', 'cgv-pearl-plaza', 'https://movienew.cybersoft.edu.vn/hinhanh/cgv.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/cgv.png-avatar.png', 'Lầu 5, Pearl Plaza, 561 Điện Biên Phủ, Bình Thạnh', '10.85659356', '106.88934161', 'https://movie/map-embed/cgv-14.png', 3.9, 0, '2024-09-25 07:22:46'),
(15, 2, 'CGV - Satra Củ Chi', 'cgv-satra-cu-chi', 'https://movienew.cybersoft.edu.vn/hinhanh/cgv.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/cgv.png-avatar.png', 'T3, TTTM Satra Củ Chi, Số 1239, Tỉnh Lộ 8, Ấp Thạnh An, Trung An, Củ Chi, TP.HCM', '10.79477369', '106.88469144', 'https://movie/map-embed/cgv-15.png', 3.6, 0, '2024-09-25 07:22:46'),
(16, 2, 'CGV - Sư Vạn Hạnh', 'cgv-su-van-hanh', 'https://movienew.cybersoft.edu.vn/hinhanh/cgv.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/cgv.png-avatar.png', 'T6 Vạn Hạnh Mall, 11 Sư Vạn Hạnh, Quận 10', '10.85386921', '106.86309221', 'https://movie/map-embed/cgv-16.png', 3.2, 0, '2024-09-25 07:22:46'),
(17, 2, 'CGV - Vincom Đồng Khởi', 'cgv-vincom-dong-khoi', 'https://movienew.cybersoft.edu.vn/hinhanh/cgv.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/cgv.png-avatar.png', 'Tầng 3, TTTM Vincom Center B, 72 Lê Thánh Tôn, Bến Nghé, Q. 1', '10.85064765', '106.76070851', 'https://movie/map-embed/cgv-17.png', 3.8, 0, '2024-09-25 07:22:46'),
(18, 2, 'CGV - Vincom Gò Vấp', 'cgv-vincom-go-vap', 'https://movienew.cybersoft.edu.vn/hinhanh/cgv.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/cgv.png-avatar.png', 'Tầng 5 TTTM Vincom Plaza Gò Vấp, 12 Phan Văn Trị, P. 7, Gò Vấp', '10.79734345', '106.65319148', 'https://movie/map-embed/cgv-18.png', 3.9, 0, '2024-09-25 07:22:46'),
(19, 2, 'CGV - Vincom Landmark 81', 'cgv-vincom-landmark-81', 'https://movienew.cybersoft.edu.vn/hinhanh/cgv.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/cgv.png-avatar.png', 'T B1 , TTTM Vincom Center Landmark 81, 772 Điện Biên Phủ, P.22, Q. Bình Thạnh, HCM', '10.81998993', '106.81618888', 'https://movie/map-embed/cgv-19.png', 4.6, 0, '2024-09-25 07:22:46'),
(20, 2, 'CGV - Vincom Thủ Đức', 'cgv-vincom-thu-duc', 'https://movienew.cybersoft.edu.vn/hinhanh/cgv.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/cgv.png-avatar.png', 'Tầng 5 Vincom Thủ Đức, 216 Võ Văn Ngân, Bình Thọ, Thủ Đức', '10.87092140', '106.85894129', 'https://movie/map-embed/cgv-20.png', 4.5, 0, '2024-09-25 07:22:46'),
(21, 2, 'CGV - VivoCity', 'cgv-vivocity', 'https://movienew.cybersoft.edu.vn/hinhanh/cgv.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/cgv.png-avatar.png', 'Lầu 5, Trung tâm thương mại SC VivoCity - 1058 Nguyễn Văn Linh, Q. 7', '10.73398452', '106.77820354', 'https://movie/map-embed/cgv-21.png', 3.9, 0, '2024-09-25 07:22:46'),
(22, 5, 'Lotte - Cantavil', 'lotte-cantavil', 'https://movienew.cybersoft.edu.vn/hinhanh/lotte-cinema.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/lotte-cinema.png-avatar.png', 'L7-Cantavil Premier, Xa Lộ Hà Nội, Q.2', '10.87329929', '106.83764194', 'https://movie/map-embed/lottecinema-22.png', 3.7, 0, '2024-09-25 07:26:38'),
(23, 5, 'Lotte - Cộng Hòa', 'lotte-cong-hoa', 'https://movienew.cybersoft.edu.vn/hinhanh/lotte-cinema.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/lotte-cinema.png-avatar.png', 'L4-Pico Plaza, 20 Cộng Hòa, Tân Bình', '10.78592581', '106.61935486', 'https://movie/map-embed/lottecinema-23.png', 3.1, 0, '2024-09-25 07:26:38'),
(24, 5, 'Lotte - Diamond', 'lotte-diamond', 'https://movienew.cybersoft.edu.vn/hinhanh/lotte-cinema.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/lotte-cinema.png-avatar.png', 'L13-Diamond Plaza, 34 Lê Duẩn, Q.1', '10.89498424', '106.83205723', 'https://movie/map-embed/lottecinema-24.png', 4.9, 0, '2024-09-25 07:26:38'),
(25, 5, 'Lotte - Gò Vấp', 'lotte-go-vap', 'https://movienew.cybersoft.edu.vn/hinhanh/lotte-cinema.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/lotte-cinema.png-avatar.png', 'L3-Lotte Mart, 242 Nguyễn Văn Lượng, Gò Vấp', '10.77874249', '106.64199743', 'https://movie/map-embed/lottecinema-25.png', 4, 0, '2024-09-25 07:26:38'),
(26, 5, 'Lotte - Nam Sài Gòn', 'lotte-nam-sai-gon', 'https://movienew.cybersoft.edu.vn/hinhanh/lotte-cinema.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/lotte-cinema.png-avatar.png', 'L3-Lotte Mart NSG, 469 Nguyễn Hữu Thọ, Q.7', '10.73482501', '106.69424968', 'https://movie/map-embed/lottecinema-26.png', 3.1, 0, '2024-09-25 07:26:38'),
(27, 5, 'Lotte - Nowzone', 'lotte-nowzone', 'https://movienew.cybersoft.edu.vn/hinhanh/lotte-cinema.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/lotte-cinema.png-avatar.png', 'L5-Nowzone, 235 Nguyễn Văn Cừ, Q.1', '10.75995363', '106.70604452', 'https://movie/map-embed/lottecinema-27.png', 4.7, 0, '2024-09-25 07:26:38'),
(28, 5, 'Lotte - Phú Thọ', 'lotte-phu-tho', 'https://movienew.cybersoft.edu.vn/hinhanh/lotte-cinema.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/lotte-cinema.png-avatar.png', 'L4-Lotte Mart Phú Thọ, Q.11', '10.75601527', '106.83882064', 'https://movie/map-embed/lottecinema-28.png', 3.3, 0, '2024-09-25 07:26:38'),
(29, 5, 'Lotte - Thủ Đức', 'lotte-thu-duc', 'https://movienew.cybersoft.edu.vn/hinhanh/lotte-cinema.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/lotte-cinema.png-avatar.png', 'L2-Joy Citipoint, KCX Linh Trung, Thủ Đức', '10.76247379', '106.64244985', 'https://movie/map-embed/lottecinema-29.png', 4.5, 0, '2024-09-25 07:26:38'),
(30, 6, 'MegaGS - Cao Thắng', 'megags-cao-thang', 'https://movienew.cybersoft.edu.vn/hinhanh/megags.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/megags.png-avatar.png', '19 Cao Thắng, Q.3', '10.78549102', '106.84783104', 'https://movie/map-embed/megags-30.png', 4.7, 0, '2024-09-25 07:28:40'),
(31, 3, 'CNS - Hai Bà Trưng', 'cns-hai-ba-trung', 'https://movienew.cybersoft.edu.vn/hinhanh/cinestar.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/cinestar.png-avatar.png', '135 Hai Bà Trưng, Bến Nghé, Q.1[Bản đồ]', '10.80388408', '106.66486861', 'https://movie/map-embed/cinestar-31.png', 4, 0, '2024-09-25 07:28:40'),
(32, 3, 'CNS - Quốc Thanh', 'cns-quoc-thanh', 'https://movienew.cybersoft.edu.vn/hinhanh/cinestar.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/cinestar.png-avatar.png', '271 Nguyễn Trãi, Q.1', '10.89314506', '106.67799391', 'https://movie/map-embed/cinestar-32.png', 3.8, 0, '2024-09-25 07:28:40'),
(33, 1, 'BHD Star Cineplex - 3/2', 'bhd-star-cineplex-3-2', 'https://movienew.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png-avatar.png', 'L5-Vincom 3/2, 3C Đường 3/2, Q.10', '10.77569520', '106.70752840', 'https://movie/map-embed/bhdstar-33.png', 4.3, 0, '2024-09-25 07:31:16'),
(34, 1, 'BHD Star Cineplex - Bitexco', 'bhd-star-cineplex-bitexco', 'https://movienew.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png-avatar.png', 'L3-Bitexco Icon 68, 2 Hải Triều, Q.1', '10.74165510', '106.62137259', 'https://movie/map-embed/bhdstar-34.png', 4.5, 0, '2024-09-25 07:31:16'),
(35, 1, 'BHD Star Cineplex - Phạm Hùng', 'bhd-star-cineplex-pham-hung', 'https://movienew.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png-avatar.png', 'L4-Satra Phạm Hùng, C6/27 Phạm Hùng, Bình Chánh', '10.78863811', '106.60654089', 'https://movie/map-embed/bhdstar-35.png', 4.6, 0, '2024-09-25 07:31:16'),
(36, 1, 'BHD Star Cineplex - Vincom Lê Văn Việt', 'bhd-star-cineplex-vincom-le-van-viet', 'https://movienew.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png-avatar.png', 'L4-Vincom Plaza, 50 Lê Văn Việt, Q.9', '10.86636146', '106.84621202', 'https://movie/map-embed/bhdstar-36.png', 4.2, 0, '2024-09-25 07:31:16'),
(37, 1, 'BHD Star Cineplex - Vincom Quang Trung', 'bhd-star-cineplex-vincom-quang-trung', 'https://movienew.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png-avatar.png', 'B1-Vincom QT, 190 Quang Trung, Gò Vấp', '10.81568785', '106.62035819', 'https://movie/map-embed/bhdstar-37.png', 4.2, 0, '2024-09-25 07:31:16'),
(38, 1, 'BHD Star Cineplex - Vincom Thảo Điền', 'bhd-star-cineplex-vincom-thao-dien', 'https://movienew.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png-avatar.png', 'L5-Megamall, 159 XL Hà Nội, Q.2', '10.86326908', '106.68093117', 'https://movie/map-embed/bhdstar-38.png', 4.8, 0, '2024-09-25 07:31:16'),
(39, 4, 'GLX - Huỳnh Tấn Phát', 'glx-huynh-tan-phat', 'https://movienew.cybersoft.edu.vn/hinhanh/galaxy-cinema.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/galaxy-cinema.png-avatar.png', '1362 Huỳnh Tấn Phát, KP1, Phú Mỹ, Q. 7', '10.74673485', '106.88806100', 'https://movie/map-embed/galaxy-39.png', 3.2, 0, '2024-09-25 07:31:16'),
(40, 4, 'GLX - Kinh Dương Vương', 'glx-kinh-duong-vuong', 'https://movienew.cybersoft.edu.vn/hinhanh/galaxy-cinema.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/galaxy-cinema.png-avatar.png', '718bis Kinh Dương Vương, Q.6', '10.82387190', '106.83904473', 'https://movie/map-embed/galaxy-40.png', 3.3, 0, '2024-09-25 07:31:16'),
(41, 4, 'GLX - Nguyễn Du', 'glx-nguyen-du', 'https://movienew.cybersoft.edu.vn/hinhanh/galaxy-cinema.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/galaxy-cinema.png-avatar.png', '116 Nguyễn Du, Q.1', '10.74791099', '106.84593205', 'https://movie/map-embed/galaxy-41.png', 3.8, 0, '2024-09-25 07:31:16'),
(42, 4, 'GLX - Nguyễn Văn Quá', 'glx-nguyen-van-qua', 'https://movienew.cybersoft.edu.vn/hinhanh/galaxy-cinema.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/galaxy-cinema.png-avatar.png', '119B Nguyễn Văn Quá, Đông Hưng Thuận, Q.12, TPHCM', '10.78833855', '106.62035676', 'https://movie/map-embed/galaxy-42.png', 3, 0, '2024-09-25 07:31:16'),
(43, 4, 'GLX - Phạm Văn Chí', 'glx-pham-van-chi', 'https://movienew.cybersoft.edu.vn/hinhanh/galaxy-cinema.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/galaxy-cinema.png-avatar.png', 'Lầu 5, TTTM Platinum Plaza, 634 Phạm Văn Chí, Q.6', '10.87348759', '106.68837596', 'https://movie/map-embed/galaxy-43.png', 4.7, 0, '2024-09-25 07:31:16'),
(44, 4, 'GLX - Quang Trung', 'glx-quang-trung', 'https://movienew.cybersoft.edu.vn/hinhanh/galaxy-cinema.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/galaxy-cinema.png-avatar.png', 'L3-Co.opmart Foodcosa, 304A Quang Trung, Gò Vấp', '10.79386691', '106.82044492', 'https://movie/map-embed/galaxy-44.png', 3.5, 0, '2024-09-25 07:31:16'),
(45, 4, 'GLX - Tân Bình', 'glx-tan-binh', 'https://movienew.cybersoft.edu.vn/hinhanh/galaxy-cinema.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/galaxy-cinema.png-avatar.png', '246 Nguyễn Hồng Đào, Tân Bình', '10.72518842', '106.84944275', 'https://movie/map-embed/galaxy-45.png', 4.6, 0, '2024-09-25 07:31:16'),
(46, 4, 'GLX - Trung Chánh', 'glx-trung-chanh', 'https://movienew.cybersoft.edu.vn/hinhanh/galaxy-cinema.png', 'https://example.com/https://movienew.cybersoft.edu.vn/hinhanh/galaxy-cinema.png-avatar.png', 'TTVH Q12 – 09, Q L 22, Trung Mỹ Tây , Q.12', '10.78066733', '106.80340745', 'https://movie/map-embed/galaxy-46.png', 3.4, 0, '2024-09-25 07:31:16');

INSERT INTO `cineplex` (`cineplex_id`, `name`, `slug`, `code`, `logo`, `is_deleted`, `created_at`) VALUES
(1, 'BHD Star Cineplex', 'bhd-star-cineplex', 'BHDSTAR', 'https://movienew.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png', 0, '2024-10-04 17:11:25');
INSERT INTO `cineplex` (`cineplex_id`, `name`, `slug`, `code`, `logo`, `is_deleted`, `created_at`) VALUES
(2, 'CGV Cinema', 'cgv-cinema', 'CGV', 'https://movienew.cybersoft.edu.vn/hinhanh/cgv.png', 0, '2024-10-04 17:11:25');
INSERT INTO `cineplex` (`cineplex_id`, `name`, `slug`, `code`, `logo`, `is_deleted`, `created_at`) VALUES
(3, 'CineStar', 'cinestar', 'CINESTAR', 'https://movienew.cybersoft.edu.vn/hinhanh/cinestar.png', 0, '2024-10-04 17:11:25');
INSERT INTO `cineplex` (`cineplex_id`, `name`, `slug`, `code`, `logo`, `is_deleted`, `created_at`) VALUES
(4, 'Galaxy Cinema', 'galaxy-cinema', 'GALAXY', 'https://movienew.cybersoft.edu.vn/hinhanh/galaxy-cinema.png', 0, '2024-10-04 17:11:25'),
(5, 'Lotte Cinema', 'lotte-cinema', 'LOTTECINEMA', 'https://movienew.cybersoft.edu.vn/hinhanh/lotte-cinema.png', 0, '2024-10-04 17:11:25'),
(6, 'MegaGS', 'megags', 'MEGAGS', 'https://movienew.cybersoft.edu.vn/hinhanh/megags.png', 0, '2024-10-04 17:11:25');

INSERT INTO `genre` (`genre_id`, `name`, `created_at`) VALUES
(1, 'Comedy', '2024-10-05 09:50:59');
INSERT INTO `genre` (`genre_id`, `name`, `created_at`) VALUES
(2, 'Animation', '2024-10-05 09:50:59');
INSERT INTO `genre` (`genre_id`, `name`, `created_at`) VALUES
(3, 'Adventure', '2024-10-05 09:50:59');
INSERT INTO `genre` (`genre_id`, `name`, `created_at`) VALUES
(4, 'Family', '2024-10-05 09:50:59'),
(5, 'Drama', '2024-10-05 09:50:59'),
(6, 'Horror', '2024-10-05 09:50:59'),
(7, 'Thriller', '2024-10-05 09:50:59'),
(8, 'Action', '2024-10-05 09:50:59'),
(9, 'Fantasy', '2024-10-05 09:50:59'),
(10, 'Mystery', '2024-10-05 09:50:59'),
(11, 'Romance', '2024-10-05 09:50:59'),
(12, 'Sci-Fi', '2024-10-05 09:50:59');

INSERT INTO `movie` (`movie_id`, `genre_id`, `title`, `slug`, `description`, `short_description`, `duration`, `trailer`, `opening_date`, `poster_url`, `banner_url`, `is_now_showing`, `is_coming_soon`, `is_active`, `rating`, `created_at`) VALUES
(1, 8, 'LẬT MẶT: 48H', 'lat-mat-48h', 'Tấm vé định mệnh là một bộ phim điện ảnh của Việt Nam năm 2023 do Lý Hải đạo diễn. Phần thứ 6 của loạt phim Lật Mặt', 'Tấm vé định mệnh là một bộ phim điện ảnh của Việt Nam năm 2023 do Lý Hải đạo diễn. Phần thứ 6 của loạt phim Lật Mặt', 122, 'https://www.youtube.com/watch?app=desktop&v=ykBfss-8H4Y', '2024-01-03 00:00:00', 'https://movienew.cybersoft.edu.vn/hinhanh/lat-mat-48h_gp02.jpg', 'https://movienew.cybersoft.edu.vn/hinhanh/lat-mat-48h_gp02.jpg', 1, 0, 1, 10, '2024-10-05 09:52:29');
INSERT INTO `movie` (`movie_id`, `genre_id`, `title`, `slug`, `description`, `short_description`, `duration`, `trailer`, `opening_date`, `poster_url`, `banner_url`, `is_now_showing`, `is_coming_soon`, `is_active`, `rating`, `created_at`) VALUES
(2, 1, 'Trên Bàn Nhậu Dưới Bàn Mưu', 'tren-ban-nhau-duoi-ban-muu', 'Trên Bàn Nhậu Dưới Bàn Mưu là câu chuyện về tình bạn đầy thú vị của một hội bạn thân. Trong hành trình tìm kiếm những ước mơ và kế hoạch cuộc sống, họ đã vô tình bị kéo vào một âm mưu đen tối ngoài ý muốn.', 'Trên Bàn Nhậu Dưới Bàn Mưu là câu chuyện về tình bạn đầy thú vị của một hội bạn thân. Trong hành trình tìm kiếm những ước mơ và kế hoạch cuộc sống, họ đã vô tình bị kéo vào một âm mưu đen tối ngoài ý muốn.', 126, 'https://www.youtube.com/watch?', '2024-01-04 00:00:00', 'https://movienew.cybersoft.edu.vn/hinhanh/tren-ban-nhau-duoi-ban-muu_gp02.jpg', 'https://movienew.cybersoft.edu.vn/hinhanh/tren-ban-nhau-duoi-ban-muu_gp02.jpg', 0, 1, 1, 10, '2024-10-05 09:52:29');
INSERT INTO `movie` (`movie_id`, `genre_id`, `title`, `slug`, `description`, `short_description`, `duration`, `trailer`, `opening_date`, `poster_url`, `banner_url`, `is_now_showing`, `is_coming_soon`, `is_active`, `rating`, `created_at`) VALUES
(3, 8, 'Hai Phượng ', 'hai-phuong', 'Hai Phượng, bộ phim hành động cuối cùng có sự góp mặt của đả nữ Ngô Thanh Vân.', 'Hai Phượng, bộ phim hành động cuối cùng có sự góp mặt của đả nữ Ngô Thanh Vân.', 147, 'https://youtu.be/THXPCF6UHh8?si=jR6LlMjZL-d0oISx', '2024-01-09 00:00:00', 'https://movienew.cybersoft.edu.vn/hinhanh/hai-phuong_gp02.jfif', 'https://movienew.cybersoft.edu.vn/hinhanh/hai-phuong_gp02.jfif', 0, 1, 1, 5, '2024-10-05 09:52:29');
INSERT INTO `movie` (`movie_id`, `genre_id`, `title`, `slug`, `description`, `short_description`, `duration`, `trailer`, `opening_date`, `poster_url`, `banner_url`, `is_now_showing`, `is_coming_soon`, `is_active`, `rating`, `created_at`) VALUES
(4, 5, 'Nhà vit di cư', 'nha-vit-di-cu', 'Kể về người vợ của một gia đình thượng lưu thuê cô bảo mẫu trong mơ để chăm sóc con trai mình. Nhưng cô không ngờ rằng, phía sau sự trong sáng, tinh khiết kia, cô bảo mẫu luôn che giấu âm mưu nhằm phá hoại hạnh phúc gia đình và khiến cuộc sống của cô thay đổi mãi mãi.', 'Kể về người vợ của một gia đình thượng lưu thuê cô bảo mẫu trong mơ để chăm sóc con trai mình. Nhưng cô không ngờ rằng, phía sau sự trong sáng, tinh khiết kia, cô bảo mẫu luôn che giấu âm mưu nhằm phá hoại hạnh phúc gia đình và khiến cuộc sống của cô thay đổi mãi mãi.', 141, 'https://www.youtube.com/watch?app=desktop&v=ykBfss-8H4Y', '2024-01-11 00:00:00', 'https://movienew.cybersoft.edu.vn/hinhanh/nha-vit-di-cu_gp02.jpg', 'https://movienew.cybersoft.edu.vn/hinhanh/nha-vit-di-cu_gp02.jpg', 1, 0, 1, 10, '2024-10-05 09:52:29'),
(5, 8, 'Arkie', 'arkie', 'Aquaman và Vương quốc thất lạc là một bộ phim điện ảnh thuộc thể loại siêu anh hùng của Mỹ ra mắt năm 2023 dựa trên nhân vật Aquaman từ DC Comics.', 'Aquaman và Vương quốc thất lạc là một bộ phim điện ảnh thuộc thể loại siêu anh hùng của Mỹ ra mắt năm 2023 dựa trên nhân vật Aquaman từ DC Comics.', 148, 'https://www.youtube.com/watch?v=JK6qcKuXCK0', '2024-01-14 00:00:00', 'https://movienew.cybersoft.edu.vn/hinhanh/arkie_gp02.jpg', 'https://movienew.cybersoft.edu.vn/hinhanh/arkie_gp02.jpg', 1, 0, 1, 10, '2024-10-05 09:52:29'),
(6, 3, 'One Piece 2023', 'one-piece-2023', 'Aquaman và Vương quốc thất lạc là một bộ phim điện ảnh thuộc thể loại siêu anh hùng của Mỹ ra mắt năm 2023 dựa trên nhân vật Aquaman từ DC Comics.', 'Aquaman và Vương quốc thất lạc là một bộ phim điện ảnh thuộc thể loại siêu anh hùng của Mỹ ra mắt năm 2023 dựa trên nhân vật Aquaman từ DC Comics.', 135, 'https://www.youtube.com/watch?v=kBrE7OrWkC0', '2024-01-16 00:00:00', 'https://movienew.cybersoft.edu.vn/hinhanh/one-piece-2023_gp02.jpg', 'https://movienew.cybersoft.edu.vn/hinhanh/one-piece-2023_gp02.jpg', 1, 0, 1, 10, '2024-10-05 09:52:29');

INSERT INTO `role` (`role_id`, `name`, `created_at`) VALUES
(1, 'Admin', '2024-09-25 06:03:29');
INSERT INTO `role` (`role_id`, `name`, `created_at`) VALUES
(2, 'User', '2024-09-25 06:03:29');


INSERT INTO `theater` (`theater_id`, `theater_type_id`, `cinema_id`, `name`, `height`, `width`, `created_at`) VALUES
(1, 1, 1, 'Theater 1', 12, 14, '2024-10-05 09:55:45');
INSERT INTO `theater` (`theater_id`, `theater_type_id`, `cinema_id`, `name`, `height`, `width`, `created_at`) VALUES
(2, 2, 1, 'Theater 2', 11, 15, '2024-10-05 09:55:45');
INSERT INTO `theater` (`theater_id`, `theater_type_id`, `cinema_id`, `name`, `height`, `width`, `created_at`) VALUES
(3, 3, 1, 'Theater 3', 13, 13, '2024-10-05 09:55:45');
INSERT INTO `theater` (`theater_id`, `theater_type_id`, `cinema_id`, `name`, `height`, `width`, `created_at`) VALUES
(4, 1, 2, 'Theater 1', 10, 16, '2024-10-05 09:55:45'),
(5, 2, 2, 'Theater 2', 14, 13, '2024-10-05 09:55:45'),
(6, 3, 2, 'Theater 3', 11, 15, '2024-10-05 09:55:45'),
(7, 1, 3, 'Theater 1', 12, 14, '2024-10-05 09:55:45'),
(8, 2, 3, 'Theater 2', 13, 13, '2024-10-05 09:55:45'),
(9, 3, 3, 'Theater 3', 11, 15, '2024-10-05 09:55:45'),
(10, 1, 4, 'Theater 1', 10, 16, '2024-10-05 09:55:45'),
(11, 2, 4, 'Theater 2', 12, 14, '2024-10-05 09:55:45'),
(12, 3, 4, 'Theater 3', 14, 13, '2024-10-05 09:55:45'),
(13, 1, 5, 'Theater 1', 11, 15, '2024-10-05 09:55:45'),
(14, 2, 5, 'Theater 2', 13, 13, '2024-10-05 09:55:45'),
(15, 3, 5, 'Theater 3', 12, 14, '2024-10-05 09:55:45'),
(16, 1, 6, 'Theater 1', 10, 16, '2024-10-05 09:55:45'),
(17, 2, 6, 'Theater 2', 14, 13, '2024-10-05 09:55:45'),
(18, 3, 6, 'Theater 3', 11, 15, '2024-10-05 09:55:45'),
(19, 1, 7, 'Theater 1', 12, 14, '2024-10-05 09:55:45'),
(20, 2, 7, 'Theater 2', 11, 15, '2024-10-05 09:55:45'),
(21, 3, 7, 'Theater 3', 13, 13, '2024-10-05 09:55:45'),
(22, 1, 8, 'Theater 1', 10, 16, '2024-10-05 09:55:45'),
(23, 2, 8, 'Theater 2', 14, 13, '2024-10-05 09:55:45'),
(24, 3, 8, 'Theater 3', 11, 15, '2024-10-05 09:55:45'),
(25, 1, 9, 'Theater 1', 12, 14, '2024-10-05 09:55:45'),
(26, 2, 9, 'Theater 2', 13, 13, '2024-10-05 09:55:45'),
(27, 3, 9, 'Theater 3', 11, 15, '2024-10-05 09:55:45'),
(28, 1, 10, 'Theater 1', 10, 16, '2024-10-05 09:55:45'),
(29, 2, 10, 'Theater 2', 12, 14, '2024-10-05 09:55:45'),
(30, 3, 10, 'Theater 3', 14, 13, '2024-10-05 09:55:45'),
(31, 1, 11, 'Theater 1', 11, 15, '2024-10-05 09:55:45'),
(32, 2, 11, 'Theater 2', 13, 13, '2024-10-05 09:55:45'),
(33, 3, 11, 'Theater 3', 12, 14, '2024-10-05 09:55:45'),
(34, 1, 12, 'Theater 1', 10, 16, '2024-10-05 09:55:45'),
(35, 2, 12, 'Theater 2', 14, 13, '2024-10-05 09:55:45'),
(36, 3, 12, 'Theater 3', 11, 15, '2024-10-05 09:55:45'),
(37, 1, 13, 'Theater 1', 12, 14, '2024-10-05 09:55:45'),
(38, 2, 13, 'Theater 2', 11, 15, '2024-10-05 09:55:45'),
(39, 3, 13, 'Theater 3', 13, 13, '2024-10-05 09:55:45'),
(40, 1, 14, 'Theater 1', 10, 16, '2024-10-05 09:55:45'),
(41, 2, 14, 'Theater 2', 14, 13, '2024-10-05 09:55:45'),
(42, 3, 14, 'Theater 3', 11, 15, '2024-10-05 09:55:45'),
(43, 1, 15, 'Theater 1', 12, 14, '2024-10-05 09:55:45'),
(44, 2, 15, 'Theater 2', 13, 13, '2024-10-05 09:55:45'),
(45, 3, 15, 'Theater 3', 11, 15, '2024-10-05 09:55:45'),
(46, 1, 16, 'Theater 1', 10, 16, '2024-10-05 09:55:45'),
(47, 2, 16, 'Theater 2', 12, 14, '2024-10-05 09:55:45'),
(48, 3, 16, 'Theater 3', 14, 13, '2024-10-05 09:55:45'),
(49, 1, 17, 'Theater 1', 11, 15, '2024-10-05 09:55:45'),
(50, 2, 17, 'Theater 2', 13, 13, '2024-10-05 09:55:45'),
(51, 3, 17, 'Theater 3', 12, 14, '2024-10-05 09:55:45'),
(52, 1, 18, 'Theater 1', 10, 16, '2024-10-05 09:55:45'),
(53, 2, 18, 'Theater 2', 14, 13, '2024-10-05 09:55:45'),
(54, 3, 18, 'Theater 3', 11, 15, '2024-10-05 09:55:45'),
(55, 1, 19, 'Theater 1', 12, 14, '2024-10-05 09:55:45'),
(56, 2, 19, 'Theater 2', 11, 15, '2024-10-05 09:55:45'),
(57, 3, 19, 'Theater 3', 13, 13, '2024-10-05 09:55:45'),
(58, 1, 20, 'Theater 1', 10, 16, '2024-10-05 09:55:45'),
(59, 2, 20, 'Theater 2', 14, 13, '2024-10-05 09:55:45'),
(60, 3, 20, 'Theater 3', 11, 15, '2024-10-05 09:55:45'),
(61, 1, 21, 'Theater 1', 12, 14, '2024-10-05 09:55:45'),
(62, 2, 21, 'Theater 2', 13, 13, '2024-10-05 09:55:45'),
(63, 3, 21, 'Theater 3', 11, 15, '2024-10-05 09:55:45'),
(64, 1, 22, 'Theater 1', 10, 16, '2024-10-05 09:55:45'),
(65, 2, 22, 'Theater 2', 12, 14, '2024-10-05 09:55:45'),
(66, 3, 22, 'Theater 3', 14, 13, '2024-10-05 09:55:45'),
(67, 1, 23, 'Theater 1', 11, 15, '2024-10-05 09:55:45'),
(68, 2, 23, 'Theater 2', 13, 13, '2024-10-05 09:55:45'),
(69, 3, 23, 'Theater 3', 12, 14, '2024-10-05 09:55:45'),
(70, 1, 24, 'Theater 1', 10, 16, '2024-10-05 09:55:45'),
(71, 2, 24, 'Theater 2', 14, 13, '2024-10-05 09:55:45'),
(72, 3, 24, 'Theater 3', 11, 15, '2024-10-05 09:55:45'),
(73, 1, 25, 'Theater 1', 12, 14, '2024-10-05 09:55:45'),
(74, 2, 25, 'Theater 2', 11, 15, '2024-10-05 09:55:45'),
(75, 3, 25, 'Theater 3', 13, 13, '2024-10-05 09:55:45'),
(76, 1, 26, 'Theater 1', 10, 16, '2024-10-05 09:55:45'),
(77, 2, 26, 'Theater 2', 14, 13, '2024-10-05 09:55:45'),
(78, 3, 26, 'Theater 3', 11, 15, '2024-10-05 09:55:45'),
(79, 1, 27, 'Theater 1', 12, 14, '2024-10-05 09:55:45'),
(80, 2, 27, 'Theater 2', 13, 13, '2024-10-05 09:55:45'),
(81, 3, 27, 'Theater 3', 11, 15, '2024-10-05 09:55:45'),
(82, 1, 28, 'Theater 1', 10, 16, '2024-10-05 09:55:45'),
(83, 2, 28, 'Theater 2', 12, 14, '2024-10-05 09:55:45'),
(84, 3, 28, 'Theater 3', 14, 13, '2024-10-05 09:55:45'),
(85, 1, 29, 'Theater 1', 11, 15, '2024-10-05 09:55:45'),
(86, 2, 29, 'Theater 2', 13, 13, '2024-10-05 09:55:45'),
(87, 3, 29, 'Theater 3', 12, 14, '2024-10-05 09:55:45'),
(88, 1, 30, 'Theater 1', 10, 16, '2024-10-05 09:55:45'),
(89, 2, 30, 'Theater 2', 14, 13, '2024-10-05 09:55:45'),
(90, 3, 30, 'Theater 3', 11, 15, '2024-10-05 09:55:45'),
(91, 1, 31, 'Theater 1', 12, 14, '2024-10-05 09:55:45'),
(92, 2, 31, 'Theater 2', 11, 15, '2024-10-05 09:55:45'),
(93, 3, 31, 'Theater 3', 13, 13, '2024-10-05 09:55:45'),
(94, 1, 32, 'Theater 1', 10, 16, '2024-10-05 09:55:45'),
(95, 2, 32, 'Theater 2', 14, 13, '2024-10-05 09:55:45'),
(96, 3, 32, 'Theater 3', 11, 15, '2024-10-05 09:55:45'),
(97, 1, 33, 'Theater 1', 12, 14, '2024-10-05 09:55:45'),
(98, 2, 33, 'Theater 2', 13, 13, '2024-10-05 09:55:45'),
(99, 3, 33, 'Theater 3', 11, 15, '2024-10-05 09:55:45'),
(100, 1, 34, 'Theater 1', 10, 16, '2024-10-05 09:55:45'),
(101, 2, 34, 'Theater 2', 12, 14, '2024-10-05 09:55:45'),
(102, 3, 34, 'Theater 3', 14, 13, '2024-10-05 09:55:45'),
(103, 1, 35, 'Theater 1', 11, 15, '2024-10-05 09:55:45'),
(104, 2, 35, 'Theater 2', 13, 13, '2024-10-05 09:55:45'),
(105, 3, 35, 'Theater 3', 12, 14, '2024-10-05 09:55:45'),
(106, 1, 36, 'Theater 1', 10, 16, '2024-10-05 09:55:45'),
(107, 2, 36, 'Theater 2', 14, 13, '2024-10-05 09:55:45'),
(108, 3, 36, 'Theater 3', 11, 15, '2024-10-05 09:55:45'),
(109, 1, 37, 'Theater 1', 12, 14, '2024-10-05 09:55:45'),
(110, 2, 37, 'Theater 2', 11, 15, '2024-10-05 09:55:45'),
(111, 3, 37, 'Theater 3', 13, 13, '2024-10-05 09:55:45'),
(112, 1, 38, 'Theater 1', 10, 16, '2024-10-05 09:55:45'),
(113, 2, 38, 'Theater 2', 14, 13, '2024-10-05 09:55:45'),
(114, 3, 38, 'Theater 3', 11, 15, '2024-10-05 09:55:45'),
(115, 1, 39, 'Theater 1', 12, 14, '2024-10-05 09:55:45'),
(116, 2, 39, 'Theater 2', 13, 13, '2024-10-05 09:55:45'),
(117, 3, 39, 'Theater 3', 11, 15, '2024-10-05 09:55:45'),
(118, 1, 40, 'Theater 1', 10, 16, '2024-10-05 09:55:45'),
(119, 2, 40, 'Theater 2', 12, 14, '2024-10-05 09:55:45'),
(120, 3, 40, 'Theater 3', 14, 13, '2024-10-05 09:55:45'),
(121, 1, 41, 'Theater 1', 11, 15, '2024-10-05 09:55:45'),
(122, 2, 41, 'Theater 2', 13, 13, '2024-10-05 09:55:45'),
(123, 3, 41, 'Theater 3', 12, 14, '2024-10-05 09:55:45'),
(124, 1, 42, 'Theater 1', 10, 16, '2024-10-05 09:55:45'),
(125, 2, 42, 'Theater 2', 14, 13, '2024-10-05 09:55:45'),
(126, 3, 42, 'Theater 3', 11, 15, '2024-10-05 09:55:45'),
(127, 1, 43, 'Theater 1', 12, 14, '2024-10-05 09:55:45'),
(128, 2, 43, 'Theater 2', 11, 15, '2024-10-05 09:55:45'),
(129, 3, 43, 'Theater 3', 13, 13, '2024-10-05 09:55:45'),
(130, 1, 44, 'Theater 1', 10, 16, '2024-10-05 09:55:45'),
(131, 2, 44, 'Theater 2', 14, 13, '2024-10-05 09:55:45'),
(132, 3, 44, 'Theater 3', 11, 15, '2024-10-05 09:55:45'),
(133, 1, 45, 'Theater 1', 12, 14, '2024-10-05 09:55:45'),
(134, 2, 45, 'Theater 2', 13, 13, '2024-10-05 09:55:45'),
(135, 3, 45, 'Theater 3', 11, 15, '2024-10-05 09:55:45'),
(136, 1, 46, 'Theater 1', 10, 16, '2024-10-05 09:55:45'),
(137, 2, 46, 'Theater 2', 12, 14, '2024-10-05 09:55:45'),
(138, 3, 46, 'Theater 3', 14, 13, '2024-10-05 09:55:45');

INSERT INTO `theater_type` (`theater_type_id`, `name`, `created_at`) VALUES
(1, '2D', '2024-10-05 09:50:59');
INSERT INTO `theater_type` (`theater_type_id`, `name`, `created_at`) VALUES
(2, '3D', '2024-10-05 09:50:59');
INSERT INTO `theater_type` (`theater_type_id`, `name`, `created_at`) VALUES
(3, 'IMAX', '2024-10-05 09:50:59');





/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;