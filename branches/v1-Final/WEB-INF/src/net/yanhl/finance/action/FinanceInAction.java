package net.yanhl.finance.action;

import net.yanhl.finance.service.FinanceInManager;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


/**
 * <p>Title: 账务借入</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2008</p>
 * 
 * @author 闫洪磊
 * @version 1.0.0.20080720
 */
public class FinanceInAction extends FinanceBaseAction {
	Log log = LogFactory.getLog(this.getClass());

	private FinanceInManager financeInManager;
	
	public void setFinanceInManager(FinanceInManager financeInManager) {
		this.financeInManager = financeInManager;
	}

}
