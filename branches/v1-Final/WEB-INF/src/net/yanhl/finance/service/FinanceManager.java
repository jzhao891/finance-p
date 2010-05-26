package net.yanhl.finance.service;

import java.util.List;

import net.yanhl.base.query.ListQuery;
import net.yanhl.finance.FinanceException;
import net.yanhl.finance.pojo.FinanceMoneyDetail;

/**
 * <p>Title: 基础账务管理接口</p>
 * <p>Description: </p>
 * @author	闫洪磊
 * @version	1.0.0.20081220
*/
public interface FinanceManager {
	
	/**
	 * 统计用户总物品数
	 * 
	 * @param creatorId
	 * @return
	 */
	Double[] count(String creatorId, String financeType);
	
	/**
	 * 还款
	 * @param detailId	借入款项ID
	 * @param repayTotal 还款总额
	 * @return
	 */
	boolean repay(long detailId, Double repayTotal) throws FinanceException;
	
	/**
	 * 得到列表
	 * 
	 * @param listQuery
	 * @return
	 */
	public List<FinanceMoneyDetail> list(ListQuery listQuery);
}