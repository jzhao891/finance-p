package net.yanhl.goods.dao;

import java.util.List;

import net.yanhl.base.dao.BaseDaoHibernate;
import net.yanhl.goods.pojo.GoodsType;

/**
 * <p>
 * Title: 物品类型DAO
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
public class GoodsTypeDaoHibernate extends BaseDaoHibernate implements GoodsTypeDao {
	
	public List<Object[]> findAllGoodsType(String userId) {
		List<Object[]> result = getHibernateTemplate().find("select id,typeName from GoodsType g where g.creatorId=" + userId);
		return result;
	}

	public GoodsType getGoodsTypeByName(String typeName) {
		List<GoodsType> result = find("from GoodsType where typeName='" + typeName + "'");
		if (result.size() > 0) {
			return result.get(0);
		}
		return null;
	}

	public List<GoodsType> getParentTypes(Long parentId) {
		List<GoodsType> result = find("from GoodsType where parentId=" + parentId + " order by createDate,id");
		return result;
	}
	
	public List<String> getParentTypeNames(Long parentId) {
		List<String> result = find("select typeName from GoodsType where id=" + parentId + " order by createDate,id");
		return result;
	}

	public int count(String creatorId) {
		List list = getHibernateTemplate().find("select count(*) from GoodsType where creatorId=" + creatorId);
		if (list != null && list.get(0) != null) {
			return Integer.parseInt(list.get(0).toString());
		}
		return 0;
	}

}
