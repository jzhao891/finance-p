package net.yanhl.iouser.service;

import java.util.List;

import net.yanhl.base.query.BaseQuery;
import net.yanhl.base.query.ListQuery;
import net.yanhl.base.service.BaseManagerImpl;
import net.yanhl.iouser.pojo.GroupRelation;
import net.yanhl.util.UserUtil;

/**
 * 
 * @author 闫洪磊
 * @since Dec 4, 2008
 * 
 */
public class GroupManagerImpl extends BaseManagerImpl implements GroupManager {

	/*
	 * (non-Javadoc)
	 * 
	 * @see net.yanhl.iouser.service.GroupManager#finaAllGroup(net.yanhl.base.query.ListQuery)
	 */
	public List<GroupRelation> finaAllGroup(ListQuery listQuery) {
		// 设置创建人ID
		String currentUserId = UserUtil.getCurrentUserId(listQuery.getRequest());
		listQuery.setOwnerLabel(new String[] { "o.creatorId", currentUserId });
		
		// 设置查询条件
		listQuery.getQueryFilter().put("groupName", new String[] { BaseQuery.AND, BaseQuery.LIKE });
		return baseDao.find(listQuery);
	}

}
