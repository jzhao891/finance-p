/*
MySQL Data Transfer
Source Host: localhost
Source Database: finance
Target Host: localhost
Target Database: finance
Date: 2009-2-13 23:12:59
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for contactinfo
-- ----------------------------
DROP TABLE IF EXISTS `contactinfo`;
CREATE TABLE `contactinfo` (
  `contactid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  PRIMARY KEY  (`contactid`),
  UNIQUE KEY `userid` (`userid`),
  KEY `FK27978CEB38D740D` (`userid`),
  CONSTRAINT `FK27978CEB38D740D` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for finance_goods_detail
-- ----------------------------
DROP TABLE IF EXISTS `finance_goods_detail`;
CREATE TABLE `finance_goods_detail` (
  `id` bigint(20) NOT NULL,
  `goods_id` bigint(20) default NULL,
  `create_date` datetime default NULL,
  `creator_id` int(11) default NULL,
  `iouser_id` int(11) default NULL,
  `finance_type` int(11) default NULL,
  `goods_num` int(11) default NULL,
  `unit_price` double default NULL,
  `total` double default NULL,
  PRIMARY KEY  (`id`),
  KEY `FK7248DD9F1F60B52E` (`goods_id`),
  CONSTRAINT `FK7248DD9F1F60B52E` FOREIGN KEY (`goods_id`) REFERENCES `goods_detail` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for finance_money_detail
-- ----------------------------
DROP TABLE IF EXISTS `finance_money_detail`;
CREATE TABLE `finance_money_detail` (
  `id` bigint(20) NOT NULL,
  `creator_id` int(11) NOT NULL COMMENT '创建人ID',
  `create_date` datetime NOT NULL,
  `borrow_userid` bigint(20) default NULL COMMENT '债务人ID',
  `loan_date` date default NULL COMMENT '借款日期',
  `fallin_date` date default NULL COMMENT '到期还款日',
  `total_arrearage` double NOT NULL COMMENT '欠款总额',
  `requited_ arrearage` double default NULL COMMENT '已还总额',
  `finance_type` varchar(2) collate utf8_bin NOT NULL COMMENT '借入(0)、借出(1)类型',
  `debt_type` varchar(2) collate utf8_bin NOT NULL COMMENT '债务类型(现金0、银行转帐1、支票2)',
  `remark` varchar(255) collate utf8_bin default NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `PK_FINANCE_MONEY_DETAIL_ID` (`id`),
  KEY `fd_finance_money_detail_inouttype` (`finance_type`),
  KEY `FD_FINANCE_MONEY_DETAIL_BORROWUID` (`borrow_userid`),
  CONSTRAINT `finance_money_detail_ibfk_1` FOREIGN KEY (`borrow_userid`) REFERENCES `iouser` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for goods_detail
-- ----------------------------
DROP TABLE IF EXISTS `goods_detail`;
CREATE TABLE `goods_detail` (
  `id` bigint(20) NOT NULL,
  `creator_id` bigint(20) default NULL COMMENT '创建人ID',
  `create_date` date default NULL COMMENT '创建时间',
  `goods_name` varchar(100) collate utf8_bin default NULL COMMENT '物品名称',
  `goods_unit` varchar(20) collate utf8_bin default NULL COMMENT '物品单位',
  `unit_price` double default NULL COMMENT '单价',
  `remark` text collate utf8_bin COMMENT '备注',
  `type_id` bigint(20) default NULL COMMENT '物品归属类型',
  PRIMARY KEY  (`id`),
  KEY `FK7A37B15A76C5B3F3` (`type_id`),
  CONSTRAINT `goods_detail_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `goods_type` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for goods_type
-- ----------------------------
DROP TABLE IF EXISTS `goods_type`;
CREATE TABLE `goods_type` (
  `id` bigint(20) NOT NULL,
  `creator_id` bigint(20) default NULL COMMENT '创建人ID',
  `create_date` date default NULL COMMENT '创建时间',
  `type_name` varchar(100) collate utf8_bin default NULL COMMENT '品物类型名称',
  `parent_id` bigint(20) default NULL COMMENT '父类型',
  `remark` text collate utf8_bin COMMENT '注备',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for iouser
-- ----------------------------
DROP TABLE IF EXISTS `iouser`;
CREATE TABLE `iouser` (
  `id` bigint(20) NOT NULL,
  `group_id` int(20) default '-1',
  `user_name` varchar(16) collate utf8_bin NOT NULL COMMENT '借入出用户姓名',
  `creator_id` int(11) default NULL COMMENT '创建人ID',
  `sex` varchar(1) collate utf8_bin default NULL COMMENT '别性',
  `age` int(11) default NULL COMMENT '年龄',
  `company_name` varchar(100) collate utf8_bin default NULL COMMENT '公司名称',
  `home_address` varchar(200) collate utf8_bin default NULL COMMENT '家庭住址',
  `company_address` varchar(200) collate utf8_bin default NULL COMMENT '公司地址',
  `company_zip` varchar(6) collate utf8_bin default NULL COMMENT '公司邮编',
  `home_zip` varchar(6) collate utf8_bin default NULL COMMENT '家庭邮编',
  `home_phone` varchar(50) collate utf8_bin default NULL COMMENT '家庭电话',
  `company_phone` varchar(50) collate utf8_bin default NULL COMMENT '公司电话',
  `mobile_phone` varchar(50) collate utf8_bin default NULL COMMENT '手机',
  `order_num` int(5) default NULL COMMENT '排序号',
  `remark` varchar(4000) collate utf8_bin default NULL COMMENT '注备',
  PRIMARY KEY  (`id`),
  UNIQUE KEY `PK_IOUSER_ID` (`id`),
  KEY `FK_IOUSER_GROUPID` (`group_id`),
  KEY `FD_IOUSER_USERNAME` (`user_name`),
  KEY `FD_IOUSER_PHONE` (`mobile_phone`),
  CONSTRAINT `FK_IOUSER_GROUPID` FOREIGN KEY (`group_id`) REFERENCES `iouser_group_relation` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for iouser_group_relation
-- ----------------------------
DROP TABLE IF EXISTS `iouser_group_relation`;
CREATE TABLE `iouser_group_relation` (
  `id` int(11) NOT NULL default '0',
  `creator_id` int(11) default NULL COMMENT '创建人',
  `create_date` date default NULL COMMENT '创建日期',
  `group_name` varchar(50) collate utf8_bin NOT NULL COMMENT '分组名称',
  `parent_id` int(11) NOT NULL default '-1' COMMENT '父类型(默认为-1根类型)',
  `order_num` int(5) default NULL COMMENT '排序号',
  `remark` varchar(1000) collate utf8_bin default NULL COMMENT '注备',
  PRIMARY KEY  (`id`),
  UNIQUE KEY `PK_GROUP_RELATION_ID` (`id`),
  KEY `FK_GROUP_RELATION_GROUPID` (`parent_id`),
  KEY `FK_GROUP_RELATION_CREATORID` (`creator_id`),
  CONSTRAINT `FK_GROUP_RELATION_CREATORID` FOREIGN KEY (`creator_id`) REFERENCES `user` (`userid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_GROUP_RELATION_GROUPID` FOREIGN KEY (`parent_id`) REFERENCES `iouser_group_relation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='InnoDB free: 3072 kB';

-- ----------------------------
-- Table structure for talk
-- ----------------------------
DROP TABLE IF EXISTS `talk`;
CREATE TABLE `talk` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) default NULL,
  `message` text collate utf8_bin,
  `msg_date` datetime default NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `FK3634ACDC9D2FF6` (`user_id`),
  CONSTRAINT `FK3634ACDC9D2FF6` FOREIGN KEY (`user_id`) REFERENCES `user` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userid` int(11) NOT NULL,
  `userName` varchar(255) collate utf8_bin NOT NULL COMMENT '户用姓名',
  `loginName` varchar(255) collate utf8_bin NOT NULL COMMENT '录登名',
  `password` varchar(8) collate utf8_bin NOT NULL COMMENT '码密',
  PRIMARY KEY  (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records 
-- ----------------------------
INSERT INTO `finance_money_detail` VALUES ('8', '1', '2008-11-04 12:27:04', '6', '2008-11-04', '2008-11-27', '353.42', '53.42', '0', '0', '忘记了');
INSERT INTO `finance_money_detail` VALUES ('9', '1', '2008-11-04 12:27:20', '3', '2008-10-31', '2008-11-07', '4543.99', '300', '0', '0', '投资XX股票');
INSERT INTO `finance_money_detail` VALUES ('10', '1', '2008-11-04 12:27:54', '1', '2008-10-31', '2008-11-22', '23.42', '23.42', '0', '0', '测试使用的，呵呵');
INSERT INTO `finance_money_detail` VALUES ('11', '1', '2008-11-04 22:28:37', '2', '2008-11-03', '2008-11-26', '4353', '4353', '0', '1', '学费');
INSERT INTO `finance_money_detail` VALUES ('12', '1', '2008-11-24 18:04:00', '6', '2008-11-20', '2008-12-05', '3223.23', '3200.23', '0', '2', '');
INSERT INTO `finance_money_detail` VALUES ('13', '1', '2008-11-26 14:15:25', '3', '2008-11-13', '2008-12-06', '232.32', '232.32', '1', '0', '买XX借钱');
INSERT INTO `finance_money_detail` VALUES ('14', '1', '2008-11-26 14:15:56', '8', '2008-11-19', '2008-12-05', '5769.45', '5769.45', '1', '0', '为XX事借款');
INSERT INTO `finance_money_detail` VALUES ('15', '1', '2008-11-26 14:17:00', '6', '2008-10-30', '2008-12-05', '847.56', '47.56', '0', '2', '测试');
INSERT INTO `finance_money_detail` VALUES ('16', '1', '2008-11-26 14:17:28', '10', '2008-11-12', '2008-11-29', '875.32', '875.32', '1', '1', '上次的已还清');
INSERT INTO `finance_money_detail` VALUES ('17', '1', '2008-11-26 15:43:36', '13', '2008-11-20', '2008-12-06', '989.98', '2084', '0', '0', '我说，龙哥没钱花了给几个子呗？');
INSERT INTO `finance_money_detail` VALUES ('18', '1', '2008-11-26 15:44:15', '14', '2008-11-12', '2008-12-06', '767.57', '767.57', '1', '0', '');
INSERT INTO `finance_money_detail` VALUES ('19', '2', '2008-11-26 22:11:01', '16', '2008-11-05', '2008-12-06', '6754.45', '400', '1', '1', '一个美女');
INSERT INTO `finance_money_detail` VALUES ('20', '1', '2008-12-01 22:38:05', '9', '2008-12-01', '2009-01-02', '8573.42', '8573.42', '1', '1', 's');
INSERT INTO `finance_money_detail` VALUES ('21', '1', '2008-12-09 16:50:40', '9', '2008-12-02', '2009-01-01', '8967.68', '8967.68', '1', '0', 'kjl');
INSERT INTO `finance_money_detail` VALUES ('22', '1', '2008-12-13 20:50:45', '13', '2008-12-08', '2009-12-26', '1000', '345', '1', '0', '11111');
INSERT INTO `finance_money_detail` VALUES ('24', '1', '2008-12-22 14:25:29', '7', '2008-12-17', '2009-01-01', '0.23', '0', '1', '0', 'df');
INSERT INTO `finance_money_detail` VALUES ('25', '2', '2008-12-22 18:45:34', '16', '2008-12-09', '2009-01-09', '786.85', '0', '1', '0', 's');
INSERT INTO `finance_money_detail` VALUES ('29', '2', '2008-12-22 21:07:54', '16', '2008-12-10', '2009-01-10', '3454.34', '0', '1', '0', 'ccss');
INSERT INTO `finance_money_detail` VALUES ('31', '1', '2008-12-22 22:02:23', '12', '2008-12-17', '2009-01-09', '766.54', '7656.54', '0', '0', 'wdsf');
INSERT INTO `finance_money_detail` VALUES ('33', '1', '2008-12-22 22:35:37', '9', '2008-12-17', '2009-01-10', '999.98', '0', '0', '0', '测试一下');
INSERT INTO `finance_money_detail` VALUES ('36', '1', '2008-12-22 22:52:22', '12', '2008-12-11', '2009-01-10', '873.23', '0', '1', '0', 'nn');
INSERT INTO `finance_money_detail` VALUES ('37', '1', '2008-12-22 22:53:50', '2', '2008-12-17', '2009-01-10', '89742', '8900', '0', '0', 'dsef款备');
INSERT INTO `finance_money_detail` VALUES ('38', '1', '2008-12-22 22:55:19', '12', '2008-12-18', '2010-12-25', '67.56', '0', '0', '0', '');
INSERT INTO `finance_money_detail` VALUES ('41', '1', '2008-12-22 23:02:21', '9', '2008-12-16', '2009-01-10', '232.44', '0', '1', '0', 'sdfwe');
INSERT INTO `finance_money_detail` VALUES ('42', '1', '2008-12-23 12:34:09', '9', '2008-12-18', '2009-01-30', '897.89', '897.89', '0', '0', '67');
INSERT INTO `finance_money_detail` VALUES ('44', '1', '2008-12-25 13:31:49', '12', '2008-12-09', '2009-01-30', '3455.46', '344', '0', '2', '');
INSERT INTO `finance_money_detail` VALUES ('45', '1', '2008-12-27 10:55:04', '33', '2008-12-02', '2009-01-31', '3243.24', '0', '0', '1', '');
INSERT INTO `finance_money_detail` VALUES ('46', '1', '2008-12-27 10:55:54', '6', '2008-12-09', '2009-01-09', '4.54', '0', '0', '0', '');
INSERT INTO `finance_money_detail` VALUES ('47', '1', '2008-12-27 10:56:52', '10', '2008-12-16', '2009-01-10', '234.32', '0', '0', '0', 'sd');
INSERT INTO `finance_money_detail` VALUES ('49', '10', '2009-01-03 19:08:11', '47', '2008-12-29', '2009-04-16', '6000', '166', '0', '1', '学费');
INSERT INTO `finance_money_detail` VALUES ('50', '10', '2009-01-03 19:08:51', '48', '2008-12-31', '2009-01-29', '300', '100', '1', '0', '房租');
INSERT INTO `finance_money_detail` VALUES ('51', '10', '2009-01-03 19:10:36', '49', '2009-01-01', '2009-06-25', '10000', '0', '1', '0', '投资');
INSERT INTO `finance_money_detail` VALUES ('53', '10', '2009-01-03 22:05:19', '51', '2008-12-16', '2009-04-03', '234.23', '234.23', '0', '0', 'wef');
INSERT INTO `finance_money_detail` VALUES ('57', '2', '2009-01-11 03:50:23', '16', '2008-12-31', '2009-01-30', '88.88', '8.88', '0', '0', '');
INSERT INTO `finance_money_detail` VALUES ('58', '1', '2009-01-23 22:21:13', '53', '2009-01-23', '2009-02-06', '500', '500', '0', '0', 'sdfsdf');
INSERT INTO `finance_money_detail` VALUES ('59', '10', '2009-01-24 10:02:49', '49', '2009-01-07', '2009-01-28', '563.45', '0', '0', '0', 'g');
INSERT INTO `goods_detail` VALUES ('1', '1', '2008-09-30', '817专用', '支', '135.7', '', '1');
INSERT INTO `goods_detail` VALUES ('2', '1', '2008-09-30', '红霉素注射液', '支', '12.45', '', '2');
INSERT INTO `goods_detail` VALUES ('7', '1', '2008-11-26', '516专用', '袋', '150', 0xE8B4A7E6BA90EFBC9AE9B281E88E98E9A5B2E69699E58E82, '30');
INSERT INTO `goods_detail` VALUES ('8', '1', '2008-11-26', 'henry专用饲料', '袋', '25022.22', 0xE68891E88D89EFBC8CE8BF99E69588E69E9CE79C9F746D64E4B88DE99499E5958A, '32');
INSERT INTO `goods_detail` VALUES ('9', '2', '2008-12-22', '11112345', '袋', '332.32', 0x6473667765, '35');
INSERT INTO `goods_detail` VALUES ('12', '10', '2009-01-03', '方便面', '袋', '4', 0xE696B9E4BEBFE99DA2, '41');
INSERT INTO `goods_detail` VALUES ('13', '10', '2009-01-03', '洗发水', '瓶', '35', 0xE6B5B7E9A39EE4B89D, '40');
INSERT INTO `goods_detail` VALUES ('17', '2', '2009-01-16', 'ssssss', '瓶', '232.34', 0x323334, '35');
INSERT INTO `goods_detail` VALUES ('18', '2', '2009-01-16', 'ddddd', '袋', '34.24', 0x6466776566, '36');
INSERT INTO `goods_detail` VALUES ('19', '2', '2009-01-16', '234324', '袋', '324324.32', 0x736677776566, '36');
INSERT INTO `goods_type` VALUES ('1', '1', '2008-09-30', '猪用饲料', null, 0xE78CAAE794A8E9A5B2E69699E78CAAE794A8E9A5B2E69699);
INSERT INTO `goods_type` VALUES ('2', '1', '2008-09-30', '注射液', null, 0xE585BDE794A8E6B3A8E5B084E6B6B2);
INSERT INTO `goods_type` VALUES ('30', '1', '2008-10-08', '乳猪专用', '1', 0xE5B08FE78CAAE4BDBFE794A8E79A84E9A5B2E69699);
INSERT INTO `goods_type` VALUES ('32', '1', '2008-10-08', '青霉素', '2', 0xE5B08FE694AFE99D92E99C89E7B4A0);
INSERT INTO `goods_type` VALUES ('33', '4', '2008-10-31', '铬', '28', 0x646464);
INSERT INTO `goods_type` VALUES ('34', '1', '2008-11-09', '饲料', '0', 0xE59084E7A78DE9A5B2E69699);
INSERT INTO `goods_type` VALUES ('35', '2', '2008-11-26', '粉性青霉素', '32', 0xE794A8E585B6E4BB96E6B3A8E5B084E6B6B2E89E8DE58C96);
INSERT INTO `goods_type` VALUES ('36', '2', '2008-11-26', '819专用', '1', 0xE8B4A7E6BA90EFBC9AE5B1B1E4B89CE5BEB7E5B79EE98791E794B2E9A5B2E69699E58E82);
INSERT INTO `goods_type` VALUES ('40', '10', '2009-01-03', '日常用品', '0', 0xE697A5E5B8B8E794A8E59381);
INSERT INTO `goods_type` VALUES ('41', '10', '2009-01-03', '食品', '0', 0xE59084E7B1BBE9A39FE59381);
INSERT INTO `goods_type` VALUES ('42', '1', '2009-01-03', '闫洪磊', '1', 0xE59388E59388);
INSERT INTO `iouser` VALUES ('1', '-1', '闫洪磊', '1', '1', '21', '上海市中信信息股份有限公司', '山东的', '上海市中江路879号11号楼', '200333', '252416', '0635-66668888', '021-51077677-2007', '13764944102', '1', '主要做OA、档案、硬件集成');
INSERT INTO `iouser` VALUES ('2', '5', '张小丽', '1', '0', '26', '河北省保定市XXX饲料厂', '河北省保定市', '河北省保定市XXX路83号', '', '', '0635-66669999', '--', '15942583475', '2', '猪料');
INSERT INTO `iouser` VALUES ('3', '4', '梁愚', '1', '1', '25', '未知', '黑龙江', '', '', '', '', '--', '13636610307', null, '好哥们');
INSERT INTO `iouser` VALUES ('6', '5', '李贞', '1', '0', '22', '', '上海金沙江路2208弄51号302室', '', '', '200333', '021-34857456', '--', '13648583845', null, '一个陌生女人');
INSERT INTO `iouser` VALUES ('7', '4', '马海港', '1', '1', '27', 'XX生物药业', '滨州XX县城', '', '', '', '', '--', '13661786379', '3', '老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡老乡');
INSERT INTO `iouser` VALUES ('8', '4', '金家正', '1', '1', '25', '某某外贸公司', '常州', '中山公园附近', '200345', '', '021-56845751', '021-54756854-2008', '15945824651', null, '东北的');
INSERT INTO `iouser` VALUES ('9', '20', '聂超', '1', '1', '24', '上海中信信息发展股份有限公司', '长沙', '上海市中江路879号', '200333', '', '', '021-51077666-2009', '15825465247', null, '同事');
INSERT INTO `iouser` VALUES ('10', '4', '任克川', '1', '1', '27', '未知', '武汉', '长宁', '', '524512', '0635-88888888', '021-54125875-2006', '13156845742', '4', '任克川任');
INSERT INTO `iouser` VALUES ('11', '1', '测试1', null, null, '34', null, null, null, null, null, null, null, null, '10', null);
INSERT INTO `iouser` VALUES ('12', '33', '李嘉诚', '1', '1', '56', '未知', '香港九龙', '32', '', '', '', '--', '15856453456', null, '香港富豪');
INSERT INTO `iouser` VALUES ('13', '25', '成龙', '1', '1', '43', '龙视', '香港', 'X街68号', '', '', '', '--', '13932562654', null, '国际影星1234');
INSERT INTO `iouser` VALUES ('14', '9', '孙燕姿', '1', '0', '25', '', '', '', '', '', '', '--', '13746424657', '6', '著名歌星 ');
INSERT INTO `iouser` VALUES ('16', '-1', '张勤勤', '2', '0', '23', '上海金甲科技', '东北的', '', '', '', '', '--', '13857234758', null, '上海金甲科技');
INSERT INTO `iouser` VALUES ('17', null, 'xspx', '2', '0', '11', 'sssss', '', 'xxxxxx', '', '', '', '--', '', null, '');
INSERT INTO `iouser` VALUES ('19', null, 'erwr', '2', '0', '23', '', '', '', '', '', '', '--', '', null, '');
INSERT INTO `iouser` VALUES ('33', '26', '吴彦祖', '1', '1', '30', '', '', '', '', '', '', '--', '', null, '娱乐圈');
INSERT INTO `iouser` VALUES ('44', '30', '林超', '2', '1', '24', '', '', '', '', '', '', '--', '', null, '1');
INSERT INTO `iouser` VALUES ('45', '30', '南波恩', '2', '1', '27', '上海中信信息', '', '', '', '', '', '--', '', null, '');
INSERT INTO `iouser` VALUES ('47', '37', '梁寓', '10', '1', '24', '', '黑龙江', '', '', '', '', '--', '13865653852', null, '');
INSERT INTO `iouser` VALUES ('48', '38', '马海港', '10', '1', '28', '', '', '', '', '', '', '--', '15927235837', null, '老乡');
INSERT INTO `iouser` VALUES ('49', '37', '金家正', '10', '1', '25', '', '', '', '', '', '', '--', '', null, '做外贸的');
INSERT INTO `iouser` VALUES ('51', '35', '聂超', '10', '1', '24', '上海中信信息发展股份有限公司', '', '', '', '', '', '--', '', null, 'we');
INSERT INTO `iouser` VALUES ('52', '22', '2323', '1', '1', '32', '', '', '', '', '', '', '--', '', null, '');
INSERT INTO `iouser` VALUES ('53', '3', '闫洪顺', '1', '1', '23', '', '', '', '', '', '', '--', '', null, '');
INSERT INTO `iouser_group_relation` VALUES ('-1', '1', '2008-11-28', '账务管理系统', '-1', '0', null);
INSERT INTO `iouser_group_relation` VALUES ('1', '1', '2008-11-28', '朋友', '-1', '2', null);
INSERT INTO `iouser_group_relation` VALUES ('2', '1', '2008-11-28', '同事', '-1', '3', null);
INSERT INTO `iouser_group_relation` VALUES ('3', '1', '2008-11-29', '家人', '-1', '1', null);
INSERT INTO `iouser_group_relation` VALUES ('4', '1', '2008-11-29', '好哥们', '1', '1', null);
INSERT INTO `iouser_group_relation` VALUES ('5', '1', '2008-11-29', '普通朋友', '1', '2', null);
INSERT INTO `iouser_group_relation` VALUES ('6', '1', '2008-11-29', '地区', '-1', '4', null);
INSERT INTO `iouser_group_relation` VALUES ('7', '1', '2008-11-29', '上海', '6', '2', null);
INSERT INTO `iouser_group_relation` VALUES ('8', '1', '2008-11-29', '聊城', '6', '3', null);
INSERT INTO `iouser_group_relation` VALUES ('9', '1', '2008-11-29', '明星', '-1', '4', null);
INSERT INTO `iouser_group_relation` VALUES ('10', null, null, 'fffff', '-1', null, 'sss');
INSERT INTO `iouser_group_relation` VALUES ('11', null, null, 'hhhhhh', '-1', null, 'ssss');
INSERT INTO `iouser_group_relation` VALUES ('12', null, null, 'weewew', '1', null, '');
INSERT INTO `iouser_group_relation` VALUES ('13', null, null, 'jjjjjj', '1', null, 'ddreeer');
INSERT INTO `iouser_group_relation` VALUES ('20', '1', '2008-12-09', 'CES', '2', null, '上海中信信息发展股份有限公司');
INSERT INTO `iouser_group_relation` VALUES ('21', '1', '2008-12-10', '大伯', '3', null, '');
INSERT INTO `iouser_group_relation` VALUES ('22', '1', '2008-12-10', '四叔', '3', null, '');
INSERT INTO `iouser_group_relation` VALUES ('23', null, null, '测试', '21', null, 'nnn');
INSERT INTO `iouser_group_relation` VALUES ('24', '1', '2008-12-10', '大陆', '9', null, '大陆区明星');
INSERT INTO `iouser_group_relation` VALUES ('25', '1', '2008-12-10', '香港', '9', null, '香港区明星');
INSERT INTO `iouser_group_relation` VALUES ('26', '1', '2008-12-10', '台湾', '9', null, '台湾区明星');
INSERT INTO `iouser_group_relation` VALUES ('27', '1', '2008-12-15', '上海', '24', null, '');
INSERT INTO `iouser_group_relation` VALUES ('29', '2', '2008-12-17', '同事', '-1', null, '');
INSERT INTO `iouser_group_relation` VALUES ('30', '2', '2008-12-17', 'CES', '29', null, '');
INSERT INTO `iouser_group_relation` VALUES ('31', '2', '2008-12-22', '未知', '29', null, '下一家公司下一家公司下一家公司下一家公司下一家公司下一家公司下一家公司下一家公司下一家公司下一家公司下一家公司下一家公司下一家公司');
INSERT INTO `iouser_group_relation` VALUES ('33', '1', '2008-12-27', '商务', '-1', null, '');
INSERT INTO `iouser_group_relation` VALUES ('34', '10', '2009-01-03', '同事', '-1', null, '同事');
INSERT INTO `iouser_group_relation` VALUES ('35', '10', '2009-01-03', 'CES', '34', null, '上海中信信息发展股份有限公司');
INSERT INTO `iouser_group_relation` VALUES ('36', '10', '2009-01-03', '朋友', '-1', null, '');
INSERT INTO `iouser_group_relation` VALUES ('37', '10', '2009-01-03', '上海', '36', null, '');
INSERT INTO `iouser_group_relation` VALUES ('38', '10', '2009-01-03', '好哥们', '36', null, '');
INSERT INTO `iouser_group_relation` VALUES ('39', '10', '2009-01-15', '老乡', '-1', null, '');
INSERT INTO `iouser_group_relation` VALUES ('41', '10', '2009-01-16', '聊城', '39', null, '');
INSERT INTO `iouser_group_relation` VALUES ('42', '10', '2009-01-24', '家人', '-1', null, '');
INSERT INTO `talk` VALUES ('1', '1', 0x64646464, '2008-09-30 13:25:40');
INSERT INTO `user` VALUES ('1', '闫洪磊', 'hy', '000000');
INSERT INTO `user` VALUES ('2', '测试用户', 'test', '000000');
INSERT INTO `user` VALUES ('3', 'wfly', 'wfly126', '860304');
INSERT INTO `user` VALUES ('4', 'iamzn', 'iamzn', '123456');
INSERT INTO `user` VALUES ('5', '聂超', 'vernal', '000000');
INSERT INTO `user` VALUES ('6', '测试用户一', 'test1', '000000');
INSERT INTO `user` VALUES ('7', '任克川', '任克川', '000000');
INSERT INTO `user` VALUES ('8', '王宝勤', '王宝勤', '111111');
INSERT INTO `user` VALUES ('9', 'jjj', 'jj', 'jjjjjj');
INSERT INTO `user` VALUES ('10', '闫洪磊', 'yhl', '000000');
