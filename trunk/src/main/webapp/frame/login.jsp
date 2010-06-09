<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/pages/taglibs.jsp" %>
<%@ include file="/common/pages/global.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>登录页面</title>
		<%@ include file="/common/pages/meta.jsp" %>
		
		<link href="${ctx}/css/style.css" type="text/css" rel="stylesheet"/>
		<style type="text/css">
			<!--
			body {
				margin-left: 0px;
				margin-top: 0px;
				margin-right: 0px;
				margin-bottom: 0px;
				overflow:hidden;
			}
			.STYLE3 {font-size: 12px; color: #adc9d9; }
			-->
		</style>
		<script src="${ctx}/common/js/jquery.js" type="text/javascript"></script>
		<script src="${ctx}/common/js/plugins/validate/jquery.validate.js" type="text/javascript"></script>
		<script src="${ctx}/common/js/plugins/validate/messages_cn.js" type="text/javascript"></script>
		<script>
			$(document).ready(function() {
				$("#loginForm").validate();
				$('#login').click(function(){
					$("#loginForm").submit();
				});
			});
		</script>
	</head>

	<body>
	<form id="loginForm" action="${ctx }/account/login_execute.action" method="post">
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
	  <tr>
	    <td bgcolor="#1075b1">&nbsp;</td>
	  </tr>
	  <tr>
	    <td height="608" background="${ctx}/images/frame/login_03.gif"><table width="847" border="0" align="center" cellpadding="0" cellspacing="0">
	      <tr>
	        <td height="318" background="${ctx}/images/frame/login_04.gif">&nbsp;</td>
	      </tr>
	      <tr>
	        <td height="84"><table width="100%" border="0" cellspacing="0" cellpadding="0">
	          <tr>
	            <td width="381" height="84" background="${ctx}/images/frame/login_06.gif">&nbsp;</td>
	            <td width="162" valign="middle" background="${ctx}/images/frame/login_07.gif"><table width="100%" border="0" cellspacing="0" cellpadding="0">
	              <tr>
	                <td width="44" height="24" valign="bottom"><div align="right"><span class="STYLE3">用户</span></div></td>
	                <td width="10" valign="bottom">&nbsp;</td>
	                <td height="24" colspan="2" valign="bottom">
	                  <div align="left">
	                    <input type="text" name="loginName" id="loginName" class="required" style="width:100px; height:17px; background-color:#87adbf; border:solid 1px #153966; font-size:12px; color:#283439; ">
	                  </div></td>
	              </tr>
	              <tr>
	                <td height="24" valign="bottom"><div align="right"><span class="STYLE3">密码</span></div></td>
	                <td width="10" valign="bottom">&nbsp;</td>
	                <td height="24" colspan="2" valign="bottom"><input type="password" name="password" id="password" class="required" style="width:100px; height:17px; background-color:#87adbf; border:solid 1px #153966; font-size:12px; color:#283439; "></td>
	              </tr>
	              <tr>
	                <td height="24" valign="bottom"><div align="right"><span class="STYLE3">验证码</span></div></td>
	                <td width="10" valign="bottom">&nbsp;</td>
	                <td width="52" height="24" valign="bottom"><input type="text" name="textfield3" id="textfield3" style="width:50px; height:17px; background-color:#87adbf; border:solid 1px #153966; font-size:12px; color:#283439; "></td>
	                <td width="62" valign="bottom"><div align="left"><img src="${ctx}/images/frame/yzm.gif" width="38" height="15"></div></td>
	              </tr>
	              <tr></tr>
	            </table></td>
	            <td width="26"><img src="${ctx}/images/frame/login_08.gif" width="26" height="84"></td>
	            <td width="67" background="${ctx}/images/frame/login_09.gif"><table width="100%" border="0" cellspacing="0" cellpadding="0">
	              <tr>
	                <td height="25"><div id="login" align="center"><img src="${ctx}/images/frame/dl.gif" width="57" height="20"></div></td>
	              </tr>
	              <tr>
	                <td height="25"><div align="center"><img src="${ctx}/images/frame/cz.gif" width="57" height="20"></div></td>
	              </tr>
	            </table></td>
	            <td width="211" background="${ctx}/images/frame/login_10.gif">&nbsp;</td>
	          </tr>
	        </table></td>
	      </tr>
	      <tr>
	        <td height="206" background="${ctx}/images/frame/login_11.gif">&nbsp;</td>
	      </tr>
	    </table></td>
	  </tr>
	  <tr>
	    <td bgcolor="#152753">&nbsp;</td>
	  </tr>
	</table>
	</form>
	</body>
</html>
