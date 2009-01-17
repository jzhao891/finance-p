var common = new Common();
var form = new Form(common);
$(function() {
	// 注册表单提交事件
	form.initFormSubmit('loginForm');//初始化表单提交
	regFormValidator();
	if (common.getCookie('loginName') != null) {
		$('#loginName').val(common.getCookie('loginName'));
		$('#password').val(common.getCookie('password'));
		if (common.getCookie('ifSave')) {
			$('#ifSave').attr('checked', true);
		}
		jQuery.formValidator.pageIsValid('1');
	}
	if($('#loginName').val() == '') {
		$(":text:first", document.forms[0]).focus();
	}
	$('#testlogin').bind('click', testlogin);
});

/**
 * 设置表单验证规则
 */
function regFormValidator() {
	$.formValidator.initConfig({formid:"loginForm"});
	$("#loginName").formValidator({
		onshow : "请输入用户名",
		onfocus : "用户名至少2个字,最多4个字"
	}).inputValidator({
		min : 1,
		onerror : "你输入的用户名非法,请确认"
	});
	
	$("#password").formValidator({
		onshow : "请输入密码"
	}).inputValidator({
		min : 6,
		onerror : "密码在6位以上，请确认"
	});
}

/**
 * 表单提交前
 * 
 * @return {Boolean}
 */
function showRequest(formData, jqForm, options) {
	var valid = jQuery.formValidator.pageIsValid('1');
	if (valid) {
		$('#submit').attr('value', '正在登录……').attr('disabled', true);
		return true;
	} else {
		return false;
	}
}

/**
 * 响应结束后
 * @param {} responseText
 * @param {} statusText
 */
function showResponse(responseText, statusText) {
	if (statusText == 'success' && responseText == 'success') {
		if ($('#ifSave').attr('checked')) {
			common.saveCookie("loginName", $('#loginName').val(), 365);
			common.saveCookie("password", $('#password').val(), 365);
			common.saveCookie("ifSave", true, 365);
		} else {
			common.deleteCookie('loginName');
			common.deleteCookie('password');
			common.deleteCookie('ifSave');
		}
		window.location.href = 'index.jsp';
	} else {
		common.dialog('登录失败，用户名或密码错误，请重试！', 'error');
		$('#submit').attr('value', '登 陆').attr('disabled', false);;
	}
}

/**
 * 以测试用户身份登录系统
 */
function testlogin() {
	$('#loginName').val('test');
	$('#password').val('000000');
	$("form[name=loginForm]").submit();
}