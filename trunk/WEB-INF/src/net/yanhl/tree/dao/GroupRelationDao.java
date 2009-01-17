package net.yanhl.tree.dao;

import java.util.List;

import net.yanhl.iouser.pojo.GroupRelation;
import net.yanhl.tree.Tree;

/**
 * 用户组DAO
 * 
 * @author 闫洪磊
 * @cdate Nov 28, 2008
 * 
 */
public interface GroupRelationDao {
	
	/**
	 * 根据创建人和父级别ID查找所有组对象
	 * @param creatorId
	 * @param parentId
	 * @return	组对象集合
	 */
	List<GroupRelation> loadAllGroup(Tree tree);
	
	/**
	 * 统计分组下的子分组
	 * @param groupId
	 * @return
	 */
	int countChilds(String groupId);
}
