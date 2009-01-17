package net.yanhl.talk.service;

import java.util.Date;
import java.util.List;

import net.yanhl.talk.pojo.Talk;

/**
 * <p>Title: 聊天室业务接口</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2008</p>
 * 
 * @author 闫洪磊
 * @version 1.0.0.20080716
 */
public interface TalkManager {

	/**
	 * 增加一条新消息
	 * @param talk
	 */
	public void addMsg(Talk talk);
	
	public List<Talk> getMsg(String userId,Date lastDate) throws Exception;
	
}
