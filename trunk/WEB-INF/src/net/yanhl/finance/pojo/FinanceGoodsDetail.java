package net.yanhl.finance.pojo;

import java.util.Date;

import net.yanhl.goods.pojo.GoodsDetail;

/**
 * FinanceGoodsDetail entity.
 * 
 * @author MyEclipse Persistence Tools
 */

public class FinanceGoodsDetail implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2022542369704692036L;
	private Long id;
	private GoodsDetail goodsDetail;
	private Date createDate;
	private Integer creatorId;
	private Integer iouserId;
	private Integer financeType;
	private Integer goodsNum;
	private Double unitPrice;
	private Double total;

	// Constructors

	/** default constructor */
	public FinanceGoodsDetail() {
	}

	/** full constructor */
	public FinanceGoodsDetail(GoodsDetail goodsDetail, Date createDate, Integer creatorId, Integer iouserId,
			Integer financeType, Integer goodsNum, Double unitPrice, Double total) {
		this.goodsDetail = goodsDetail;
		this.createDate = createDate;
		this.creatorId = creatorId;
		this.iouserId = iouserId;
		this.financeType = financeType;
		this.goodsNum = goodsNum;
		this.unitPrice = unitPrice;
		this.total = total;
	}

	// Property accessors

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public GoodsDetail getGoodsDetail() {
		return this.goodsDetail;
	}

	public void setGoodsDetail(GoodsDetail goodsDetail) {
		this.goodsDetail = goodsDetail;
	}

	public Date getCreateDate() {
		return this.createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Integer getCreatorId() {
		return this.creatorId;
	}

	public void setCreatorId(Integer creatorId) {
		this.creatorId = creatorId;
	}

	public Integer getIouserId() {
		return this.iouserId;
	}

	public void setIouserId(Integer iouserId) {
		this.iouserId = iouserId;
	}

	public Integer getFinanceType() {
		return this.financeType;
	}

	public void setFinanceType(Integer financeType) {
		this.financeType = financeType;
	}

	public Integer getGoodsNum() {
		return this.goodsNum;
	}

	public void setGoodsNum(Integer goodsNum) {
		this.goodsNum = goodsNum;
	}

	public Double getUnitPrice() {
		return this.unitPrice;
	}

	public void setUnitPrice(Double unitPrice) {
		this.unitPrice = unitPrice;
	}

	public Double getTotal() {
		return this.total;
	}

	public void setTotal(Double total) {
		this.total = total;
	}

}