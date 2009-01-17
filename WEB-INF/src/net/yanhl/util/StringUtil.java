package net.yanhl.util;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;

public class StringUtil {

	public final static String FORMAT_DATE = "yyyy-MM-dd";
	public final static String FORMAT_DATETIME = "yyyy-MM-dd HH:mm:ss";
	/**
	 * 判断数组strs中是否有str这个值
	 * 
	 * @param strs
	 * @param str
	 * @return 有true 没有false
	 */
	public static boolean hasInArray(String[] strs, String str) {
		for (String tmp : strs) {
			if (tmp.equals(str)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 逐个判断数组names中的每个字符串是否为空
	 * 
	 * @param names
	 * @return 有一个为空true 都不为空 false
	 */
	public static boolean isEmpty(String[] names) {
		if(names == null) return true;
		for (String name : names) {
			if (StringUtils.isEmpty(name)) {
				return true;
			} else {
				continue;
			}
		}
		return false;
	}

	/**
	 * 逐个判断数组names中的每个字符串是否为空
	 * 
	 * @param names
	 * @return 有一个为空true 都不为空 false
	 */
	public static boolean isEmpty(Object[] names) {
		for (Object name : names) {
			if (StringUtils.isEmpty(name.toString())) {
				return true;
			} else {
				continue;
			}
		}
		return false;
	}

	/**
	 * 判断字符串是不是为空，返回处理后的字符串 可以根据需要截取一定长度的字符串
	 * 
	 * @maxLength 0表示不截取，返回全部字符串 当maxLength>0时返回截取长度的字符串
	 * 
	 */
	public static String getValue(String srcValue, int maxLength) {
		if (srcValue == null || srcValue.toString().equals(""))
			return "";
		if (maxLength > 0 && srcValue.toString().length() > maxLength) {
			return srcValue.toString().substring(0, maxLength);
		} else {
			return srcValue.toString();
		}
	}

	/**
	 * 如果字符串为null或者空串返回空""
	 * 	否则直接返回
	 * @param srcValue
	 * @return 处理后的值
	 */
	public static String getValue(String srcValue) {
		if (srcValue == null || srcValue.toString().equals(""))
			return "";
		return srcValue;
	}
	
	public static int getIntValue(String srcValue) {
		if (srcValue == null || srcValue.toString().equals(""))
			return 0;
		return Integer.parseInt(srcValue);
	}

	public static int getIntValue(HttpServletRequest request, String srcValue) {
		return getIntValue(request.getParameter(srcValue));
	}
	
	public static long getLongValue(String srcValue) {
		if (srcValue == null || srcValue.toString().equals(""))
			return 0;
		return Integer.parseInt(srcValue);
	}

	public static long getLongValue(HttpServletRequest request, String srcValue) {
		return getLongValue(request.getParameter(srcValue));
	}
	
	public static double getDoubleValue(String srcValue) {
		if (srcValue == null || srcValue.toString().equals(""))
			return 0;
		return Double.parseDouble(srcValue);
	}

	public static double getDoubleValue(HttpServletRequest request, String srcValue) {
		return getDoubleValue(request.getParameter(srcValue));
	}
	
	/**
	 * 获得前台请求参数
	 * @param request
	 * @param requestKey
	 * @return srcValue参数对应的值
	 */
	public static String getValue(HttpServletRequest request, String requestKey) {
		String decode = null;
		try {
			String sourceValue = getValue(request.getParameter(requestKey));
			decode = URLDecoder.decode(sourceValue, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return decode;
	}
	
	/**
	 * 获得字符串数组的值
	 * 	以逗号分隔
	 * @param srcArray
	 * @return 以逗号分隔的值
	 */
	public static String getValue(String[] srcArray) {
		StringBuffer result = new StringBuffer();
		for (int i = 0; i < srcArray.length; i++) {
			result.append(srcArray[i] + ",");
		}
		return deleteComma(result.toString());
	}

	/**
	 * @dateValue 日期对象，可以是java.util.Date和java.sql.Date
	 * @dateType 格式化的类型,date和datetime
	 */
	public static String getValue(Object dateValue, String dateType) {
		if (dateValue == null)
			return "";
		if (dateValue instanceof java.sql.Date) {
			return dateValue.toString();
		} else if (dateValue instanceof java.util.Date) {
			if (dateType.equals("date")) {
				java.text.SimpleDateFormat sfdate = new java.text.SimpleDateFormat(FORMAT_DATE);
				return sfdate.format(dateValue);
			} else if (dateType.equals("datetime")) {
				java.text.SimpleDateFormat sftime = new java.text.SimpleDateFormat(FORMAT_DATETIME);
				return sftime.format(dateValue);
			} else {
				return "非法日期格式[" + dateType + "]";
			}
		} else {
			return "非日期类型";
		}
	}
	
	/**
	 * 用字符串获得日期
	 * @throws ParseException 
	 * @dateValue 日期字符串
	 * @dateType 格式化的类型,date和datetime
	 */
	public static Date getDate(String dateValue, String dateType) throws ParseException {
		if (dateValue == null)
			return null;
		if (dateType.equals("date")) {
			SimpleDateFormat sfdate = new SimpleDateFormat(FORMAT_DATE);
			return sfdate.parse(dateValue);
		} else if (dateType.equals("datetime")) {
			SimpleDateFormat sftime = new SimpleDateFormat(FORMAT_DATETIME);
			return sftime.parse(dateValue);
		}
		return null;
	}
	
	/**
	 * 用字符串获得java.sql.Date日期
	 * @throws ParseException 
	 * @dateValue 日期字符串
	 * @dateType 格式化的类型,date和datetime
	 */
	public static java.sql.Date getSqlDate(String dateValue, String dateType) throws ParseException {
		Date date = getDate(dateValue, dateType);
		if(date == null) {
			return null;
		}
		return new java.sql.Date(date.getTime());
	}

	/**
	 * 删除字符串最后的逗号
	 * @param src
	 * @return
	 */
	public static String deleteComma(String src) {
		src = getValue(src);
		if (!src.endsWith(",")) {
			return src;
		}
		src = src.substring(0, src.length() - 1);
		return src;
	}
}
