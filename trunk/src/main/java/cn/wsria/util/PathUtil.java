package cn.wsria.util;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

/**
 * <p><b>Title：</b>类路径工具</p>
 * <p><b>Description：</b>这个类提供了一些根据类的class文件位置来定位的方法。</p>
 * 
 * @author	闫洪磊
 * @records	<!-- 修改人、时间、内容 -->
 */
public class PathUtil {

	/**
	 * 获取一个Class的绝对路径
	 * @param clazz Class对象
	 * @return Class的绝对路径
	 */
	public static String getPathByClass(Class<?> clazz) {
		String path = null;
		try {
			URI uri = clazz.getResource(".").toURI();
			File file = new File(uri);
			path = file.getCanonicalPath();
		} catch (URISyntaxException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return path;
	}
	
	/**
	 * 获取当前项目的Web根路径
	 * 例如：D:\runchain\projects\rcoa\WebRoot
	 * @return	当前项目的Web根路径
	 */
	public static String getWebRootPath() {
		String pathByClass = getPathByClass(PathUtil.class);
		String rootDirectory = "WebRoot";
		int webRootIndex = pathByClass.indexOf(rootDirectory);
		String classRootPath = pathByClass.substring(0, webRootIndex + rootDirectory.length());
		return classRootPath;
	}
	
	/**
	 * 获取当前项目的Classes根路径
	 * 例如：D:\runchain\projects\rcoa\WebRoot\WEB-INF\classes
	 * @return	当前项目的Classes根路径
	 */
	public static String getClassRootPath() {
		String pathByClass = getPathByClass(PathUtil.class);
		String classesDirectory = "classes";
		int classesRootIndex = pathByClass.indexOf(classesDirectory);
		String classRootPath = pathByClass.substring(0, classesRootIndex + classesDirectory.length());
		return classRootPath;
	}

	/**
	 * 获取一个文件相对于一个Class相对的绝对路径
	 * @param clazz Class对象
	 * @param relativePath Class对象的相对路径
	 * @return 文件绝对路径
	 */
	public static String getFilePathByClass(Class<?> clazz, String relativePath) {
		String filePath = null;
		String clazzPath = getPathByClass(clazz);
		StringBuffer sbPath = new StringBuffer(clazzPath);
		sbPath.append(File.separator);
		sbPath.append(relativePath);
		File file = new File(sbPath.toString());
		try {
			filePath = file.getCanonicalPath();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return filePath;
	}

	public static void main(String[] args) {
		try {
			System.out.println(getWebRootPath());
			System.out.println(getPathByClass(PathUtil.class));
			System.out.println(getFilePathByClass(PathUtil.class, "../../images/logo.gif"));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}