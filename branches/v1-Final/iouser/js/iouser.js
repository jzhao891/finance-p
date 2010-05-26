/**
 * 功能：借入/借出人员管理JS
 * 版权：木木工作室（2008）
 * @author 闫洪磊
 * @createdate 1.0.0.20080606
 * @版本记录:
 * 一、20090103
 * 1、解决修改时重复提交表单BUG
 * 2、新增一条记录时在姓名列增加noclick class属性，点击姓名时不选择一行
 */
 
/** **************************定义常量************************ */
var common = new Common();
var list = new List(common);
var form = new Form(common, list);

var bindSubmit = false;// 是否绑定了表单提交事件

// 初始化
$(function() {
	common.showHightLigth(['groupName', 'userName','mobilePhone','companyName']);//设置高亮显示查询字段
	form.initReset();// 重置事件
	list.initList();// 初始化列表用到的效果
	regListBtn();// 注册增删改按钮事件
	regShowDetail();// 点击名称弹出详细
});

/**
 * 注册人员树事件
 */
function registeTree() {
	var tree = new Tree({
		basePath	: '../',
		treeFile	: 'tree/group.html',
		ajaxPath 	: 'tree/getGroupTree.do?gid=-1',
		selectType	: '0',
		onselected	: function(treeObj) {}
	});
	
	// TODO 新增动作打开选择树再修改记录打开树会弹出两个选择树
	//选择树
	$('#edit #getGroup').css('cursor', 'pointer').unbind('click').click(function(){
		tree.registeTree({
			title	: '选择[债务人分组]',
			id		: '#groupId', 
			name	: '#groupName', 
			eventSrc: 'groupName'
		});
	});
}

/**
 * 点击名称弹出详细
 */
function regShowDetail() {
	$("span[name=iouid]").unbind('click').bind('click', function(){
		showDetail($(this).parent().parent().find('input[name=chk]').val());
	});
}

/**
 * 注册增删改按钮事件
 */
function regListBtn() {
	$('#addEle').unbind('click').click(addNew);
	$('#delEle').unbind('click').click(form.del);
	$('#modifyEle').unbind('click').click(function(){
		if(list.canEdit()) // 先判断是否可修改
		common.loadHtml({
			htmlele  	: '#edit',
			filePath 	: 'editIouser.html',
			callback	: function() {
				list.showHiddenEdit({
					id: List.getCheckbox(), 
					editState: 'update', 
					callback: function(){
						Common.initInputEle();
						list.initList();
						registeTree();// 分组选择树
						if(!bindSubmit){
							form.initFormSubmit('userForm');// 初始化表单提交
							bindSubmit = true;
						}
						regFormValidator(form);// 注册表单验证插件
						form.modify();
					}
				});
			}
		});
	});
}

/**
 * 表单提交前
 * 
 * @return {Boolean}
 */
function showRequest(formData, jqForm, options) {
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
		var sex = $(":input[name='sex']:checked").val() == '1' ? '男' : '女';
		var userName = "<span id='" + resTxt[1] +  "' name='iouid' style='cursor:pointer;font-weight: bold' title='点击显示[" 
						+ $('#userName').val() + "]的详细资料' >" + $('#userName').val() + "</span>";
		if (form.getEditState() == 'update') {// 修改
			var datas = {
				data: [
					{index: 2, value: userName, type: 'html'},
					{index: 3, value: sex},
					{index: 4, id: 'age'},
					{index: 5, id: 'groupName'},
					{index: 6, id: 'mobilePhone'},
					{index: 7, id: 'homeAddress'},
					{index: 8, id: 'companyName'}
				]
			};
			form.updateData(datas);
		} else if (form.getEditState() == 'add') {//新增
			if(list.isEmptyList()){
				window.location.href = 'iouserList.do';
			} else {
				$('#row').createAppend(
			        'tr', { className: list.getLastClass() }, 
			        	[
			        		'td', {}, List.createChkEle({value: resTxt[1]}),
			        		'td', {}, $('#row tr').length + '',
			        		'td', {}, userName,
			        		'td', {}, sex,
			        		'td', {}, $('#age').val(),
			        		'td', {}, $('#groupName').val(),
			        		'td', {}, $('#mobilePhone').val(),
			        		'td', {}, $('#homeAddress').val(),
			        		'td', {}, $('#companyName').val()
			        	]
				);
				common.showTip('记录添加成功!');
				//刷新TR注册的所有事件
				list.moveAndleave();// 斑马效果
				list.regActive(); // 选择一行
				list.addPageNo(1);// 修改总记录数
			}
		}
		regShowDetail();//重新注册显示详情
	} else {// 保存失败后的处理方式
		common.dialog('保存失败，请稍候再试！', 'error');
	}
	
	// 隐藏表单、显示列表
	list.cancel();
}

/**
 * 增加新纪录
 */
function addNew() {
	common.loadHtml({
		htmlele  : '#edit',
		filePath : 'editIouser.html',
		callback :	function(){
			form.setEditState('add');
			$('#id').remove();
			$('#submit').val('保 存');
			common.initCommon();
			form.clearForm('userForm');
			if(!bindSubmit){
				form.initFormSubmit('userForm');// 初始化表单提交
				bindSubmit = true;
			}
			registeTree();// 分组选择树
			regFormValidator(form);// 重新注册表单验证
			list.initList();
			list.showHiddenEdit({editState: form.getEditState()});
			$('#userForm').attr("action", "add.do");
		}
	});
}

/**
 * 修改操作回调函数
 * 
 * @param {}
 *            json
 */
function modifyCallback(json) {
	for (key in json) {
		if (key == 'companyPhone') {
			var cmp = json[key].split('-');
			$('#tel_area').val(cmp[0]);
			$('#tel_number').val(cmp[1]);
			$('#tel_ext').val(cmp[2]);
			$('#companyPhone').val(json[key]);
		} else if(key == 'sex'){
			//设置性别
			$('#sex' + json[key]).attr('checked',true);
		} else if(key == 'group') {
			if(json[key] != null) {
				$('#groupId').val(json[key].id)
				$('#groupName').val(json[key].groupName);
			}
		} else {
			$('#' + key).val(json[key]);
		}
	}
	var id = list.getCheckbox();
	if($("#id").length == 0){
		var appendId = "<input type='hidden' name='id' id='id' value='" + id + "'/>"
		$('#userForm').append(appendId);
	}
	$('#userForm').attr("action", "update.do");
	common.removeStatus('statusTip');//删除加载数据状态
	$.formValidator.pageIsValid("1");
}

/**
 * 查看用户详细资料
 * @param {} userId 用户ID
 */
function showDetail(userId) {
	// 创建一个对话框组件
	var dialog = $.weeboxs.open('showDetail.html', {
		title: '正在加载用户信息……',
		contentType: 'ajax',
		width: 600,
		height: 350,
		animate: true,
		clickClose: false,
		type: 'wee',
		showOk: false,
		cancelBtnName: '关 闭',
		onopen: innerShowDetail
	});
	
	//内部函数，实现债务人详细信息的载入、设置值
	function innerShowDetail() {
		var random = (Math.random() + '').substring(0, 4);
		var startTime = new Date().getTime();
		if(typeof log == 'object') {
			log.profile(random + '>加载用户S>' + common.getTimeWithMs());
		}
		// 获得JSON格式的数据
		$.getJSON('load.do',{id : userId}, function(json) {
			if(typeof log == 'object') {
				log.profile(random + '>加载用户E，耗时：' + (new Date().getTime() - startTime) + "(ms)");
			}
			
			// 根据key设置value
			for (key in json) {
				if(key == 'id'){
					$('#detailDiv #' + key).val(json[key]);
				} else {
					if(json[key] == ''){
						// 没有值设置为空
						$('#detailDiv #' + key).html('&nbsp;');
					} else if(key == 'sex'){
						$('#detailDiv #' + key).html(json[key] == '0' ? '女' : '男');
					} else if(key == 'group'){
						if(json[key] != null) {
							$('#detailDiv #' + key).html(json[key]['groupName']);
						}
					} else {
						$('#detailDiv #' + key).html(json[key]);	
					}
				}
			}
			
			//设置对话框标题和内容
			$('#detailDiv').removeAttr('class');
			dialog.setTitle('查看人员[' + json['userName'] + ']详细资料');
			dialog.setContent($('#detailDiv').html());
		});
	}
}