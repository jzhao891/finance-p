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
import net.yanhl.iouser.pojo.GroupRelation;
import net.yanhl.iouser.service.GroupManager;
import net.yanhl.util.StringUtil;
import net.yanhl.util.UserUtil;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

/**
 * 
 * @author 闫洪磊
 * @since Dec 4, 2008
 * 
 */
public class GroupAction extends BaseAction {
	Log log = LogFactory.getLog(this.getClass());

	private GroupManager groupManager;

	public void setGroupManager(GroupManager groupManager) {
		this.groupManager = groupManager;
	}

	public ActionForward groupList(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String currentUserName = null;
		try {
			currentUserName = UserUtil.getCurrentUserName(request);
			// 增加查询条件-结束
			ListQuery listQuery = new ListQuery(GroupRelation.class, request);
			setPageIndex(request, listQuery);// 设置页码
			List<GroupRelation> result = groupManager.finaAllGroup(listQuery);
			savePagination(request, result, GroupRelation.class);// 保存结果集
		} catch (Exception ex) {
			ex.printStackTrace();
			log.error(currentUserName + ">获得人员分组列表出错：\n\t" + ex.getMessage());
		}
		return mapping.findForward(FORWARD_SUCCESS);
	}
	
	public ActionForward addGroup(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String currentUserName = null;
		GroupRelation group = null;
		try {
			currentUserName = UserUtil.getCurrentUserName(request);
			JSONObject jsonObject = readJson(request);
			group = (GroupRelation) JSONObject.toBean(jsonObject, GroupRelation.class);
			Long parentId = jsonObject.getLong("parentId");
			Object object = getBaseManager().get(GroupRelation.class, parentId);
			if(object == null) {
				GroupRelation parentGroup = new GroupRelation();
				parentGroup.setId(-1l);
				parentGroup.setGroupName("账务管理系统");
				group.setParentGroup(parentGroup);
			} else {
				group.setParentGroup((GroupRelation) object);
			}
			group.setCreatorId(new Integer(UserUtil.getCurrentUserId(request)));
			group.setCreateDate(new java.util.Date());
			getBaseManager().save(group);
			log.info(currentUserName + ">新增债务人分组：" + group);
			print(response, RESBONSE_SUCCESS + "|" + group.getId());
		} catch(JSONException je) {
			je.printStackTrace();
			log.error(currentUserName + ">增加债务人分组>解析JSON数据出错：" + je.getMessage());
		} catch (Exception ex) {
			ex.printStackTrace();
			log.error(currentUserName + ">增加债务人分组" + group + "出错\n\t" + ex.getMessage());
		}
		return null;
	}
	
	/**
	 * 删除分组
	 * 
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward deleteGroup(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String currentUserName = null;
		String[] ids = request.getParameterValues("ids");
		try {
			currentUserName = UserUtil.getCurrentUserName(request);
			getBaseManager().deleteAll(GroupRelation.class, ids);
			print(response, RESBONSE_SUCCESS);
			log.info(currentUserName + ">删除分组，ids=" + Arrays.toString(ids));
		} catch (RuntimeException ex) {
			ex.printStackTrace();
			log.error(currentUserName + ">删除分组[ids=" + StringUtil.getValue(ids) + "]出错");
		}
		return null;
	}
	
	/**
	 * 加载用户分组
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward loadGroup(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Long groupId = StringUtil.getLongValue(request, "id");
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
			GroupRelation group = (GroupRelation) getBaseManager().get(GroupRelation.class, groupId);
			JSONObject jsonObject = JSONObject.fromObject(group, config);
			GroupRelation parentGroup = group.getParentGroup();
			jsonObject.accumulate("parentId", parentGroup.getId());
			jsonObject.accumulate("parentName", parentGroup.getGroupName());
			print(response, jsonObject.toString());
			log.info(currentUserName + ">载入分组：" + group + "");
		} catch(JSONException je) {
			je.printStackTrace();
			log.error(currentUserName + ">载入分组>解析JSON数据出错：" + je.getMessage());
		} catch (Exception ex) {
			ex.printStackTrace();
			log.error(currentUserName + ">载入分组[id=" + groupId + "]出错");
		}
		return null;
	}
	
	public ActionForward updateGroup(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String currentUserName = null;
		GroupRelation group = null;
		try {
			currentUserName = UserUtil.getCurrentUserName(request);
			JSONObject jsonObject = readJson(request);
			group = (GroupRelation) JSONObject.toBean(jsonObject, GroupRelation.class);
			
			//获得父分组并设置父子关系
			long parentId = jsonObject.getLong("parentId");
			log.debug("分组<" + group.getGroupName() + ">,parentId=" + parentId);
			GroupRelation parentGroup = (GroupRelation) getBaseManager().get(GroupRelation.class, parentId);
			
			//获得并设置更新字段
			GroupRelation tempGroup = (GroupRelation) getBaseManager().get(GroupRelation.class, jsonObject.getLong("id"));
			tempGroup.setGroupName(group.getGroupName());
			tempGroup.setParentGroup(parentGroup);
			tempGroup.setRemark(group.getRemark());
			
			getBaseManager().update(tempGroup);
			print(response, RESBONSE_SUCCESS);
			log.info(currentUserName + ">成功修改分组[" + group + "]信息");
		} catch(JSONException je) {
			je.printStackTrace();
			log.error(currentUserName + ">修改分组>解析JSON数据出错：" + je.getMessage());
		} catch (Exception ex) {
			ex.printStackTrace();
			log.error(currentUserName + ">更新分组" + group + "出错");
		}
		return null;
	}
}
