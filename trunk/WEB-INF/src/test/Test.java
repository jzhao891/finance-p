package test;

import java.text.DecimalFormat;

public class Test {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		float a = 999.3599f;
		// 这里控制小数点后几位
		DecimalFormat df = new DecimalFormat("#.00");
		System.out.println(df.format(a));
		
		System.out.println("****************");
		String value = "<span id='d1'>span中的内容</span>";
		value = value.substring(value.indexOf(">") + 1);
		System.out.println(value.substring(0, value.indexOf("</span>")));
		String tt = "12345678";
		System.out.println(tt.substring(tt.length()-4));
	}

}
