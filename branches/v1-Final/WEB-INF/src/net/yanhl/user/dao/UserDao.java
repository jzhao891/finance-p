package net.yanhl.user.dao;

import java.util.List;

import net.yanhl.user.pojo.User;

public interface UserDao {
	/**
	 * 根据id查找用户
	 * 
	 * @param id
	 *            需要查找的用户id
	 */
	User get(Integer id);

	/**
	 * 增加用户
	 * 
	 * @param user
	 *            需要增加的员工
	 */
	void save(User user);

	/**
	 * 修改用户
	 * 
	 * @param user
	 *            需要修改的用户
	 */
	void update(User user);

	/**
	 * 删除用户
	 * 
	 * @param id
	 *            需要删除的用户id
	 */
	void delete(Integer id);

	/**
	 * 删除用户
	 * 
	 * @param user
	 *            需要删除的用户
	 */
	void delete(User user);

	/**
	 * 查询全部用户
	 * 
	 * @return 全部用户
	 */
	List<User> findAll();

	/**
	 * 根据用户名和密码查询用户
	 * 
	 * @param name
	 *            用户的用户名
	 * @param pass
	 *            用户的密码
	 * @return 符合用户名和密码的用户集合
	 */
	User findByNameAndPass(String name, String pass);
}
