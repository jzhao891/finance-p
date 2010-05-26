package net.yanhl.user.dao;

import java.util.List;

import net.yanhl.user.pojo.User;

import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

/**
 * <p>
 * Title: 用户类DAO实现
 * </p>
 * <p>
 * Description:
 * </p>
 * <p>
 * Copyright: Copyright (c) 2008
 * </p>
 * 
 * @author 闫洪磊
 * @version 1.0.0.20080523
 */
public class UserDaoHibernate extends HibernateDaoSupport implements UserDao {
	/**
	 * 删除用户
	 * 
	 * @param id
	 *            需要删除的用户id
	 */
	public void delete(Integer id) {
		getHibernateTemplate().delete(getHibernateTemplate().get(User.class, id));
	}

	/**
	 * 删除用户
	 * 
	 * @param user
	 *            需要删除的用户
	 */
	public void delete(User user) {
		getHibernateTemplate().delete(user);
	}

	/**
	 * 查询全部用户
	 * 
	 * @return 全部用户
	 */
	public List<User> findAll() {
		return (List<User>) getHibernateTemplate().find("from User");
	}

	/**
	 * 根据id查找用户
	 * 
	 * @param id
	 *            需要查找的用户id
	 */
	public User get(Integer id) {
		return (User) getHibernateTemplate().get(User.class, id);
	}

	/**
	 * 增加用户
	 * 
	 * @param user
	 *            需要增加的员工
	 */
	public void save(User user) {
		getHibernateTemplate().save(user);
	}

	/**
	 * 修改用户
	 * 
	 * @param user
	 *            需要修改的用户
	 */
	public void update(User user) {
		getHibernateTemplate().saveOrUpdate(user);
	}

	public User findByNameAndPass(String name, String pass) {
		String[] args = {name,pass};
		List<User> users = getHibernateTemplate().find("from User where loginName=? and password=?",args);
		if(users.size() >=1) {
			return users.get(0);
		} else {
			return null;
		}
	}

}
