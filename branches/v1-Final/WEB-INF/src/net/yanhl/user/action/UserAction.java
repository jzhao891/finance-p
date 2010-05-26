package net.yanhl.user.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import net.yanhl.base.action.UserBaseAction;
import net.yanhl.user.pojo.User;
import net.yanhl.user.service.UserManager;
import net.yanhl.util.StringUtil;
import net.yanhl.util.UserUtil;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.action.DynaActionForm;

public class UserAction extends UserBaseAction {
	Log log = LogFactory.getLog(this.getClass());
	
	/**
	 * 用户登录
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward login(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String name = StringUtil.getValue(request, "loginName");
		String pass = StringUtil.getValue(request, "password");
		try {
			int loginFlag = userManager.validLogin(name, pass);
			if (loginFlag == UserManager.LOGIN_SUCCESS) {
				User user = userManager.getUserByNameAndPass(name, pass);
				UserUtil.saveUser2Session(user, request);
				log.info("用户<" + user.getUserName() + ",ip=" + request.getRemoteAddr() + ">登录系统");
				print(response, RESBONSE_SUCCESS);
			} else if (loginFlag == UserManager.LOGIN_FAIL) {
				print(response, RESBONSE_ERROR);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 注册新用户
	 * 
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward registe(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		DynaActionForm form = (DynaActionForm) actionForm;
		String loginName = form.getString("loginName");
		String userName = form.getString("userName");
		String password1 = form.getString("password1");
		String password2 = form.getString("password2");
		String forward = null;
		try {
			if (StringUtil.isEmpty(new String[] { loginName, userName, password1, password2 })) {
				String errorMsg = "�û�用户注册--所有必填信息不能为空！�գ�";
				log.warn("用户注册，userName=" + userName + ",loginName" + loginName + ",错误：" + errorMsg);
				request.setAttribute(RESBONSE_ERROR, errorMsg);
				forward = FORWARD_ERROR;
			} else if (!password1.equals(password2)) {
				String errorMsg = "用户注册--密码不相同，请重新输入！";
				log.warn("用户注册，userName=" + userName + ",loginName" + loginName + ",错误：" + errorMsg);
				request.setAttribute(RESBONSE_ERROR, errorMsg);
				forward = FORWARD_ERROR;
			} else {
				User user = new User();
				user.setLoginName(loginName);
				user.setPassword(password1);
				user.setUserName(userName);
				userManager.registe(user);
				log.info("用户<" + user + ">注册成功-->自动登录系统");
				UserUtil.saveUser2Session(user, request);
				forward = "index";
			}
		} catch (RuntimeException e) {
			e.printStackTrace();
		}
		return mapping.findForward(forward);
	}

	/**
	 * 修改密码
	 * 
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward changePwd(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			JSONObject jsonObject = readJson(request);
			User user = UserUtil.getUserFromSession(request);
			String oldPwd = jsonObject.getString("oldPwd");
			String newPwd1 = jsonObject.getString("newPwd1");
			String newPwd2 = jsonObject.getString("newPwd2");
			jsonObject = new JSONObject();
			if (user.getPassword().equals(oldPwd) && newPwd1.equals(newPwd2)) {
				userManager.changePwd(user.getUserId(), newPwd1);
				log.info("用户<" + user + ">,修改密码成功！");
				jsonObject.accumulate("status", "success");
			} else {
				jsonObject.accumulate("status", "error");
				if (!user.getPassword().equals(oldPwd)) {
					log.warn(user + "，修改密码，错误：旧密码验证错误！");
					jsonObject.accumulate("error", "旧密码验证错误！");
				} else if (!newPwd1.equals(newPwd2)) {
					log.warn(user + "，修改密码，错误：两次新密码不相同！");
					jsonObject.accumulate("error", "两次新密码不相同！");
				}
			}
			print(response, jsonObject.toString());
		} catch (Exception e) {
			e.printStackTrace();
			return mapping.findForward(FORWARD_ERROR);
		}
		return null;
	}

	/**
	 * �˳�ϵͳ
	 * 
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward logout(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String userName = "";
		if(UserUtil.getUserFromSession(request) != null) {
			userName = UserUtil.getUserFromSession(request).getUserName();
		}
		request.getSession().invalidate();
		log.info("用户<" + userName + ">退出系统");
		print(response, RESBONSE_SUCCESS);
		return null;
	}
}
