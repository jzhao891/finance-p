package net.yanhl.base.action;

import net.yanhl.user.service.UserManager;

public class UserBaseAction extends BaseAction {
	protected UserManager userManager;
	public static final String LOGIN_SUCCESS="success";
	public static final String LOGIN_FAIL = "failure";

	public void setUserManager(UserManager userManager) {
		this.userManager = userManager;
	}
}
