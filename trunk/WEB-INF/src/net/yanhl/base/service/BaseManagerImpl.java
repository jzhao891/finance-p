package net.yanhl.base.service;

import java.util.List;

import net.yanhl.base.dao.BaseDao;
import net.yanhl.base.query.ListQuery;
import net.yanhl.base.query.util.QueryUtil;

/**
 * <p>
 * Title: 基础业务接口实现类
 * </p>
 * <p>
 * Description:
 * </p>
 * <p>
 * Copyright: Copyright (c) 2008
 * </p>
 * 
 * @author 闫洪磊
 * @version 1.0.0.20080706
 */
public class BaseManagerImpl implements BaseManager {

	protected BaseDao baseDao;

	public void setBaseDao(BaseDao baseDao) {
		this.baseDao = baseDao;
	}

	public void delete(Class pojo, long id) throws RuntimeException {
		baseDao.delete(pojo);
	}

	public Object get(Class pojoClass, long id) throws RuntimeException {
		return baseDao.loadById(pojoClass, id);
	}

	public void insertOrUpdate(Object pojo) throws RuntimeException {
		baseDao.insertOrUpdate(pojo);
	}

	public void save(Object pojo) throws RuntimeException {
		baseDao.save(pojo);
	}

	public void update(Object pojo) throws RuntimeException {
		baseDao.update(pojo);
	}

	public void deleteAll(Class pojoName, String[] ids) throws RuntimeException {
		Long[] longIds = new Long[ids.length];
		for (int i = 0; i < ids.length; i++) {
			longIds[i] = Long.parseLong(ids[i]);
		}
		baseDao.deleteAll(pojoName, longIds);
	}

	public List find(ListQuery queryUtil) throws RuntimeException {
		return baseDao.find(queryUtil);
	}

}
