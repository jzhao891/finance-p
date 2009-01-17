package net.yanhl.base.query.util;

import org.apache.commons.lang.StringUtils;

public class LogicUtil {

	/**
	 * 分隔查询字段值的空格，组合成多个查询
	 * 例如：name like '%张%' and name like '%宁%'
	 * @param needWhere
	 * @param paramName
	 * @param logic
	 * @param value
	 * @return
	 */
	public static String getLike(boolean needWhere, String paramName, String logic, String value) {
		if(StringUtils.isEmpty(value)) {
			return "";
		}
		String result = "";
		String[] likeQuery = value.split(" ");
		StringBuffer likeFilters = new StringBuffer();
		for (int i = 0; i < likeQuery.length; i++) {
			if(i != 0) {
				likeFilters.append(" and");
			}
			likeFilters.append(" " + paramName + " like '%" + likeQuery[i] + "%'");
		}
		if(needWhere) {
			result = " (" + likeFilters.toString() + ")";
		} else {
			result = " " + logic + " (" + likeFilters.toString() + ")";
		}
		return result;
	}
}
