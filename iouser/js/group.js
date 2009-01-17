/**
 * 功能：分组管理JS 版权：木木工作室（2008）
 * 
 * @author 闫洪磊
 * @createdate 1.0.0.20080606
 */

/** **************************定义常量************************ */
var common = new Common();
var list = new List(common);
var form = new Form(common, list);

// 初始化
$(function() {
	list.initList();// 初始化列表用到的效果
	form.initReset();// 重置事件
	form.initFormSubmit("groupRelationForm");
	regFormValidator();// 注册验证表单
	common.showHightLigth(['groupName']);// 设置高亮显示查询字段
	regListBtn();
	regTreeSelect();
	// 注册手型鼠标和只读
	$('#parentName').each(function(obj) {
		$(this).css('cursor', 'pointer').attr({
			readonly : true,
			title : '点击选择父分组'
		});
	});
});

/**
 * 注册增删改按钮事件
 */
function regListBtn() {
	$('#addEle').unbind('click').bind('click', addNew);
	$('#delEle').unbind('click').bind('click', function() {
		form.del({
			url : 'deleteGroup.do'
		});
	});
	$('#modifyEle').unbind('click').bind('click', function() {
		form.modify('loadGroup.do');
	});
}

/**
 * 注册人员树事件
 */
function regTreeSelect() {
	var tree = new Tree({
		basePath	: '../',
		treeFile	: 'tree/group.html',
		ajaxPath 	: 'tree/getGroupTree.do?gid=-1',
		selectType	: '0',
		onselected	: function(treeObj) {}
	});
	//选择树
	$('#parentName,#getGroup').css('cursor', 'pointer').click(function(){
		var eventSrc = this;
		tree.registeTree({
			title	: '选择[父分组]',
			id		: '#parentId', 
			name	: '#parentName', 
			eventSrc: 'parentName'
		});
	});
}

/**
 * 设置表单验证规则
 */
function regFormValidator() {
	// 初始化验证
	form.initValidatorConfig();
	$("#parentName").formValidator({
		onshow : "点击人头图像选择父分组",
		onfocus : "点击人头图像选择父分组",
		oncorrect : "选择正确"
	}).inputValidator({
		min : 1,
		onerror : "父分组必选，点击人头图像选择父分组"
	});
	$("#groupName").formValidator({
		onshow : "请输入组名",
		onfocus : "请输入组名"
	}).inputValidator({
		min : 1,
		onerror : "组名必须输入"
	});
}

/**
 * 表单提交前
 * 
 * @return {Boolean}
 */
function showRequest(formData, jqForm, options) {
	var valid = $.formValidator.pageIsValid('1');
	if (valid) {
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
	var debtTypeText =  $('#edit #debtType option:selected').text();
	if (statusText == 'success' && resTxt[0] == 'success') {
		var editRemark = common.getValue($('#remark').val(), 15, true);
		if (form.getEditState() == 'update') {// 修改
			var datas = {
				data: [
					{index: 2, id: 'groupName'},
					{index: 3, id: 'parentName'},
					{index: 4, value: '0'},
					{index: 5, value: common.getCurrentDate()},
					{index: 6, value: editRemark, attr: {title: $('#remark').val()}}
				]
			};
			form.updateData(datas);
		} else if (form.getEditState() == 'add') {//新增
			if(list.isEmptyList()){
				window.location.href='groupList.do';
			} else {
				$('#row').createAppend(
			        'tr', { className: list.getLastClass() }, 
			        	[
			        		'td', {}, List.createChkEle({value: resTxt[1]}),
			        		'td', {}, $('#row tr').length + '',
			        		'td', {}, $('#groupName').val(),
			        		'td', {}, $('#parentName').val(),
			        		'td', {}, '0',
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
	form.clearForm();
	regFormValidator();// 重新注册表单验证
	$('#groupRelationForm').attr("action", "addGroup.do");
	list.showHiddenEdit({
		editState : form.getEditState()
	});
}

/**
 * 修改操作回调函数
 * 
 * @param {}
 *            json
 */
function modifyCallback(json) {
	for (key in json)
		$('#edit #' + key).val(json[key]);
	
	// 设置表单action
	$('#groupRelationForm').attr("action", "updateGroup.do");
	$.formValidator.pageIsValid('1');
}