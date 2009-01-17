package net.yanhl.iouser.action;

import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONException;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonDateToStringProcessorImpl;
import net.sf.json.util.PropertyFilter;
import net.yanhl.base.action.BaseAction;
import net.yanhl.base.query.ListQuery;
import net.yanhl.iouser.IouserException;
import net.yanhl.iouser.pojo.GroupRelation;
import net.yanhl.iouser.pojo.Iouser;
import net.yanhl.iouser.service.IouserManager;
import net.yanhl.util.StringUtil;
import net.yanhl.util.UserUtil;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

/**
 * <p>
 * Title: 债务人管理
 * </p>
 * <p>
 * Description:
 * </p>
 * <p>
 * Copyright: Copyright (c) 2008
 * </p>
 * 
 * @author 闫洪磊
 * @version 1.0.0.20080524
 */
public class IOUserAction extends BaseAction {
	Log log = LogFactory.getLog(this.getClass());
	private IouserManager iouserManager;
	
	public void setIouserManager(IouserManager iouserManager) {
		this.iouserManager = iouserManager;
	}

	/**
	 * 增加新的债务人
	 * 
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward addUser(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String currentUserName = null;
		Iouser user = null;
		try {
			currentUserName = UserUtil.getCurrentUserName(request);
			JSONObject jsonObject = readJson(request);
			user = (Iouser) JSONObject.toBean(jsonObject, Iouser.class);
			user.setCreatorId(new Integer(UserUtil.getCurrentUserId(request)));
			// 设置电话号码
			String tmpComPhone = jsonObject.get("tel_area") + "-" + jsonObject.get("tel_number") + "-"
					+ jsonObject.get("tel_ext");
			user.setCompanyPhone(tmpComPhone);
			// 设置分组关系
			Long groupId = jsonObject.getLong("groupId");
			if(groupId != null) {
				GroupRelation group = (GroupRelation) getBaseManager().get(GroupRelation.class, groupId);
				if(group == null) {
					throw new IouserException("债务人关系->分组为空");
				}
				user.setGroup(group);
			}
			getBaseManager().save(user);
			log.info(currentUserName + ">新增债务人：" + user);
			print(response, RESBONSE_SUCCESS + "|" + user.getId());
		} catch(JSONException je) {
			je.printStackTrace();
			log.error(currentUserName + ">增加债务人>解析JSON数据出错：" + je.getMessage());
		} catch (Exception ex) {
			ex.printStackTrace();
			log.error(currentUserName + ">增加债务人" + user + "出错\n\t" + ex.getMessage());
		}
		return null;
	}

	/**
	 * 修改债务人信息
	 * 
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward updateUser(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String currentUserName = null;
		Iouser user = null;
		try {
			currentUserName = UserUtil.getCurrentUserName(request);
			JSONObject jsonObject = readJson(request);
			user = (Iouser) JSONObject.toBean(jsonObject, Iouser.class);
			user.setCreatorId(new Integer(UserUtil.getCurrentUserId(request)));
			// 设置电话号码
			String tmpComPhone = jsonObject.get("tel_area") + "-" + jsonObject.get("tel_number") + "-"
					+ jsonObject.get("tel_ext");
			user.setCompanyPhone(tmpComPhone);
			// 设置分组关系
			Long groupId = jsonObject.getLong("groupId");
			if(groupId != null) {
				GroupRelation group = (GroupRelation) getBaseManager().get(GroupRelation.class, groupId);
				if(group == null) {
					throw new IouserException("债务人关系->分组为空");
				}
				user.setGroup(group);
			}
			getBaseManager().update(user);
			print(response, RESBONSE_SUCCESS);
			log.info(currentUserName + ">修改债务人[" + user + "]信息");
		} catch(JSONException je) {
			je.printStackTrace();
			log.error(currentUserName + ">修改债务人>解析JSON数据出错：" + je.getMessage());
		} catch (Exception ex) {
			ex.printStackTrace();
			log.error(currentUserName + ">更新债务人" + user + "出错");
		}
		return null;
	}

	/**
	 * 载入债务人
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward loadUser(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Long iouserId = StringUtil.getLongValue(request, "id");
		String currentUserName = null;
		try {
			currentUserName = UserUtil.getCurrentUserName(request);
			JsonConfig config = new JsonConfig();
			config.registerJsonValueProcessor(java.sql.Timestamp.class, new JsonDateToStringProcessorImpl());
			config.setJsonPropertyFilter(new PropertyFilter(){
				public boolean apply(Object source, String name, Object value) {
					if(name.equals("parentGroup") || name.equals("childGroups")) {
						return true;
					} else {
						return false;
					}
				}
				
			});
			Iouser user = (Iouser) getBaseManager().get(Iouser.class, iouserId);
			JSONObject jsonObject = JSONObject.fromObject(user, config);
			print(response, jsonObject.toString());
			log.info(currentUserName + ">载入债务人：" + user + "");
		} catch(JSONException je) {
			je.printStackTrace();
			log.error(currentUserName + ">载入债务人>解析JSON数据出错：" + je.getMessage());
		} catch (Exception ex) {
			ex.printStackTrace();
			log.error(currentUserName + ">载入债务人[id=" + iouserId + "]出错");
		}
		return null;
	}

	/**
	 * 删除债务人
	 * 
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward deleteUser(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String currentUserName = null;
		String[] ids = request.getParameterValues("ids");
		try {
			currentUserName = UserUtil.getCurrentUserName(request);
			getBaseManager().deleteAll(Iouser.class, ids);
			print(response, RESBONSE_SUCCESS);
			log.info(currentUserName + ">删除债务人，ids=" + Arrays.toString(ids));
		} catch (RuntimeException ex) {
			ex.printStackTrace();
			log.error(currentUserName + ">删除债务人[ids=" + StringUtil.getValue(ids) + "]出错");
		}
		return null;
	}

	/**
	 * 得到当前登录用户的借入/出人员
	 * 
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward userList(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String currentUserName = null;
		try {
			currentUserName = UserUtil.getCurrentUserName(request);
			// 增加查询条件-结束
			ListQuery listQuery = new ListQuery(Iouser.class,request);
			setPageIndex(request,listQuery);//设置页码
			List<Iouser> result = iouserManager.finaAllUser(listQuery);
			savePagination(request, result,Iouser.class);//保存结果集
			//log.info(currentUserName + ">获得借入/出人员列表：" + result);
		} catch (Exception ex) {
			ex.printStackTrace();
			log.error(currentUserName + ">获得借入/出人员列表出错：\n\t" + ex.getMessage());
		}
		return mapping.findForward(FORWARD_SUCCESS);
	}

	/**
	 * 统计当前登录人创建的债务人总数
	 * 
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward count(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String currentUserName = null;
		try {
			currentUserName = UserUtil.getCurrentUserName(request);
			String creatorId = UserUtil.getCurrentUserId(request);
			int count = iouserManager.count(creatorId);
			print(response, String.valueOf(count));
			log.info(currentUserName + ">统计债务人总数==" + count);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}

	/**
	 * 检查数据库是不是有此用户信息
	 * 
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward check(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String userName = null;
		String currentUserName = null;
		try {
			currentUserName = UserUtil.getCurrentUserName(request);
			userName = StringUtil.getValue(request, "userName");
			String result = String.valueOf(iouserManager.checkHas(userName));
			print(response, result);
			log.debug(currentUserName + ">判断债务人[" + userName + "]是否存在  ===  " + result);
		} catch (Exception ex) {
			ex.printStackTrace();
			log.error(currentUserName + ">判断债务人[" + userName + "]出错\n\t" + ex.getMessage());
		}
		return null;
	}
}