package net.yanhl.struts.authority;

import javax.servlet.http.HttpServletRequest;

import net.yanhl.util.UserUtil;

import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.apache.struts.action.ActionMapping;

/**
 * <p>Title: 判断用户是不是已经登陆</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2008</p>
 * 
 * @author 闫洪磊
 * @version 1.0.0.20080523
 */
public class UserAuthorityInterceptor implements MethodInterceptor {
	public Object invoke(MethodInvocation invocation) throws Throwable {
		HttpServletRequest request = null;
		ActionMapping mapping = null;
		Object[] args = invocation.getArguments();
		for (int i = 0; i < args.length; i++) {
			if (args[i] instanceof HttpServletRequest)
				request = (HttpServletRequest) args[i];
			if (args[i] instanceof ActionMapping)
				mapping = (ActionMapping) args[i];
		}
		if(UserUtil.isLogin(request)) {
			return invocation.proceed();
		} else {
			return mapping.findForward(UserUtil.FORWARD_LOGIN);
		}
	}
}
