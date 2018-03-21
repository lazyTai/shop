/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 5.5.53 : Database - shop
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`shop` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `shop`;

/*Table structure for table `think_good` */

DROP TABLE IF EXISTS `think_good`;

CREATE TABLE `think_good` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `desc` varchar(100) DEFAULT NULL,
  `a_sheng` varchar(100) DEFAULT NULL,
  `a_shi` varchar(100) DEFAULT NULL,
  `a_xain` varchar(100) DEFAULT NULL,
  `a_address` varchar(100) DEFAULT NULL,
  `price` int(255) DEFAULT NULL,
  `image_url` varchar(100) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `think_good` */

insert  into `think_good`(`id`,`title`,`desc`,`a_sheng`,`a_shi`,`a_xain`,`a_address`,`price`,`image_url`,`create_time`,`update_time`) values (1,'1','asdasd','重庆','江北区','寸滩镇','11',11,'uploads/20180320\\197971cd7c6e37f1a0efaaf303fdd5f2.jpg','2018-03-20 23:31:52','2018-03-20 23:31:52'),(2,'1','asdasd','重庆','江北区','寸滩镇','11',11,'uploads/20180320\\197971cd7c6e37f1a0efaaf303fdd5f2.jpg','2018-03-20 23:31:56','2018-03-20 23:31:56'),(3,'1','111','天津','河东区','全境','1',1,'uploads/20180321\\19aa531174b8540c57669bcb1b5b0c7a.png','2018-03-21 00:11:55','2018-03-21 00:11:55');

/*Table structure for table `think_like` */

DROP TABLE IF EXISTS `think_like`;

CREATE TABLE `think_like` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `good_id` int(100) DEFAULT NULL,
  `user_id` int(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `think_like` */

insert  into `think_like`(`id`,`good_id`,`user_id`) values (1,1,1),(3,3,1),(4,1,2);

/*Table structure for table `think_user` */

DROP TABLE IF EXISTS `think_user`;

CREATE TABLE `think_user` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `image_url` varchar(100) NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `think_user` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
