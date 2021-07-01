package com.dartmouth.pushmail;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

/**
 * Servlet implementation class SendBrochureToPatient
 */
@WebServlet("/SendBrochureToPatient")
public class SendBrochureToPatient extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SendBrochureToPatient() {
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
			try{
				
				BrochureSendEmail.main(Email);
				
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
