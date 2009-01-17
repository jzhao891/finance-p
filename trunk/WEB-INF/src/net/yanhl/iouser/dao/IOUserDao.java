package net.yanhl.iouser.dao;

import java.util.List;

import net.yanhl.iouser.pojo.Iouser;

/**
 * 债务人DAO接口
 * @author 闫洪磊
 * @since Nov 29, 2008
 *
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
