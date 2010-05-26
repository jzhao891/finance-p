$(document).ready(function() {
	
	$('#color option').each(function(){
		//alert($(this).val());
	});
	
	var tv = $.makeArray($('#color option'));
	alert(tv[1]);
			// $('#remotehtml').load('../index.jsp');
	//alert($('#radios :radio').length);
	//alert($('select[name=province] option:selected').text());
	$('#radios :radio').change(function(){
		if($(this).attr('checked') == true){
			$(this).attr('checked', 'false');
		}
	});
	
	//$('#baidu').load('http://www.baidu.com');
	
	$('#selectpro').change(function(){
		alert($(':selected', this).attr('name'));
	});
	
	// 获得删除ID 
	$('#datas .link').click(function(){
		alert(this.id);
		$(this).parent().parent().remove();
	});
	
	$('#emptyBtn').click(function(){
		$('#selectpro').empty();
	});
});
// $('#remoteFile').load('http://news.kg/wp-content/uploads/tree/d&d/loadTree.php');

function del(tt) {
	alert(tt.parentElement.removeNode(true));
}

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