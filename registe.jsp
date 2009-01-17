<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" errorPage="error.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
<%@include file="common/global.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>新用户注册</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<link rel="stylesheet" type="text/css" href="css/login.css" />
		<script type="text/javascript" src="common/js/jquery-last.js"></script>
		<script type="text/javascript" src="common/js/common.js"></script>
		<style type="text/css">
			@IMPORT url("css/all.css");
			body {
				background-color: #94AAD6;
			}
		</style>

	</head>

	<body>
		<html:form action="/registe.do" onsubmit="return checkForm(this);">
			<div
				style="FILTER: dropshadow(color = #B4BBCF, offx = 6, offy = 6, positive = 1);margin-top: 100px;"
				align="center">
				<font face="黑体" color="#CB4F30" size="10"><b><%=siteName %></b></font>
			</div>
			
			<div style="margin-top: 50px;">
				<table cellpadding="3" cellspacing="1" align="center" border="1"
					class="tableborder1" id="table1">
					<tr>
						<td valign="middle" colspan="2" align="center" height="25">
							<font color="#ffffff"><b>新用户注册</b> </font>
						</td>
					</tr>
					<tr>
						<td width="40%" class="tablebody1">
							<span><b>注册名</b>： <br /> 注册用户名长度限制为0－16字节</span>
						</td>
						<td width="60%" class="tablebody1">
							<input type="text" maxLength="8" size="32" id="loginName" name="loginName" />
							<font color="#FF0000">*</font>
						</td>
					</tr>

					<tr>
						<td width="40%" class="tablebody1">
							<span><b>真实姓名</b>： <br /> 真实姓名长度限制为0－16字节</span>
						</td>
						<td width="60%" class="tablebody1">
							<input type="text" maxLength="8" size="32" id="userName" name="userName" />
							<font color="#FF0000">*</font>
						</td>
					</tr>

					<tr>
						<td width="40%" class="tablebody1">
							<span><b>密码(至少6位，至多8位)</b>： <br /> 请输入密码，区分大小写。 <br />
							</span>
						</td>
						<td width="60%" class="tablebody1">
							<input type="password" maxLength="8" size="32" id="password1" name="password1" />
							<font color="#FF0000">*</font>
						</td>
					</tr>
					<tr>
						<td width="40%" class="tablebody1">
							<span><b>密码(至少6位，至多8位)</b>： <br /> 请再输一遍确认</span>
						</td>
						<td class="tablebody1">
							<input type="password" maxLength="8" size="32" id="password2" name="password2" />
							<font color="#FF0000">*</font>
						</td>
					</tr>
					<tr>
						<td class="tablebody2" valign="middle" colspan="2" align="center">
							<input type="submit" value="注 册" onclick=""/>
							&nbsp;&nbsp;&nbsp;
							<input type="reset" name="reset" value="清 除" />&nbsp;&nbsp;
							<a href="login.jsp">返回登录</a>
						</td>
					</tr>
				</table>
			</div>
			
			<div align="center" style="font-size: 11pt;margin-top: 10%;">
			Copyright &copy;2008 <a href='http://blog.csdn.net/mgqy/' target="_blank">木木工作室</a>
			</div>
		</html:form>
	</body>
</html>
<script>
<!--
$(document).ready(function() { 
	$("input[type='text']:first", document.forms[0]).focus();
});
function alertAndFocus(id,prompt,selected){
	//如果传递过来的组件ID存在则进行验证，否则弹出提示框
	if(document.getElementById(id)){
		if(document.getElementById(id).value == ""){
			if(selected != undefined && selected != false && selected != true){
				alert("在验证表单组件[" + prompt + "]时传递的selected参数不符合要求！");
				return true;
			} else {
				//如果没有传递过来undefined则赋以默认值false
				if(selected == undefined) selected = false;
				if(selected){
					alert("请选择[" + prompt + "]");
				} else {
					alert("请输入[" + prompt + "]");
					document.getElementById(id).focus();
				}
			}
			return true;
		}
	} else {
		alert("指定组件[" + prompt + "]的ID不存在！");
		return true;
	}
	return false;
}
function checkForm(form){
	if(alertAndFocus('loginName','注册名')){
		return false;
	} else if(alertAndFocus('userName','真实姓名')){
		return false;
	} else if(alertAndFocus('password1','密码1')){
		return false;
	} else if(alertAndFocus('password2','密码2')){
		return false;
	} else if($('#password1').text() != $('#password2').text()){
		alert('两次输入的密码不一样，请重新输入!');
		return false;
	}
	return true;
}
-->
</script>