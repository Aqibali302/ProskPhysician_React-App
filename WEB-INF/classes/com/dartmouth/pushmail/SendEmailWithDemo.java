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
 * Servlet implementation class SendEmailWithDemo
 */
@WebServlet("/SendEmailWithDemo")
public class SendEmailWithDemo extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SendEmailWithDemo() {
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
		String first_name=request.getParameter("first_name");
		String last_name=request.getParameter("last_name");
		String company=request.getParameter("company");
		String job_title=request.getParameter("job_title");
		String email=request.getParameter("email");
		String phone=request.getParameter("phone");
			try{
				
				DemoSendEmail.main(first_name,last_name,company,job_title,email,phone);
				
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
