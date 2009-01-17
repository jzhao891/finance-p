package net.yanhl.tree.dao;

import java.util.List;

import net.yanhl.iouser.pojo.GroupRelation;
import net.yanhl.tree.Tree;

import org.apache.commons.lang.StringUtils;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

/**
 * 债务人用户组DAO对象Hibernate实现类
 * 
 * @author 闫洪磊
 * @since Nov 29, 2008
 * 
 */
public class GroupRelationDaoHibernate extends HibernateDaoSupport implements GroupRelationDao {

	/*
	 * (non-Javadoc)
	 * 
	 * @see net.yanhl.iouser.dao.GroupRelationDao#loadAllGroup(java.lang.String,
	 *      java.lang.String)
	 */
	public List<GroupRelation> loadAllGroup(Tree tree) {
		if (StringUtils.isEmpty(tree.getParentId())) {
			tree.setParentId("-1");
		}
		StringBuffer hql = new StringBuffer("from GroupRelation t where id!=-1");
		hql.append(" and creatorId=" + tree.getCreatorId())
		.append(" and parent_id=" + tree.getParentId())
		.append(" order by orderNum");
		List<GroupRelation> result = getHibernateTemplate().find(hql.toString());
		return result;
	}

	public int countChilds(String groupId) {
		List result = getHibernateTemplate().find("select count(*) from GroupRelation where parentId=" + groupId);
		if(result.size() > 0) {
			return Integer.parseInt(result.get(0).toString());
		}
		return 0;
	}

}
