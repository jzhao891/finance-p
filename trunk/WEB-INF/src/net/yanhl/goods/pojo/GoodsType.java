package net.yanhl.goods.pojo;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * <p>
 * Title: 物品类型POJO
 * </p>
 * <p>
 * Description:
 * </p>
 * <p>
 * Copyright: Copyright (c) 2008
 * </p>
 * 
 * @author 闫洪磊
 * @version 1.0.0.20080615
 */
public class GoodsType implements java.io.Serializable {
	private static final long serialVersionUID = 7552285226201978718L;
	private Long id;
	private Integer creatorId;
	private Date createDate;
	private String typeName;
	private Long parentId;
	private String parentNames;
	private String remark;
	private Set<GoodsDetail> goodsDetails = new HashSet<GoodsDetail>();

	public GoodsType() {

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getCreatorId() {
		return creatorId;
	}

	public void setCreatorId(Integer creatorId) {
		this.creatorId = creatorId;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getParentNames() {
		return parentNames;
	}

	public void setParentNames(String parentNames) {
		this.parentNames = parentNames;
	}

	public Set<GoodsDetail> getGoodsDetails() {
		return goodsDetails;
	}

	public void setGoodsDetails(Set<GoodsDetail> goodsDetails) {
		this.goodsDetails = goodsDetails;
	}

	@Override
	public String toString() {
		return super.toString() + ",[id=" + id + ",typeName=" + typeName + "]";
	}

	
}
