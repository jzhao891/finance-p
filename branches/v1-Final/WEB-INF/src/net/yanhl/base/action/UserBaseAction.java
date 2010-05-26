package net.yanhl.base.action;

import net.yanhl.user.service.UserManager;

/**
 * <p>Title: 用户管理基础Action</p>
 * <p>Description: </p>
 * @author	闫洪磊
 * @version	1.0.0.20081011
*/
public class UserBaseAction extends BaseAction {
	protected UserManager userManager;
	public static final String LOGIN_SUCCESS="success";
	public static final String LOGIN_FAIL = "failure";

	public void setUserManager(UserManager userManager) {
		this.userManager = userManager;
	}
}
