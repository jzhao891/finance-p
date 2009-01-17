package net.yanhl.talk.dao;

import java.util.Date;
import java.util.List;

import net.yanhl.base.query.ListQuery;
import net.yanhl.talk.pojo.Talk;

/**
 * <p>Title: 聊天室DAO接口</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2008</p>
 * 
 * @author 闫洪磊
 * @version 1.0.0.20080716
 */
public interface TalkDao {

	/**
	 * 根据lastDate获得之后的消息列表
	 * @return
	 */
	public List<Talk> getMsg(ListQuery listQuery);
	
	public List<Talk> getMsg(String userId,Date lastDate);
}
