<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="net.yanhl.goods.pojo.GoodsType" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@include file="../../common/global.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="UTF-8">
	<head>
		<title>物品类型管理</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta http-equiv="pragma" content="no-cache"/>
		<meta http-equiv="cache-control" content="no-cache"/>
		<script type="text/javascript" src="../../common/js/jquery-last.js"></script>
		<script type="text/javascript" src="../../common/js/plugin/jquery.form.js"></script>
		<script type="text/javascript" src="../../common/js/plugin/formValidator.js"></script>
		<script type="text/javascript" src="../../common/js/plugin/jquery.flydom.js"></script>
		<script type="text/javascript" src="../../common/js/plugin/weebox.js"></script>
		<script type="text/javascript" src="../../common/js/plugin/jquery.selectboxes.js"></script>
		<script type="text/javascript" src="../../common/js/plugin/jquery.highlight.js"></script>
		<script type="text/javascript" src="../../common/js/common.js"></script>
		<script type="text/javascript" src="../../common/js/list.js"></script>
		<script type="text/javascript" src="../../common/js/form.js"></script>
		<script type="text/javascript" src="js/goodsType.js"></script>
		<style type="text/css">
			@IMPORT url("../../css/all.css");
			@IMPORT url("../../css/screen.css");
			@IMPORT url("../../css/weebox/weebox.css");
		</style>
	</head>

	<body>
		<html:form action="/goods/type/goodsTypeList.do" method="post">
			<div>
				<span id='title'>物品类型管理<img id="queryImg" src="../../images/search.gif"/></span>
				<div id='query'>
					<span>
						<label for='qtypeName'>类型名称：<input type='text' id='qtypeName' name='typeName' value="${typeName }"/></label>
					</span>
					<span style='text-align: right'>
						<input type='submit' name="submitBtn" id='submitBtn' title="查询" value="查 询"/>
						<input type="reset" id="resetBtn" title="清除查询条件" value="重 置" />
					</span>
				</div>
				<div id='resultTip' style='display:none'></div>
				<display:table name="resultList" pagesize="${pageSize }" class="its"
					requestURI="/goods/type/goodsTypeList.do" sort="list" id="row"
					partialList="true" size="resultSize"
					style="BORDER-COLLAPSE: collapse" export="true" varTotals="totalMap">
					<%
					if(pageContext.getAttribute("row") != null){
						GoodsType myType = (GoodsType)pageContext.getAttribute("row");
						pageContext.setAttribute("count",myType.getGoodsDetails().size());
						pageContext.setAttribute("names",myType.getParentNames());
					}
					%>
					<display:column style="width:5px"
						title="<input type='checkbox' title='全选记录' id='selAll'/>">
						<input type="checkbox" name="chk" id='chk' value='${row.id }' />
					</display:column>
					<display:column title="序号" value="${row_rowNum}" style="width:50px"></display:column>
					<display:column property="typeName" title="物品类型名称" sortable="true"></display:column>
					<display:column title="父类型名称" sortable="true">${names}</display:column>
					<display:column title="物品数" sortable="true" style="width:10%">${count}</display:column>
					<display:column property="createDate" title="创建时间" sortable="true" style="width:10%"></display:column>
					<display:column property="remark" title="备注" maxLength="20"></display:column>
				</display:table>
			</div>
		</html:form>

		<!-- 按钮区域 -->
		<div id="btnDiv">
			<span>
				<input type='button' id='addEle' title="新增一个物品类型" value="新 增" />
				<input type='button' id='delEle' title="删除一个物品类型" value="删 除" />
				<input type='button' id='modifyEle' title="修改一个物品类型" value="修 改" />
			</span>
		</div>
		
		<div id="edit" style="text-align: center;display:none">
			<form action="add.do" id="goodsTypeForm" name="goodsTypeForm" method="post">
				<table style="width: 100%;" border="0" id='formTable'>
					<tr><td>&nbsp;</td><td><div id='statusTip'></div></td></tr>
					<tr>
						<td>父类型：</td>
						<td style="width: 40%">
							<select id='parentId' name='parentId' noempty='true' title='选择[父类型]'>
								<option value='0'>根类型</option>
							</select>
						</td>
						<td style="width: 30%"><div id='parentIdTip'></div></td>
					</tr>
					
					<tr>
						<td>类型名称：</td>
						<td><input type='text' name='typeName' id='typeName' size="30" noempty='true' title='类型名称'/></td>
						<td><div id='typeNameTip'></div></td>
					</tr>
					
					<tr>
						<td>类型备注：</td>
						<td><textarea rows="5" cols="40" name='remark' id='remark'></textarea></td>
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