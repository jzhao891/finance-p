<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
<%@include file="common/global.jsp"%>
<c:if test="${empty user}">
	<script>
		window.parent.location.href='login.jsp';
	</script>
</c:if>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title><%=siteName%></title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta http-equiv="pragma" content="no-cache" />
		<meta http-equiv="cache-control" content="no-cache" />
		<script type="text/javascript" src="common/js/jquery-last.js"></script>
		<script type="text/javascript" src="common/js/common.js"></script>
		<script type="text/javascript" src="main.js"></script>
		<link rel="stylesheet" type="text/css" href="css/main.css"/>
	</head>
	<body>
		<div align="center" style="padding-top: 30px">
			<fieldset>
				<legend>
					债务人员信息
				</legend>
				<ul>
					<li>
						目前共<a id='ctiouser' name='ct' href="iouser/iouserList.do"></a>个人员信息
					</li>
				</ul>
			</fieldset>
			<fieldset>
				<legend>
					物品情况统计
				</legend>
				<ul>
					<li>
						目前共<a id='ctgoodstype' name='ct' href="goods/type/goodsTypeList.do"></a>个物品类型
					</li>
					<li>
						包括<a id='ctgoodsdetail' name='ct' href="goods/detail/goodsDetailList.do"></a>种物品
					</li>
				</ul>
			</fieldset>
			<fieldset>
				<legend>
					<b>他</b>人欠款-汇总
				</legend>
				<ul>
					<li>
						目前共欠款￥<a id='ctfinancein1' name='ct' href="finance/listMoney.do?financeType=0"></a>元
					</li>
					<li>
						已还款￥<a id='ctfinancein2' name='ct' href="finance/listMoney.do?financeType=0"></a>元
					</li>
					<li>
						还欠￥<a id='ctfinancein3' name='ct' href="finance/listMoney.do?financeType=0"></a>元
					</li>
				</ul>
			</fieldset>
			<fieldset>
				<legend>
					<b>本</b>人欠款-汇总
				</legend>
				<ul>
					<li>
						目前共欠款￥<a id='ctfinanceout1' name='ct' href="finance/listMoney.do?financeType=1"></a>元
					</li>
					<li>
						已还款￥<a id='ctfinanceout2' name='ct' href="finance/listMoney.do?financeType=1"></a>元
					</li>
					<li>
						还欠￥<a id='ctfinanceout3' name='ct' href="finance/listMoney.do?financeType=1"></a>元
					</li>
				</ul>
			</fieldset>
			<!-- 
			<hr width="60%" />
			<div>
				<font size="5" style="font-family: 微软雅黑">负债情况：<span id='f0'></span></font>
			</div> -->
		</div>
	</body>
</html>
