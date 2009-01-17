package net.yanhl.talk.dao;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import net.yanhl.base.dao.BaseDaoHibernate;
import net.yanhl.base.query.ListQuery;
import net.yanhl.talk.pojo.Talk;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;

/**
 * <p>Title: 聊天室DAO实现类</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2008</p>
 * 
 * @author 闫洪磊
 * @version 1.0.0.20080716
 */
public class TalkDaoImpl extends BaseDaoHibernate implements TalkDao {
	
	public List<Talk> getMsg(ListQuery listQuery) {
		return null;
	}

	@SuppressWarnings("unchecked")
	public List<Talk> getMsg(final String userId,final Date lastDate) {
		return (List<Talk>) getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				return session.createQuery("from Talk where msgDate>:msgDate and user_id!=:userId order by msgDate")
				.setTimestamp("msgDate", new Timestamp(lastDate.getTime()))
				.setLong("userId", Long.parseLong(userId))
				.list();
			}
		});
	}

}
