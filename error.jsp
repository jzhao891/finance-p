<%@ page language="java" pageEncoding="UTF-8" isErrorPage="true"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
<%@include file="common/global.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>出错了</title>
		<style type="text/css">
body {
	background-color: #D5E8FD;
}
</style>
	</head>
	<body>
		<div align="center">
			<h1>出错页面</h1>
		</div>
		<div align="center" style="margin-top: 100px;">
			<table>
				<tr>
					<td>
						<img src="<%=request.getContextPath() %>/images/error.jpg" />
					</td>
					<td>
						<fieldset>
							<legend>出错信息：</legend>
							<table>
								<tr>
									<td align='left'><%=getAttribute("error",request) %><br/><%=getValue(exception)%></td>
								</tr>
							</table>
						</fieldset>
					</td>
				</tr>
				<tr>
					<td align="right" colspan="3">
						<input type='button' value='返&nbsp;&nbsp;回' onclick='window.history.back();'/>
					</td>
				</tr>
			</table>
		</div>
	</body>
</html>