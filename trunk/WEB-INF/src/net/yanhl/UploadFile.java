package net.yanhl;

import java.io.File;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.yanhl.base.action.BaseAction;

import org.apache.commons.fileupload.DiskFileUpload;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

public class UploadFile extends BaseAction {

	public ActionForward upload(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		response.setContentType("text/html;charset=UTF-8");
		PrintWriter out = response.getWriter();
		int contentLength = request.getContentLength();
		System.out.println("contentLength=" + contentLength);
		// 设置保存上传文件的目录
		String uploadDir = "d:\\";
		if (uploadDir == null) {
			out.println("无法访问存储目录！");
			
		}
		File fUploadDir = new File(uploadDir);
		if (!fUploadDir.exists()) {
			if (!fUploadDir.mkdir()) {
				out.println("无法创建存储目录!");
				
			}
		}

		if (!DiskFileUpload.isMultipartContent(request)) {
			out.println("只能处理multipart/form-data类型的数据!");
			
		}

		DiskFileUpload fu = new DiskFileUpload();
		// 最多上传200M数据
		fu.setSizeMax(1024 * 1024 * 200);
		// 超过1M的字段数据采用临时文件缓存
		fu.setSizeThreshold(1024 * 1024);
		// 采用默认的临时文件存储位置
		// fu.setRepositoryPath(...);
		// 设置上传的普通字段的名称和文件字段的文件名所采用的字符集编码
		fu.setHeaderEncoding("gb2312");

		// 得到所有表单字段对象的集合
		List fileItems = null;
		try {
			fileItems = fu.parseRequest(request);
		} catch (FileUploadException e) {
			out.println("解析数据时出现如下问题：");
			e.printStackTrace(out);
			
		}

		// 处理每个表单字段
		Iterator i = fileItems.iterator();
		while (i.hasNext()) {
			FileItem fi = (FileItem) i.next();
			if (fi.isFormField()) {
				String content = fi.getString("UTF-8");
				String fieldName = fi.getFieldName();
				request.setAttribute(fieldName, content);
			} else {
				try {
					String pathSrc = fi.getName();
					/*
					 * 如果用户没有在FORM表单的文件字段中选择任何文件， 那么忽略对该字段项的处理
					 */
					if (pathSrc.trim().equals("")) {
						continue;
					}
					int start = pathSrc.lastIndexOf('\\');
					String fileName = pathSrc.substring(start + 1);
					File pathDest = new File(uploadDir, fileName);

					fi.write(pathDest);
					String fieldName = fi.getFieldName();
					request.setAttribute(fieldName, fileName);
				} catch (Exception e) {
					out.println("存储文件时出现如下问题：");
					e.printStackTrace(out);
					
				} finally // 总是立即删除保存表单字段内容的临时文件
				{
					fi.delete();
				}

			}
		}

		return null;
	}

}
