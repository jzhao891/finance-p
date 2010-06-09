package cn.wsria.finance.entity.account;

/**
 * <p><b>Title：</b></p>
 * <p><b>Description：</b></p>
 * 
 * @author	闫洪磊
 * @version	1.0
 * @date	2010-4-7 下午04:08:27
 * @records	<!-- 修改人、时间、内容 -->
 */
public class User {

	private Integer userId;
	private String loginName;
	private String password;
	private String userName;

	public User(Integer userId, String loginName, String password, String userName) {
		super();
		this.userId = userId;
		this.loginName = loginName;
		this.password = password;
		this.userName = userName;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

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

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

}
