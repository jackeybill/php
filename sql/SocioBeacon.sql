SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/* 添加设备表 */
CREATE TABLE IF NOT EXISTS `cj_device` (
  `device_id` bigint(20) NOT NULL COMMENT '设备ID',
  `device_name` varchar(200) DEFAULT '' COMMENT '设备名称',
  `userid_int` int(11) NOT NULL DEFAULT '0',
  `uuid` varchar(50) NOT NULL,
  `major` int(11) NOT NULL,
  `minor` int(11) NOT NULL,
  `status` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '激活状态，0：未激活，1：已激活（但不活跃），2：活跃',
  `poi_id` int(11) NOT NULL DEFAULT '0' COMMENT '门店ID',
  `page_ids` varchar(2000) DEFAULT '' COMMENT '与此设备关联的页面ID列表，用逗号隔开',
  `comment` varchar(200) DEFAULT '',
  PRIMARY KEY(`device_id`),
  /*UNIQUE KEY `uuid` (`uuid`),*/
  KEY `userid` (`userid_int`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

INSERT INTO `cj_device` (`device_id`, `device_name`, `userid_int`, `uuid`, `major`,`minor`, `status`, `poi_id`, `comment`) VALUES
(667713,'正门口',1,'FDA50693-A4E2-4FB1-AFCF-C6EB07647825',10007,32528,2,0,'yifeiyang'),
(667718,'服务区',1,'FDA50693-A4E2-4FB1-AFCF-C6EB07647826',10007,32543,2,0,'dmo2'),
(778909,'大厅',1,'FDA50693-A4E2-4FB1-AFCF-C6EB07647827',10008,3492,1,0,'3'),
(778910,'玩具区',1,'FDA50693-A4E2-4FB1-AFCF-C6EB07647828',10008,3502,1,0,'4'),
(778911,'服装区',1,'FDA50693-A4E2-4FB1-AFCF-C6EB07647829',10008,3508,1,0,'7'),
(778912,'化妆品区',1,'FDA50693-A4E2-4FB1-AFCF-C6EB07647830',10008,3513,1,0,'10'),
(779003,'鞋帽区',1,'FDA50693-A4E2-4FB1-AFCF-C6EB07647831',10008,3505,1,0,'5'),
(779004,'户外运动区',1,'FDA50693-A4E2-4FB1-AFCF-C6EB07647832',10008,3507,1,0,'6'),
(779005,'餐饮区',0,'FDA50693-A4E2-4FB1-AFCF-C6EB07647833',10008,3504,1,0,'8'),
(779006,'礼品区',0,'FDA50693-A4E2-4FB1-AFCF-C6EB07647834',10008,3510,1,0,'9');

/* 添加设备与场景关联表
CREATE TABLE IF NOT EXISTS `cj_device_scene` (
  `device_id` bigint(50) NOT NULL  COMMENT '设备ID',
  `sceneid_bigint` bigint(20) NOT NULL,
  `page_id` int(11) NOT NULL DEFAULT '0' COMMENT '微信的页面ID，没有分配，默认为0',
  `create_time` datetime,
  `update_time` datetime,
  KEY `deviceid` (`device_id`) USING BTREE,
  KEY `sceneid` (`sceneid_bigint`) USING BTREE,
  foreign key (device_id) references cj_device(device_id),
  foreign key (sceneid_bigint) references cj_scene(sceneid_bigint),
  UNIQUE KEY `page` (`device_id`, `page_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

INSERT INTO `cj_device_scene` VALUES (667713,266902);
*/

/* 添加设备与场景关联表 */
CREATE TABLE IF NOT EXISTS `cj_statisticsweixin` (
  `id` bigint(50) NOT NULL  COMMENT '设备ID/PageId',
  `ftime` datetime COMMENT '当天0点对应的时间戳',
  `ftype` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '统计类型，0：按设备，1：按页面',
  `click_pv` int(11) NOT NULL DEFAULT '0' COMMENT '点击摇周边消息的次数',
  `click_uv` int(11) NOT NULL DEFAULT '0' COMMENT '点击摇周边消息的人数',
  `shake_pv` int(11) NOT NULL DEFAULT '0' COMMENT '摇周边的次数',
  `shake_uv` int(11) NOT NULL DEFAULT '0' COMMENT '摇周边的人数',
  PRIMARY KEY(`id`,`ftime`,`ftype`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

INSERT INTO `cj_statisticsweixin` VALUES (667713,'2015-07-04 23:11:28',0,5,6,4,5);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;