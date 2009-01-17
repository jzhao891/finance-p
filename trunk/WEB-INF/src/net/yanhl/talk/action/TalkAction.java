package net.yanhl.talk.action;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.yanhl.base.action.BaseAction;
import net.yanhl.talk.pojo.Talk;
import net.yanhl.talk.service.TalkManager;
import net.yanhl.util.UserUtil;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

/**
 * <p>
 * Title: 聊天室action
 * </p>
 * <p>
 * Description:
 * </p>
 * <p>
 * Copyright: Copyright (c) 2008
 * </p>
 * 
 * @author 闫洪磊
 * @version 1.0.0.20080716
 */
public class TalkAction extends BaseAction {

	Log log = LogFactory.getLog(this.getClass());
	private TalkManager talkManager;

	public void setTalkManager(TalkManager talkManager) {
		this.talkManager = talkManager;
	}

	public ActionForward addMessage(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			JSONObject jsonObject = readJson(request);
			Talk talk = (Talk) JSONObject.toBean(jsonObject, Talk.class);
			talk.setUser(UserUtil.getUserFromSession(request));
			talk.setMsgDate(new Timestamp(System.currentTimeMillis()));
			getBaseManager().save(talk);
			print(response, RESBONSE_SUCCESS);
		} catch (Exception e) {
			e.printStackTrace();
			print(response, RESBONSE_ERROR);
		}

		return null;
	}

	public ActionForward getMessage(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			String userId = UserUtil.getCurrentUserId(request);
			Date lastDate = null;
			if (request.getSession().getAttribute("lastDate") == null) {
				lastDate = Calendar.getInstance().getTime();
			} else {
				lastDate = (Date) request.getSession().getAttribute("lastDate");
			}
//			log.info("用户<" + UserUtil.getCurrentUserName(request) + ">最后更新日期:" + StringUtil.getValue(lastDate,"datetime"));
//			java.text.SimpleDateFormat sftime = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//			Date lastDate = sftime.parse(StringUtil.getValue(request,"lastDate"));
			List<Talk> lastMsgs = talkManager.getMsg(userId, lastDate);
			if(lastMsgs.size() > 0) {
				Talk talk = lastMsgs.get(lastMsgs.size()-1);
				lastDate = talk.getMsgDate();
//				log.info("得到最后一个消息日期=" + talk);
			} else {
				lastDate = Calendar.getInstance().getTime();
//				log.info("设置lastDate为当前时间");
			}
			request.getSession().setAttribute("lastDate",lastDate);
			
//			log.info("=== 当前时间=" + StringUtil.getValue(Calendar.getInstance().getTime(),"datetime"));
			JSONArray json = JSONArray.fromObject(lastMsgs);
			print(response, json.toString());
		} catch (Exception e) {
			e.printStackTrace();
			print(response, RESBONSE_ERROR);
		}
		return null;
	}
}
