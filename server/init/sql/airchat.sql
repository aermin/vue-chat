# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: localhost (MySQL 5.6.35)
# Database: airchat
# Generation Time: 2018-02-01 07:58:48 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table group_info
# ------------------------------------------------------------

DROP TABLE IF EXISTS `group_info`;

CREATE TABLE `group_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '群id',
  `group_name` varchar(20) NOT NULL DEFAULT '交流群' COMMENT '群名称',
  `group_notice` varchar(100) NOT NULL DEFAULT '欢迎大家入群交流~' COMMENT '群公告',
  `group_avator` varchar(50) NOT NULL DEFAULT '../../static/peoples1.jpg' COMMENT '群头像',
  `group_creater` int(11) NOT NULL COMMENT '群创建人',
  `creater_time` int(11) NOT NULL COMMENT '群创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `group_info` WRITE;
/*!40000 ALTER TABLE `group_info` DISABLE KEYS */;

INSERT INTO `group_info` (`id`, `group_name`, `group_notice`, `group_avator`, `group_creater`, `creater_time`)
VALUES
	(1,'技术交流群','欢迎大家入群交流~','../../static/peoples1.jpg',222,1516959330),
	(2,'闲聊群','欢迎大家入群交流~','../../static/peoples2.jpg',222,1516959400);

/*!40000 ALTER TABLE `group_info` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table group_msg
# ------------------------------------------------------------

DROP TABLE IF EXISTS `group_msg`;

CREATE TABLE `group_msg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from_user` int(11) NOT NULL COMMENT '谁发的',
  `to_group` int(11) NOT NULL COMMENT '群id',
  `message` text NOT NULL COMMENT '聊天信息',
  `time` int(11) NOT NULL COMMENT '发送时间',
  PRIMARY KEY (`id`),
  KEY `to_group` (`to_group`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `group_msg` WRITE;
/*!40000 ALTER TABLE `group_msg` DISABLE KEYS */;

INSERT INTO `group_msg` (`id`, `from_user`, `to_group`, `message`, `time`)
VALUES
	(1,1,1,'路飞:大家好，我是路飞',1517471290),
	(2,2,1,'索隆:你好，我是索隆，三刀流 ~~',1517471306),
	(3,1,2,'路飞:群里有人不？',1517471467),
	(4,3,1,'乔治:我是美食家 乔治 ಠ౪ಠ',1517471547);

/*!40000 ALTER TABLE `group_msg` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table group_user_relation
# ------------------------------------------------------------

DROP TABLE IF EXISTS `group_user_relation`;

CREATE TABLE `group_user_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `group_user_relation` WRITE;
/*!40000 ALTER TABLE `group_user_relation` DISABLE KEYS */;

INSERT INTO `group_user_relation` (`id`, `group_id`, `user_id`)
VALUES
	(1,1,1),
	(2,2,1),
	(3,1,2),
	(4,1,3),
	(5,2,4),
	(6,2,3),
	(7,2,5);

/*!40000 ALTER TABLE `group_user_relation` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table private__msg
# ------------------------------------------------------------

DROP TABLE IF EXISTS `private__msg`;

CREATE TABLE `private__msg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from_user` int(11) NOT NULL COMMENT '谁发的',
  `to_user` int(11) NOT NULL COMMENT '发给谁',
  `message` text NOT NULL COMMENT '聊天信息',
  `time` int(11) NOT NULL COMMENT '发送时间',
  PRIMARY KEY (`id`),
  KEY `from_user` (`from_user`),
  KEY `to_user` (`to_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `private__msg` WRITE;
/*!40000 ALTER TABLE `private__msg` DISABLE KEYS */;

INSERT INTO `private__msg` (`id`, `from_user`, `to_user`, `message`, `time`)
VALUES
	(1,2,1,'索隆:路飞 在么',1517471113),
	(2,1,2,'路飞:在 咋了？ 教我三刀流？',1517471141),
	(3,2,3,'索隆:乔治 你的悬赏图头像很帅啊',1517471361),
	(4,1,3,'路飞:晚上吃鸡？',1517471694),
	(5,1,4,'路飞:罗 ......',1517471725);

/*!40000 ALTER TABLE `private__msg` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user_info
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_info`;

CREATE TABLE `user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT 'NOT NULL' COMMENT '用户名',
  `password` varchar(40) NOT NULL DEFAULT 'NOT NULL' COMMENT '密码',
  `sex` varchar(2) DEFAULT NULL COMMENT '性别',
  `avator` varchar(100) NOT NULL DEFAULT '../../static/people1.jpg' COMMENT '头像',
  `place` varchar(50) DEFAULT NULL COMMENT '来自哪里',
  `last_login` int(10) NOT NULL COMMENT '最后登陆时间',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '在线状态,0离线,1在线',
  `socketid` varchar(20) NOT NULL DEFAULT '' COMMENT '登陆时的socketid',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;

INSERT INTO `user_info` (`id`, `name`, `password`, `sex`, `avator`, `place`, `last_login`, `status`, `socketid`)
VALUES
	(1,'路飞','6512bd43d9caa6e02c990b0a82652dca','男','../../static/people1.jpg','厦门',0,0,'550AVueaNScQcNylAAA4'),
	(2,'索隆','b6d767d2f8ed5d21a44b0e5886680cb9','男','../../static/people2.jpg','深圳',0,0,'5klAv2Ww107OptH5AAA3'),
	(3,'乔治','182be0c5cdcd5072bb1864cdee4d3d6e','女','../../static/people3.jpg','杭州',0,0,'5klAv2Ww107OptH5AAA3'),
	(4,'罗','f7177163c833dff4b38fc8d2872f1ec6','女','../../static/people4.jpg','广州',0,0,''),

/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user_user_relation
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_user_relation`;

CREATE TABLE `user_user_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户',
  `other_user_id` int(11) NOT NULL COMMENT '用户的朋友',
  `remark` varchar(10) DEFAULT '' COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user_user_relation` WRITE;
/*!40000 ALTER TABLE `user_user_relation` DISABLE KEYS */;

INSERT INTO `user_user_relation` (`id`, `user_id`, `other_user_id`, `remark`)
VALUES
	(1,1,2,''),
	(2,1,3,'老三'),
	(3,1,4,'老四'),
	(4,2,1,'大哥'),
	(5,2,3,''),
	(6,3,2,'二师兄');

/*!40000 ALTER TABLE `user_user_relation` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
