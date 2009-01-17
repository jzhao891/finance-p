package net.yanhl.tree.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.yanhl.base.action.BaseAction;
import net.yanhl.iouser.pojo.Iouser;
import net.yanhl.tree.Tree;
import net.yanhl.tree.service.TreeManager;
import net.yanhl.util.StringUtil;
import net.yanhl.util.UserUtil;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;


/**
 * 下拉树总ACTION
 * @author 闫洪磊
 * @since Nov 29, 2008
 *
 */
public class TreeAction extends BaseAction {
	Log log = LogFactory.getLog(this.getClass());
	private TreeManager treeManager;

	public void setTreeManager(TreeManager treeManager) {
		this.treeManager = treeManager;
	}

	/**
	 * 生成用户下拉树
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward getUserTree(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String currentUserName = null;
		Iouser user = null;
		try {
			currentUserName = UserUtil.getCurrentUserName(request);
			String currentUserId = UserUtil.getCurrentUserId(request);
			String parentId = StringUtil.getValue(request, "gid");
			String basePath = StringUtil.getValue(request, "basePath");
			Tree tree = new Tree(currentUserId, basePath, parentId);
			String treeResult = treeManager.getUserTree(tree);
			print(response, treeResult);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(currentUserName + ">获得借入/借出人员列表" + user + "出错\n\t" + e.getMessage());
		}
		return null;
	}
	
	/**
	 * 生成用户组下拉树
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward getGroupTree(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String currentUserName = null;
		Iouser user = null;
		try {
			currentUserName = UserUtil.getCurrentUserName(request);
			String currentUserId = UserUtil.getCurrentUserId(request);
			String parentId = StringUtil.getValue(request, "gid");
			String basePath = StringUtil.getValue(request, "basePath");
			Tree tree = new Tree(currentUserId, basePath, parentId);
			String treeResult = treeManager.getGroupTree(tree);
			print(response, treeResult);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(currentUserName + ">获得借入/借出人员列表" + user + "出错\n\t" + e.getMessage());
		}
		return null;
	}
}
