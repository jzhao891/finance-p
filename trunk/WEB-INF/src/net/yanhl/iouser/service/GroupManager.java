package net.yanhl.iouser.service;

import java.util.List;

import net.yanhl.base.query.ListQuery;
import net.yanhl.iouser.pojo.GroupRelation;

/**
 * <p>Title: 债务人分组管理类</p>
 * <p>Description: </p>
 * @author	闫洪磊
 * @version	1.0.0.20081204
*/
public interface GroupManager {

	/**
	 * @param listQuery
	 * @return
	 */
	List<GroupRelation> finaAllGroup(ListQuery listQuery);
}
