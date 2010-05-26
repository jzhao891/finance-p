package net.yanhl.talk.pojo;

import java.util.Date;

import net.yanhl.user.pojo.User;

/**
 * Talk entity.
 * 
 * @author MyEclipse Persistence Tools
 */

public class Talk implements java.io.Serializable {

	// Fields

	private Long id;
	private User user;
	private String message;
	private Date msgDate;

	// Constructors

	/** default constructor */
	public Talk() {
	}

	/** full constructor */
	public Talk(String message, Date msgDate) {
		this.message = message;
		this.msgDate = msgDate;
	}

	// Property accessors

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMessage() {
		return this.message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Date getMsgDate() {
		return this.msgDate;
	}

	public void setMsgDate(Date msgDate) {
		this.msgDate = msgDate;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		java.text.SimpleDateFormat sftime = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return super.toString() + "[user_name=" + user.getUserName() + ",message=" + message + ",msg_date=" + sftime.format(this.msgDate) + "]";
	}

}