package net.yanhl.goods.action;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONException;
import net.sf.json.JSONObject;
import net.yanhl.base.action.BaseAction;
import net.yanhl.base.query.ListQuery;
import net.yanhl.goods.pojo.GoodsType;
import net.yanhl.goods.service.GoodsTypeManager;
import net.yanhl.util.StringUtil;
import net.yanhl.util.UserUtil;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

public class GoodsTypeAction extends BaseAction {
	Log log = LogFactory.getLog(this.getClass());
	private GoodsTypeManager goodsTypeManager;

	public void setGoodsTypeManager(GoodsTypeManager goodsManager) {
		this.goodsTypeManager = goodsManager;
	}

	/**
	 * 增加新的借入出款人
	 * 
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward addGoodsType(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		String currentUserName = null;
		try {
			
			currentUserName = UserUtil.getCurrentUserName(request);
			JSONObject jsonObject = readJson(request);
			GoodsType goodsType = (GoodsType) JSONObject.toBean(jsonObject, GoodsType.class);
			goodsType.setCreatorId(new Integer(UserUtil.getCurrentUserId(request)));
			goodsType.setCreateDate(new java.sql.Date(System.currentTimeMillis()));
			getBaseManager().save(goodsType);
			print(response, RESBONSE_SUCCESS + "|" + goodsType.getId());
			log.debug(currentUserName + " 增加物品类型[" + goodsType.getTypeName() + "]");
		} catch(JSONException je) {
			je.printStackTrace();
			log.error(currentUserName + ">增加物品类型>解析JSON数据出错：" + je.getMessage());
		} catch (Exception ex) {
			ex.printStackTrace();
			log.error(currentUserName + " 增加物品类型人出错：" + ex.getMessage());
		}
		return null;
	}
	
	/**
	 * 增加新的借入出款人
	 * 
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward loadGoodsType(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String currentUserName = null;
		Integer goodsTypeId = StringUtil.getIntValue(request, "id");
		try {
			currentUserName = UserUtil.getCurrentUserName(request);
			GoodsType goodsType = (GoodsType) getBaseManager().get(GoodsType.class, goodsTypeId);
			JSONObject jsonObject = new JSONObject();
			jsonObject.accumulate("createDate", StringUtil.getValue(goodsType.getCreateDate(),"date"));
			
			//jsonObject.accumulate("parentId", goodsTypeManager.getParentTypes(goodsTypeId));
			jsonObject.accumulate("parentId", goodsType.getParentId() == null ? 0 : goodsType.getParentId());
			jsonObject.accumulate("typeName", goodsType.getTypeName());
			jsonObject.accumulate("remark", goodsType.getRemark());
			print(response, jsonObject.toString());
			log.debug(currentUserName + ">载入物品类型[name=" + goodsType.getTypeName() + "]");
		} catch(JSONException je) {
			je.printStackTrace();
			log.error(currentUserName + ">载入物品类型>解析JSON数据出错：" + je.getMessage());
		} catch (Exception ex) {
			ex.printStackTrace();
			log.error(currentUserName + " 载入物品类型[id=" + goodsTypeId + "]出错：" + ex.getMessage());
		}
		return null;
	}

	/**
	 * 修改物品类型信息
	 * 
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward updateGoodsType(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String currentUserName = null;
		try {
			currentUserName = UserUtil.getCurrentUserName(request);
			JSONObject jsonObject = readJson(request);
			GoodsType goodsType = (GoodsType) JSONObject.toBean(jsonObject, GoodsType.class);
			GoodsType oldGoodsType = (GoodsType) getBaseManager().get(GoodsType.class, goodsType.getId());
			oldGoodsType.setParentId(jsonObject.getLong("parentId"));
			oldGoodsType.setTypeName(goodsType.getTypeName());
			oldGoodsType.setRemark(goodsType.getRemark());
			getBaseManager().update(oldGoodsType);
			print(response, RESBONSE_SUCCESS);
			log.debug(currentUserName + ">修改物品类型[" + goodsType.getTypeName() + "]信息");
		} catch(JSONException je) {
			je.printStackTrace();
			log.error(currentUserName + ">修改物品类型>解析JSON数据出错：" + je.getMessage());
		} catch (Exception ex) {
			ex.printStackTrace();
			log.error(currentUserName + " 更新物品类型出错：" + ex.getMessage());
		}
		return null;
	}
	
	/**
	 * 删除物品类型
	 * 
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward deleteGoodsType(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String currentUserName = null;
		String[] ids = request.getParameterValues("ids");
		try {
			currentUserName = UserUtil.getCurrentUserName(request);
			getBaseManager().deleteAll(GoodsType.class, ids);
			print(response, RESBONSE_SUCCESS);
			log.debug(currentUserName + ">删除物品类型，ids=" + Arrays.toString(ids));
		} catch (RuntimeException ex) {
			ex.printStackTrace();
			log.error(currentUserName + ">删除物品类型[ids=" + ids + "]出错：" + ex.getMessage());
		}
		return null;
	}

	/**
	 * 得到当前登录用户的物品类型
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward goodsTypeList(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			// 增加查询条件-结束
			ListQuery listQuery = new ListQuery(GoodsType.class,request);
			setPageIndex(request,listQuery);//设置页码
			List<GoodsType> result = goodsTypeManager.findAllGoodsType(listQuery);
			savePagination(request, result,GoodsType.class);//保存结果集
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return mapping.findForward(FORWARD_SUCCESS);
	}
	
	/**
	 * 得到所以的物品类型
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward getAllType(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String currentUserName = null;
		try {
			currentUserName = UserUtil.getCurrentUserName(request);
			Map<String, String> allGoodsType = goodsTypeManager.findAllGoodsType(UserUtil.getCurrentUserId(request));
			JSONObject jsonObject = JSONObject.fromObject(allGoodsType);
			log.debug(currentUserName + ">查询得到所有物品类型：" + jsonObject.toString());
			print(response, jsonObject.toString());
		} catch(JSONException je) {
			je.printStackTrace();
			log.error(currentUserName + ">查询所有物品类型>解析JSON数据出错：" + je.getMessage());
		} catch (Exception ex) {
			log.error("查询所有物品类型失败：" + ex.getMessage());
			ex.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 检查物品是否已经存在
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward isExist(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			String typeName = StringUtil.getValue(request, "typeName");
			GoodsType goodsType = goodsTypeManager.getGoodsTypeByName(typeName);
			String result = "false";
			if(goodsType != null) {
				result = "true|" + goodsType.getId();
			}
			log.info("检查物品类型名称=[" + typeName + "]是否存在-->" + result);
			print(response, result);
		} catch (Exception ex) {
			log.error("查询所以物品类型失败：" + ex.getMessage());
			ex.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 统计当前登录人创建的物品类型总数
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
			int count = goodsTypeManager.count(creatorId);
			print(response, String.valueOf(count));
			log.info(currentUserName + ">统计物品类型总数==" + count);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}

}
