package net.yanhl.base.action;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import net.yanhl.base.query.ListQuery;
import net.yanhl.base.service.BaseManager;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts.actions.MappingDispatchAction;
import org.displaytag.tags.TableTagParameters;
import org.displaytag.util.ParamEncoder;

public class BaseAction extends MappingDispatchAction {

	Log log = LogFactory.getLog(this.getClass());
	public static final String RESBONSE_ERROR = "error";
	public static final String RESBONSE_SUCCESS = "success";
	public static final String FORWARD_ERROR = "error";
	public static final String FORWARD_SUCCESS = "success";
	public static final String RESULT_COLLECT = "resultList";
	private BaseManager baseManager;

	/** *********************************设置分页-开始*********************************** */
	// 页数的参数名
	String pageIndexName = new ParamEncoder("row").encodeParameterName(TableTagParameters.PARAMETER_PAGE);

	/**
	 * 设置页码
	 * 
	 * @param request
	 */
	protected void setPageIndex(HttpServletRequest request, ListQuery listQuery) {
		listQuery.setPageIndex(request.getParameter(pageIndexName) == null ? 0 : Integer.parseInt(request
				.getParameter(pageIndexName)) - 1);
	}

	/**
	 * 保存分页-总数和结果集
	 * 
	 * @param request
	 * @param result
	 */
	@SuppressWarnings("unchecked")
	protected void savePagination(HttpServletRequest request, List result, Class resultObj) {
		request.setAttribute("resultSize", new Long((Long) result.get(0)).intValue());// 将总记录数保存成Intger实例保存在request中
		List details = (List) result.get(1);// 结果集
		List newList = new ArrayList();// 最终结果
		for (Iterator iter = details.iterator(); iter.hasNext();) {
			Object obj1 = iter.next();
			if(obj1.getClass().getName().equals(resultObj.getName())) {
				request.setAttribute(RESULT_COLLECT, details);//只从一个表中查询数据
				return;
			} else {//从多个表查询数据
				Object[] obj2 = (Object[]) obj1;
				newList.add(obj2[0]);
			}
		}
		request.setAttribute(RESULT_COLLECT, newList);// 把结果存入request
	}

	/** *********************************设置分页-结束*********************************** */

	/**
	 * 设置Attribute
	 * 
	 * @param request
	 * @param name
	 * @param obj
	 */
	protected void setAttribute(HttpServletRequest request, String name, Object obj) {
		request.setAttribute(name, obj);
	}

	/**
	 * 输出到客户端
	 * 
	 * @param response
	 * @param info
	 * @throws IOException
	 */
	protected void print(HttpServletResponse response, String info) throws IOException {
		try {
			response.getOutputStream().print(info);
		} catch (IOException e) {
			e.printStackTrace();
			throw e;
		}
	}

	/**
	 * 读取请求参数解析为JSON数据格式
	 * 
	 * @param request
	 * @return json格式的String对象
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	protected JSONObject readJson(HttpServletRequest request) throws Exception {
		JSONObject jsonObject = new JSONObject();
		try {
			Map<String, String[]> parameterMap = request.getParameterMap();
			Iterator<String> paIter = parameterMap.keySet().iterator();
			while (paIter.hasNext()) {
				String key = paIter.next().toString();
				String[] values = (String[])parameterMap.get(key);
				jsonObject.accumulate(key, values[0]);
			}
			log.debug("从客户端获得json=" + jsonObject.toString());
		} catch (Exception e) {
			log.error("获取json数据出错，错误信息如下：\n\t" + e.getMessage());
			e.printStackTrace();
			throw e;
		}
		return jsonObject;
	}

	public BaseManager getBaseManager() {
		return baseManager;
	}

	public void setBaseManager(BaseManager baseManager) {
		this.baseManager = baseManager;
	}
}