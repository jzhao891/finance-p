package net.yanhl.finance.dao;

import java.util.List;

import net.yanhl.base.dao.BaseDaoHibernate;
import net.yanhl.finance.util.FinanceUtil;

/**
 * 
 * @author 闫洪磊
 * @since Dec 22, 2008
 *
 */
public class FinanceDaoHibernate extends BaseDaoHibernate implements FinanceDao {

	/* (non-Javadoc)
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
