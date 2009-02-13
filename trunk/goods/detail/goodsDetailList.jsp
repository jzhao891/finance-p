<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@include file="../../common/global.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="UTF-8">
	<head>
		<title>物品详细管理</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta http-equiv="pragma" content="no-cache"/>
		<meta http-equiv="cache-control" content="no-cache"/>
		<script type="text/javascript" src="../../common/js/jquery-last.js"></script>
		<script type="text/javascript" src="../../common/js/plugin/jquery.form.js"></script>
		<script type="text/javascript" src="../../common/js/plugin/formValidator.js"></script>
		<script type="text/javascript" src="../../common/js/plugin/jquery.flydom.js"></script>
		<script type="text/javascript" src="../../common/js/plugin/weebox.js"></script>
		<script type="text/javascript" src="../../common/js/plugin/jquery.selectboxes.js"></script>
		<script type="text/javascript" src="../../common/js/plugin/jquery.maskMoney.js"></script>
		<script type="text/javascript" src="../../common/js/plugin/jquery.highlight.js"></script>
		<script type="text/javascript" src="../../common/js/common.js"></script>
		<script type="text/javascript" src="../../common/js/list.js"></script>
		<script type="text/javascript" src="../../common/js/form.js"></script>
		<script type="text/javascript" src="js/goodsDetail.js"></script>
		<style type="text/css">
			@IMPORT url("../../css/all.css");
			@IMPORT url("../../css/screen.css");
			@IMPORT url("../../css/list.css");
			@IMPORT url("../../css/weebox/weebox.css");
			@IMPORT url("../../css/validator/validator.css");
		</style>
	</head>

	<body>
		<html:form action="/goods/detail/goodsDetailList.do" method="post">
			<div>
				<span id='title'>物品详细管理</span>
				<div id='query'>
					<fieldset>
						<legend align="center">
							<b><a id='queryArea' href='javascript:;'>显示查询条件</a></b>
						</legend>
						<div id='queryWords' style='display:none'>
							<span>
								<label for='qgoodsName'>物品名称：<input type='text' id='qgoodsName' name='goodsName' value="${goodsName }"/></label>
								<label for='qtypeName'>物品类型：<input type='text' id='qtypeName' name='typeName' value="${typeName }"/></label>
							</span>
							<span style='text-align: right'>
								<input type='submit' name="submitBtn" id='submitBtn' title="查询" value="查 询"/>
								<input type="button" id="resetBtn" title="清除查询条件" value="重 置"/>
							</span>
						</div>
					</fieldset>
				</div>
				<div id='resultTip' style='display:none'></div>
				<display:table name="resultList" pagesize="${pageSize }" class="its"
					requestURI="/goods/detail/goodsDetailList.do" sort="list" id="row"
					partialList="true" size="resultSize"
					style="BORDER-COLLAPSE: collapse" export="true" varTotals="totalMap">
					<display:column style="width:5px"
						title="<input type='checkbox' title='全选记录' id='selAll'/>">
						<input type="checkbox" name="chk" id='chk' value='${row.id }' />
					</display:column>
					<display:column title="序号" value="${row_rowNum}" style="width:50px"></display:column>
					<display:column property="goodsName" title="物品名称" sortable="true"></display:column>
					<display:column title="物品类型" sortable="true"><c:out value="${row.goodsType.typeName}"/></display:column>
					<display:column property="goodsUnit" title="物品单位" sortable="true"></display:column>
					<display:column property="unitPrice" title="物品单价(元)" sortable="true"></display:column>
					<display:column property="createDate" title="创建时间" sortable="true"></display:column>
					<display:column property="remark" title="备注" maxLength="20"></display:column>
				</display:table>
			</div>
		</html:form>

		<!-- 按钮区域 -->
		<div id="btnDiv">
			<span>
				<input type='button' id='addEle' title="新增一个物品详细" value="新 增" />
				<input type='button' id='delEle' title="删除一个物品详细" value="删 除" />
				<input type='button' id='modifyEle' title="修改一个物品详细" value="修 改" />
			</span>
		</div>
		<div id="edit" style="text-align: center;display:none">
			<form action="add.do" id="goodsDetailForm" name="goodsDetailForm" method="post" onsubmit="beforeSubmit()">
				<table style="width: 100%;" border="0" id='formTable'>
					<tr><td>&nbsp;</td><td><div id='statusTip'></div></td></tr>
					<tr>
						<td>物品类型：</td>
						<td style="width: 40%">
							<select id='goodsTypeId' name='goodsTypeId' noempty='true' title="属于哪一类产品">
								<option value=''>请选择</option>
							</select>
						</td>
						<td style='width:30%'><div id='goodsTypeIdTip'></div></td>
					</tr>
					
					<tr>
						<td>物品名称：</td>
						<td><input type='text' name='goodsName' id='goodsName' noempty='true' title='物品名称'/></td>
						<td><div id='goodsNameTip'></div></td>
					</tr>
					
					<tr>
						<td>物品单位：</td>
						<td>
							<select id='goodsUnit' name='goodsUnit' noempty='true' style="padding-right: 5px" title='从现有单位中选择一个'></select>
							<a href='javascript:;' onclick="shUnit()" title='手动添加一种类型'>添加</a><br/>
							<span id='unitBlock' style="display:none">
								<input type='text' id='addUnit' title="在此输入类型后点击[添加]按钮"/>
								<input type='button' name="at" id='at' title="添加类型" value="添加"/>
							</span>
						</td>
						<td><div id='goodsUnitTip'></div></td>
					</tr>
					
					<tr>
						<td>物品单价：</td>
						<td><input type='text' name='unitPrice' id='unitPrice' noempty='true' title='物品单价'/></td>
						<td><div id='unitPriceTip'></div></td>
					</tr>
					
					<tr>
						<td>备注：</td>
						<td><textarea rows="5" cols="40" name='remark' id='remark'></textarea></td>
					</tr>
					
					<tr>
						<td>&nbsp;</td>
						<td>
							<input type='submit' name="submit" id='submit' title="提交表单" value="保 存" />
							<input type='button' id='resetBtn' validaor='true' title="重置表单" value="重 置"/>
							<input type='button' name="cancel" id='cancel' title="取消操作" value="取 消"/>
						</td>
					</tr>
				</table>
			</form>
		</div>
	</body>
</html>