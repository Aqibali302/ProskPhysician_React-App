package com.dartmouth.pushmail;

import java.sql.SQLException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.util.Date;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import org.apache.commons.lang3.time.DateUtils;
import com.dartmouth.utilities.Utilities;

import javax.swing.text.MaskFormatter;
public class AppointmentSendEmail {

	public static void main(String Email,String Date,String Time,String FirstName,String LastName,String PhoneNo) {
		
		try {
			
		Utilities.sendHTMLEmail(new String[]{Email},null, null, "Appointment Confirmation - Get Ready ", getHTMLMessage(Date,Time,FirstName,LastName,PhoneNo), null);
		System.out.println("Email Sent");
		}catch (Exception e){
			e.printStackTrace();
		}
		
	}
public static String getHTMLMessage(String Date,String Time,String FirstName,String LastName,String PhoneNo) throws ClassNotFoundException, InstantiationException, IllegalAccessException, SQLException{
		

		



	String html = "<html>";
	 String phoneNum=(String.valueOf(PhoneNo).replaceFirst("(\\d{3})(\\d{3})(\\d+)", "($1)-$2-$3"));
	
//	html +="<div style='float:left;margin-left:100px' >";
//	  html +="<p>For your computer or laptop</p>";
//	  html +=" <a href='https://proskcloud.com/ProskPatient/#/' ><img src='https://proskcloud.com/alpha/images/google.png' alt='' style='height:40px' /></a>";
//	   html +="</div>";
		html += "<body style='font-size:12px; font-family: Arial;'>";
	
		html +="<div class='card' style='margin:10px;width:8.17in'>";
				html +="<div class='card-body'>";
		html +="<h4>Dear "+FirstName+" "+LastName+"</h4>";
		  html +="<p>Welcome to our practice.  Thank you for allowing us to serve your orthopedic needs. The following information is provided to ensure a smooth transition to our practice. Your upcoming appointment with Dr. Amer Mirza is on "+Date+" at "+Time+".<br><br>Please complete our intake forms online using the Prosk® Patient Application available on Google Play or Apple Store.</br><br>To verify your login with this application we will use your cell phone; the number we have on record for you is "+phoneNum+". If this number is not correct, please call our office to correct it: 503-850-9940. Using the Prosk® application will speed up the check-in process.</p>";
	
		
		
		  html +="<div>";
		  
		  html +="</div>";
		  html +=" <a href='https://play.google.com/store/apps/details?id=com.proskcloud.patient&hl=en' ><img src='https://proskcloud.com/alpha/images/playstore.png' alt='' style='float:left;height:40px;' /></a>";
		   html +=" <a href='https://apps.apple.com/pk/app/prosk-patient/id1506820183' ><img  src='https://proskcloud.com/alpha/images/apple.png' alt='' style='height:40px;margin-left:20px'  /></a>";
		  
		html +="<br>";
		  html +=" <p >You will need to arrive 15 minutes prior to your appointment to ensure your documents and medical information is complete.  If you have not filled out your medical information via the application, please bring your current insurance and valid photo identification cards with you to the appointment. <br ><br>Please also plan on bringing any required copayments to your office visit as those will be collected at check-out.<br ><br>Thank you and we look forward to meeting you soon.<br><br>-Get Back to Life with Summit Orthopaedics-</p>";
	
		html +="<br>";
		  html +=" <p >Summit Orthopaedics<br>4103 Mercantile Dr<br>Lake Oswego, OR 97035<br>503-850-9940</p>";
		html +="<br>";
		   html +="</div>";
		  html +="</div>";

			
		html += "</body>";
		html+= "</html>";

	
	
	return html;
	}	
	
}
