
CREATE TABLE `user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT 'NOT NULL' COMMENT '用户名',
  `password` varchar(40) NOT NULL DEFAULT 'NOT NULL' COMMENT '密码',
  `sex` varchar(2) DEFAULT NULL COMMENT '性别',
  `avatar` varchar(100) NOT NULL DEFAULT '../../static/prople1.jpg' COMMENT '头像',
  `place` varchar(50) DEFAULT NULL COMMENT '来自哪里',
  `last_login` int(10) NOT NULL COMMENT '最后登陆时间',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '在线状态,0离线,1在线',
  `socketid` varchar(20) NOT NULL DEFAULT 'NOT NULL' COMMENT '登陆时的socketid',
  PRIMARY KEY (`id`),
  KEY `socketid` (`socketid`)
) ENGINE=MyISAM AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;



CREATE TABLE `group_message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from_user` int(11) NOT NULL COMMENT '谁发的',
  `to_group` int(11) NOT NULL COMMENT '群id',
  `message` varchar(500) NOT NULL DEFAULT 'NOT NULL' COMMENT '聊天信息',
  `time` int(11) NOT NULL COMMENT '发送时间',
  PRIMARY KEY (`id`),
  KEY `to_group` (`to_group`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `user__message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from_user` int(11) NOT NULL COMMENT '谁发的',
  `to_user` int(11) NOT NULL COMMENT '发给谁',
  `message` varchar(500) NOT NULL DEFAULT 'NOT NULL' COMMENT '聊天信息',
  `time` int(11) NOT NULL COMMENT '发送时间',
  `has_read` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否已读,0未读,1已读',
  PRIMARY KEY (`id`),
  KEY `from_user` (`from_user`),
  KEY `to_user` (`to_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
