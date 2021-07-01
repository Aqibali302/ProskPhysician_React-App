package com.dartmouth.pushmail;

import java.sql.SQLException;

import com.dartmouth.utilities.Utilities;

public class BrochureSendEmail {
	public static void main(String Email) {
		
		try {
			String filname[]= new String[1];
			filname[0]="final.pdf";
		Utilities.sendHTMLEmailWithImage(new String[]{Email},null, null, "Appointment Confirmation - Get Ready ", getHTMLMessage(), filname);
		System.out.println("Email Sent");
		}catch (Exception e){
			e.printStackTrace();
		}
		
	}
public static String getHTMLMessage() throws ClassNotFoundException, InstantiationException, IllegalAccessException, SQLException{
		

		
	
		String html = "<html>";
		html += "<body style='font-size:12px; font-family: Arial;'>";
	
		html +="<div class='card' style='margin:10px;width:8.17in'>";
				html +="<div class='card-body'>";
		html +="<h1>Prosk Brochure!</h1>";
		  html +="<br>";
		  
		  
		   html +="</div>";
		  html +="</div>";

			
		html += "</body>";
		html+= "</html>";
		return html;
		
	}	
	
}
