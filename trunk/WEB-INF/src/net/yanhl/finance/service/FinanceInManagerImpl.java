package net.yanhl.finance.service;

import java.util.List;

import net.yanhl.base.query.BaseQuery;
import net.yanhl.base.query.ListQuery;
import net.yanhl.base.query.util.QueryType;
import net.yanhl.finance.FinanceException;
import net.yanhl.finance.dao.FinanceInDao;
import net.yanhl.finance.pojo.FinanceMoneyDetail;
import net.yanhl.util.UserUtil;

/**
 * <p>
 * Title: 借入业务实现类
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
public class FinanceInManagerImpl extends FinanceManagerImpl implements FinanceInManager {

	private FinanceInDao financeInDao;

	public void setFinanceInDao(FinanceInDao financeInDao) {
		this.financeInDao = financeInDao;
	}

	/* (non-Javadoc)
	 * @see net.yanhl.finance.service.FinanceInManager#list(net.yanhl.base.query.ListQuery)
	 */
	public List<FinanceMoneyDetail> list(ListQuery listQuery) {
		// 设置创建人ID
		String currentUserId = UserUtil.getCurrentUserId(listQuery.getRequest());
		listQuery.setOwnerLabel(new String[] { "o.creatorId", currentUserId });
		
		// 设置键值对条件
		listQuery.getQueryFilter().put("financeType", new String[] { BaseQuery.AND, BaseQuery.EQ });
		listQuery.getQueryFilter().put("borrowUser", new String[] { BaseQuery.AND, BaseQuery.EQ });

		//设置date
		listQuery.getQueryFilter().put("loanDate", new String[] {BaseQuery.AND, BaseQuery.GE, QueryType.DATE});
		listQuery.getQueryFilter().put("fallinDate", new String[] {BaseQuery.AND, BaseQuery.LE, QueryType.DATE});
		return baseDao.find(listQuery);
	}

	/* (non-Javadoc)
	 * @see net.yanhl.finance.service.FinanceManager#count(java.lang.String)
	 */
	public Double[] count(String creatorId, String financeType) {
		Object[] count = financeInDao.count(creatorId, financeType);
		Double[] doubleCount = new Double[count.length];
		for (int i = 0; i < doubleCount.length; i++) {
			if(count[i] == null) {
				doubleCount[i] = 0.0;
			} else {
				doubleCount[i] = Double.parseDouble(count[i].toString());
			}
		}
		return doubleCount;
	}

	/* (non-Javadoc)
	 * @see net.yanhl.finance.service.FinanceManager#repay(long, java.lang.Double)
	 */
	public boolean repay(long detailId, Double repayTotal) throws FinanceException {
		Object srcDetail = get(FinanceMoneyDetail.class, detailId);
		if(srcDetail == null) {
			throw new FinanceException("未找到ID为<" + detailId + ">的债务记录");
		}
		FinanceMoneyDetail moneyDetail = (FinanceMoneyDetail) srcDetail;
		if(moneyDetail.getRequitedArrearage() > moneyDetail.getTotalArrearage()
				|| moneyDetail.getRequitedArrearage() + repayTotal > moneyDetail.getTotalArrearage()) {
			throw new FinanceException("还款总额大于借款总额！");
		} else {
			moneyDetail.setRequitedArrearage(moneyDetail.getRequitedArrearage() + repayTotal);
			update(moneyDetail);
			return true;
		}
	}

	
}
