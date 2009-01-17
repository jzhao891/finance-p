/**
 * 设置表单验证规则
 */
function regFormValidator(form) {
	form.initValidatorConfig();//初始化表单验证插件
	$("#edit #groupName").attr('readonly', true).formValidator({
		onshow : "请选择人员分组",
		onfocus : "分组为必选项"
	}).inputValidator({
		min : 1,
		onerror : "你选择的分组非法,请确认"
	});
	
	$("#edit #userName").formValidator({
		onshow : "请输入用户名",
		onfocus : "用户名至少2个字,最多4个字"
	}).inputValidator({
		min : 4,
		max : 8,
		onerror : "你输入的用户名非法,请确认"
	});

	$("#edit input:radio[name='sex']").formValidator({
		tipid : 'sexTip',
		onshow : "请选择你的性别",
		onfocus : "没有第三种性别了，你选一个吧",
		oncorrect : "选择正确"
	}).inputValidator({
		min : 1,
		max : 1,
		onerror : "性别忘记选了,请确认"
	});

	$("#edit #age").formValidator({
		empty : true,
		onshow : "请输入年龄（1-100岁之间）",
		onfocus : "只能输入1-100之间的数字哦",
		onempty : "知道了再填吧"
	}).inputValidator({
		min : 1,
		max : 100,
		type : "value",
		onerrormin : "你输入的值必须大于等于1",
		onerror : "年龄必须在1-100之间，请确认"
	});

	$("#edit #mobilePhone").formValidator({
		empty : true,
		onshow : "请输入手机号码，可以为空哦",
		onfocus : "你要是输入了，必须输入正确",
		onempty : "有了再填吧"
	}).inputValidator({
		min : 11,
		max : 11,
		onerror : "手机号码必须是11位的,请确认"
	}).regexValidator({
		regexp : "mobile",
		datatype : "enum",
		onerror : "你输入的[手机号码]格式不正确"
	});

	$("#edit #homePhone").formValidator({
		empty : true,
		onshow : "请输入联系电话，可以为空哦",
		onfocus : "格式例如：0635-66668888",
		onempty : "有了再填吧"
	}).regexValidator({
		regexp : "^[[0-9]{3}-|\[0-9]{4}-]?([0-9]{8}|[0-9]{7})?$",
		onerror : "你输入的[家庭电话]格式不正确"
	});
	
	$("#edit #tel_area").formValidator({
		empty : true,
		tipid : "teltip",
		onshow : "请输入地区区号",
		onfocus : "地区区号3位或4位数字"
	}).regexValidator({
		regexp : "^\\d{3,4}$",
		onerror : "地区区号不正确"
	});
	$("#edit #tel_number").formValidator({
		empty : true,
		tipid : "teltip",
		onshow : "请输入电话号码",
		onfocus : "电话号码7到8位数字"
	}).regexValidator({
		regexp : "^\\d{7,8}$",
		onerror : "电话号码不正确"
	});
	$("#edit #tel_ext").formValidator({
		empty : true,
		tipid : "teltip",
		onshow : "请输入分机号码",
		onfocus : "分机号码1到5位数字"
	}).regexValidator({
		regexp : "^\\d{1,5}$",
		onerror : "分机号码不正确"
	});
}