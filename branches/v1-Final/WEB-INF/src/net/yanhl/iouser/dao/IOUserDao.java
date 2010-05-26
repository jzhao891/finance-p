package net.yanhl.iouser.dao;

import java.util.List;

import net.yanhl.iouser.pojo.Iouser;

/**
 * <p>Title: 债务人DAO接口</p>
 * <p>Description: </p>
 * @author	闫洪磊
 * @version	1.0.0.20080524
*/
public interface IOUserDao {
	List<Iouser> getIouserByName(String userName);

	/**
	 * 根据@creatorId统计借入/借出人员总数
	 * 
	 * @param creatorId
	 * @return 总数
	 */
	int count(String creatorId);

	/**
	 * 获得一个组下面的用户
	 * 
	 * @param creatorId	创建人ID
	 * @param groupId	分组ID
	 * @return
	 */
	List<Object[]> getUsersByGroup(String creatorId, String groupId);
}
