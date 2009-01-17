package test;

import net.yanhl.iouser.pojo.Iouser;
import net.yanhl.util.StringUtil;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

public class TestHibernate {
	private Session session = null;

	public TestHibernate() {
		this.session = HibernateSessionFactory.getSession();
	}

	public void addIouser(Iouser user) {
		Transaction tran = null;
		try {
			tran = session.beginTransaction();
			session.save(user);
			tran.commit();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void findTest() {
		Transaction tran = null;
		try {
			tran = session.beginTransaction();
			Query query = session.createQuery("select count(*) from net.yanhl.finance.pojo.FinanceMoneyDetail o where o.creatorId=1 and loanDate>=:loanDate");
			java.text.SimpleDateFormat sftime = new java.text.SimpleDateFormat(StringUtil.FORMAT_DATE);
			query.setDate("loanDate", sftime.parse("2008-10-31"));
			String[] namedParameters = query.getNamedParameters();
			System.out.println("getNamedParameters=" + namedParameters[0]);
			System.out.println(query.list());
			tran.commit();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void main(String[] args) {
		TestHibernate th = new TestHibernate();
		th.findTest();
//		Iouser user = new Iouser();
//		user.setId(46l);
//		user.setAge(34);
//		user.setUserName("测试1");
//		th.addIouser(user);
		
	}
}
