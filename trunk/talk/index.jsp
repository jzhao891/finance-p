<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="UTF-8">
	<head>
		<title>聊天室</title>
		<meta http-equiv="pragma" content="no-cache" />
		<meta http-equiv="cache-control" content="no-cache" />
		<meta http-equiv="description" content="this is my page"/>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
		<script type="text/javascript" src="../common/js/jquery-last.js"></script>
		<script type="text/javascript"
			src="../common/js/plugin/jquery.form.js"></script>
			<script type="text/javascript" src="../common/js/common.js"></script>
		<script type="text/javascript" src="js/talk.js"></script>
		<style type="text/css">
			@IMPORT url("../css/all.css");
		</style>
	</head>

	<body>
		<input type='hidden' id='username' value='${sessionScope.user.userName}'/>
		<input type='hidden' id='lastDate'/>
		<table width="1032" height="486" border="0">
			<tr>
				<td width="832" height="90%">
				<fieldset style="height:100%">
				<legend>AJAX消息列表</legend>
					<div id='msgs' style="width:100%;height:100%;overflow-x:hidden;overflow-y:scroll"></div>
				</fieldset>
			  </td>
				<td width="184" height="90%">
				<fieldset style="height:100%">
				<legend>用户列表</legend>
					<div id='users' style="width:100%;height:100%;overflow-x:hidden;overflow-y:scroll"></div>
				</fieldset>
			  </td>
			</tr>
			
			<tr>
				<td style="height:10">
					<form action="addMsg.do" name="msgForm" id='msgForm' method="post">
						<p>
							<input type="text" name='message' id='message' size="111"/>
							<input type="submit" name="submit" id="submit" value="发 送"/>
							<input type="button" name="clear" id="clear" value="清空列表"/>
						</p>
					</form>
				</td>
			</tr>
	</table>
	</body>
</html>
