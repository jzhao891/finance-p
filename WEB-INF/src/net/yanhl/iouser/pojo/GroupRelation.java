package net.yanhl.iouser.pojo;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * 债务人组POJO
 * 
 * @author 闫洪磊
 * 
 */
public class GroupRelation implements Serializable {

	private static final long serialVersionUID = 6202253180943473205L;
	private Long id;// 主键ID
	private Integer creatorId;// 创建人
	private Date createDate;// 创建日期
	private String groupName;// 组名称
	private GroupRelation parentGroup;
	private Set<GroupRelation> childGroups = new HashSet<GroupRelation>();
	private Integer orderNum;// 排序号
	private String remark;// 备注

	public GroupRelation() {
		super();
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

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public GroupRelation getParentGroup() {
		return parentGroup;
	}

	public void setParentGroup(GroupRelation parentGroup) {
		this.parentGroup = parentGroup;
	}

	public Set<GroupRelation> getChildGroups() {
		return childGroups;
	}

	public void setChildGroups(Set<GroupRelation> childGroups) {
		this.childGroups = childGroups;
	}
	
	public Integer getChildSize() {
		return childGroups.size();
	}

	public Integer getOrderNum() {
		return orderNum;
	}

	public void setOrderNum(Integer orderNum) {
		this.orderNum = orderNum;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	@Override
	public String toString() {
		String parentGroupName = parentGroup == null ? "" : parentGroup.getGroupName();
		return super.toString() + ",[id=" + id + ",组名=" + groupName + ",父亲=" + parentGroupName + "]"
			+ ",儿子个数=" + childGroups.size();
	}
	
}
