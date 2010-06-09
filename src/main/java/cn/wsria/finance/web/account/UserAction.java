package cn.wsria.finance.web.account;

import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionContext;
import cn.wsria.arch.web.BaseAction;
import cn.wsria.finance.entity.account.User;
import cn.wsria.util.UserUtil;

/**
 * 用户管理Action.
 * 
 * @author 闫洪磊
 */
@SuppressWarnings("serial")
@Controller
public class UserAction extends BaseAction {
	
	private String loginName;
	private String password;
	
	
	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String loginUI() {
		return "loginUI";
	}

	@Override
	public String execute() throws Exception {
		User dbUser = UserUtil.getUser(loginName, password);
		ActionContext.getContext().getSession().put("user", dbUser);
		return SUCCESS;
	}

}
