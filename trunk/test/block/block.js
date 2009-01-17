$(document).ready(function() {
	$('#block').click(function() {
		$('#p1').block({ message: null }); 
	});
	$('#unblock').click(function() {
		$('#p1').unblock();
	});
});