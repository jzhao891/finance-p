var treeColl;

$(document).ready(function() {
	$('#openUserTree').bind('click', openUserTree);
	//getUser();
});

function initTree(box) {
	treeColl = box.find('.simpleTree').simpleTree({
		autoclose : false,
		basePath : '../../',
		drag : false,
		afterClick : function(node) {
			// alert("id=" + node.attr('id') +
			// "，text="+$('span:first',node).text());
		},
		afterDblClick : function(node) {
			alert("id=" + node.attr('id') + "，text="
					+ $('span:first', node).text());
		},
		afterMove : function(destination, source, pos) {
			// alert("destination-"+$('span:first',destination).text()+"
			// source-"+$('span:first',source).text()+" pos-"+pos);
		},
		afterAjax : function() {
			// alert('Loaded');
		},
		animate : true
			// ,docToFolderConvert:true
	});
	//延迟自动打开前两层树
	setTimeout("$('.trigger').eq(0).trigger('click')",10);
	setTimeout("$('.trigger').eq(1).trigger('click')",20);
}

function showInfo() {
	var selTreeObj = $('.simpleTree .active');
	$('#seval').html('内部值=' + $(selTreeObj).parent().attr('id') + "，显示=" + $(selTreeObj).html());
}

function openUserTree() {
	$.weeboxs.open($('#tree').html(), 
		{
			width : 300,
			height : 350,
			title : '人员/分组选择树',
			modal : false,
			onopen : initTree,
			onclose : showInfo
		}
	);
}
