package net.yanhl.iouser.service;

import java.util.List;

import net.yanhl.base.query.ListQuery;
import net.yanhl.iouser.pojo.GroupRelation;

/**
 * 
 * @author 闫洪磊
 * @since Dec 4, 2008
 *
 */
public interface GroupManager {

	/**
	 * @param listQuery
	 * @return
	 */
	List<GroupRelation> finaAllGroup(ListQuery listQuery);
}
