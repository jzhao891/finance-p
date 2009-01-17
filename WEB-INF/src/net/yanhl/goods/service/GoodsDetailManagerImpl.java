package net.yanhl.goods.service;

import java.util.List;

import net.yanhl.base.query.BaseQuery;
import net.yanhl.base.query.ListQuery;
import net.yanhl.base.service.BaseManagerImpl;
import net.yanhl.goods.dao.GoodsDetailDao;
import net.yanhl.goods.pojo.GoodsDetail;
import net.yanhl.util.UserUtil;

/**
 * <p>
 * Title:物品相信实现类
 * </p>
 * <p>
 * Description:
 * </p>
 * <p>
 * Copyright: Copyright (c) 2008
 * </p>
 * 
 * @author 闫洪磊
 * @version 1.0.0.2008
 */
public class GoodsDetailManagerImpl extends BaseManagerImpl implements GoodsDetailManager {

	private GoodsDetailDao goodsDetailDao;

	public void setGoodsDetailDao(GoodsDetailDao goodsDetailDao) {
		this.goodsDetailDao = goodsDetailDao;
	}

	@SuppressWarnings("unchecked")
	public List<GoodsDetail> findAllGoodsDetail(ListQuery listQuery) {

		// 设置创建人ID
		String currentUserId = UserUtil.getCurrentUserId(listQuery.getRequest());
		listQuery.setOwnerLabel(new String[] { "o.creatorId", currentUserId });

		// 设置查询条件
		listQuery.getQueryFilter().put("o.goodsName", new String[] { BaseQuery.AND, BaseQuery.LIKE });
		listQuery.getQueryFilter().put("t.typeName", new String[] { BaseQuery.AND, BaseQuery.LIKE });

		// 增加查询表设置表
		listQuery.getTables().put("t", "GoodsType");
		
		// 设置其他条件
		listQuery.getCustomFilter().add(new String[] {"o.goodsType.id", BaseQuery.EQ, "t.id"});
		return baseDao.find(listQuery);
	}

	public List<Object> getAllUnit() {
		return baseDao.find("select distinct p.goodsUnit from GoodsDetail p");
	}

	public int count(String creatorId) {
		return goodsDetailDao.count(creatorId);
	}
}
