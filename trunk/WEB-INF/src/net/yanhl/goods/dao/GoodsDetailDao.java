package net.yanhl.goods.dao;


/**
 * <p>Title: 物品详细DAO接口</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2008</p>
 * 
 * @author 闫洪磊
 * @version 1.0.0.20080619
 */
public interface GoodsDetailDao {
	/**
	 * 统计用户总物品数
	 * @param creatorId
	 * @return
	 */
	int count(String creatorId);
}
