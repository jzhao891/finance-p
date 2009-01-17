var common = new Common();

$(document).ready(function() {
	var options = [{
		module : 'iouser',
		url : 'iouser/count.do',
		infoId : 'ctiouser'
	}, {
		module : 'goodstype',
		url : 'goods/type/count.do',
		infoId : 'ctgoodstype'
	}, {
		module : 'goodsdetail',
		url : 'goods/detail/count.do',
		infoId : 'ctgoodsdetail'
	}, {
		module : 'financein',
		url : 'finance/count.do?financeType=0'
	}, {
		module : 'financeout',
		url : 'finance/count.do?financeType=1'
	}];
	for (var i = 0; i < options.length; i++) {
		setCount(options[i]);
	}
});

/**
 * 获得各个模块的业务统计信息
 * @param {} option
 */
function setCount(option) {
	$.getJSON(option.url, function(msg) {
		if (option.module == 'financein' || option.module == 'financeout') {
			var count = 1;
			for(key in msg) {
				$('#ct' + option.module + count).text(msg[key]);
				count++;
			}
		} else {
			if (msg != 0) {
				$('#' + option.infoId).html(msg);
			} else {
				$('#' + option.infoId).html("0");
			}
		}
		if(option.module == 'financeout') {
			//survey();
		}
	});
}

/**
 * 计算债务情况
 */
function survey() {
	var f0 = $('#ctfinancein3').text() * 1;
	var f1 = $('#ctfinanceout3').text() * 1;
	//负债
	if(f1 == 0){
		$('#f0').css('color', 'green').html('无债一身轻');
	} else {
		if((f0 - f1) > 0){
			$('#f0').text('他人未还额￥ ' + common.round(f0 - f1, 2));
		} else {
			$('#f0').text('欠债￥ ' + common.round(f1 - f0, 2));
		}
	}
}