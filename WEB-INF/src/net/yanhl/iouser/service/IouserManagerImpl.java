package net.yanhl.iouser.service;

import java.util.List;

import net.yanhl.base.query.BaseQuery;
import net.yanhl.base.query.ListQuery;
import net.yanhl.base.service.BaseManagerImpl;
import net.yanhl.iouser.dao.IOUserDao;
import net.yanhl.iouser.pojo.Iouser;
import net.yanhl.util.UserUtil;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * 债务人业务管理实现类
 * 
 * @author 闫洪磊
 * @since Nov 29, 2008
 * 
 */
public class IouserManagerImpl extends BaseManagerImpl implements IouserManager {

	Log log = LogFactory.getLog(this.getClass());

	private IOUserDao iouserDao;

	public IOUserDao getIouserDao() {
		return iouserDao;
	}

	public void setIouserDao(IOUserDao iouserDao) {
		this.iouserDao = iouserDao;
	}

	/*
	 * 判断数据库是不是已经有此用户信息
	 * 
	 * @see net.yanhl.iouser.service.IouserManager#checkHas(java.lang.String)
	 */
	public boolean checkHas(String userName) {
		List<Iouser> iousers = iouserDao.getIouserByName(userName);
		if (iousers.size() > 0) {
			return true;
		}
		return false;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see net.yanhl.iouser.service.IouserManager#finaAllUser(net.yanhl.base.query.ListQuery)
	 */
	public List<Iouser> finaAllUser(ListQuery listQuery) {
		// 设置创建人ID
		String currentUserId = UserUtil.getCurrentUserId(listQuery.getRequest());
		listQuery.setOwnerLabel(new String[] { "o.creatorId", currentUserId });

		// 设置查询条件
		listQuery.getQueryFilter().put("o.userName", new String[] { BaseQuery.AND, BaseQuery.LIKE });
		listQuery.getQueryFilter().put("g.groupName", new String[] { BaseQuery.AND, BaseQuery.LIKE });
		listQuery.getQueryFilter().put("o.mobilePhone", new String[] { BaseQuery.AND, BaseQuery.LIKE });
		listQuery.getQueryFilter().put("o.companyName", new String[] { BaseQuery.AND, BaseQuery.LIKE });
		
		// 增加查询表设置表
		listQuery.getTables().put("g", "GroupRelation");
		
		// 设置关联条件
		listQuery.getCustomFilter().add(new String[] {"o.group.id", BaseQuery.EQ, "g.id"});
		return baseDao.find(listQuery);
	}

	/* (non-Javadoc)
	 * @see net.yanhl.iouser.service.IouserManager#count(java.lang.String)
	 */
	public int count(String creatorId) {
		return iouserDao.count(creatorId);
	}
}
