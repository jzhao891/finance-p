package net.yanhl.test;

import java.util.Vector;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.processors.JsDateJsonBeanProcessor;

public class Test {
	public static void main(String[] args) {
		JsDateJsonBeanProcessor beanProcessor = new JsDateJsonBeanProcessor();
        java.sql.Date d = new java.sql.Date(System.currentTimeMillis());

        // 直接序列化
        JsonConfig config = new JsonConfig();
        JSONObject json = beanProcessor.processBean(d, config);
        System.out.println(json.toString());
        
        Vector v = new Vector();
        v.add("1");
        v.add("2");
        JSONArray json1 = JSONArray.fromObject(v);
        System.out.println(json1.toString());
	}
}
