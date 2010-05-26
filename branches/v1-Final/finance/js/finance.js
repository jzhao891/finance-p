/**
 * 功能：借入款管理JS 版权：木木工作室（2008）
 * 
 * @author 闫洪磊
 * @version 1.0.0.20080720
 * @版本记录：
 */

/** **************************定义常量************************ */
var common = new Common();
var list = new List(common);
var form = new Form(common, list);
var financeType, zhCnType;// 中文账务类型

// 初始化
$(function() {
	list.initList();//初始化列表用到的效果
	form.initReset();//重置事件
	form.initFormSubmit('financeMoneyForm');//初始化表单提交
	$("#totalArrearage").css('font-weight', 'bold').maskMoney();// 注册金额输入格式
	bindEvent();// 绑定事件
	common.showHightLigth(['borrowUserName']);//设置高亮显示查询字段
	registeTree();// 选择树
	//注册手型鼠标和只读
	$('#getUser,#borrowUserName,#loanDate,#fallinDate,#qgetUser,#qborrowUserName,#qloanDate,#qfallinDate').each(function(obj) {
		$(this).css('cursor', 'pointer').attr('readonly', true);
	});
	financeType = $('#financeType').val() * 1;
	zhCnType = financeType == 0 ? '借入' : '借出';
	log.debug('账务类型=' + zhCnType + '<' + financeType + '>');
});



/**
 * 注册增删改按钮事件
 */
function bindEvent() {
	// 列表按钮事件
	$('#addEle').unbind('click').bind('click', addNew);
	$('#delEle').unbind('click').bind('click', function(){
		form.del({url:'deleteMoney.do'});
	});
	$('#modifyEle').unbind('click').bind('click', function(){
		form.modify('loadMoney.do');
		regFormValidator();// 注册表单验证插件
	});
	$('#repayEle').unbind('click').bind('click', repay);
}

function registeTree() {
	var tree = new Tree({
		basePath	: '../',
		treeFile	: 'tree/iouser/tree.html',
		ajaxPath 	: 'tree/getUserTree.do?gid=-1',
		selectType	: '1',
		onselected	: function(treeObj) {}
	});
	//选择树
	$('#qborrowUserName,#qgetUser').click(function(){
		tree.registeTree({
			title	: '选择、按照[债务人]查询',
			id		: '#qborrowUser', 
			name	: '#qborrowUserName', 
			eventSrc: 'qborrowUserName'
		});
	});
	$('#borrowUserName,#getUser').click(function(){
		tree.registeTree({
			title	: '选择[债务人]',
			id		: '#edit #borrowUser', 
			name	: '#edit #borrowUserName', 
			eventSrc: 'borrowUserName'
		});
	});
}

/**
 * 设置表单验证规则
 */
function regFormValidator() {
	// 初始化验证
	form.initValidatorConfig();
	$("#borrowUserName").formValidator({
		onshow : "点击人头图像选择债务人",
		onfocus : "点击人头图像选择债务人",
		oncorrect : "选择正确"
	}).inputValidator({
		min:1,
		onerror : "债务人必选，点击人头图像选择债务人"
	});

	$("#loanDate").formValidator({
		onshow : "请选择借款日期",
		onfocus : "请选择借款日期",
		oncorrect : "选择正确"
	}).inputValidator({
		min:1,
		onerror : "[借款日期]不能为空"
	});
	
	$("#fallinDate").formValidator({
		onshow : "请选择还款日期",
		onfocus : "请选择还款日期",
		oncorrect : "选择正确"
	}).inputValidator({
		min:1,
		onerror : "[还款日期]不能为空"
	});
	
	$("#totalArrearage").formValidator({
		onshow : "请输入借款总额",
		onfocus : "借款总额大于0"
	}).inputValidator({
		min : 1,
		onerror : "借款总额非法,请确认"
	}).functionValidator({fun:function(){
		var oldValue = $('#totalArrearage').val();
		var unitPrice = common.repalceValue(oldValue,',','');
		if(!isNaN(unitPrice) && unitPrice >= 0) {
			return true;
		}
		return false;
	}});
}

/**
 * 选择借款、还款日期
 * @param {} type
 * 	type  0   借款日期
 *  type  1   还款日期
 */
function getDate(type) {
	if(type == 0) {
		WdatePicker({el:$dp.$($('#loanDate').get(0)),
			maxDate:common.getCurrentDate(),
			onpicked:function(){
				$dp.$($('#loanDate')).blur();
				if($('#fallinDate').val() == '') {
					$dp.$($('#fallinDate')).focus();
					fallinDate();
				}
			}
		});
	} else if(type == 1) {
		fallinDate();
	}
	//选择还款日期
	function fallinDate() {
		$dp.$($('#fallinDate')).focus();
		WdatePicker({el:$dp.$($('#fallinDate').get(0)),
			errDealMode:1,
			minDate:$dp.$($('#loanDate').get(0)).value,
			onpicked:function(){
				$dp.$($('#fallinDate')).blur();
			}
		});
	}
}


/**
 * 自定义的表单提交前处理方法
 */
function beforeSubmit() {
	var oldValue = $('#totalArrearage').val();
	$('#totalArrearage').val(common.repalceValue(oldValue, ',', ''));
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
	log.debug('formData=' + $.param(formData));
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
		if (form.getEditState() == 'update') {//修改
			var datas = {
				data: [
					{index: 2, id: 'borrowUserName'},
					{index: 3, id: 'loanDate'},
					{index: 4, id: 'fallinDate'},
					{index: 5, value: debtTypeText},
					{index: 6, id: 'totalArrearage'},
					{index: 9, value: editRemark, attr: {title: $('#remark').val()}}
				]
			};
			form.updateData(datas);
		} else if (form.getEditState() == 'add') {//新增
			if(list.isEmptyList()){
				window.location.href='listMoney.do?financeType=' + financeType;
			} else {
				$('#row').createAppend(
			        'tr', { className: list.getLastClass() }, 
			        	[
			        		'td', {}, List.createChkEle({value: resTxt[1]}),
			        		'td', {}, $('#row tr').length + '',
			        		'td', {}, $('#borrowUserName').val(),
			        		'td', {}, $('#loanDate').val(),
			        		'td', {}, $('#fallinDate').val(),
			        		'td', {}, debtTypeText,
			        		'td', {style : 'font-size: 16px'}, $('#totalArrearage').val(),
			        		'td', {}, '',
			        		'td', {}, common.getCurrentDateTime(),
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
	form.clearForm('financeMoneyForm', function(){
		$('#financeType').val(common.getParam('financeType'));
	});
	regFormValidator();// 重新注册表单验证
	$('#financeMoneyForm').attr("action", "addMoney.do");
	list.showHiddenEdit({editState : form.getEditState()});
}

/**
 * 修改操作回调函数
 * 
 * @param {}
 *            json
 */
function modifyCallback(json) {
	for (key in json) {
		if (key == 'borrowUser') {
			$('#edit #borrowUser').val(json[key]['id']);
			$('#edit #borrowUserName').val(json[key]['userName']);
		} else {
			$('#edit #' + key).val(json[key]);
		}
	}
	//如果已还款则不能修改借款总额
	var requitedArrearage = parseFloat(json['requitedArrearage']);
	log.debug('已还款=' + requitedArrearage);
	if(requitedArrearage > 0) {
		$('#edit #totalArrearage').attr({
			readonly:true,
			title:'已还款不能修改借款额'
		}).css('cursor','not-allowed');
	}
	
	$('#financeMoneyForm').attr("action", "updateMoney.do");
	$.formValidator.pageIsValid('1');
}

/**
 * 还款操作
 */
function repay() {
	var id = list.getCheckbox();
	if(id == '') {
		common.dialog('请先选择记录再操作！', 'warning');
		return;
	}
	log.info('还款ID=' + id);
	var dialog = null;
	dialog = $.weeboxs.open('repay.html', {
		title 	: '账务-还款',
		contentType : 'ajax',
		width 	: 400,
		height 	: 150,
		animate : true,
		overlay	: 50,
		type 	: 'dialog',
		okBtnName : '还 款',
		onopen	: function(){
			$.get('loadMoney.do', {id : id}, dealLoad, 'json');
		},
		onok	: doRepay
	});
	
	var totalArrearage;//借款总额
	var shouldRepay;//应还款
	//处理加载后的数据
	function dealLoad(json) {
		for(key in json) {
			if(key == 'borrowUser') {
				dialog.find('#borrowUser').html(json[key]['userName']);
			} else if(key == 'totalArrearage') {
				totalArrearage = parseFloat(json[key]);
				dialog.find('#totalArrearage').text(totalArrearage);
			} else {
				dialog.find('#' + key).html(json[key].toString());
			}
		}
		shouldRepay = common.round(totalArrearage - parseFloat(json['requitedArrearage']), 2);
		dialog.find('#repayTotal').val(shouldRepay);
		
		//无需还款时隐藏确认按钮
		if(shouldRepay == 0) {
			log.debug('无需还款');
			dialog.find('#tipDiv').html("<font color='red'>无需还款!</font>");
			dialog.find('#repayTotal').attr('disabled', true);
			dialog.hideButton('ok');
		} else {
			log.debug('应还款' + shouldRepay);
		}
	}
	
	//执行还款动作
	function doRepay() {
		var oldValue = dialog.find('#repayTotal').val();
		var repayTotal = common.round(parseFloat(dialog.find('#repayTotal').val()),2);//本次还款额
		var requited = common.round(parseFloat(dialog.find('#requitedArrearage').html()),2);//已还款额
		if(isNaN(oldValue)) {
			$.weeboxs.open("输入的还款额不是数字！<br/><br/><font color='green'>三秒钟自动关闭。</font><br/>", 
								{type:'warning',animate:true,modal:false,timeout:3});
			dialog.find('#repayTotal').val(shouldRepay);
			return;
		}
		dialog.find('#repayTotal').val(common.repalceValue(oldValue, ',', ''));
		
		if(repayTotal > 0) {
			if(shouldRepay == 0) {
				common.dialog('此项无需还款！', 'warning');
				return;
			}
			//业务逻辑判断
			if(repayTotal > totalArrearage) {
				$.weeboxs.open("还款额度不能大于总借款额！<br/><br/><font color='green'>三秒钟自动关闭。</font><br/>", 
								{type:'warning',animate:true,modal:false,timeout:3});
				dialog.find('#repayTotal').val(shouldRepay);
				return;
			} else if(common.round(repayTotal + requited, 2) > totalArrearage) {
				$.weeboxs.open("已还款额+本次还款额不能大于总借款额！<br/><br/><font color='green'>三秒钟自动关闭。</font><br/>", 
								{type:'warning',animate:true,modal:false,timeout:3});
				dialog.find('#repayTotal').val(shouldRepay);
				return;
			}
			
			//向后台发送还款请求
			log.debug('id=' + id + '发送还款请求,还款额=' + repayTotal);
			$.post("repay.do", {id : id, repayTotal : repayTotal}, function(msg) {
				dialog.close();
				log.debug('id=' + id + '，还款成功,还剩余:' + (shouldRepay - repayTotal));
				$.weeboxs.open("还款成功，本次还款<b>" + repayTotal + "</b>元！<br/><br/><font color='green'>五秒钟自动关闭。</font><br/>", 
								{type:'success',animate:true,modal:false,showCancel:false,focus:'.dialog-ok',timeout:5});
				var selectedRow = $('#row [name=chk]:checkbox:checked').parent().parent().children();
				$(selectedRow).eq(7).html(common.round(repayTotal + requited, 2));
			});
		}
	}
}