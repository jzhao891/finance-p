var common = new Common();
var list = new List(common);
var form = new Form(common, list);

$(document).ready(function() {
	form.initFormSubmit('userForm');
	form.setAlertValMsg(true);
	form.initValidatorConfig();
	$("#oldPwd").formValidator({}).inputValidator({
		min : 1,
		onerror : "原始密码不能为空,请确认"
	});
	$("#newPwd1").formValidator({}).inputValidator({
		min : 1,
		onerror : "新密码不能为空,请确认"
	});
	$("#newPwd2").formValidator({}).inputValidator({
		min : 1,
		onerror : "重复密码不能为空,请确认"
	}).compareValidator({
		desid : "newPwd1",
		operateor : "=",
		onerror : "2次密码不一致,请确认"
	});
});

function showRequest(formData, jqForm, options) {
	return $.formValidator.pageIsValid('1');
}

function showResponse(responseText, statusText) {
	var resText = eval('(' + responseText + ')');
	if (resText.status == 'success') {
		$.weeboxs.open("密码修改成功", 
			{	type:'success',
				animate:true,
				modal:false,
				showCancel:false,
				focus:'.dialog-ok',
				timeout:5,
				onclose:function(){
					window.location.href = 'main.jsp';
				}
			});
	} else if (resText.status == 'error') {
		common.dialog(resText.error,'error');
	} else {
		common.dialog('与服务器失去连接，请刷新页面再试！','error');
	}
}

function resetForm() {
	$('input[@type=password]').val('');
}