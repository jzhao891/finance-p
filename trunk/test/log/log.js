blacklog.debug('调试信息');
blacklog.info('info测试');
blacklog.warn('警告信息警告信息警告信息警告信息警告信息警告信息警告信息警告信息警告信息警告信息警告信息警告信息警告信息警告信息');
blacklog.error('错误信息');
var startTime = new Date().getTime();
blacklog.profile('1开始时间' + startTime);
var testContent = "";
for(var i = 0; i < 5000;i ++) {
	testContent += '-';
}
var endTime = new Date().getTime();
blacklog.profile('1耗时：' + (endTime - startTime) + "(ms)");