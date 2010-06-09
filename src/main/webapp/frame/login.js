$(function() {
    $('#login').click(function() {
		//alert($('#loginForm').serialize());
        $.post('user/login.action', $('#loginForm').serialize() , function(resp) {
        	if (resp.msg == 'success') {
				location.href = 'index.jsp';
			} else {
				alert('用户名或密码错误');
			}
        });
    });
});
