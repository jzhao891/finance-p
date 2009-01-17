package net.yanhl.tree;


/**
 * 下拉树基类
 * 
 * @author 闫洪磊
 * @since Dec 1, 2008
 *
 */
public class Tree {
	
	private String creatorId;// 创建人ID
	private String basePath;// 应用模块和树相对路径
	private String parentId;// 父级ID
	
	public Tree(String creatorId, String basePath, String parentId) {
		super();
		this.creatorId = creatorId;
		this.basePath = basePath;
		this.parentId = parentId;
	}

	public String getCreatorId() {
		return creatorId;
	}

	public void setCreatorId(String creatorId) {
		this.creatorId = creatorId;
	}

	public String getBasePath() {
		return basePath;
	}

	public void setBasePath(String basePath) {
		this.basePath = basePath;
	}
	
	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}
}
