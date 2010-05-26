<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="mc"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@include file="../common/global.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="UTF-8">
	<head>
		<title>债务人管理</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta http-equiv="pragma" content="no-cache"/>
		<meta http-equiv="cache-control" content="no-cache"/>
		<script type="text/javascript" src="../common/js/jquery-last.js"></script>
		<script type="text/javascript" src="../common/js/plugin/jquery.form.js"></script>
		<script type="text/javascript" src="../common/js/plugin/formValidator.js"></script>
		<script type="text/javascript" src="../common/js/plugin/formValidatorRegex.js"></script>
		<script type="text/javascript" src="../common/js/plugin/jquery.flydom.js"></script>
		<script type="text/javascript" src="../common/js/plugin/jquery.highlight.js"></script>
		<script type="text/javascript" src="../common/js/plugin/jquery.simple.tree.js"></script>
		<script type="text/javascript" src="../common/js/plugin/weebox.js"></script>
		<script type="text/javascript" src="../common/js/plugin/blackbird.js"></script>
		<script type="text/javascript" src="../common/js/common.js"></script>
		<script type="text/javascript" src="../common/js/list.js"></script>
		<script type="text/javascript" src="../common/js/tree.js"></script>
		<script type="text/javascript" src="../common/js/form.js"></script>
		<script type="text/javascript" src="js/iouserValidator.js"></script>
		<script type="text/javascript" src="js/iouser.js"></script>
		<style type="text/css">
			@IMPORT url("../css/all.css");
			@IMPORT url("../css/screen.css");
			@IMPORT url("../css/tree/tree.css");
			@IMPORT url("../css/weebox/weebox.css");
			@IMPORT url("../css/log/blackbird.css");
		</style>
	</head>

	<body>
		<html:form action="/iouser/iouserList.do" method="post">
			<div>
				<span id='title'>
					<img src="../images/user.png" alt="债务人管理" align="absmiddle"/>
					债务人管理
					<img id="queryImg" src="../images/search.gif"/>
				</span>
				<div id='query'>
					<span>
						<label for="quserName">姓名：<input type='text' id='quserName' name='userName' size="10" value="${userName }"/></label>
						<label for="qgroupName">分组：<input type='text' id='qgroupName' name='groupName' size="13" value="${groupName }"/></label>
						<label for="qmobilePhone">手机：<input type='text' id='qmobilePhone' name='mobilePhone' size="15" value="${mobilePhone }"/></label>
						<label for="qcompanyName">公司：<input type='text' id='qcompanyName' name='companyName' value="${companyName }"/></label>
					</span>
					<span style='text-align: right'>
						<input type='submit' name="submitBtn" id='submitBtn' title="查询" value="查 询"/>
						&nbsp;&nbsp;
						<input type="button" id="resetBtn" title="清除查询条件" value="重 置" />
					</span>
				</div>
				<div id='resultTip' style='display:none'></div>
				
				<display:table name="resultList" pagesize="${pageSize }" class="its"
					requestURI="/iouser/iouserList.do" sort="list" id="row"	partialList="true" size="resultSize"
					style="BORDER-COLLAPSE: collapse" export="true" varTotals="totalMap">
					<display:column style="width:10px"
						title="<input type='checkbox' title='全选记录' id='selAll'/>">
						<input type="checkbox" name="chk" id='chk' value='${row.id }' />
					</display:column>
					<display:column title="序号" value="${row_rowNum}"></display:column>
					<display:column title="姓名" sortable="true" class="noclick">
						<span id='${row.id }' name='iouid' style='cursor:pointer;font-weight: bold' 
							title='点击显示[${row.userName }]的详细资料'>${row.userName }</span>
					</display:column>
					<display:column title="性别" sortable="true">
						<c:if test="${row.sex=='1'}">男</c:if>
						<c:if test="${row.sex=='0'}">女</c:if>
					</display:column>
					<display:column property="age" title="年龄" sortable="true"></display:column>
					<display:column title="分组" sortable="true">${row.group.groupName }</display:column>
					<display:column property="mobilePhone" title="手机"></display:column>
					<display:column property="companyName" title="公司名称"></display:column>
					<display:column property="homeAddress" title="家庭地址"></display:column>
				</display:table>
			</div>
		</html:form>

		<!-- 按钮区域 -->
		<div id="btnDiv">
			<span>
				<input type='button' id='addEle' title="新增一个债务人" value="新 增" />
				<input type='button' id='delEle' title="删除一个债务人" value="删 除" />
				<input type='button' id='modifyEle' title="修改一个债务人" value="修 改" />
			</span>
		</div>
		
		<!-- 新增、修改信息表单 -->
		<div id="edit" style="text-align: center;display:none"></div>
	</body>
</html>