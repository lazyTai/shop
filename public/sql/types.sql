/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 5.5.53 : Database - demo
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`demo` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `demo`;

/*Table structure for table `think_sub_type` */

DROP TABLE IF EXISTS `think_sub_type`;

CREATE TABLE `think_sub_type` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `header_type_id` int(10) NOT NULL,
  `sub_type_name` varchar(100) NOT NULL,
  `image_url` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=162 DEFAULT CHARSET=utf8;

/*Data for the table `think_sub_type` */

insert  into `think_sub_type`(`id`,`header_type_id`,`sub_type_name`,`image_url`) values (1,1,'青春','icon-chun'),(2,1,'儿童文学','icon-atongmu-'),(3,1,'童话','icon-ertong'),(4,1,'悬疑 ','icon-shengdanjieicon-'),(5,1,'推理','icon-zuifan'),(6,1,'犯罪','icon-zuifan'),(7,1,'惊悚','icon-kongbudianyingjingshengjianjiao'),(8,1,'恐怖','icon-kongbudianyingwaixingren'),(9,1,'灵异','icon-kongbudianyingdianjujinghun'),(10,1,'志怪 ','icon-shengdanjieicon-'),(11,1,'历史','icon-lishi'),(12,1,'科幻','icon-kongbudianyingwaixingren'),(13,1,'奇幻','icon-kongbudianyingwaixingren'),(14,1,'魔幻','icon-kongbudianyingwaixingren'),(15,1,'魔幻现实主义','icon-kongbudianyingwaixingren'),(16,1,'玄幻','icon-icon-test1'),(17,1,'武侠','icon-gufeng_guzhuang_zhanzhao'),(18,1,'宫廷','icon-gufeng_guzhuang_ziwei'),(19,1,'军事','icon-junshi'),(20,1,'体育','icon-tiyu'),(21,1,'校园','icon-xiaoyuan'),(22,1,'纯爱','icon-heart-copy'),(23,1,'情感','icon-heart-copy'),(24,1,'言情','icon-heart-copy'),(25,1,'家庭','icon-faxian_jiatingjiaoyu'),(26,1,'城市','icon-chengshi'),(27,1,'乡土','icon-chengshi'),(28,1,'公路','icon-road__easyiconnet'),(29,1,'职场','icon-yingxiaoyuan'),(30,1,'商战','icon-yingxiaoyuan'),(31,1,'官场','icon-yingxiaoyuan'),(32,1,'幽默','icon--joy'),(33,1,'成长','icon-zhuye_chengchangjilu'),(34,1,'心里','icon-xin'),(35,2,'二次元','icon-atongmu-'),(36,2,'acg','icon-nvhai'),(37,2,'同人','icon-nvhai'),(38,2,'架空','icon-gufeng_guzhuang_ziwei'),(39,2,'穿越','icon-gufeng_guzhuang_ziwei'),(40,2,'古风','icon-gufeng_guzhuang_ziwei'),(41,2,'末世','icon-shijie'),(42,2,'审美','icon-xihananhai'),(43,2,'哈利波特','icon-xihananhai'),(44,2,'盗墓笔记','icon-xihananhai'),(45,2,'英雄联盟','icon-jiaodoushiwushi'),(46,3,'文化','icon-tubiaozhizuomoban1'),(47,3,'海外','icon-tubiaozhizuomoban1'),(48,3,'读书','icon-tubiaozhizuomoban1'),(49,3,'写作','icon-tubiaozhizuomoban1'),(50,3,'书评','icon-tubiaozhizuomoban1'),(51,3,'影评','icon-tubiaozhizuomoban1'),(52,3,'哲学 ','icon-tubiaozhizuomoban1'),(53,3,'逻辑与思维','icon-tubiaozhizuomoban1'),(54,3,'认知 ','icon-lishi'),(55,3,'伦理','icon-lishi'),(56,3,'美学 ','icon-lishi'),(57,3,'宗教','icon-lishi'),(58,3,'历史 ','icon-lishi'),(59,3,'人物传','icon-jiaodoushiwushi'),(60,3,'三国','icon-jiaodoushiwushi'),(61,3,'民国','icon-lishi'),(62,3,'考古','icon-lishi'),(63,3,'文学','icon-lishi'),(64,3,'诗词','icon-lishi'),(65,3,'社会学','icon-faxian_jiatingjiaoyu'),(66,3,'语言与文学','icon-lishi'),(67,3,'教育','icon-lishi'),(68,3,'出版','icon-lishi'),(69,3,'政治','icon-junshi'),(70,3,'时事 ','icon-junshi'),(71,3,'军事','icon-junshi'),(72,3,'国际关系','icon-hulianwang1'),(73,3,'心理','icon-qinggan'),(74,4,'it','icon-ITquanxian'),(75,4,'互联网','icon-ITquanxian'),(76,4,'计算机','icon-ITquanxian'),(77,4,'产品','icon-ITquanxian'),(78,4,'设计','icon-ITquanxian'),(79,4,'运营','icon-ITquanxian'),(80,4,'电商','icon-ITquanxian'),(81,4,'区块链','icon-houzi'),(82,4,'程序员','icon-houzi'),(83,4,'豆瓣','icon-douban'),(84,5,'生活','icon-tiyu2'),(85,5,'旅行','icon-tiyu2'),(86,5,'手绘','icon-shouhuiban'),(87,5,'手账 ','icon-shouhuiban'),(88,5,'饮食文化','icon-yinshi'),(89,5,'食谱','icon-yinshi'),(90,5,'美容化妆','icon-nvhai'),(91,5,'健身运动','icon-tiyu2'),(92,5,'保养保健','icon-youjishengwu'),(93,5,'体育','icon-tiyu'),(94,5,'游戏','icon-youxi1'),(95,5,'两性婚姻','icon-heart-copy'),(96,5,'育儿','icon-yuer'),(97,5,'居家休闲','icon-yuer'),(98,5,'手工diy','icon-gerenzhongxin_wodejiating'),(99,5,'明星','icon-mingxing'),(100,6,'科普','icon-huaxueping'),(101,6,'数学','icon-huaxueping'),(102,6,'物理','icon-huaxueping'),(103,6,'化学','icon-huaxueping'),(104,6,'地理','icon-shijie'),(105,6,'自然','icon-huaxueping'),(106,6,'生物','icon-huaxueping'),(107,6,'医学','icon-huaxueping'),(108,6,'外星人','icon-kongbudianyingwaixingren'),(109,7,'艺术 ','icon-huihua-yuanwenjian'),(110,7,'绘画','icon-huihua-yuanwenjian'),(111,7,'设计','icon-sheying-yuanwenjian'),(112,7,'影视','icon-sheying-yuanwenjian'),(113,7,'摄影','icon-sheying-yuanwenjian'),(114,7,'音乐','icon-yinle-'),(115,8,'经济','icon-jinrong'),(116,8,'管理','icon-jinrong'),(117,8,'商业','icon-jinrong'),(118,8,'投资理财','icon-jinrong'),(119,8,'市场营销','icon-jinrong'),(120,8,'金融','icon-jinrong'),(121,10,'英语学习','icon-yingyu'),(122,10,'法语学习','icon-yingyu'),(123,10,'俄语学习','icon-yingyu'),(124,10,'日语','icon-yingyu'),(125,10,'其他','icon-yingyu'),(126,11,'长篇','icon-file'),(127,11,'中篇','icon-file'),(128,11,'短篇','icon-file'),(129,11,'故事','icon-file'),(130,11,'互动','icon-CSS'),(131,11,'散文随笔','icon-file'),(132,11,'寓言','icon-file'),(133,11,'诗歌','icon-file'),(134,11,'传记','icon-file'),(135,11,'回忆录','icon-file'),(136,11,'纪实','icon-file'),(137,11,'日记','icon-file'),(138,11,'杂文','icon-file'),(139,11,'评论','icon-file'),(140,11,'访谈','icon-file'),(141,11,'绘本','icon-huihua-yuanwenjian'),(142,11,'漫画','icon-huihua-yuanwenjian'),(143,12,'古典','icon-CSS'),(144,12,'近现代','icon-CSS'),(145,12,'当代','icon-CSS'),(146,13,'神话','icon-lishi'),(147,13,'山海经','icon-lishi'),(148,14,'名著','icon-temple-of-heaven'),(149,14,'红楼梦','icon-temple-of-heaven'),(150,14,'金瓶梅','icon-temple-of-heaven'),(151,14,'日刊','icon-temple-of-heaven'),(152,14,'月刊','icon-lishi'),(153,9,'成長','icon-zhuye_chengchangjilu'),(154,9,'心里自助','icon-zhuye_chengchangjilu'),(155,9,'职场','icon-position_2'),(156,9,'创业','icon-jinrong'),(157,9,'人际与社交','icon-position_2'),(158,9,'演讲与口才','icon-position_2'),(159,9,'时间管理','icon-shijian1'),(160,9,'ppt','icon-PPT'),(161,9,'ps','icon-Ps');

/*Table structure for table `think_type` */

DROP TABLE IF EXISTS `think_type`;

CREATE TABLE `think_type` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varbinary(200) NOT NULL,
  `image_url` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

/*Data for the table `think_type` */

insert  into `think_type`(`id`,`name`,`image_url`) values (1,'类型小说',''),(2,'流派',''),(3,'文化',''),(4,'it',''),(5,'生活实用',''),(6,'科学',''),(7,'艺术',''),(8,'经济管理',''),(9,'个人成长',''),(10,'外语学习',''),(11,'体裁 ',''),(12,'时间',''),(13,'神话',''),(14,'经典',''),(15,'官网专辑','');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
