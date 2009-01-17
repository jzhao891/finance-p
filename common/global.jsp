<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*,net.yanhl.user.pojo.*,net.yanhl.util.*,org.apache.commons.lang.StringUtils" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/tags/struts-html" prefix="html" %>
<%@ taglib uri="/tags/struts-logic" prefix="logic" %>
<%@ taglib uri="/tags/struts-bean" prefix="bean" %>
<%@ taglib uri="/tags/displayTag" prefix="display" %>
<!-- 定义常、变量 -->
<%
String siteName = "账务管理系统";
String pageSize = "10";
%>
<%
pageContext.setAttribute("pageSize",pageSize);
%>