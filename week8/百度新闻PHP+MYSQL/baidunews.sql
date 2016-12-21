-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2016-09-27 12:59:32
-- 服务器版本： 10.1.13-MariaDB
-- PHP Version: 7.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `baidunews`
--

-- --------------------------------------------------------

--
-- 表的结构 `news`
--
CREATE database baidunews;
use baidunews;
CREATE TABLE `news` (
  `newsid` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `newsContent` text NOT NULL,
  `newsLink` varchar(200) NOT NULL,
  `imgSrc0` text NOT NULL,
  `imgSrc1` text NOT NULL,
  `imgSrc2` text NOT NULL,
  `srcNet` varchar(100) NOT NULL,
  `srcTime` date NOT NULL,
  `srcIcon0` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `news`
--

INSERT INTO `news` (`newsid`, `title`, `newsContent`, `newsLink`, `imgSrc0`, `imgSrc1`, `imgSrc2`, `srcNet`, `srcTime`, `srcIcon0`) VALUES
(1, '据说这是人生中唯一一次上太空的机会', '', 'http://www.baidu.com/home/fly/show/main?frm=wisefeed2', 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/super/pic/item/77c6a7efce1b9d167c95aaebfbdeb48f8d5464ed.jpg', '', '', '百度', '2016-09-16', '精选'),
(2, '据说这是人生中唯一一次上太空的机会', '', 'http://www.baidu.com/home/fly/show/main?frm=wisefeed2', 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/super/pic/item/77c6a7efce1b9d167c95aaebfbdeb48f8d5464ed.jpg', '', '', '百度', '2016-09-16', '精选'),
(4, '聪明人分享出来的的活法！', '', 'http://baijiahao.baidu.com/s?id=1545863271912166&amp;wfr=newsapp', 'http://t12.baidu.com/it/u=1599847973,1340056139&amp;fm=170&amp;s=2D43E94A4CEC8855D2D8741D0300D0C0&amp;w=218&amp;h=146&amp;img.JPEG', 'http://t11.baidu.com/it/u=1127183734,3897405426&amp;fm=170&amp;s=6FE8B953506038BEA091C301030060E1&amp;w=218&amp;h=146&amp;img.JPEG', 'http://t11.baidu.com/it/u=893461099,3576967899&amp;fm=170&amp;s=F7F034C04067AB474AB80CA30300E082&amp;w=218&amp;h=146&amp;img.JPEG', '网络文章', '2016-09-16', '精选'),
(5, '聪明人分享出来的的活法！', '', 'http://baijiahao.baidu.com/s?id=1545863271912166&amp;wfr=newsapp', 'http://t12.baidu.com/it/u=1599847973,1340056139&amp;fm=170&amp;s=2D43E94A4CEC8855D2D8741D0300D0C0&amp;w=218&amp;h=146&amp;img.JPEG', 'http://t11.baidu.com/it/u=1127183734,3897405426&amp;fm=170&amp;s=6FE8B953506038BEA091C301030060E1&amp;w=218&amp;h=146&amp;img.JPEG', 'http://t11.baidu.com/it/u=893461099,3576967899&amp;fm=170&amp;s=F7F034C04067AB474AB80CA30300E082&amp;w=218&amp;h=146&amp;img.JPEG', '网络文章', '2016-09-22', '精选'),
(6, '聪明人分享出来的的活法！', '', 'http://baijiahao.baidu.com/s?id=1545863271912166&amp;wfr=newsapp', 'http://t12.baidu.com/it/u=1599847973,1340056139&amp;fm=170&amp;s=2D43E94A4CEC8855D2D8741D0300D0C0&amp;w=218&amp;h=146&amp;img.JPEG', 'http://t11.baidu.com/it/u=1127183734,3897405426&amp;fm=170&amp;s=6FE8B953506038BEA091C301030060E1&amp;w=218&amp;h=146&amp;img.JPEG', 'http://t11.baidu.com/it/u=893461099,3576967899&amp;fm=170&amp;s=F7F034C04067AB474AB80CA30300E082&amp;w=218&amp;h=146&amp;img.JPEG', '网络文章', '2016-09-09', '精选'),
(11, '聪明人分享出来的的活法！', '', 'http://baijiahao.baidu.com/s?id=1545863271912166&amp;wfr=newsapp', 'http://t12.baidu.com/it/u=1599847973,1340056139&amp;fm=170&amp;s=2D43E94A4CEC8855D2D8741D0300D0C0&amp;w=218&amp;h=146&amp;img.JPEG', 'http://t11.baidu.com/it/u=1127183734,3897405426&amp;fm=170&amp;s=6FE8B953506038BEA091C301030060E1&amp;w=218&amp;h=146&amp;img.JPEG', 'http://t11.baidu.com/it/u=893461099,3576967899&amp;fm=170&amp;s=F7F034C04067AB474AB80CA30300E082&amp;w=218&amp;h=146&amp;img.JPEG', '网络文章', '2016-09-16', '精选'),
(12, '据说这是人生中唯一一次上太空的机会', '', 'http://www.baidu.com/home/fly/show/main?frm=wisefeed2', 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/super/pic/item/77c6a7efce1b9d167c95aaebfbdeb48f8d5464ed.jpg', '', '', '百度', '2016-09-16', '百家'),
(13, '据说这是人生中唯一一次上太空的机会', '', 'http://www.baidu.com/home/fly/show/main?frm=wisefeed2', 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/super/pic/item/77c6a7efce1b9d167c95aaebfbdeb48f8d5464ed.jpg', '', '', '百度', '2016-09-16', '百家'),
(14, '中国对朴槿惠已失去耐心：解放军正式对韩动手', '', 'https://m.baidu.com?action=newsdetail&amp;nid=14819095254062030792', 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3628762423,322292688&amp;fm=170&amp;s=06948665EE6247260CAAB4C20300E0BB&amp;w=218&amp;h=146&amp;img.JPEG', 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1221449984,1055793619&amp;fm=170&amp;s=E412867504C0C1601C32F4C00300E0BB&amp;w=218&amp;h=146&amp;img.JPEG', 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=920265106,604769600&amp;fm=170&amp;s=22A04BA42A610A943C04859703008083&amp;w=218&amp;h=146&amp;img.JPEG', '热血网', '2016-09-24', '推荐'),
(15, '日本“泥菩萨过河”，敬献1200亿给古巴居心何在？', '', 'https://m.baidu.com?action=newsdetail&amp;nid=159760326391724385', 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3148943291,3700472343&amp;fm=170&amp;s=2EE24D8748C39EDE30E54C9603005003&amp;w=218&amp;h=146&amp;img.JPEG', 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3167819553,267528580&amp;fm=170&amp;s=322EF00456A33915488AD59B0300B089&amp;w=218&amp;h=146&amp;img.JPEG', 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=792503789,2801267657&amp;fm=170&amp;s=B1B5CB3012017AF4960011C5030070B0&amp;w=218&amp;h=146&amp;img.JPEG', '搜狐新闻', '2016-09-25', '政治'),
(16, '确认了！马航MH370残骸找到！坠海前竟然经历了这么可怕的事...', '', 'http://m.baidu.com/tc?srd=1&amp;dict=30&amp;bdenc=1&amp;from=wise_middlenews&amp;nsrc=IlPT2AEptyoA_yixCFOxXnANedT62v3IHhuCQS2G38ShokWixP4kHREsRGGfAS8GSpOhgTCcfxkHuXSg27Af8Qw1hOgtfq', '', '', '', '搜狐历史', '2016-09-24', '历史'),
(17, '中国对朴槿惠已失去耐心：解放军正式对韩动手', '', 'https://m.baidu.com?action=newsdetail&amp;nid=14819095254062030792', 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3628762423,322292688&amp;fm=170&amp;s=06948665EE6247260CAAB4C20300E0BB&amp;w=218&amp;h=146&amp;img.JPEG', 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1221449984,1055793619&amp;fm=170&amp;s=E412867504C0C1601C32F4C00300E0BB&amp;w=218&amp;h=146&amp;img.JPEG', 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=920265106,604769600&amp;fm=170&amp;s=22A04BA42A610A943C04859703008083&amp;w=218&amp;h=146&amp;img.JPEG', '热血网', '2016-09-24', '推荐'),
(18, '日本“泥菩萨过河”，敬献1200亿给古巴居心何在？', '', 'https://m.baidu.com?action=newsdetail&amp;nid=159760326391724385', 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3148943291,3700472343&amp;fm=170&amp;s=2EE24D8748C39EDE30E54C9603005003&amp;w=218&amp;h=146&amp;img.JPEG', 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3167819553,267528580&amp;fm=170&amp;s=322EF00456A33915488AD59B0300B089&amp;w=218&amp;h=146&amp;img.JPEG', 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=792503789,2801267657&amp;fm=170&amp;s=B1B5CB3012017AF4960011C5030070B0&amp;w=218&amp;h=146&amp;img.JPEG', '搜狐新闻', '2016-09-25', '政治'),
(19, '确认了！马航MH370残骸找到！坠海前竟然经历了这么可怕的事...', '', 'http://m.baidu.com/tc?srd=1&amp;dict=30&amp;bdenc=1&amp;from=wise_middlenews&amp;nsrc=IlPT2AEptyoA_yixCFOxXnANedT62v3IHhuCQS2G38ShokWixP4kHREsRGGfAS8GSpOhgTCcfxkHuXSg27Af8Qw1hOgtfq', '', '', '', '搜狐历史', '2016-09-24', '历史'),
(20, '据说这是人生中唯一一次上太空的机会', '', 'http://www.baidu.com/home/fly/show/main?frm=wisefeed2', 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/super/pic/item/77c6a7efce1b9d167c95aaebfbdeb48f8d5464ed.jpg', '', '', '百度', '2016-09-16', '百家');

-- --------------------------------------------------------

--
-- 表的结构 `newsBaijia`
--

CREATE TABLE `newsBaijia` (
  `newsid` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `newsContent` text NOT NULL,
  `newsLink` varchar(200) NOT NULL,
  `imgSrc0` text NOT NULL,
  `imgSrc1` text NOT NULL,
  `imgSrc2` text NOT NULL,
  `srcNet` varchar(100) NOT NULL,
  `srcTime` date NOT NULL,
  `srcIcon0` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `newsBaijia`
--

INSERT INTO `newsBaijia` (`newsid`, `title`, `newsContent`, `newsLink`, `imgSrc0`, `imgSrc1`, `imgSrc2`, `srcNet`, `srcTime`, `srcIcon0`) VALUES
(34, '堪比英国公投？意大利公投是想干吗', '', 'http://m.baidu.com/tc?srd=1&amp;dict=30&amp;bdenc=1&amp;from=wise_middlenews&amp;nsrc=IlPT2AEptyoA_yixCFOxXnANedT62v3IIBuPNCBX28S9j5Pte4viXdNoJ7HNAifHVYCb9j0XxBt8wn_a0GIk7xF3rq-ntGw6mCWhuKC', 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3229011802,1809278624&amp;fm=80', '', '', '金融界', '2016-09-22', '热点'),
(35, '堪比英国公投？意大利公投是想干吗', '', 'http://m.baidu.com/tc?srd=1&amp;dict=30&amp;bdenc=1&amp;from=wise_middlenews&amp;nsrc=IlPT2AEptyoA_yixCFOxXnANedT62v3IIBuPNCBX28S9j5Pte4viXdNoJ7HNAifHVYCb9j0XxBt8wn_a0GIk7xF3rq-ntGw6mCWhuKC', 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3229011802,1809278624&amp;fm=80', '', '', '金融界', '2016-09-22', '热点'),
(36, '2016教师资格证考试写作题加分金句加50分-乐题库', '', 'https://m.baidu.com?action=newsdetail&amp;nid=315421340169410565', '', '', '', '搜狐新闻', '2016-09-26', '生活'),
(37, '2016教师资格证考试写作题加分金句加50分-乐题库', '', 'https://m.baidu.com?action=newsdetail&amp;nid=315421340169410565', '', '', '', '搜狐新闻', '2016-09-26', '生活'),
(38, '2016教师资格证考试写作题加分金句加50分-乐题库', '', 'https://m.baidu.com?action=newsdetail&amp;nid=315421340169410565', '', '', '', '搜狐新闻', '2016-09-26', '生活'),
(39, '2016教师资格证考试写作题加分金句加50分-乐题库', '', 'https://m.baidu.com?action=newsdetail&amp;nid=315421340169410565', '', '', '', '搜狐新闻', '2016-09-26', '生活'),
(40, '堪比英国公投？意大利公投是想干吗', '', 'http://m.baidu.com/tc?srd=1&amp;dict=30&amp;bdenc=1&amp;from=wise_middlenews&amp;nsrc=IlPT2AEptyoA_yixCFOxXnANedT62v3IIBuPNCBX28S9j5Pte4viXdNoJ7HNAifHVYCb9j0XxBt8wn_a0GIk7xF3rq-ntGw6mCWhuKC', 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3229011802,1809278624&amp;fm=80', '', '', '金融界', '2016-09-22', '热点'),
(41, '美大选辩论谈反恐问题：特朗普大批希拉里和奥巴马', '', 'https://m.baidu.com?action=newsdetail&amp;nid=4803628415470128485', 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2079681246,706838676&amp;fm=80', '', '', '新浪新闻', '2016-09-22', '热点'),
(42, '外媒称奥巴马重返亚洲战略系悲剧 或沉太平洋', '', 'https://m.baidu.com?action=newsdetail&amp;nid=16266109887784499986', 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=294843182,2952619421&amp;fm=170&amp;s=77D2798D16730790CE08A58A0300E097&amp;w=218&amp;h=146&amp;img.JPEG', '', '', 'AK军事网', '2016-09-23', '推荐'),
(43, '堪比英国公投？意大利公投是想干吗', '', 'http://m.baidu.com/tc?srd=1&amp;dict=30&amp;bdenc=1&amp;from=wise_middlenews&amp;nsrc=IlPT2AEptyoA_yixCFOxXnANedT62v3IIBuPNCBX28S9j5Pte4viXdNoJ7HNAifHVYCb9j0XxBt8wn_a0GIk7xF3rq-ntGw6mCWhuKC', 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3229011802,1809278624&amp;fm=80', '', '', '金融界', '2016-09-22', '热点'),
(44, '美大选辩论谈反恐问题：特朗普大批希拉里和奥巴马', '', 'https://m.baidu.com?action=newsdetail&amp;nid=4803628415470128485', 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2079681246,706838676&amp;fm=80', '', '', '新浪新闻', '2016-09-22', '热点'),
(45, '外媒称奥巴马重返亚洲战略系悲剧 或沉太平洋', '', 'https://m.baidu.com?action=newsdetail&amp;nid=16266109887784499986', 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=294843182,2952619421&amp;fm=170&amp;s=77D2798D16730790CE08A58A0300E097&amp;w=218&amp;h=146&amp;img.JPEG', '', '', 'AK军事网', '2016-09-23', '推荐'),
(46, '堪比英国公投？意大利公投是想干吗', '', 'http://m.baidu.com/tc?srd=1&amp;dict=30&amp;bdenc=1&amp;from=wise_middlenews&amp;nsrc=IlPT2AEptyoA_yixCFOxXnANedT62v3IIBuPNCBX28S9j5Pte4viXdNoJ7HNAifHVYCb9j0XxBt8wn_a0GIk7xF3rq-ntGw6mCWhuKC', 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3229011802,1809278624&amp;fm=80', '', '', '金融界', '2016-09-22', '热点'),
(47, '美大选辩论谈反恐问题：特朗普大批希拉里和奥巴马', '', 'https://m.baidu.com?action=newsdetail&amp;nid=4803628415470128485', 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2079681246,706838676&amp;fm=80', '', '', '新浪新闻', '2016-09-22', '热点'),
(48, '外媒称奥巴马重返亚洲战略系悲剧 或沉太平洋', '', 'https://m.baidu.com?action=newsdetail&amp;nid=16266109887784499986', 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=294843182,2952619421&amp;fm=170&amp;s=77D2798D16730790CE08A58A0300E097&amp;w=218&amp;h=146&amp;img.JPEG', '', '', 'AK军事网', '2016-09-23', '推荐');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`newsid`),
  ADD KEY `title` (`title`);

--
-- Indexes for table `newsBaijia`
--
ALTER TABLE `newsBaijia`
  ADD PRIMARY KEY (`newsid`),
  ADD KEY `title` (`title`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `news`
--
ALTER TABLE `news`
  MODIFY `newsid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- 使用表AUTO_INCREMENT `newsBaijia`
--
ALTER TABLE `newsBaijia`
  MODIFY `newsid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
