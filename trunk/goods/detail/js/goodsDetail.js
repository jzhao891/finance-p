/**
 * 功能：物品详细管理JS
 * 版权：木木工作室（2008）
 * @author 闫洪磊
 * @createdate 1.0.0.20080619
 */
 
/** **************************定义常量************************ */
var common = new Common();
var list = new List(common);
var form = new Form(common, list);

// 初始化
$(function() {
	list.initList();//初始化列表用到的效果
	form.initFormSubmit('goodsDetailForm');//初始化表单提交
	form.initReset();//重置事件
	common.showHightLigth(['goodsName','typeName']);//设置高亮显示查询字段
	$("#unitPrice").maskMoney();//注册金额输入
	
	//绑定事件
	$('#resetBtn').bind('click',selfClearForm);
	$('#at').bind('click',addUnit);
	regListBtn();//注册增删改按钮事件
});

/**
 * 注册增删改按钮事件
 */
function regListBtn() {
	$('#addEle').unbind('click').bind('click', addNew);
	$('#delEle').unbind('click').bind('click', form.del);
	$('#modifyEle').unbind('click').bind('click', function(){
		form.setEditState('update');
		if(list.canEdit()) {
			getAllType(getAllUnit);
			regFormValidator();
		}
	});
}

/**
 * 表单提交前处理
 */
function beforeSubmit(){
	var oldValue = $('#unitPrice').val();
	$('#unitPrice').val(common.repalceValue(oldValue,',',''));
}

/**
 * 清除表单数据并增加自己的处理方法
 */
function selfClearForm(){
	form.clearForm('goodsDetailForm');
	form.setEditState('add');
	getAllType(getAllUnit);//重新获得物品类型、物品单位
}

/**
 * 设置表单验证规则
 */
function regFormValidator() {
	form.initValidatorConfig();
	$("#goodsTypeId").formValidator({
		onshow : "请选择物品类型",
		onfocus : "请选择物品类型",
		oncorrect : "选择正确"
	}).inputValidator({
		min : 1,
		onerror : "你选择的物品类型不正确"
	});
	$("#goodsUnit").formValidator({
		onshow : "请选择单位",
		onfocus : "请选择单位",
		oncorrect : "选择正确"
	}).inputValidator({
		min : 1,
		onerror : "选择的单位不正确"
	});
	$("#goodsName").formValidator({
		onshow : "请输入物品名称",
		onfocus : "名称至少2个字,最多50个字"
	}).inputValidator({
		min : 4,
		max : 100,
		onerror : "物品名称非法,请确认"
	});
	$("#unitPrice").formValidator({
		onshow : "请输入物品单价",
		onfocus : "单价大于0"
	}).inputValidator({
		min : 1,
		onerror : "物品单价非法,请确认"
	}).functionValidator({fun:function(){
		var oldValue = $('#unitPrice').val();
		var unitPrice = common.repalceValue(oldValue,',','');
		if(!isNaN(unitPrice) && unitPrice >= 0) {
			return true;
		}
		return false;
	}});
}

/**
 * form插件表单提交前
 * 
 * @return {Boolean}
 */
function showRequest(jqForm, options) {
	//获得类型名称
	var valid = $.formValidator.pageIsValid('1');
	if(valid) {
		form.beforeSubmit();
	}
	return valid;
}

/**
 * 表单响应处理
 * 
 * @param {}
 *            responseText
 * @param {}
 *            statusText
 */
function showResponse(responseText, statusText) {
	var typeName = $('#goodsTypeId option:selected').text();
	var resTxt = responseText.split('|');
	if (statusText == 'success' && resTxt[0] == 'success') {
		var editRemark = common.getValue($('#remark').val(), 20, true);
		if (form.getEditState() == 'update') {//修改
			var datas = {
				data: [
					{index: 2, id: 'goodsName'},
					{index: 3, value: typeName},
					{index: 4, id: 'goodsUnit'},
					{index: 5, id: 'unitPrice'},
					{index: 7, value: editRemark, attr: {title: $('#remark').val()}}
				]
			};
			form.updateData(datas);
		} else if (form.getEditState() == 'add') {//新增
			if(list.isEmptyList()){
				window.location.href='goodsDetailList.do';
			} else {
				$('#row').createAppend(
			        'tr', { className: list.getLastClass() }, 
			        	[
			        		'td', {}, List.createChkEle({value: resTxt[1]}),
			        		'td', {}, $('#row tr').length + '',
			        		'td', {}, $('#goodsName').val(),
			        		'td', {}, typeName,
			        		'td', {}, $('#goodsUnit').val(),
			        		'td', {}, $('#unitPrice').val(),
			        		'td', {}, common.getCurrentDate(),
			        		'td', {title: $('#remark').val()}, editRemark
			        	]
				);
				//新增完毕后显示提示信息
				common.showTip('记录添加成功!');
				//刷新TR注册的所有事件
				list.moveAndleave();
				list.regActive();
				list.addPageNo(1);//修改总条数
			}
		}
	} else {
		common.dialog('保存失败，请稍候再试！', 'error');
	}
	
	// 隐藏表单、显示列表
	list.cancel();
}

/**
 * 增加新纪录
 */
function addNew() {
	form.setEditState('add');
	$('#id').remove();
	$('#submit').val('保 存');
	form.clearForm('goodsDetailForm');
	regFormValidator();// 重新注册表单验证
	$('#submit').attr('disabled','disabled');
	$('#goodsDetailForm').attr("action", "add.do");
	list.showHiddenEdit({editState : form.getEditState()});
	getAllType(getAllUnit);
}

/**
 * 修改操作回调函数
 * 
 * @param {}
 *            json
 */
function modifyCallback(json) {
	for (key in json) {
		$('#' + key).val(json[key]);
	}
	$('#goodsDetailForm').attr("action", "update.do");
	$.formValidator.pageIsValid('1');
}

/**
 * 向物品类型下拉框填充值
 */
function getAllType(callback){
	$.ajax({
		url : "../type/allType.do",
		dataType : "json",
		beforeSend : function(){
			$('#goodsTypeTip').html('正在加载物品类型……').addClass('onLoad');
		},
		success : function(json){
			$('#submit').attr('disabled','');//启用按钮
			$('#goodsTypeTip').empty().removeClass('onLoad');//清空提示
			$('#goodsTypeId').addOption(json,false);
		},
		error : function() {
			$('#goodsTypeTip').empty()
				.html('加载物品类型失败，请稍后或刷新或再试！')
				.removeClass('onLoad')
				.addClass('onError');
		}
	});
	if($.isFunction(callback)) {
		callback();
	}
}

/**
 * 向物品类型下拉框填充值
 */
function getAllUnit(callback){
	$.ajax({
		url : "getAllUnit.do",
		dataType : "json",
		beforeSend : function(){
			$('#goodsUnitTip').html('正在加载物品单位……').addClass('onLoad');
		},
		success : function(json){
			$('#submit').attr('disabled','');//启用按钮
			$('#goodsUnitTip').empty().removeClass('onLoad');//清空提示
			$('#goodsUnit').addOption('','请选择');
			$('#goodsUnit').addOption(json,false);
			$('#goodsUnit').sortOptions(false);
			if(form.getEditState() == 'update'){
				form.modify();
			}
		},
		error : function() {
			$('#goodsUnitTip').empty()
				.html('加载物品单位失败，请稍后或刷新或再试！')
				.removeClass('onLoad')
				.addClass('onError');
		}
	});
	if($.isFunction(callback)) {
		callback();
	}
}

/**
 * 显示单位输入框
 */
function shUnit(){
	$('#unitBlock').show();
	$('#addUnit').focus();
}

/**
 * 增加自定义的单位
 */
function addUnit(){
	if($('#addUnit').val() != '') {
		$('#goodsUnit').addOption($('#addUnit').val(),$('#addUnit').val());
	}
}