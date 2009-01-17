$(document).ready(function() {
	//$('#remotehtml').load('../index.jsp');
});
//$('#remoteFile').load('http://news.kg/wp-content/uploads/tree/d&d/loadTree.php');

function ot() {
	var dialogBox;
	$.weeboxs.open('newwin.html', {
		title 	: '借入-还款',
		contentType : 'ajax',
		width 	: 800,
		height 	: 400,
		animate : true,
		modal : false,
		onopen : setBox,
		overlay	: 50,
		type 	: 'dialog',
		okBtnName : '测试',
		onok : okt
	});
	
	function setBox(box) {
		dialogBox = box;
	}

	function okt() {
		alert(dialogBox.find('input[@name=chk][@checked]').length);
	}
}

function ot1() {
	
}