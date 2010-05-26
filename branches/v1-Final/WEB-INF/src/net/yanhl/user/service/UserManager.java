package net.yanhl.user.service;

import net.yanhl.user.pojo.User;

public interface UserManager {
	// 登陆失败
	public static final int LOGIN_FAIL = 0;
	// 登陆成功
	public static final int LOGIN_SUCCESS = 1;
	
	// 注册失败
	public static final int REGISTE_FAIL = 0;
	// 注册成功
	public static final int REGISTE_SUCCESS = 1;

	/**
	 * 验证登陆
	 * 
	 * @param name
	 *            登陆用的用户名
	 * @param pass
	 *            登陆用的密码
	 * @return 登陆后的身份确认:0为登陆失败，1为登陆成功
	 */
	int validLogin(String name, String pass);
	
	/**
	 * 注册新用户
	 * @param user
	 */
	void registe(User user);
	
	/**
	 * 根据姓名和密码查找用户
	 * @param name
	 * @param pass
	 * @return 
	 */
	User getUserByNameAndPass(String name,String pass);
	
	/**
	 * 修改密码
	 * @param userId
	 * @param newPwd
	 */
	void changePwd(Integer userId,String newPwd);
}
