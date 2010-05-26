package net.yanhl.goods.dao;

import java.util.List;

import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

/**
 * <p>Title: 物品详细DAO实现类</p>
 * <p>Description: </p>
 * @author	闫洪磊
 * @version	1.0.0.20080619
*/
public class GoodsDetailDaoHibernate extends HibernateDaoSupport implements GoodsDetailDao {

	public int count(String creatorId) {
		List list = getHibernateTemplate().find("select count(*) from GoodsDetail where creatorId=" + creatorId);
		if (list != null && list.get(0) != null) {
			return Integer.parseInt(list.get(0).toString());
		}
		return 0;
	}

}
