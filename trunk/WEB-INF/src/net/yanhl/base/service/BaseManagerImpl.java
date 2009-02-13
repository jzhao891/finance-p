package net.yanhl.base.service;

import java.util.List;

import net.yanhl.base.dao.BaseDao;
import net.yanhl.base.query.ListQuery;

/**
 * <p>Title: 基础业务接口实现类</p>
 * <p>Description: </p>
 * @author	闫洪磊
 * @version	1.0.0.20080706
*/
public class BaseManagerImpl implements BaseManager {

	protected BaseDao baseDao;

	public void setBaseDao(BaseDao baseDao) {
		this.baseDao = baseDao;
	}

	/* (non-Javadoc)
	 * @see net.yanhl.base.service.BaseManager#delete(java.lang.Class, long)
	 */
	public void delete(Class pojo, long id) throws RuntimeException {
		baseDao.delete(pojo);
	}

	/* (non-Javadoc)
	 * @see net.yanhl.base.service.BaseManager#get(java.lang.Class, long)
	 */
	public Object get(Class pojoClass, long id) throws RuntimeException {
		return baseDao.loadById(pojoClass, id);
	}

	/* (non-Javadoc)
	 * @see net.yanhl.base.service.BaseManager#insertOrUpdate(java.lang.Object)
	 */
	public void insertOrUpdate(Object pojo) throws RuntimeException {
		baseDao.insertOrUpdate(pojo);
	}

	/* (non-Javadoc)
	 * @see net.yanhl.base.service.BaseManager#save(java.lang.Object)
	 */
	public void save(Object pojo) throws RuntimeException {
		baseDao.save(pojo);
	}

	/* (non-Javadoc)
	 * @see net.yanhl.base.service.BaseManager#update(java.lang.Object)
	 */
	public void update(Object pojo) throws RuntimeException {
		baseDao.update(pojo);
	}

	/* (non-Javadoc)
	 * @see net.yanhl.base.service.BaseManager#deleteAll(java.lang.Class, java.lang.String[])
	 */
	public void deleteAll(Class pojoName, String[] ids) throws RuntimeException {
		Long[] longIds = new Long[ids.length];
		for (int i = 0; i < ids.length; i++) {
			longIds[i] = Long.parseLong(ids[i]);
		}
		baseDao.deleteAll(pojoName, longIds);
	}

	/* (non-Javadoc)
	 * @see net.yanhl.base.service.BaseManager#find(net.yanhl.base.query.ListQuery)
	 */
	public List find(ListQuery queryUtil) throws RuntimeException {
		return baseDao.find(queryUtil);
	}

}
