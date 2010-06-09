package cn.wsria.util;

import java.util.ArrayList;
import java.util.List;

import cn.wsria.finance.entity.account.User;

/**
 * <p><b>Title：</b></p>
 * <p><b>Description：</b></p>
 * 
 * @author	闫洪磊
 */
public class UserUtil {

	public static List<User> getUserList() {
		List<User> users = new ArrayList<User>();
		users.add(new User(1, "admin", "000000", "管理员"));
		users.add(new User(2, "张三", "000000", "张三"));
		users.add(new User(3, "李四", "000000", "李四"));
		users.add(new User(4, "赵峥", "000000", "赵峥"));
		users.add(new User(5, "王峰", "000000", "王峰"));
		users.add(new User(6, "石金玉", "000000", "石金玉"));
		return users;
	}
	
	public static User getUser(String loginName, String password) {
		List<User> userList = getUserList();
		for (User user : userList) {
			if (user.getLoginName().equals(loginName) && user.getPassword().equals(password)) {
				return user;
			}
		}
		return null;
	}
	
}
