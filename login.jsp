<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="org.apache.commons.logging.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
<%@include file="common/global.jsp"%>
<%
Log log = LogFactory.getLog(this.getClass());
log.info("用户IP：[" + request.getRemoteAddr() + "] 于 [" + StringUtil.getValue(new Date(),"datetime") + "]打开登录页面");
%>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>账务管理系统</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<link rel="stylesheet" type="text/css" href="css/login.css" />
		<script type="text/javascript" src="common/js/jquery-last.js"></script>
		<script type="text/javascript" src="common/js/plugin/jquery.form.js"></script>
		<script type="text/javascript" src="common/js/plugin/formValidator.js"></script>
		<script type="text/javascript" src="common/js/plugin/bgiframe.js"></script>
		<script type="text/javascript" src="common/js/plugin/weebox.js"></script>
		<script type="text/javascript" src="common/js/common.js"></script>
		<script type="text/javascript" src="common/js/list.js"></script>
		<script type="text/javascript" src="common/js/form.js"></script>
		<script type="text/javascript" src="common/js/login.js"></script>
		<style type="text/css">
			@IMPORT url("css/all.css");
			@IMPORT url("css/weebox/weebox.css");
			@IMPORT url("css/validator/validator.css");
			body {
				background-image: url("images/loginBG.jpg");
			}
		</style>
	</head>

	<body>
		<form action="login.do" id="loginForm" name="loginForm" method="post">
			<div
				style="color:#B4BBCF;margin-top: 100px;" align="center">
				<font face="黑体" color="#CB4F30" size="10"><b><%=siteName%></b>
				</font>
			</div>

			<div align="center" style="margin-top: 100px;">
				<table style="width: 50%;" border="0" id='formTable'>
					<tr>
						<td>用户名：</td>
						<td style="width: 30%">
							<input type="text" id="loginName" name='loginName' size="20"/>
						</td>
						<td style='width:30%'><div id='loginNameTip'></div></td>
					</tr>
					<tr>
						<td>密&nbsp;&nbsp;&nbsp;&nbsp;码：</td>
						<td style="width: 30%">
							<input type="password" id="password" name='password' size="20"/>
						</td>
						<td style='width:30%'><div id='passwordTip'></div></td>
					</tr>
				</table>
				<p align=center>
					<input type="submit" value="登 陆" name="Submit" id="submit"/>
					&nbsp;&nbsp;
					<input type="reset" value="重 填" name="Reset" />
					&nbsp;
					<input type="checkbox" name="ifSave" id="ifSave" checked="checked" title="记住用户名和密码"/>
					<label for="ifSave">记住</label>
				</p>
				<p align=center>
					测试用户名：<b>test</b>  &nbsp;&nbsp;&nbsp;密码：<b>000000</b>
					<br/>请不要修改密码<br/><input type="button" value="以测试用户登录" id='testlogin'/>
				</p>
				<p align=center>
					<a href="registe.jsp">注册新用户</a>&nbsp;
				</p>
			</div>
			<div align="center" style="font-size: 11pt; margin-top: 13%;">
				Copyright &copy;2008
				<a href='http://blog.csdn.net/mgqy/' target="_blank">木木工作室</a>
			</div>
		</form>
	</body>
</html>