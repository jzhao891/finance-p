<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="mc"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@include file="../common/global.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
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
		<script type="text/javascript" src="../common/js/plugin/bgiframe.js"></script>
		<script type="text/javascript" src="../common/js/plugin/weebox.js"></script>
		<script type="text/javascript" src="../common/js/plugin/blackbird.js"></script>
		<script type="text/javascript" src="../common/js/common.js"></script>
		<script type="text/javascript" src="../common/js/list.js"></script>
		<script type="text/javascript" src="../common/js/form.js"></script>
		<script type="text/javascript" src="../common/js/tree.js"></script>
		<script type="text/javascript" src="js/group.js"></script>
		<style type="text/css">
			@IMPORT url("../css/all.css");
			@IMPORT url("../css/screen.css");
			@IMPORT url("../css/list.css");
			@IMPORT url("../css/tree/tree.css");
			@IMPORT url("../css/validator/validator.css");
			@IMPORT url("../css/weebox/weebox.css");
			@IMPORT url("../css/log/blackbird.css");
		</style>
	</head>

	<body>
		<html:form action="/iouser/groupList.do" method="post">
			<div>
				<span id='title'>债务人分组管理</span>
				<div id='query'>
					<fieldset>
						<legend align="center">
							<b><a id='queryArea' href='javascript:;'>显示查询条件</a></b>
						</legend>
						<div id='queryWords' style='display:none'>
							<span>
								<label for="qgroupName">组名：<input type='text' id='qgroupName' name='groupName' value="${groupName }"/></label>
							</span>
							<span style='text-align: right'>
								<input type='submit' name="submitBtn" id='submitBtn' title="查询" value="查 询"/>
								<input type="button" id="resetBtn" title="清除查询条件" value="重 置" />
							</span>
						</div>
					</fieldset>
				</div>
				<div id='resultTip' style='display:none'></div>
				
				<display:table name="resultList" pagesize="${pageSize }" class="its"
					requestURI="/iouser/groupList.do" sort="list" id="row"	partialList="true" size="resultSize"
					style="BORDER-COLLAPSE: collapse" export="true" varTotals="totalMap">
					<display:column style="width:10px"
						title="<input type='checkbox' title='全选记录' id='selAll'/>">
						<input type="checkbox" name="chk" id='chk' value='${row.id }' />
					</display:column>
					<display:column title="序号" value="${row_rowNum}"></display:column>
					<display:column property="groupName" title="分组名称" sortable="true"></display:column>
					<display:column title="父级名称" value="${row.parentGroup.groupName}" sortable="true"></display:column>
					<display:column title="儿子个数" value="${row.childSize}" sortable="true"></display:column>
					<display:column title="创建时间" sortable="true">
						<%=StringUtil.getValue(((net.yanhl.iouser.pojo.GroupRelation)row).getCreateDate(),"date") %>
					</display:column>
					<display:column property="remark" title="备注" maxLength="18"></display:column>
				</display:table>
			</div>
		</html:form>

		<!-- 按钮区域 -->
		<div id="btnDiv">
			<span>
				<input type='button' id='addEle' title="新增一个分组" value="新 增" />
				<input type='button' id='delEle' title="删除一个分组" value="删 除" />
				<input type='button' id='modifyEle' title="修改一个分组" value="修 改" />
			</span>
		</div>
		
		<!-- 新增、修改信息表单 -->
		<div id="edit" style="text-align: center;display:none">
			<form action="addGroup.do" id="groupRelationForm" name=""groupRelationForm"" method="post">
				<input type='hidden' id='parentId' name='parentId' value='-1'/>
				<table style="width: 100%;" border="0" id='formTable'>
					<tr><td>&nbsp;</td><td><div id='statusTip'></div></td></tr>
					<tr>
						<td>老头：</td>
						<td style="width: 35%">
							<input type='text' id='parentName' name='parentName' noempty='true'/>
							<img id='getGroup' name="selimg" src="../images/person.jpg" title='点击选择分组' width="16" height="16">
						</td>
						<td style='width:30%'><div id='parentGroupTip'></div></td>
					</tr>
					
					<tr>
						<td>组名：</td>
						<td style="width: 35%">
							<input type='text' id='groupName' name='groupName' noempty='true'/>
						</td>
						<td style='width:30%'><div id='groupNameTip'></div></td>
					</tr>
					
					<tr>
						<td>备注：</td>
						<td>
							<textarea rows="5" cols="40" name='remark' id='remark'></textarea>
						</td>
					</tr>
					
					<tr>
						<td>&nbsp;</td>
						<td>
							<input type='submit' name="submit" id='submit' title="保存" value="保 存" />
							<input type='button' id='resetBtn' validaor='true' title="重置表单" value="重 置" />
							<input type='button' name="cancel" id='cancel' title="取消操作" value="取 消"/>
						</td>
					</tr>
				</table>
			</form>
		</div>
	</body>
</html>