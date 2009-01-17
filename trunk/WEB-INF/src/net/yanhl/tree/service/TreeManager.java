package net.yanhl.tree.service;

import net.yanhl.tree.Tree;
import net.yanhl.tree.TreeException;

/**
 * 下拉树接口
 * 
 * @author 闫洪磊
 * @since Nov 30, 2008
 * 
 */
public interface TreeManager {

	/**
	 * <p>
	 * 获得债务人下拉树，返回如下格式的文本：<br/> &lt;li>&lt;ul>&lt;li
	 * id='0'&gt;&lt;span&gt;同事&lt;/span&gt;&lt;/li>&lt;ul&gt;&lt;/li>
	 * </ul>
	 * </p>
	 * 
	 * @param tree Tree 对象
	 * @see Tree
	 * @return 生成的文本
	 */
	String getUserTree(Tree tree) throws TreeException;

	/**
	 * <p>
	 * 获得债务人下拉树，返回如下格式的文本：<br/> &lt;li>&lt;ul>&lt;li
	 * id='0'&gt;&lt;span&gt;同事&lt;/span&gt;&lt;/li>&lt;ul&gt;&lt;/li>
	 * </ul>
	 * </p>
	 * 
	 * @param tree Tree 对象
	 * @see Tree
	 * @return 生成的文本
	 */
	String getGroupTree(Tree tree) throws TreeException;
}
