package net.yanhl.finance.pojo;

import java.sql.Date;
import java.text.DecimalFormat;

import net.yanhl.iouser.pojo.Iouser;

/**
 * FinanceMoneyDetail entity.
 * 
 * @author MyEclipse Persistence Tools
 */

public class FinanceMoneyDetail implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 140256315857673013L;
	private Long id;
	private Date loanDate;//借款日期
	private Date fallinDate;//规定还款日期
	private Double totalArrearage;//借款总额
	private Double requitedArrearage;//已还款总额
	private java.util.Date createDate;
	private Integer creatorId;
	private Iouser borrowUser;//借出方
	private String financeType;//借入、出类型(0借入,1借出)
	private String debtType;//债务类型(现金0、银行转帐1、支票2)
	private String remark;

	// Constructors

	/** default constructor */
	public FinanceMoneyDetail() {
	}

	// Property accessors

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getLoanDate() {
		return this.loanDate;
	}

	public void setLoanDate(Date loanDate) {
		this.loanDate = loanDate;
	}

	public Date getFallinDate() {
		return this.fallinDate;
	}

	public void setFallinDate(Date fallinDate) {
		this.fallinDate = fallinDate;
	}

	/**
	 * 得到借款总额
	 * @return
	 */
	public Double getTotalArrearage() {
		return this.totalArrearage;
	}

	public void setTotalArrearage(Double totalArrearage) {
		this.totalArrearage = totalArrearage;
	}

	/**
	 * 得到已还款总额
	 * @return
	 */
	public Double getRequitedArrearage() {
		return this.requitedArrearage;
	}

	public void setRequitedArrearage(Double requitedArrearage) {
		this.requitedArrearage = requitedArrearage;
	}

	public java.util.Date getCreateDate() {
		return this.createDate;
	}

	/**
	 * 得到剩余还款额
	 * @return
	 */
	public String getRemainArrearage() {
		DecimalFormat df = new DecimalFormat("#.00");
		return df.format(this.totalArrearage - this.requitedArrearage);
	}

	public void setCreateDate(java.util.Date createDate) {
		this.createDate = createDate;
	}

	public Integer getCreatorId() {
		return this.creatorId;
	}

	public void setCreatorId(Integer creatorId) {
		this.creatorId = creatorId;
	}

	public String getFinanceType() {
		return this.financeType;
	}

	public void setFinanceType(String financeType) {
		this.financeType = financeType;
	}

	public Iouser getBorrowUser() {
		return borrowUser;
	}

	public void setBorrowUser(Iouser borrowUser) {
		this.borrowUser = borrowUser;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getDebtType() {
		return debtType;
	}
	
	public String getDebtTypeCn() {
		int intDebtType = Integer.parseInt(debtType);
		String debtTypeCn = "";
		switch (intDebtType) {
		case 0:
			debtTypeCn = "现金";
			break;
		case 1:
			debtTypeCn = "银行转帐";
			break;
		case 2:
			debtTypeCn = "支票";
			break;
		default:
			break;
		}
		return debtTypeCn;
	}

	public void setDebtType(String debtType) {
		this.debtType = debtType;
	}

	@Override
	public String toString() {
		return super.toString() + "[id=" + id + ",borrowUser=" + borrowUser.getUserName()
			+ ",totalArrearage=" + totalArrearage + "]";
	}

}