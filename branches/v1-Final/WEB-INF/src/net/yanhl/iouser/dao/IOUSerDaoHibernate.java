package net.yanhl.iouser.dao;

import java.util.List;

import net.yanhl.iouser.pojo.Iouser;

import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

/**
 * <p>Title: 债务人DAO对象Hibernate实现类</p>
 * <p>Description: </p>
 * @author	闫洪磊
 * @version	1.0.0.20080524
*/
public class IOUSerDaoHibernate extends HibernateDaoSupport implements IOUserDao {

	/*
	 * (non-Javadoc)
	 * 
	 * @see net.yanhl.iouser.dao.IOUserDao#getIouserByName(java.lang.String)
	 */
	@SuppressWarnings("unchecked")
	public List<Iouser> getIouserByName(String userName) {
		return (List<Iouser>) getHibernateTemplate().find("from Iouser where userName='" + userName + "'");
	}

	/*
	 * 统计用户对象个数
	 * 
	 * @see net.yanhl.iouser.dao.IOUserDao#count(java.lang.String)
	 */
	public int count(String creatorId) {
		List list = getHibernateTemplate().find("select count(*) from Iouser where creatorId=" + creatorId);
		if (list != null && list.get(0) != null) {
			return Integer.parseInt(list.get(0).toString());
		}
		return 0;
	}

	/*
	 * 查找组下面的用户，按照用户排序号升序排序
	 * 
	 * @see net.yanhl.iouser.dao.IOUserDao#getUsersByGroup(java.lang.String)
	 */
	public List<Object[]> getUsersByGroup(String creatorId, String groupId) {
		String hql = "select id,userName from Iouser where group.id=" + groupId
					+ " and creatorId=" + creatorId
					+ " order by orderNum";
		List<Object[]> result = getHibernateTemplate().find(hql);
		return result;
	}

}
