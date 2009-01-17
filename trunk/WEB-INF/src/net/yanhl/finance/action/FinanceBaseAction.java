package net.yanhl.finance.action;

import java.text.DecimalFormat;
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
import net.yanhl.finance.FinanceException;
import net.yanhl.finance.pojo.FinanceMoneyDetail;
import net.yanhl.finance.service.FinanceManager;
import net.yanhl.iouser.pojo.Iouser;
import net.yanhl.util.StringUtil;
import net.yanhl.util.UserUtil;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

/**
 * <p>
 * Title: 账务基础ACTION类
 * </p>
 * <p>
 * Description:
 * </p>
 * <p>
 * Copyright: Copyright (c) 2008
 * </p>
 * 
 * @author 闫洪磊
 * @version 1.0.0.20080720
 */
public class FinanceBaseAction extends BaseAction {
	Log log = LogFactory.getLog(this.getClass());
	protected final String FINANCE_TYPE_IN = "0";// 借入标志
	protected final String FINANCE_TYPE_OUT = "1";// 借出标志

	private FinanceManager financeManager;

	public void setFinanceManager(FinanceManager financeManager) {
		this.financeManager = financeManager;
	}

	/**
	 * 增加借入出款
	 * 
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("static-access")
	public ActionForward addFinanceMoney(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String currentUserName = null;
		try {
			currentUserName = UserUtil.getCurrentUserName(request);
			JSONObject jsonObject = readJson(request);
			FinanceMoneyDetail financeMoney = new FinanceMoneyDetail();
			financeMoney.setCreatorId(new Integer(UserUtil.getCurrentUserId(request)));
			financeMoney.setCreateDate(new java.util.Date());
			financeMoney.setLoanDate(StringUtil.getSqlDate(jsonObject.getString("loanDate"), "date"));
			financeMoney.setFallinDate(StringUtil.getSqlDate(jsonObject.getString("fallinDate"), "date"));
			financeMoney.setFinanceType(jsonObject.getString("financeType"));// 设置借入标志
			financeMoney.setDebtType(jsonObject.getString("debtType"));
			financeMoney.setTotalArrearage(jsonObject.getDouble("totalArrearage"));
			financeMoney.setRequitedArrearage(0.0d);
			financeMoney.setRemark(jsonObject.getString("remark"));
			// 设置借入/出人员
			String borrowUserId = jsonObject.getString("borrowUser");
			if (borrowUserId == null) {
				print(response, "债务人不能为空");
				throw new Exception("债务人不能为空");
			}
			Iouser borrowUser = (Iouser) getBaseManager().get(Iouser.class, Long.parseLong(borrowUserId));
			financeMoney.setBorrowUser(borrowUser);
			getBaseManager().save(financeMoney);
			print(response, RESBONSE_SUCCESS + "|" + financeMoney.getId());
			log.info(currentUserName + ">增加借入款项[" + financeMoney + "]");
		} catch (JSONException je) {
			je.printStackTrace();
			log.error(currentUserName + ">增加借入款项>解析JSON数据出错：" + je.getMessage());
		} catch (Exception ex) {
			ex.printStackTrace();
			log.error(currentUserName + ">增加款项出错：" + ex.getMessage());
		}
		return null;
	}

	/**
	 * 载入借入出款
	 * 
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward loadFinanceMoney(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String currentUserName = null;
		Long financeMoneyDetailId = StringUtil.getLongValue(request, "id");
		try {
			currentUserName = UserUtil.getCurrentUserName(request);
			FinanceMoneyDetail financeMoneyDetail = (FinanceMoneyDetail) getBaseManager().get(FinanceMoneyDetail.class,
					financeMoneyDetailId);
			JsonConfig config = new JsonConfig();
			// 注册日期解析器
			config.registerJsonValueProcessor(java.sql.Date.class, new JsonDateToStringProcessorImpl());
			config.registerJsonValueProcessor(java.util.Date.class, new JsonDateToStringProcessorImpl());
			config.registerJsonValueProcessor(java.sql.Timestamp.class, new JsonDateToStringProcessorImpl());
			// 忽略父子级别关联
			config.setJsonPropertyFilter(new PropertyFilter() {
				public boolean apply(Object source, String name, Object value) {
					if (name.equals("parentGroup") || name.equals("childGroups")) {
						return true;
					} else {
						return false;
					}
				}

			});
			JSONObject jsonObject = JSONObject.fromObject(financeMoneyDetail, config);
			print(response, jsonObject.toString());
			log.debug(currentUserName + ">载入借入出款[id=" + financeMoneyDetailId + "]");
		} catch (Exception ex) {
			ex.printStackTrace();
			log.error(currentUserName + ">载入借入出款[id=" + financeMoneyDetailId + "]出错");
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
	public ActionForward updateFinanceMoney(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String currentUserName = null;
		try {
			currentUserName = UserUtil.getCurrentUserName(request);
			JSONObject jsonObject = readJson(request);
			FinanceMoneyDetail financeMoney = (FinanceMoneyDetail) getBaseManager().get(FinanceMoneyDetail.class,
					jsonObject.getLong("id"));
			financeMoney.setLoanDate(StringUtil.getSqlDate(jsonObject.getString("loanDate"), "date"));
			financeMoney.setFallinDate(StringUtil.getSqlDate(jsonObject.getString("fallinDate"), "date"));
			financeMoney.setFinanceType(jsonObject.getString("financeType"));// 设置借入标志
			financeMoney.setDebtType(jsonObject.getString("debtType"));
			financeMoney.setTotalArrearage(jsonObject.getDouble("totalArrearage"));
			financeMoney.setRemark(jsonObject.getString("remark"));
			// 设置借入/出人员
			String borrowUserId = jsonObject.getString("borrowUser");
			if (borrowUserId == null) {
				print(response, "债务人不能为空");
				throw new Exception("债务人不能为空");
			}
			Iouser borrowUser = (Iouser) getBaseManager().get(Iouser.class, Long.parseLong(borrowUserId));
			financeMoney.setBorrowUser(borrowUser);
			getBaseManager().update(financeMoney);
			print(response, RESBONSE_SUCCESS);
		} catch (JSONException je) {
			je.printStackTrace();
			log.error(currentUserName + ">修改借入/出款>解析JSON数据出错：" + je.getMessage());
		} catch (Exception ex) {
			ex.printStackTrace();
			log.error(currentUserName + ">更新物品详细出错");
		}
		return null;
	}

	/**
	 * 删除借入出款
	 * 
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward deleteFinanceMoney(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String currentUserName = null;
		String[] ids = request.getParameterValues("ids");
		try {
			currentUserName = UserUtil.getCurrentUserName(request);
			getBaseManager().deleteAll(FinanceMoneyDetail.class, ids);
			print(response, RESBONSE_SUCCESS);
			log.debug(currentUserName + ">删除借入出款，ids=" + Arrays.toString(ids));
		} catch (RuntimeException ex) {
			ex.printStackTrace();
			log.error(currentUserName + ">删除借入出款[ids=" + ids + "]出错");
		}
		return null;
	}

	/**
	 * 债务管理列表
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward listMoney(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			// 增加查询条件-结束
			ListQuery listQuery = new ListQuery(FinanceMoneyDetail.class, request);
			setPageIndex(request, listQuery);// 设置页码
			List<FinanceMoneyDetail> result = financeManager.list(listQuery);
			savePagination(request, result, FinanceMoneyDetail.class);// 保存结果集

			// 设置属性
			request.setAttribute("borrowUserName", request.getParameter("borrowUserName"));
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return mapping.findForward(FORWARD_SUCCESS);
	}

	/**
	 * 还款操作
	 * 
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward repay(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String currentUserName = null;
		try {
			currentUserName = UserUtil.getCurrentUserName(request);
			JSONObject jsonObject = readJson(request);
			long detailId = jsonObject.getLong("id");
			double repayTotal = jsonObject.getDouble("repayTotal");
			try {
				if (financeManager.repay(detailId, repayTotal)) {
					print(response, "true");
					log.info(currentUserName + ">借款-还款:[id=" + detailId + ",总额=" + repayTotal + "]");
				}
			} catch (FinanceException e) {
				print(response, e.getMessage());
				log.error(currentUserName + ">借款-还款:[id=" + detailId + ",总额=" + repayTotal + "]");
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}

	/**
	 * 统计当前登录人欠款总额
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
			Double[] count = financeManager.count(creatorId, request.getParameter("financeType"));
			DecimalFormat df = new DecimalFormat("#.00");
			JSONObject jsonObject = new JSONObject();
			jsonObject.accumulate("totalArrearage", df.format(count[0]));
			jsonObject.accumulate("requitedArrearage", df.format(count[1]));
			jsonObject.accumulate("remain", df.format(count[0] - count[1]));
			print(response, jsonObject.toString());
			log.info(currentUserName + ">统计欠款总额<type=" + request.getParameter("financeType") + ">=" + jsonObject.toString());
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}
}
