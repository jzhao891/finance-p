$(document).ready(function() {
			// $('#remotehtml').load('../index.jsp');
	alert($('#radios :radio').length);
	$('#radios :radio').change(function(){
		if($(this).attr('checked') == true){
			$(this).attr('checked', 'false');
		}
	});
	
	$('#selectpro').change(function(){
		alert($(':selected', this).attr('name'));
	});
});
// $('#remoteFile').load('http://news.kg/wp-content/uploads/tree/d&d/loadTree.php');


function ot() {
	var dialogBox;
	$.weeboxs.open('newwin.html', {
				title : '借入-还款',
				contentType : 'ajax',
				width : 800,
				height : 400,
				animate : true,
				modal : false,
				onopen : setBox,
				overlay : 50,
				type : 'dialog',
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

function fadet1() {
	$('#p1').fadeTo('fast', 0.1, function() {
				$(this).fadeTo('fast', 1, function() {
							$(this).fadeTo('fast', 0.1, function() {
										$(this).fadeTo('fast', 1, function() {
											$(this).hide('slow');
												// $(this).fadeTo('fast', 0);
											});
									});
						});
			});
}
function fadet2() {
	$('#t1 tr').eq(1).find('td').fadeTo('fast', 0.1, function() {
				$(this).fadeTo('fast', 1, function() {
							$(this).fadeTo('fast', 0.1, function() {
										$(this).fadeTo('fast', 1, function() {
													// $(this).parent().slideUp('slow');
													// $(this).fadeTo('fast',
													// 0);
													$(this).parent().remove();
												});
									});
						});
			});
}