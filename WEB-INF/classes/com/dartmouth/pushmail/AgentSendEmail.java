package com.dartmouth.pushmail;

import java.sql.SQLException;

import com.dartmouth.utilities.Utilities;

public class AgentSendEmail {
public static void main(String Email,String Message) {
		
		try {
			String UserMessage="User Email: "+Email+"<br> User Message: "+Message;
		Utilities.sendHTMLEmail(new String[]{"haseeb.liaqat@gmail.com"},null, null, "User Need Help", UserMessage, null);
		System.out.println("Email Sent");
		}catch (Exception e){
			e.printStackTrace();
		}
}	
	}
