package net.yanhl.goods.service;

import java.util.List;
import java.util.Map;

import net.yanhl.base.query.ListQuery;
import net.yanhl.goods.pojo.GoodsType;

/**
 * <p>Title: 物品类型管理Service</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2008</p>
 * 
 * @author 闫洪磊
 * @version 1.0.0.20080617
 */
public interface GoodsTypeManager {
	/**
	 * 按照查询条件查询当前登录用户的所有物品类型
	 * @param listQuery 查询条件
	 * @return
	 */
	List<GoodsType> findAllGoodsType(ListQuery listQuery);
	
	/**
	 * 获得键值对形式的物品类型集合
	 * @return
	 */
	Map<String,String> findAllGoodsType(String userId);

	/**
	 * <p>获得当前类型的父类型名字<p>
	 * parentId为空时返回""
	 * @param parentId
	 * @return 父类型名字
	 */
	String getParentTypeName(Long parentId);
	
	/**
	 * 通过物品类型名称获得对象
	 * @param typeName	名称
	 * @return 存在 实例，不存在 null
	 */
	GoodsType getGoodsTypeByName(String typeName);
	
	/**
	 * 统计用户总物品类型数
	 * @param creatorId
	 * @return
	 */
	int count(String creatorId);
}
