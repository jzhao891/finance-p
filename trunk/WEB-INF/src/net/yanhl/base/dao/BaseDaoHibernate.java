package net.yanhl.base.dao;

import java.io.Serializable;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import net.yanhl.base.query.ListQuery;
import net.yanhl.base.query.util.QueryUtil;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

/**
 * <p>
 * Title: 基础DAO实现类
 * </p>
 * <p>
 * Description:
 * </p>
 * <p>
 * Copyright: Copyright (c) 2008
 * </p>
 * 
 * @author 闫洪磊
 * @version 1.0.0.20080703
 */
public class BaseDaoHibernate extends HibernateDaoSupport implements BaseDao {

	public void delete(Object pojo) throws RuntimeException {
		getHibernateTemplate().delete(pojo);
	}

	@SuppressWarnings("unchecked")
	public void delete(Class pojoClass, Serializable id) throws RuntimeException {
		getHibernateTemplate().delete(loadById(pojoClass, id));
	}

	@SuppressWarnings("unchecked")
	public List find(String hql) throws RuntimeException {
		return getHibernateTemplate().find(hql);
	}

	public void save(Object pojo) throws RuntimeException {
		getHibernateTemplate().save(pojo);
	}

	@SuppressWarnings("unchecked")
	public Object loadById(Class pojoClass, Serializable id) throws RuntimeException {
		return getHibernateTemplate().get(pojoClass, id);
	}

	public void update(Object pojo) throws RuntimeException {
		getHibernateTemplate().update(pojo);
	}

	public void insertOrUpdate(Object pojo) throws RuntimeException {
		getHibernateTemplate().saveOrUpdate(pojo);
	}

	@SuppressWarnings("unchecked")
	public void deleteAll(final Class pojoName, final Long[] ids) throws RuntimeException {
		getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				Query deleteQuery = session.createQuery("delete from " + pojoName.getName() + " where id in(:ids)");
				deleteQuery.setParameterList("ids", ids);
				int dels = deleteQuery.executeUpdate();
				return dels;
			}

		});
	}

	@SuppressWarnings("unchecked")
	public List find(final ListQuery listQuery) throws RuntimeException {
		final QueryUtil queryUtil = new QueryUtil();
		queryUtil.setListQuery(listQuery);
		final List result = new ArrayList();
		return getHibernateTemplate().executeFind(new HibernateCallback() {
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				try {
					queryUtil.setCommonQuery(session);
					queryUtil.setListCountQuery(session);
					result.add(queryUtil.getListCount());
					queryUtil.setResultListQuery(session);
					result.add(queryUtil.getResultColl());
				} catch (ParseException e) {
					e.printStackTrace();
				}
				return result;
			}
		});
	}

}
