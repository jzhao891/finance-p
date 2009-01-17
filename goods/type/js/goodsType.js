/**
 * 功能：物品类型管理JS
 * 版权：木木工作室（2008）
 * @author 闫洪磊
 * @createdate 1.0.0.20080617
 */
 
/** **************************定义常量************************ */
var common = new Common();
var list = new List(common);
var form = new Form(common, list);
// 初始化
$(function() {
	list.initList();//初始化列表用到的效果
	form.initFormSubmit('goodsTypeForm');//初始化表单提交
	form.initReset();//重置事件
	common.showHightLigth(['typeName']);//设置高亮显示查询字段
	regListBtn();//注册增删改按钮事件
});

/**
 * 注册增删改按钮事件
 */
function regListBtn() {
	$('#addEle').unbind('click').bind('click', addNew);
	$('#delEle').unbind('click').bind('click', function(){
		form.del({
			msg:'<br/>确定要删除这<b>' + self.list.getCheckbox().length + '</b>条记录吗？'
					+ '<br/>如果删除此类型下面的所有物品也将一同删除，确定吗？'
		});
	});
	$('#modifyEle').unbind('click').bind('click', function(){
		form.setEditState('update');
		if(list.canEdit()) {
			getAllType();
		}
	});
}

/**
 * 设置表单验证规则
 */
function regFormValidator() {
	form.initValidatorConfig();
	$("#typeName").formValidator({
		onshow:"请输入类型名称",
		onfocus:"类型名称至少1个字,最多50个字",
		oncorrect:"该类型名称可以使用"
	}).inputValidator({
		min:2,
		max:100,
		onerror:"你输入的类型名称非法,请确认"
	}).ajaxValidator({
		url : "isExist.do",
		success : function(data){
            if(data == "false"){
                return true;
			} else if(data.indexOf('true') != -1) {
				var results = data.split('|');
				if(results[0] == 'true' && results[1] == $('#id').val()) {
					return true;
				} else {
					return false;
				}
			} else {
                return false;
			}
		},
		buttons : $('#submit'),
		error: function(){
			common.dialog("服务器没有返回数据，可能服务器忙，请重试", 'error');
		},
		onerror : "该类型名称已存在",
		onwait : "正在对类型名称进行合法性校验，请稍候..."
	});
}

/**
 * 表单提交前
 * 
 * @return {Boolean}
 */
function showRequest(jqForm, options) {
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
	var resTxt = responseText.split('|');
	if (statusText == 'success' && resTxt[0] == 'success') {
		var editRemark = common.getValue($('#remark').val(), 20, true);
		if (form.getEditState() == 'update') {//修改
			var datas = {
				data: [
					{index: 2, id: 'typeName'},
					{index: 3, value: $('#parentId option:selected').text()},
					{index: 6, value: editRemark, attr: {title: $('#remark').val()}}
				]
			};
			form.updateData(datas);
		} else if (form.getEditState() == 'add') {//新增
			if(list.isEmptyList()){
				window.location.href='goodsTypeList.do';
			} else {
				$('#row').createAppend(
			        'tr', { className: list.getLastClass() }, [
			        		'td', {}, List.createChkEle({value: resTxt[1]}),
			        		'td', {}, $('#row tr').length + '',
			        		'td', {}, $('#typeName').val(),
			        		'td', {}, $('#parentId option:selected').text(),
			        		'td', {}, '0',
			        		'td', {}, common.getCurrentDate(),
			        		'td', {title : $('#remark').val()}, editRemark 
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
	$('#id').remove();
	$('#submit').val('保 存');
	form.setEditState('add');
	form.clearForm('goodsTypeForm');
	getAllType(regFormValidator);
	$('#goodsTypeForm').attr("action", "add.do");
	list.showHiddenEdit({editState : form.getEditState()});
}

/**
 * 修改操作回调函数
 * 
 * @param {}
 *            json
 */
function modifyCallback(json) {
	for (key in json)
		$('#' + key).val(json[key]);
	
	$('#goodsTypeForm').attr("action", "update.do");
	$.formValidator.pageIsValid();
}

/**
 * 向物品类型下拉框填充值
 */
function getAllType(callback){
	$.ajax({
		url : "allType.do",
		dataType : "json",
		beforeSend : function(){
			$('#parentIdTip').html('正在加载物品类型……').addClass('onLoad');
		},
		success : function(json){
			$('#submit').attr('disabled','');//启用按钮
			$('#parentIdTip').empty().removeClass('onLoad');//清空提示
			$('#parentId').addOption(json,false);
			if(form.getEditState() == 'update') {
				form.modify();
				regFormValidator();// 注册表单验证插件
			}
		},
		error : function() {
			$('#parentIdTip').empty()
				.html('加载物品类型失败，请稍后或刷新或再试！')
				.removeClass('onLoad')
				.addClass('onError');
		}
	});
	if($.isFunction(callback)) {
		callback();
	}
}