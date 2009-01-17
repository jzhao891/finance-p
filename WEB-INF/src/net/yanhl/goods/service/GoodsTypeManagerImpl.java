package net.yanhl.goods.service;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.yanhl.base.query.BaseQuery;
import net.yanhl.base.query.ListQuery;
import net.yanhl.base.service.BaseManagerImpl;
import net.yanhl.goods.dao.GoodsTypeDao;
import net.yanhl.goods.pojo.GoodsType;
import net.yanhl.util.UserUtil;

/**
 * <p>
 * Title: 物品类型管理实现类
 * </p>
 * <p>
 * Description:
 * </p>
 * <p>
 * Copyright: Copyright (c) 2008
 * </p>
 * 
 * @author 闫洪磊
 * @version 1.0.0.20080617
 */
public class GoodsTypeManagerImpl extends BaseManagerImpl implements GoodsTypeManager {

	private GoodsTypeDao goodsTypeDao;

	public void setGoodsTypeDao(GoodsTypeDao goodsTypeDao) {
		this.goodsTypeDao = goodsTypeDao;
	}

	@SuppressWarnings("unchecked")
	public List<GoodsType> findAllGoodsType(ListQuery listQuery) {
		// 设置创建人ID
		String currentUserId = UserUtil.getCurrentUserId(listQuery.getRequest());
		listQuery.setOwnerLabel(new String[] { "o.creatorId", currentUserId });

		// 设置查询条件
		listQuery.getQueryFilter().put("typeName", new String[] { BaseQuery.AND, BaseQuery.LIKE });
		List result = baseDao.find(listQuery);
		List<GoodsType> goodsTypes = (List<GoodsType>) result.get(1);
		for (int i = 0; i < goodsTypes.size(); i++) {
			GoodsType goodsType = goodsTypes.get(i);
			goodsType.setParentNames(getParentTypeName(goodsType.getParentId()));
			goodsTypes.set(i, goodsType);
		}
		return result;
	}

	public Map<String, String> findAllGoodsType(String userId) {
		Map<String, String> keyValues = new HashMap<String, String>();
		List<Object[]> allGoodsType = goodsTypeDao.findAllGoodsType(userId);
		for (Iterator<Object[]> iter = allGoodsType.iterator(); iter.hasNext();) {
			Object[] type = iter.next();
			keyValues.put(type[0].toString(), type[1].toString());
		}
		return keyValues;
	}

	public GoodsType getGoodsTypeByName(String typeName) {
		return goodsTypeDao.getGoodsTypeByName(typeName);
	}
	
	public String getParentTypeName(Long parentId) {
		if(parentId == null || parentId == 0) {
			return "根类型";
		}
		List<String> names = goodsTypeDao.getParentTypeNames(parentId);
		String parentName = "";
		if(names.size() > 0) {
			parentName = names.get(0);
		}
		return parentName;
	}

	public int count(String creatorId) {
		return goodsTypeDao.count(creatorId);
	}

}
