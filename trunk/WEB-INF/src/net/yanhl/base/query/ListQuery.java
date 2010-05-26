package net.yanhl.base.query;

import javax.servlet.http.HttpServletRequest;

/**
 * <p>Title: 列表查询对象</p>
 * <p>Description: </p>
 * @author	闫洪磊
 * @version	1.0.0.20080702
*/
public class ListQuery extends BaseQuery {

	private int pageIndex = 0;// 当前页
	private int pageSize = 2;// 每页显示的条数

	public ListQuery(Class masterPojo, HttpServletRequest request) {
		super.setMasterPojo(masterPojo);
		super.setRequest(request);
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getPageIndex() {
		return pageIndex;
	}

	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}

}
