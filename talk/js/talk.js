$(document).ready(function(){
	// 表单提交设置
	var formSubmitOptions = {
		beforeSubmit : showRequest,
		success : showResponse,
		clearForm : false
	};
	
	$('#msgForm').submit(function() {
		$(this).ajaxSubmit(formSubmitOptions);
		return false;
	});
	$('#lastDate').val(getCurrentDateTime());
	$('#clear').bind('click',clear);
	window.setInterval("getMsgs()",1000);
});

function clear(){
	$('#msgs').html('');
}

/**
 * 表单提交前
 * 
 * @return {Boolean}
 */
function showRequest(formData, jqForm, options) {
	return true;
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
	if (statusText == 'success' && responseText == 'success') {
		var msg = '<我>&nbsp;&nbsp;'+ $('#message').val() + '&nbsp;&nbsp;' + getCurrentDateTime() + '<br/>';
		$('#msgs').append(msg);
		$('#message').val('');
	}
}

function getMsgs(){
	//$('#msgs').append($('#lastDate').val() + '<br/>');
	$.ajax({
		url : "getMsg.do?lastDate=" + $('#lastDate').val(),
		dataType : "json",
		beforeSend : function(){
			$('#lastDate').val(getCurrentDateTime());
		},
		success : function(json){
			deal(json);
		},
		error : function() {
			//$('#msgs').append("<font color='red'>错误</font>");
		}
	});
}

function deal(json){
	$.each(json, function(i, n){
		var msgDate = new Date();
		msgDate.setTime(n['msgDate']['time']);
		var myDate = msgDate.getYear() + '-' + (msgDate.getMonth()+1) + '-' + msgDate.getDate()
						+ ' ' + msgDate.getHours() + ':' + msgDate.getMinutes() + ':' + msgDate.getSeconds();
		$('#msgs').append('<' + n['user']['userName'] + '>' + '&nbsp;&nbsp;' +  n['message'] + '&nbsp;&nbsp;' + myDate + '<br/>');
	});
}