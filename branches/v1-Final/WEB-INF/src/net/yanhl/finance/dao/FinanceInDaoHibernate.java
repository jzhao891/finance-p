package net.yanhl.finance.dao;

import java.util.List;

import net.yanhl.base.dao.BaseDaoHibernate;

/**
 * <p>Title: 账务借入DAO接口</p>
 * <p>Description: </p>
 * @author	闫洪磊
 * @version	1.0.0.20080720
*/
public class FinanceInDaoHibernate extends BaseDaoHibernate implements FinanceInDao {

	/*
	 * (non-Javadoc)
	 * 
	 * @see net.yanhl.finance.dao.FinanceDao#count(java.lang.String)
	 */
	public Object[] count(String creatorId, String financeType) {
		List result = getHibernateTemplate().find(
				"select sum(totalArrearage),sum(requitedArrearage) from FinanceMoneyDetail " +
				"where creatorId=" + creatorId + " and financeType='" + financeType + "'");
		if (result != null && result.get(0) != null) {
			return (Object[]) result.get(0);
		}
		return new Object[2];
	}
}
