package com.dartmouth.pushmail;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.time.DateUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.dartmouth.pushmail.AppointmentSendEmail;

/**
 * Servlet implementation class SendEmailToPatients
 */
@WebServlet("/SendEmailToPatients")
public class SendEmailToPatients extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SendEmailToPatients() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		

		response.setHeader("Access-Control-Allow-Origin","*");
		// TODO Auto-generated method stub
		PrintWriter out = response.getWriter();
		JSONObject jo = new JSONObject();
		String Email=request.getParameter("email");
		String Date=request.getParameter("date");
		String Time=request.getParameter("time");
		String FirstName=request.getParameter("first_name");
		String LastName=request.getParameter("last_name");
		String PhoneNo=request.getParameter("phone_no");
			try{
				
				AppointmentSendEmail.main(Email,Date,Time,FirstName,LastName,PhoneNo);
				
					jo.put("success", "1");
					out.print(jo);
			
				
			}catch(Exception ex){
				ex.printStackTrace();
				
				
					jo.put("success", "0");
					jo.put("error", ex.getMessage());
					out.print(jo);
					
				
				
			}
			
			
	

	}

}
