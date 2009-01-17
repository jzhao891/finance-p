package net.yanhl.base.service;

import java.util.List;

import net.yanhl.base.query.ListQuery;
import net.yanhl.base.query.util.QueryUtil;


public interface BaseManager {
	/**
	 * 以对象类型和对象编号为标示,获取相对应的对象
	 * 
	 * @param pojoClass
	 *            对象类型
	 * @param id
	 *            对象编号
	 * @return 获取的简单对象
	 * @exception RuntimeException
	 */
	public Object get(Class pojoClass, long id) throws RuntimeException;
	
	/**
	 * 创建新对象
	 * 
	 * @param pojo
	 *            Object 新对象
	 * @throws RuntimeException
	 */
	public void save(Object pojo) throws RuntimeException;

	/**
	 * 更新已有对象
	 * 
	 * @param pojo
	 *            Object 需要更新的对象
	 * @throws RuntimeException
	 */
	public void update(Object pojo) throws RuntimeException;
	
	/**
	 * 以对象类型和对象编号为标示,删除相对应的对象
	 * 
	 * @param pojoClass
	 *            对象类型
	 * @param id
	 *            对象编号
	 * @exception RuntimeException
	 */	
	public void delete(Class pojo, long id) throws RuntimeException;
	
	/**
	 * 删除集合中的全部对象
	 * @param pojo pojo
	 * @param ids 要删除的ID集合
	 * @throws RuntimeException
	 */
	public void deleteAll(Class pojo, String[] ids) throws RuntimeException;
	
	/**
	 * 插入或者更新对象
	 * 
	 * @param pojo
	 *            Object 目标pojo对象
	 * @throws RuntimeException
	 */
	public void insertOrUpdate(Object pojo) throws RuntimeException;
	
	/**
	 * 查找所有符合条件的记录
	 * @param listQuery 查询条件
	 * @return 查询结果
	 * @throws RuntimeException
	 */
	public List find(ListQuery listQuery) throws RuntimeException;
}
