//直接进入首页
$(document).ready(function(){
	goFirstPage();
	//refreshIouser('iouser');
});

function goFirstPage() {
	var eventSrc = $.browser.msie ? event.srcElement : document;
	$('#leftMenu').empty();
	$('.currentMenu').removeClass("currentMenu");
	$(eventSrc).addClass("currentMenu");
	$('#centerFrame').attr('src','main.jsp');
}