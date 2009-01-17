<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
<%@include file="common/global.jsp"%>
<c:if test="${empty user}">
	<script>
		window.location.href='login.jsp';
	</script>
</c:if>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title><%=siteName%></title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta http-equiv="pragma" content="no-cache"/>
		<meta http-equiv="cache-control" content="no-cache"/>
		<link rel="shortcut icon" href="/finance.ico"/>
		<script type="text/javascript" src="common/js/jquery-last.js"></script>
		<script type="text/javascript" src="common/js/common.js"></script>
		<script type="text/javascript" src="common/js/menu.js"></script>
		<script type="text/javascript" src="index.js"></script>
		<style type="text/css">
			@IMPORT url("css/all.css");
			@IMPORT url("css/layout.css");
			@IMPORT url("css/menu.css");
		</style>
	</head>
	<body>
		<!-- 头部 -->
		<div id="hdr">
			<div id='tabs'>
				<ul>
					<li>
						<a href="javascript:void(0);" style="background-image: url('images/dog.gif');padding-left: 20px"
							title="欢迎[${sessionScope.user.userName}(${sessionScope.user.loginName})]访问木木财务管理系统">
							<span>欢迎<font color='blue'>${sessionScope.user.userName}(${sessionScope.user.loginName})</font>光临</span>
						</a>
					</li>
					<li>
						<a href="javascript:void(0);" onclick="goFirstPage()" title="系统首页"><span>首页</span>
						</a>
					</li>
					<li>
						<a href="javascript:void(0);" onclick="test()" title="测试"><span>测试</span>
						</a>
					</li>
					<li>
						<a href="javascript:void(0);" onclick="financeManager()" title="借入/借出(款项/物品)管理"><span>账务管理</span>
						</a>
					</li>
					<!-- li>
						<a href="javascript:void(0);" onclick="ajaxTalk()" title="进入聊天室"><span>聊天室</span>
						</a>
					</li> -->
					<li>
						<a href="javascript:void(0);" onclick="showGoods()" title="查看修改物品类型详细"><span>物品管理</span>
						</a>
					</li>
					<li>
						<a href="javascript:void(0);" onclick="showIouser()"
							title="维护借入、借出债务人员"><span>债务人管理</span>
						</a>
					</li>
					<li>
						<a href="javascript:void(0);" onclick="changePwd()" title="修改您的密码"><span>修改密码</span>
						</a>
					</li>
					<li>
						<a href="javascript:void(0);" onclick="logout()" title="退出当前登录的用户"><span>退出系统</span>
						</a>
					</li>
					<li>
						<a href="javascript:void(0);" onclick="maxWork(event)" title="切换工作区域大小"><span>最大化</span>
						</a>
					</li>
				</ul>
		  </div>
	</div>
		<!-- 中间内容区域 -->
		<div id="c-block">
			<div id="c-col">
				<iframe src='' width='100%'	height='100%' frameborder='0' marginwidth='0' marginheight='0'
					scrolling='no' name='centerFrame' id='centerFrame'></iframe>
			</div>
			<!-- end of center column -->
		</div>
		<!-- 版权部分 -->
		<div id="ftr" align="center">
			Copyright &copy;2008 木木工作室
		</div>
		<!-- 左栏 -->
		<div id="lh-col">
			<h4 align="center">菜单列表</h4>
			<hr />
			<ul id="leftMenu"></ul>
		</div>
		<!-- end of left column -->
		<!-- 右栏 -->
		<div id="rh-col">
			<h4 align="center">信息栏</h4>
			<hr />
			<div id='rightTip' style="display:none">
				<span>总人员数：<label id='iouserRightTip'>0</label></span>
			</div>
		</div>
		<!-- end of right column -->
	</body>
</html>
