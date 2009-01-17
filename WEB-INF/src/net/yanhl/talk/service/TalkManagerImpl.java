package net.yanhl.talk.service;

import java.util.Date;
import java.util.List;

import net.sf.json.JSONArray;
import net.yanhl.base.service.BaseManagerImpl;
import net.yanhl.talk.dao.TalkDao;
import net.yanhl.talk.pojo.Talk;

/**
 * <p>Title: 聊天室业务实现类</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2008</p>
 * 
 * @author 闫洪磊
 * @version 1.0.0.20080716
 */
public class TalkManagerImpl extends BaseManagerImpl implements TalkManager{
	
	private TalkDao talkDao;
	
	public void setTalkDao(TalkDao talkDao) {
		this.talkDao = talkDao;
	}

	public void addMsg(Talk talk) {
		baseDao.save(talk);
	}

	public List<Talk> getMsg(String userId,Date lastDate) throws Exception {
//		java.text.SimpleDateFormat sftime = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//		Date lastDate = sftime.parse(strlastDate);
		List<Talk> msgs = talkDao.getMsg(userId,lastDate);
		return msgs;
	}

}
