<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
<%@include file="../../common/global.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>账务(${financeType == "0" ? "借入" : "借出" })管理</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta http-equiv="pragma" content="no-cache"/>
		<meta http-equiv="cache-control" content="no-cache"/>
		<script type="text/javascript" src="../common/js/jquery-last.js"></script>
		<script type="text/javascript" src="../common/js/plugin/jquery.form.js"></script>
		<script type="text/javascript" src="../common/js/plugin/formValidator.js"></script>
		<script type="text/javascript" src="../common/js/plugin/jquery.flydom.js"></script>
		<script type="text/javascript" src="../common/js/plugin/jquery.highlight.js"></script>
		<script type="text/javascript" src="../common/js/plugin/jquery.maskMoney.js"></script>
		<script type="text/javascript" src="../common/js/plugin/jquery.simple.tree.js"></script>
		<script type="text/javascript" src="../common/js/plugin/weebox.js"></script>
		<script type="text/javascript" src="../common/js/plugin/blackbird.js"></script>
		<script type="text/javascript" src="../common/datepicker/WdatePicker.js"></script>
		<script type="text/javascript" src="../common/js/common.js"></script>
		<script type="text/javascript" src="../common/js/list.js"></script>
		<script type="text/javascript" src="../common/js/tree.js"></script>
		<script type="text/javascript" src="../common/js/form.js"></script>
		<script type="text/javascript" src="js/finance.js"></script>

		<style type="text/css">
			@IMPORT url("../css/all.css");
			@IMPORT url("../css/screen.css");
			@IMPORT url("../css/list.css");
			@IMPORT url("../css/validator/validator.css");
			@IMPORT url("../css/tree/tree.css");
			@IMPORT url("../css/weebox/weebox.css");
			@IMPORT url("../css/log/blackbird.css");
		</style>
	</head>

	<body>
		<html:form action="/finance/listMoney.do?financeType=${financeType }" method="post">
			<%-- 隐藏域 --%>
			<c:choose>
				<c:when test="${empty borrowUser}">
					<input type='hidden' name='borrowUser' id='qborrowUser'/>
				</c:when>
				<c:otherwise>
					<input type='hidden' name='borrowUser' id='qborrowUser' value='${borrowUser}'/>
				</c:otherwise>
			</c:choose>
			
			<div>
				<span id='title'>账务<b>(${financeType == "0" ? "借入" : "借出" })</b>管理</span>
				<div id='query'>
					<fieldset>
						<legend align="center">
							<b><a id='queryArea' href='javascript:;'>显示查询条件</a></b>
						</legend>
						<div id='queryWords' style='display:none'>
							<span>
								<label for='qborrowUserName' title='按照[债务人]查询'>债务人：
									<input type='text' id='qborrowUserName' name='borrowUserName' value="${borrowUserName }"/>
									<img id='qgetUser' name="selimg" src="../images/person.jpg" width="16" height="16">
								</label>
								<label for='qloanDate'>借款日期：
								<input type='text' id='qloanDate' name='loanDate' title='按照[借款日期]查询' 
								onclick="WdatePicker()" value="${loanDate }"/></label>
								<label for='qfallinDate'>到期还款日：
								<input type='text' id='qfallinDate' name='fallinDate' title='按照[到期还款日]查询' 
								onclick="WdatePicker()" value="${fallinDate }"/></label>
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
					requestURI="listMoney.do" sort="list" id="row" partialList="true" size="resultSize"
					style="BORDER-COLLAPSE: collapse" export="true" varTotals="totalMap">
					<display:column style="width:5px" title="<input type='checkbox' title='全选记录' id='selAll'/>">
						<input type="checkbox" name="chk" id='chk' value='${row.id }' />
					</display:column>
					<display:column title="序号" value="${row_rowNum}" style="width:50px"></display:column>
					<display:column title="债务人" sortable="true" value="${row.borrowUser.userName }"></display:column>
					<display:column property="loanDate" title="借款日期" sortable="true"></display:column>
					<display:column property="fallinDate" title="到期还款日" sortable="true"></display:column>
					<display:column property="debtTypeCn" title="债务类型" sortable="true"></display:column>
					<display:column property="totalArrearage" title="借款总额<br/>(单位:元)" style="font-size: 16px" sortable="true"></display:column>
					<display:column title="已还总额<br/>(单位:元)" style="font-size: 16px" sortable="true">
						<c:choose>
							<c:when test="${row.requitedArrearage == 0.0}">
								${row.requitedArrearage}
							</c:when >
							<c:otherwise>
								${row.requitedArrearage}
							</c:otherwise>
						</c:choose>
					</display:column>
					<display:column property="createDate" title="登记时间" sortable="true"></display:column>
					<display:column property="remark" title="备注" maxLength="30"></display:column>
				</display:table>
			</div>
		</html:form>

		<!-- 按钮区域 -->
		<div id="btnDiv">
			<span>
				<input type='button' id='addEle' title="登记债务信息" value="登 记" />
				<input type='button' id='delEle' title="删除债务信息" value="删 除" />
				<input type='button' id='modifyEle' title="修改债务信息" value="修 改" />
				<font color="green">|</font>
				<input type='button' id='repayEle' title="还款" value="还 款" />
			</span>
		</div>
		
		<div id="edit" style="text-align: center;display:none">
			<form action="addMoney.do" id="financeMoneyForm" name="financeMoneyForm" method="post" onsubmit="beforeSubmit()">
				<input type='hidden' id='requitedArrearage' name='requitedArrearage' />
				<input type='hidden' id='borrowUser' name='borrowUser' />
				<input type='hidden' id='financeType' name='financeType' value="${financeType }"/>
				<table style="width: 100%;" border="0" id='formTable'>
					<tr><td>&nbsp;</td><td><div id='statusTip'></div></td></tr>
					<tr>
						<td>债务人：</td>
						<td style="width: 35%" title='点击选择[债务人]'>
							<input type='text' id='borrowUserName' noempty='true' name='borrowUserName' />
							<img id='getUser' src="../images/person.jpg" width="16" height="16">
						</td>
						<td style='width:30%'><div id='borrowUserNameTip'></div></td>
					</tr>
					
					<tr>
						<td>债务方式：</td>
						<td style="width: 35%">
							<select id='debtType' name='debtType'>
								<option value='0'>现金</option>
								<option value='1'>银行转帐</option>
								<option value='2'>支票</option>
							</select>
						</td>
						<td style='width:30%'><div id='debtTypeTip'></div></td>
					</tr>
					
					<tr>
						<td>借款日期：</td>
						<td title='点击选择[借款日期]'>
							<input type='text' name='loanDate' id='loanDate' noempty='true' onclick="$('#d1img').trigger('onclick');"/>
							<img id='d1img' name='selimg' onclick="getDate(0)" src="../common/datepicker/skin/datePicker.gif" class="datepicker">
						</td>
						<td><div id='loanDateTip'></div></td>
					</tr>
					
					<tr>
						<td>还款日期：</td>
						<td title='点击选择[还款日期]'>
							<input type='text' name='fallinDate' id='fallinDate' noempty='true' onclick="$('#d2img').trigger('onclick');" />
							<img id='d2img' name='selimg' onclick="getDate(1)" src="../common/datepicker/skin/datePicker.gif" class="datepicker" />
						</td>
						<td style='width:30%'><div id='fallinDateTip'></div></td>
					</tr>
					
					<tr>
						<td>借款总额：</td>
						<td>
							<input type='text' name='totalArrearage' id='totalArrearage' noempty='true' title='输入总额'/>
						</td>
						<td><div id='totalArrearageTip'></div></td>
					</tr>
					
					<tr>
						<td>借款备注：</td>
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