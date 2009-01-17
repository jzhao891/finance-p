package net.yanhl.finance.dao;



/**
 * <p>Title: 账务基础DAO接口</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2008</p>
 * 
 * @author 闫洪磊
 * @version 1.0.0.20080720
 */
public interface FinanceDao {
	/**
	 * 统计用户总物品数
	 * @param creatorId
	 * @return
	 */
	Object[] count(String creatorId, String financeType);
}
