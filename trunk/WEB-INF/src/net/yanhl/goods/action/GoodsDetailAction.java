package net.yanhl.goods.action;

import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONException;
import net.sf.json.JSONObject;
import net.yanhl.base.action.BaseAction;
import net.yanhl.base.query.ListQuery;
import net.yanhl.goods.pojo.GoodsDetail;
import net.yanhl.goods.pojo.GoodsType;
import net.yanhl.goods.service.GoodsDetailManager;
import net.yanhl.util.StringUtil;
import net.yanhl.util.UserUtil;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

/**
 * <p>
 * Title: 物品详细管理Action
 * </p>
 * <p>
 * Description:
 * </p>
 * <p>
 * Copyright: Copyright (c) 2008
 * </p>
 * 
 * @author 闫洪磊
 * @version 1.0.0.20080617
 */
public class GoodsDetailAction extends BaseAction {
	Log log = LogFactory.getLog(this.getClass());
	private GoodsDetailManager goodsDetailManager;

	public void setGoodsDetailManager(GoodsDetailManager goodsDetailManager) {
		this.goodsDetailManager = goodsDetailManager;
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
	public ActionForward addGoodsDetail(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String currentUserName = null;
		try {
			currentUserName = UserUtil.getCurrentUserName(request);
			JSONObject jsonObject = readJson(request);
			GoodsDetail detail = (GoodsDetail) JSONObject.toBean(jsonObject, GoodsDetail.class);
			detail.setCreatorId(new Integer(UserUtil.getCurrentUserId(request)));
			detail.setCreateDate(new java.sql.Date(System.currentTimeMillis()));
			String goodsTypeId = jsonObject.getString("goodsTypeId");
			if (StringUtils.isEmpty(goodsTypeId)) {
				throw new IllegalArgumentException("物品类型ID不能为空！");
			}
			Long longGoodsTypeId = Long.parseLong(goodsTypeId);
			GoodsType goodsType = (GoodsType) getBaseManager().get(GoodsType.class, longGoodsTypeId);
			detail.setGoodsType(goodsType);
			getBaseManager().save(detail);
			print(response, RESBONSE_SUCCESS + "|" + detail.getId());
			log.debug(currentUserName + ">增加物品详细[" + detail.getGoodsName() + "]");
		} catch(JSONException je) {
			je.printStackTrace();
			log.error(currentUserName + ">增加物品详细>解析JSON数据出错：" + je.getMessage());
		} catch (Exception ex) {
			ex.printStackTrace();
			log.error(currentUserName + ">增加物品详细出错" + ex.getMessage());
		}
		return null;
	}

	/**
	 * 载入物品详细
	 * 
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward loadGoodsDetail(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String currentUserName = null;
		Long goodsDetailId = StringUtil.getLongValue(request, "id");
		try {
			currentUserName = UserUtil.getCurrentUserName(request);
			GoodsDetail goodsDetail = (GoodsDetail) getBaseManager().get(GoodsDetail.class, goodsDetailId);
			JSONObject jsonObject = new JSONObject();
			jsonObject.accumulate("createDate", StringUtil.getValue(goodsDetail.getCreateDate(), "date"));
			jsonObject.accumulate("goodsTypeId", goodsDetail.getGoodsType().getId());
			jsonObject.accumulate("goodsName", goodsDetail.getGoodsName());
			jsonObject.accumulate("goodsUnit", goodsDetail.getGoodsUnit());
			jsonObject.accumulate("unitPrice", goodsDetail.getUnitPrice());
			jsonObject.accumulate("remark", goodsDetail.getRemark());
			print(response, jsonObject.toString());
			log.debug(currentUserName + ">载入物品详细[id=" + goodsDetailId + "]");
		} catch(JSONException je) {
			je.printStackTrace();
			log.error(currentUserName + ">载入物品详细>解析JSON数据出错：" + je.getMessage());
		} catch (Exception ex) {
			ex.printStackTrace();
			log.error(currentUserName + ">载入物品详细[id=" + goodsDetailId + "]出错");
		}
		return null;
	}

	/**
	 * 修改物品详细信息
	 * 
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward updateGoodsDetail(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String currentUserName = null;
		try {
			currentUserName = UserUtil.getCurrentUserName(request);
			JSONObject jsonObject = readJson(request);
			GoodsDetail goodsDetail = (GoodsDetail) JSONObject.toBean(jsonObject, GoodsDetail.class);
			GoodsDetail oldGoodsType = (GoodsDetail) getBaseManager().get(GoodsDetail.class, goodsDetail.getId());
			oldGoodsType.setGoodsName(goodsDetail.getGoodsName());
			String goodsTypeId = jsonObject.getString("goodsTypeId");
			if (StringUtils.isEmpty(goodsTypeId)) {
				throw new IllegalArgumentException("物品类型ID不能为空！");
			}
			Long longGoodsTypeId = Long.parseLong(goodsTypeId);
			GoodsType goodsType = (GoodsType) getBaseManager().get(GoodsType.class, longGoodsTypeId);
			oldGoodsType.setGoodsType(goodsType);
			oldGoodsType.setGoodsUnit(goodsDetail.getGoodsUnit());
			oldGoodsType.setUnitPrice(goodsDetail.getUnitPrice());
			oldGoodsType.setRemark(goodsDetail.getRemark());
			getBaseManager().update(oldGoodsType);
			print(response, RESBONSE_SUCCESS);
			log.debug(currentUserName + ">修改物品详细[" + goodsDetail.getGoodsName() + "]信息");
		} catch(JSONException je) {
			je.printStackTrace();
			log.error(currentUserName + ">修改物品详细>解析JSON数据出错：" + je.getMessage());
		} catch (Exception ex) {
			ex.printStackTrace();
			log.error(currentUserName + ">更新物品详细出错");
		}
		return null;
	}

	/**
	 * 删除物品详细
	 * 
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward deleteGoodsDetail(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String currentUserName = null;
		String[] ids = request.getParameterValues("ids");
		try {
			currentUserName = UserUtil.getCurrentUserName(request);
			getBaseManager().deleteAll(GoodsDetail.class, ids);
			print(response, RESBONSE_SUCCESS);
			log.debug(currentUserName + ">删除物品详细，ids=" + Arrays.toString(ids));
		} catch (RuntimeException ex) {
			ex.printStackTrace();
			log.error(currentUserName + ">删除物品详细[ids=" + ids + "]出错");
		}
		return null;
	}

	/**
	 * 得到当前登录用户的物品详细
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward goodsDetailList(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			// 增加查询条件-结束
			ListQuery listQuery = new ListQuery(GoodsDetail.class, request);
			setPageIndex(request, listQuery);// 设置页码
			List<GoodsDetail> result = goodsDetailManager.findAllGoodsDetail(listQuery);
			savePagination(request, result, GoodsDetail.class);// 保存结果集
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return mapping.findForward(FORWARD_SUCCESS);
	}

	/**
	 * 获得所有物品单位
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward getAllUnit(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String currentUserName = null;
		try {
			currentUserName = UserUtil.getCurrentUserName(request);
			List<Object> allUnit = goodsDetailManager.getAllUnit();
			JSONObject json = new JSONObject();
			for (Iterator<Object> iterator = allUnit.iterator(); iterator.hasNext();) {
				String object = (String) iterator.next();
				json.accumulate(object, object);
			}
			log.debug(currentUserName + ">获得所有物品单位：>" + json.toString());
			print(response, json.toString());
		} catch(JSONException je) {
			je.printStackTrace();
			log.error(currentUserName + ">获得所有物品单位>解析JSON数据出错：" + je.getMessage());
		} catch (Exception ex) {
			ex.printStackTrace();
			print(response, RESBONSE_ERROR);
			log.error(currentUserName + ">获得所有物品单位出错：" + ex.getMessage());
		}
		return null;
	}
	
	/**
	 * 统计当前登录人创建的物品总数
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
			int count = goodsDetailManager.count(creatorId);
			print(response, String.valueOf(count));
			log.info(currentUserName + ">统计物品总数==" + count);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}
}
