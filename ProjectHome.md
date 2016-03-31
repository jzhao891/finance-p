一个仅供学习之用的账务管理系统(个人版)

系统简介：
1、实现了用户、组管理
2、实现了物品类别、详细管理
3、实现了基本账务(货币)管理

开发此系统的初衷在于学习技术以便更好的应用在公司的项目中，本系统特别注重用户体验方面的设计，友好的界面和傻瓜式的操作

前后台架构：
1、java语言(jdk1.5)、struts1.2.9、hibernate3.2.6.ga、spring2.0.8
2、前台：主要使用了轻量级的ajax开发框架jQuery，使用jQuery很轻松的降低了服务器压力提高了用户体验并且代码容易维护，尤其是jQuery的插件机制更是简易了代码
3、数据库版本为mysql5.0
4、编码：为防止ajax乱码，所以项目、数据库全部使用UTF-8编码

浏览器兼容性：
目前的设计兼容IE7+、FireFox、Chrome(有一点路径问题)
因为IE6下的CSS文件还为完成所以使用IE6访问系统会出现布局不美观情况

系统配置文档请访问：http://www.wsria.com/archives/136

总体结构为:java  + struts + spring + hibernate + ajax + jQuery + xhtml = finance

大致情况就这样，以后系统的更新和其他关于系统的信息敬请关注本人博客：www.wsria.com

声明：本系统仅供学习使用，禁止商业应用
版权归www.wsria.com 所有