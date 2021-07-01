package com.dartmouth.pushmail;

import com.dartmouth.utilities.Utilities;

public class DemoSendEmail {
public static void main(String first_name,String last_name,String company,String job_title,String email,String phone) {
		
		try {
			String UserMessage="First Name: "+first_name+"<br> Last Name: "+last_name+"<br> Company: "+company+"<br> Job Title: "+job_title+"<br> Email: "+email+"<br> Phone#: "+phone;
		Utilities.sendHTMLEmail(new String[]{"haseeb.liaqat@gmail.com"},null, null, "User Need Demo", UserMessage, null);
		System.out.println("Email Sent");
		}catch (Exception e){
			e.printStackTrace();
		}
}
}
