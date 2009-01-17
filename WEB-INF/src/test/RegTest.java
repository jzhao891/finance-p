/**
 * 
 */
package test;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author Administrator
 *
 */
public class RegTest {
	public static void main(String[] args) throws Exception {
//		BufferedReader bis = new BufferedReader(new InputStreamReader(System.in));
//		String sourceString = "";
//		while(true) {
//			String tmp = bis.readLine();
//			if(tmp.equals("end")) {
//				break;
//			}
//			sourceString += tmp;
//		}
//		 
//		Pattern pattern = Pattern.compile("\r\n");
//		Matcher matcher = pattern.matcher(sourceString);
//		//替换第一个符合正则的数据
//		System.out.println(matcher.replaceAll("\r\n"));
		System.out.println("my<br/>you".replaceAll("<br/>", "and"));
		
		String oldStr = "测试第#info个数据";
		System.out.println(oldStr.replaceAll("#info", "3"));
	}
}
