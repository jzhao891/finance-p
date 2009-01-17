package net.yanhl.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import net.yanhl.user.pojo.*;

public class UserUtil {
	public static final String LOGIN_USER = "user";
	public static final String FORWARD_LOGIN = "login";
	/**
	 * 把用户保存到Session
	 * 
	 * @param user
	 * @param request
	 */
	public static void saveUser2Session(User user, HttpServletRequest request) {
		HttpSession session = request.getSession();
		session.setAttribute(LOGIN_USER, user);
	}

	/**
	 * 用户是否登录
	 * 
	 * @param request
	 * @return boolean
	 */
	public static boolean isLogin(HttpServletRequest request) {
		User user = getUserFromSession(request);
		if (user == null) {
			return false;
		} else {
			return true;
		}
	}

	/**
	 * 从Session范围取用户
	 * 
	 * @param request
	 * @return user
	 */
	public static User getUserFromSession(HttpServletRequest request) {
		HttpSession session = request.getSession();
		User user = null;
		user = (User) session.getAttribute(LOGIN_USER);
		return user;
	}
	
	/**
	 * 得到当前登录用户的ID
	 * @param request
	 * @return
	 */
	public static String getCurrentUserId(HttpServletRequest request) {
		return String.valueOf(getUserFromSession(request).getUserId());
	}
	
	/**
	 * 得到当前登录用户的姓名
	 * @param request
	 * @return
	 */
	public static String getCurrentUserName(HttpServletRequest request) {
		return String.valueOf(getUserFromSession(request).getUserName());
	}
}
