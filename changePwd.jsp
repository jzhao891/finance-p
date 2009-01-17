<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" errorPage="error.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
<%@include file="common/global.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>密码修改</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta http-equiv="pragma" content="no-cache"/>
		<meta http-equiv="cache-control" content="no-cache"/>
		<link rel="stylesheet" type="text/css" href="css/login.css" />
		<script type="text/javascript" src="common/js/jquery-last.js"></script>
		<script type="text/javascript" src="common/js/plugin/jquery.form.js"></script>
		<script type="text/javascript" src="common/js/plugin/formValidator.js"></script>
		<script type="text/javascript" src="common/js/plugin/bgiframe.js"></script>
		<script type="text/javascript" src="common/js/plugin/weebox.js"></script>
		<script type="text/javascript" src="common/js/common.js"></script>
		<script type="text/javascript" src="common/js/list.js"></script>
		<script type="text/javascript" src="common/js/form.js"></script>
		<script type="text/javascript" src="changePwd.js"></script>
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
		<form action="changePwd.do" method="post" name="userForm" id="userForm">
			<div
				style="color:#B4BBCF;margin-top: 100px;" align="center">
				<font face="黑体" color="#CB4F30" size="10"><b>修改密码</b>
				</font>
			</div>

			<div align="center">
				<p align=center>
					登&nbsp;&nbsp;录&nbsp;&nbsp;名：
					<input type="text" id="loginName" name='loginName' readonly="readonly" value="${sessionScope.user.loginName }"/>
				</p>
				<p align=center>
					用户姓名：
					<input type="text" id="loginName" name='loginName' readonly="readonly" value="${sessionScope.user.userName }"/>
				</p>
				<p align=center>
					原&nbsp;&nbsp;密&nbsp;&nbsp;码：
					<input type="password" id="oldPwd" name='oldPwd'/>
				</p>
				<p align=center>
					新&nbsp;&nbsp;密&nbsp;&nbsp;码：
					<input type="password" id="newPwd1" name='newPwd1'/>
				</p>
				<p align=center>
					确认密码：
					<input type="password" id="newPwd2" name='newPwd2'/>
				</p>
				<p align=center>
					<input type="submit" value="修改" name="submit" id='submit'/>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="button" value="重填" onclick="resetForm()" name="Reset" />
					&nbsp;
				</p>
			</div>
		</form>
	</body>
</html>