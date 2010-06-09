package cn.wsria.arch.web;

import cn.wsria.finance.entity.account.User;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

/**
 * <p><b>Title：</b>集成Struts2的基类Action</p>
 * <p><b>Description：</b>
 * 项目中所有Action均继承此类，提供公共的方法
 * </p>
 * 
 * @author	闫洪磊
 */
public abstract class BaseAction extends ActionSupport {

	/**
	 * 获得当前登录用户
	 * @return	当前登录用户
	 */
	public User getCurrentUser() {
		return (User) ActionContext.getContext().getSession().get("user");
	}
	
	/**
	 * 获得当前登录用户ID
	 * @return	当前登录用户ID
	 */
	public Integer getCurrentUserId() {
		return getCurrentUser() == null ? 0 : getCurrentUser().getUserId();
	}
	
	/**
	 * 设置属性到Session对象中
	 * @param key
	 * @param value
	 */
	public void setToSession(String key, Object value) {
		ActionContext.getContext().getSession().put(key, value);
	}
	
}
