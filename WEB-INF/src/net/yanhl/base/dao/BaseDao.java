package net.yanhl.base.dao;

import java.io.Serializable;
import java.util.List;

import net.yanhl.base.query.ListQuery;

/**
 * <p>Title: 基础DAO接口</p>
 * <p>Description: </p>
 * @author	闫洪磊
 * @version	1.0.0.20080703
*/
public interface BaseDao {
	/**
	 * 根据类和id找到pojo对象
	 * 
	 * @param pojoClass
	 *            Class pojo的类
	 * @param id
	 *            String 唯一标识
	 * @return Object pojo对象
	 * @throws RuntimeException
	 */
	public Object loadById(Class pojoClass, Serializable id) throws RuntimeException;

	/**
	 * 从数据库查询相应列表
	 * 
	 * @param ql
	 *            查询语言
	 * @return Object pojo对象
	 * @throws RuntimeException
	 */
	public List<Object> find(String hql) throws RuntimeException;

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
	 * 插入或更新已有对象
	 * 
	 * @param pojo
	 *            Object 需要插入或更新的对象
	 * @throws RuntimeException
	 */
	public void insertOrUpdate(Object pojo) throws RuntimeException;

	/**
	 * 删除对象
	 * 
	 * @param pojo
	 *            Object 需要删除的对象
	 * @throws RuntimeException
	 */
	public void delete(Object pojo) throws RuntimeException;

	/**
	 * 删除对象，根据id
	 * 
	 * @param pojoClass
	 *            Class 需要删除的对象类
	 * @param id
	 *            String 唯一标识
	 * @throws RuntimeException
	 */
	public void delete(Class pojoClass, Serializable id) throws RuntimeException;

	/**
	 * 删除集合中的全部对象
	 * @param pojoName pojo映射名
	 * @param ids 要删除的ID集合
	 * @throws RuntimeException
	 */
	public void deleteAll(Class pojoName, Long[] ids) throws RuntimeException;

	/**
	 * 查找所有符合条件的记录
	 * @param listQuery 查询条件
	 * @return 查询结果
	 * @throws RuntimeException
	 */
	public List find(ListQuery listQuery) throws RuntimeException;

}
