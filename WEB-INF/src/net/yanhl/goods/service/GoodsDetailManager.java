package net.yanhl.goods.service;

import java.util.List;

import net.yanhl.base.query.ListQuery;
import net.yanhl.goods.pojo.GoodsDetail;

/**
 * <p>Title: 物品详细管理Service</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2008</p>
 * 
 * @author 闫洪磊
 * @version 1.0.0.20080619
 */
public interface GoodsDetailManager {
	/**
	 * 按照查询条件查询当前登录用户的所有物品详细
	 * @param listQuery 查询条件
	 * @return
	 */
	List<GoodsDetail> findAllGoodsDetail(ListQuery listQuery);
	
	/**
	 * 获得所有单位
	 * @return
	 */
	List<Object> getAllUnit();
	
	/**
	 * 统计用户总物品数
	 * @param creatorId
	 * @return
	 */
	int count(String creatorId);
}
