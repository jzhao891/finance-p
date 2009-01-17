package net.yanhl.iouser.service;

import java.util.List;

import net.yanhl.base.query.ListQuery;
import net.yanhl.iouser.pojo.Iouser;

/**
 * 债务人业务管理接口
 * 
 * @author 闫洪磊
 * @since Nov 29, 2008
 * 
 */
public interface IouserManager {
	/**
	 * 判断数据库是不是已经有此用户信息
	 * 
	 * @param userName
	 * @return true 有 false 没有
	 */
	boolean checkHas(String userName);

	/**
	 * 按照查询条件查询当前登录用户的所有借入/出款人员
	 * 
	 * @param query
	 *            查询条件
	 * @param creatorId
	 *            创建人ID
	 * @param pageIndex
	 * @param pageSize
	 * @return 查找出来的人员集合
	 */
	List<Iouser> finaAllUser(ListQuery listQuery);

	/**
	 * 根据@creatorId统计借入/借出人员总数
	 * 
	 * @param creatorId
	 *            创建人ID
	 * @return 借入/借出人员总数
	 */
	int count(String creatorId);
}
