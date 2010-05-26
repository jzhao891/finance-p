package net.yanhl.user.service;

import net.yanhl.user.dao.UserDao;
import net.yanhl.user.pojo.User;

/**
 * <p>
 * Title:
 * </p>
 * <p>
 * Description:
 * </p>
 * <p>
 * Copyright: Copyright (c) 2008
 * </p>
 * 
 * @author �ƺ���
 * @version 1.0.0.2008
 */
public class UserManagerImpl implements UserManager {

	private UserDao userDao;

	public UserDao getUserDao() {
		return userDao;
	}

	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}

	public int validLogin(String name, String pass) {
		if (userDao.findByNameAndPass(name, pass) != null) {
			return LOGIN_SUCCESS;
		} else {
			return LOGIN_FAIL;
		}
	}

	public void registe(User user) {
		userDao.save(user);
	}

	public User getUserByNameAndPass(String name, String pass) {
		return userDao.findByNameAndPass(name, pass);
	}

	public void changePwd(Integer userId, String newPwd) {
		User user = userDao.get(userId);
		user.setPassword(newPwd);
		userDao.update(user);
	}
}
