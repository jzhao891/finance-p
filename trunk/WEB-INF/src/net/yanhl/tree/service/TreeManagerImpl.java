package net.yanhl.tree.service;

import java.util.Iterator;
import java.util.List;

import net.yanhl.base.service.BaseManagerImpl;
import net.yanhl.iouser.dao.IOUserDao;
import net.yanhl.iouser.pojo.GroupRelation;
import net.yanhl.tree.Tree;
import net.yanhl.tree.TreeException;
import net.yanhl.tree.dao.GroupRelationDao;
import net.yanhl.tree.util.TreeUtil;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * 下拉树实现类
 * @author 闫洪磊
 * @since Nov 30, 2008
 *
 */
public class TreeManagerImpl extends BaseManagerImpl  implements TreeManager{
	
	Log log = LogFactory.getLog(this.getClass());
	
	private IOUserDao iouserDao;
	private GroupRelationDao groupDao;

	public IOUserDao getIouserDao() {
		return iouserDao;
	}

	public void setIouserDao(IOUserDao iouserDao) {
		this.iouserDao = iouserDao;
	}

	public void setGroupDao(GroupRelationDao groupDao) {
		this.groupDao = groupDao;
	}
	
	/* 
	 * 人员下拉树
	 * 生成AJAX加载方式的树文本，格式如下：
	 * <li><ul><li id='0'><span>同事</span></li><ul></li>
	 * @see net.yanhl.iouser.service.IouserManager#getUserTree(Tree tree)
	 */
	public String getUserTree(Tree tree) throws TreeException {
		StringBuffer result = new StringBuffer();
		//获取所有组
		List<GroupRelation> allGroup = groupDao.loadAllGroup(tree);
		log.debug("groupId=" + tree.getParentId() + "，得到" + allGroup.size() + "个用户组");
		
		// TODO 增加组下面的组
		for (Iterator<GroupRelation> iterator = allGroup.iterator(); iterator.hasNext();) {
			GroupRelation group = iterator.next();
			log.debug("用户组:id=" + group.getId() + "，name=" + group.getGroupName());
			String ajaxUrl = tree.getBasePath() + "tree/getUserTree.do?gid=" + group.getId();
			result.append("<li id='")
				.append(group.getId())
				//add li end
				.append("'>\n\t<span")
				.append(" type='")
				.append(TreeUtil.TYPE_GROUP)
				.append("'>")
				.append(group.getGroupName())
				.append("</span>")
				//add span end
				.append("\n\t<ul class='ajax'>\n\t\t<li>\n\t\t\t{url:")
				.append(ajaxUrl + "}")
				.append("\n\t\t</li>\n\t</ul>\n</li>\n");
		}
		
		// TODO 增加组下面的用户
		//默认为根分组-1
		if(StringUtils.isEmpty(tree.getParentId())) {
			tree.setParentId("-1");
		}
		List<Object[]> usersOfGroup = iouserDao.getUsersByGroup(tree.getCreatorId(), tree.getParentId());
		log.debug("groupId=" + tree.getParentId() + "，得到" + usersOfGroup.size() + "个用户");
		for (Iterator<Object[]> userIter = usersOfGroup.iterator(); userIter.hasNext();) {
			Object[] iouser = userIter.next();
			log.debug("用户:id=" + iouser[0] + "，name=" + iouser[1]);
			result.append("<li id='")
				.append(iouser[0])
				//add li end
				.append("'>\n\t<span")
				.append(" type='")
				.append(TreeUtil.TYPE_USER)
				.append("'>")
				.append(iouser[1])
				.append("</span>\n</li>\n");
		}
		log.debug("人员groupId=" + tree.getParentId() + "，输出=\n" + result.toString());
		return result.toString();
	}

	/*
	 * 组下来树
	 * @see net.yanhl.tree.service.TreeManager#getGroupTree(Tree tree)
	 */
	public String getGroupTree(Tree tree) throws TreeException {
		StringBuffer result = new StringBuffer();
		//获取所有组
		List<GroupRelation> allGroup = groupDao.loadAllGroup(tree);
		log.debug("groupId=" + tree.getParentId() + "，得到" + allGroup.size() + "个用户组");
		
		// TODO 增加组下面的组
		for (Iterator<GroupRelation> iterator = allGroup.iterator(); iterator.hasNext();) {
			GroupRelation group = iterator.next();
			log.debug("用户组:id=" + group.getId() + "，name=" + group.getGroupName());
			String ajaxUrl = tree.getBasePath() + "tree/getGroupTree.do?gid=" + group.getId();
			int childs = group.getChildGroups().size();
			if(childs > 0) {
				result.append("<li id='")
				.append(group.getId())
				.append("'>\n\t<span")
				.append(" type='")
				.append(TreeUtil.TYPE_GROUP)
//				.append("' title='共" + childs + "个子分组'>")
				.append("'>")
				.append(group.getGroupName())
				.append("</span>")
				.append("\n\t<ul class='ajax'>\n\t\t<li>\n\t\t\t{url:")
				.append(ajaxUrl + "}")
				.append("\n\t\t</li>\n\t</ul>\n</li>\n");
			} else {
				result.append("<li id='")
				.append(group.getId())
				.append("'>\n\t<span")
				.append(" type='")
				.append(TreeUtil.TYPE_GROUP)
				.append("'>")
				.append(group.getGroupName())
				.append("</span>\n</li>\n");
			}
		}
		log.debug("分组groupId=" + tree.getParentId() + "，输出=\n" + result.toString());
		return result.toString();
	}
}
