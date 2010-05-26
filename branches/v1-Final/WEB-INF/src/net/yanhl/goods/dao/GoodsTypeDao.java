package net.yanhl.goods.dao;

import java.util.List;

import net.yanhl.goods.pojo.GoodsType;

/**
 * <p>Title: 物品类型DAO接口</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2008</p>
 * 
 * @author 闫洪磊
 * @version 1.0.0.20080617
 */
public interface GoodsTypeDao {
	
	/**
	 * 获得键值对形式的物品类型集合
	 * @return
	 */
	List<Object[]> findAllGoodsType(String userId);
	
	/**
	 * 通过物品类型名称获得对象
	 * @param typeName	名称
	 * @return 存在 实例，不存在 null
	 */
	GoodsType getGoodsTypeByName(String typeName);

	/**
	 * 获得当前类型的父类型名字
	 * @param parentId
	 * @return 父类型名字集合
	 */
	List<String> getParentTypeNames(Long parentId);
	
	/**
	 * 统计用户总物品数
	 * @param creatorId
	 * @return
	 */
	int count(String creatorId);
}
