package com.dartmouth.utilities;

import javax.servlet.http.HttpServletRequest;




import org.apache.commons.lang3.time.DateUtils;

import java.util.Calendar;
import java.util.Date;
import java.util.Random;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.apache.commons.mail.*;



/**
 * It is a collection of tools and utilities necessary to development of any component in this product
 *
 */
public class Utilities {

	
	
	public static String CompanyName = "";

	/**
	 * 
	 * It is used to check authorization of a user for a specific feature. It maintains a log of all authorization checks (failed or authorized) in logs database.  
	 * 
	 * @param FeatureID
	 * @param UserID
	 * @return
	 * @throws ClassNotFoundException
	 * @throws InstantiationException
	 * @throws IllegalAccessException
	 * @throws SQLException
	 */


	
	/**
	 * It converts bottles into cases and returns in a standard format i.e. (cases~bottles)
	 * 
	 * @param units
	 * @param UnitsPerSKU
	 * @return
	 */
	public static String getSQLString(String val){
	
		if(val==null || val.equals("")){
			return null;
		}else{
			return "'" +  val + "'";
		}
	}
	
	public static String convertToRawCases(long units, int UnitsPerSKU) {

		String ret = "";
		if (UnitsPerSKU != 0) {
			double RawCasesDouble = (double) units / (double) UnitsPerSKU;
			String RawCasesString = RawCasesDouble + "";
			if (RawCasesString.indexOf(".") != -1) {
				RawCasesString = RawCasesString.substring(0,
						RawCasesString.indexOf("."));
			}
			long RawCases = Utilities.parseLong(RawCasesString);

			long RawCasesUnits = RawCases * UnitsPerSKU;

			long bottles = units - RawCasesUnits;

			if (bottles == 0) {
				ret = getDisplayCurrencyFormat(RawCases) + "";
			} else {
				ret = getDisplayCurrencyFormat(RawCases) + "~" + bottles;
			}
		}
		return ret;
	}
	
	
	
	/**
	 * It converts bottles into cases and returns in a standard format i.e. (cases~bottles) with negative figure in brackets
	 * @param units
	 * @param UnitsPerSKU
	 * @return
	 */
	public static String convertToRawCasesAccounting(long units, int UnitsPerSKU) {

		  boolean IsNegative=false;
		  if(units<0) {
			  units = units*-1;
			  IsNegative = true;
		  }
		  
		  String ret = "";
		  if (UnitsPerSKU != 0) {
			  double RawCasesDouble = (double) units / (double) UnitsPerSKU;
			  String RawCasesString = RawCasesDouble + "";
			  if (RawCasesString.indexOf(".") != -1) {
				  RawCasesString = RawCasesString.substring(0,
						  RawCasesString.indexOf("."));
			  }
			  long RawCases = Utilities.parseLong(RawCasesString);

			  long RawCasesUnits = RawCases * UnitsPerSKU;

			  long bottles = units - RawCasesUnits;

			  if (bottles == 0) {
				  ret = getDisplayCurrencyFormat(RawCases) + "";
			  } else {
				  ret = getDisplayCurrencyFormat(RawCases) + "~" + bottles;
			  }
		  }
		  
		  if(IsNegative){
			  ret = "("+ret+")";
		  }
		  	return ret;
		 }	
	
	/**
	 * It formats cases and bottles into standard format (i.e. cases~bottles)
	 * @param RawCase
	 * @param Units
	 * @return
	 */
	public static String formatCasesAndUnits(long RawCase, long Units){
		return RawCase + "~" + Units;
	}
	
	/**
	 * It converts bottles into cases and bottles, returns both in an array of long[]
	 *
	 * 
	 * @param units
	 * @param UnitsPerSKU
	 * @return
	 */
	public static long[] getRawCasesAndUnits(long units, int UnitsPerSKU) {

		long ret[] = new long[2];
		if (UnitsPerSKU != 0) {
			double RawCasesDouble = (double) units / (double) UnitsPerSKU;
			String RawCasesString = RawCasesDouble + "";
			if (RawCasesString.indexOf(".") != -1) {
				RawCasesString = RawCasesString.substring(0,
						RawCasesString.indexOf("."));
			}
			long RawCases = Utilities.parseLong(RawCasesString);

			long RawCasesUnits = RawCases * UnitsPerSKU;

			long bottles = units - RawCasesUnits;

			ret[0] = RawCases;
			ret[1] = bottles;
			
		}
		return ret;
	}

	
	/**
	 * Returns company name to display on documents and reports
	 * 
	 * @return
	 */
	public static String getCompanyName() {
		return CompanyName;
	}

	/**
	 * 
	 * Used in all User Inputs to filter special characters for SQL Injection attacks etc
	 * Level 0 = Number
	 * Level 1 = Normal filter for String
	 * Level 2 = Strict filter for String
	 * 
	 * @param val
	 * @param level
	 * @param maxLength
	 * @return
	 */
	public static String filterString(String val, int level, int maxLength) { //

		String ret = val;

		if (val != null) {

			// Truncate to maximum length
			if (val.length() > maxLength) {
				ret = val.substring(0, maxLength);
			}

			switch (level) {

			case 0: // Level 0 - Numbers Only
				if (!ret.matches("^[0-9,./-]+$")) {
					ret = "0";
				}

				break;

			case 1: // Level 1 - Minimum

				char Reserved[] = { '\'', '\"', '\\' };
				char Replacement[] = { '`', '`', '/' };

				int ct = 0;
				for (char iReserved : Reserved) {
					ret = ret.replace(iReserved, Replacement[ct]);
					ct++;
				}

				break;

			case 2: // Level 2 - Moderate

				char Reserved2[] = { '\'', '\"', '\\', '<', '>', '+', '=' };
				char Replacement2[] = { '`', '`', '/', ' ', ' ', ' ', '=' };

				int ct2 = 0;
				for (char iReserved2 : Reserved2) {
					ret = ret.replace(iReserved2, Replacement2[ct2]);
					ct2++;
				}

				break;

			}

		}

		return ret;
	}

	/**
	 * Used in all User Inputs to filter special characters for SQL Injection attacks etc
	 * Level 0 = Array of Number
	 * Level 1 = Normal filter for Array of String
	 * Level 2 = Strict filter for Array of String
 
	 * @param val
	 * @param level
	 * @param maxLength
	 * @return
	 */
	public static String[] filterString(String val[], int level, int maxLength) { //
		if(val == null){
			return null;
		}
		String ret[] = new String[val.length];

		for (int i = 0; i < val.length; i++) {
			ret[i] = filterString(val[i], level, maxLength);
		}

		return ret;
	}

	/**
	 * To get the URL for standard error page
	 * @param request
	 * @return
	 */
	public static String getErrorPageURL(HttpServletRequest request) {
		return request.getContextPath() + "/GeneralException.jsp";
	}
	
	/**
	 * To get URL for Access Denied page to show when user is not authorized
	 * @param request
	 * @return
	 */
	public static String getAccessDeniedPageURL(HttpServletRequest request) {
		return request.getContextPath() + "/AccessDenied.jsp";
	}

	/**
	 * To get URL for Session Expiry page to show when session is expired
	 * 
	 * @param request
	 * @return
	 */
	public static String getSessionExpiredPageURL(HttpServletRequest request) {
		return request.getContextPath() + "/SessionExpired.jsp";
	}

	/**
	 * To get Picture URL of a User ID
	 * 
	 * @param UserID
	 * @param request
	 * @return
	 */
	public static String getUserPictureURL(long UserID,
			HttpServletRequest request) {
		return request.getContextPath() + "/images/UserPictures/" + UserID
				+ ".png";
	}

	
	/**
	 * To get path for Workflow Attachments
	 * @return
	 */
	public static String getWorkflowAttachmentsPath() {
		return "/home/ftpshared/WorkflowAttachments";
		
	}
	
	/**
	 * To get path for image resources
	 * @return
	 */
	public static String getImageResoucesPath() {
		//return "d:\\PBC\\GitHub\\Theia\\portal\\WebContent\\images";
		return "/Users/anaswhb/Documents/Eclipse/Workspace/portal/WebContent/images";
		
	}
	
	
	
	/**
	 * To get patch for email attachments
	 * @return
	 */
	public static String getEmailAttachmentsPath() {
		//return "d:\\PBC";
		return "/Users/anaswhb/Documents/Eclipse/Workspace";
		
	}
	
	
	/**
	 * To get path for images stored against orders
	 * @return
	 */
	public static String getOrderImagesPath() {
		return "/home/ftpshared/OrderImages";
	}
	
	/**
	 * To get path for CRM attachments
	 * @return
	 */
	public static String getComplaintAttachmentsPath() {
		return "/home/ftpshared/WorkflowAttachments";
	}
	
	/**
	 * Converts a String in MMM/dd/yyyy into a Date object.
	 * @param val
	 * @return
	 */
	public static Date parseDate(String val) {

		Date d = null;

		if (val != null && !val.equals("0")) {
			SimpleDateFormat format = new SimpleDateFormat("MMM/dd/yyyy");
			try {
				d = format.parse(val);
			} catch (ParseException e) {
			}
		}

		return d;

	}
	public static Date parseDateMMDDYYYY(String val) {

		Date d = null;

		if (val != null && !val.equals("0")) {
			SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy");
			try {
				d = format.parse(val);
			} catch (ParseException e) {
			}
		}

		return d;

	}	
	public static Date parseDateTimeMMDDYYYY(String val) {

		Date d = null;

		if (val != null && !val.equals("0")) {
			SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy hh:mm a");
			try {
				d = format.parse(val);
			} catch (ParseException e) {
			}
		}

		return d;

	}
	/**
	 * Converts a String in yyyy-MM-dd into a Date object.
	 * @param val
	 * @return
	 */
	public static Date parseDateYYYYMMDD(String val) {

		Date d = null;

		if (val != null && !val.equals("0")) {
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			try {
				d = format.parse(val);
			} catch (ParseException e) {
			}
		}

		return d;

	}
	/**
	 * Converts a String in yyyyMMdd into a Date object.
	 * @param val
	 * @return
	 */
	public static Date parseDateYYYYMMDDWithoutSeparator(String val) {

		Date d = null;

		if (val != null && !val.equals("0")) {
			SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
			try {
				d = format.parse(val);
			} catch (ParseException e) {
			}
		}

		return d;

	}

	/**
	 * Converts a String in dd/MM/yyyy, provided hour and minute into a Date object.
	 * 
	 * @param val
	 * @param hour
	 * @param minute
	 * @return
	 */
	public static Date parseDateTime(String val, int hour, int minute) {

		Date d = null;
		val = val + " " + hour + ":" + minute;
		if (val != null && !val.equals("0")) {
			SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy hh:mm");
			try {
				d = format.parse(val);
			} catch (ParseException e) {
			}
		}

		return d;

	}

	/**
	 * Converts a String in dd/MM/yyyy HH:mm into a Date object.
	 * @param val
	 * @return
	 */
	public static Date parseDateTime(String val) {

		Date d = null;
		if (val != null && !val.equals("0")) {
			SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy HH:mm");
			try {
				d = format.parse(val);
			} catch (ParseException e) {
			}
		}

		return d;

	}
	
	
	/**
	 * To get date as string to embed in MySQL Query
	 * @param val
	 * @return
	 */
	public static String getSQLDate(Date val) {
		
		if (val != null) {

			SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd");
			return "'" + format.format(val) + "'";

		} else {

			return null;

		}

	}
	public static String getSQLTime(Date val) {
		
		if (val != null) {

			SimpleDateFormat format = new SimpleDateFormat("HH:mm:ss");
			return "'" + format.format(val) + "'";

		} else {

			return null;

		}

	}
	
	/**
	 * To get date as string to embed in Oracle Query
	 * @param val
	 * @return
	 */
	public static String getSQLDateOracle(Date val) {
		
		if (val != null) {

			SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
			return "'" + format.format(val) + "'";

		} else {

			return null;

		}

	}
	
	
	/**
	 * To get date as string to embed in Oracle Query without single quotes
	 * @param val
	 * @return
	 */
	public static String getSQLDateWithoutQuotes(Date val) {
		
		if (val != null) {

			SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd");
			return format.format(val);

		} else {

			return null;

		}

	}
	
	/**
	 * To get date in lifting day boundaries as string to embed in MySQL Query
	 * @param val
	 * @return
	 */
	public static String getSQLDateLifting(Date val) {
		
		// Converts date into sql format and ignores time

		if (val != null) {

			SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd");
			return "date_format('" + format.format(val) + " 6:00','%Y-%m-%d %H:%i')";

		} else {

			return null;

		}

	}

	/**
	 * To get date and time as string to embed in MySQL Query
	 * @param val
	 * @return
	 */
	public static String getSQLDateTime(Date val) {
		
		if (val != null) {

			SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd H:mm");
			return "date_format('" + format.format(val)
					+ "', '%Y-%m-%d %H:%i')";

		} else {

			return null;

		}

	}

	/**
	 * To get date and time as string to embed in MySQL Query, it reduces one minute from date
	 * @param val
	 * @return
	 */
	public static String getSQLFromDateTime(Date val) {
		
		// Reduces 1 minute from date and converts into query format (suited for "between")
		
		if (val != null) {

			SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd H:mm");

			Calendar cal = Calendar.getInstance();
			cal.setTime(val);
			cal.add(Calendar.MINUTE, -1);

			return "date_format('" + format.format(cal.getTime())
					+ "', '%Y-%m-%d %H:%i')";

		} else {

			return null;

		}

	}

	/**
	 * To get date and time as string to embed in MySQL Query, it adds one minute into date
	 * @param val
	 * @return
	 */
	public static String getSQLToDateTime(Date val) {
		
		// Adds 1 minute to date and converts into query format (suited for "between")
		
		if (val != null) {

			SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd H:mm");

			Calendar cal = Calendar.getInstance();
			cal.setTime(val);
			cal.add(Calendar.MINUTE, +1);

			return "date_format('" + format.format(cal.getTime())
					+ "', '%Y-%m-%d %H:%i')";

		} else {

			return null;

		}

	}

	/**
	 * To get date as string to embed in MySQL Query, it adds one day into date
	 * @param val
	 * @return
	 */
	public static String getSQLDateNext(Date val) {

		
		// Adds another day to Date and converts date into SQL format, ignores time
		if (val != null) {

			Date next = DateUtils.addDays(val, 1);
			SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd");
			return "'" + format.format(next) + "'";

		} else {

			return null;

		}

	}
	/**
	 * To get date as string to embed in MySQL Query, it adds one day of lifting day boundary into date
	 * @param val
	 * @return
	 */
	public static String getSQLDateNextLifting(Date val) {

		
		// Adds another day to Date and converts date into SQL format, ignores time
		if (val != null) {

			Date next = DateUtils.addDays(val, 1);
			SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd");
			return "date_format('" + format.format(next) + " 6:00','%Y-%m-%d %H:%i')";

		} else {

			return null;

		}

	}

	/**
	 * To get date and time as string to embed in MySQL Query, it adds one day into date
	 * @param val
	 * @return
	 */
	public static String getSQLDateTimeNext(Date val) {

		// Adds another day to Date and Time and converts date into SQL format
		if (val != null) {

			Date next = DateUtils.addDays(val, 1);
			SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd H:mm");
			return "date_format('" + format.format(next)
					+ "','%Y-%m-%d %H:%i')";

		} else {

			return null;

		}

	}
	
	/**
	 * 
	 * To get date as string to embed in MySQL Query, it subtracts one day from date
	 * @param val
	 * @return
	 */
	public static String getSQLDatePrevious(Date val) {
		
		// Substracts a day from Date and converts date into SQL format, ignores time

		if (val != null) {
			Date previous = DateUtils.addDays(val, -1);
			SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd");
			return "'" + format.format(previous) + "'";

		} else {

			return null;

		}

	}
	
	
	/**
	 * To get date in string format without single quotes to embed in MySQL Query 
	 * @param val
	 * @return
	 */
	public static String getSQLDateWithoutSeprator(Date val) {
			
			// Converts date into sql format and ignores time
	
			if (val != null) {
	
				SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
				return format.format(val);
	
			} else {
	
				return null;
	
			}
	
	}	
	/**
	 * To get date in string format for display on UI, it subtracts one day from date
	 * @param val
	 * @return
	 */
	public static String getDisplayDatePrevious(Date val) {
		
		

		if (val != null) {
			Date previous = DateUtils.addDays(val, -1);
			SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
			return format.format(previous);

		} else {

			return null;

		}

	}
	
	/**
	 * To get date in string format for display on UI, it adds one day to date
	 * @param val
	 * @return
	 */
	public static String getDisplayDateNext(Date val) {

		if (val != null) {
			Date previous = DateUtils.addDays(val, 1);
			SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
			return format.format(previous);

		} else {

			return null;

		}

	}

	/**
	 * To get long date in string format for UI displays
	 * @param val
	 * @return
	 */
	public static String getDisplayFullDateFormat(Date val) {

		if (val != null) {

			SimpleDateFormat format = new SimpleDateFormat(
					"EEEE, MMMMM dd, yyyy");
			return "" + format.format(val);

		} else {

			return null;

		}

	}
	
	
	/**
	 * To get abbreviated long date in string format for UI displays
	 * @param val
	 * @return
	 */
	public static String getDisplayFullDateFormatShort(Date val) {

		if (val != null) {

			SimpleDateFormat format = new SimpleDateFormat(
					"MMM dd, yyyy");
			return "" + format.format(val);

		} else {

			return null;

		}

	}
	public static String getDisplayFullDateFormatWithSeparator(Date val) {

		if (val != null) {

			SimpleDateFormat format = new SimpleDateFormat(
					"MMM/dd/yyyy");
			return "" + format.format(val);

		} else {

			return null;

		}

	}
	public static String getDisplayFullDateFormatWithoutYear(Date val) {

		if (val != null) {

			SimpleDateFormat format = new SimpleDateFormat(
					"EEEE MMMM dd");
			return "" + format.format(val);

		} else {

			return null;

		}

	}
	
	/**
	 * To get time in "h:mm a" format as string to display on UI
	 * @param val
	 * @return
	 */
	public static String getDisplayTimeFormat(Date val) {

		if (val != null) {

			SimpleDateFormat format = new SimpleDateFormat("hh:mm a");
			return "" + format.format(val);

		} else {

			return null;

		}

	}

	/**
	 * To get date and time in "dd/MM/yyyy h:mm a" format as string to display on UI
	 * @param val
	 * @return
	 */
	public static String getDisplayDateTimeFormat(Date val) {

		if (val != null) {

			SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy h:mm a");
			return "" + format.format(val);

		} else {

			return null;

		}

	}
	
	/**
	 * To get date and time in "dd/MM/yyyy h:mm:ss" format as string to display on UI
	 * @param val
	 * @return
	 */
	public static String getDisplayDateTimeFormatUniversal(Date val) {

		if (val != null) {

			SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy h:mm:ss");
			return "" + format.format(val);

		} else {

			return null;

		}

	}

	/**
	 * To get date in "dd/MM/yyyy" format as string to display on UI
	 * @param val
	 * @return
	 */
	public static String getDisplayDateFormat(Date val) {

		if (val != null) {

			SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
			return "" + format.format(val);

		} else {

			return null;

		}

	}

	/**
	 * To get date in "MMM, yyyy" format as string to display on UI 
	 * @param val
	 * @return
	 */
	public static String getDisplayDateMonthYearFormat(Date val) {

		if (val != null) {

			SimpleDateFormat format = new SimpleDateFormat("MMM, yyyy");
			return "" + format.format(val);

		} else {

			return null;

		}

	}
	
	/**
	 * To get date in "MMMMM yyyy" format as string to display on UI 
	 * @param val
	 * @return
	 */
	public static String getDisplayDateFullMonthYearFormat(Date val) {

		if (val != null) {

			SimpleDateFormat format = new SimpleDateFormat("MMMMM yyyy");
			return "" + format.format(val);

		} else {

			return null;

		}

	}
	
	/**
	 * To get month number as int by providing date object
	 * @param val
	 * @return
	 */
	public static int getMonthNumberByDate(Date val) {
		if (val != null) {
			SimpleDateFormat format = new SimpleDateFormat("MM");
			return parseInt(format.format(val));
		} else {

			return 0;

		}
	}
	
	/**
	 * To get year as int by providing providing date object
	 * @param val
	 * @return
	 */
	public static int getYearByDate(Date val) {
		if (val != null) {
			SimpleDateFormat format = new SimpleDateFormat("yyyy");
			return parseInt(format.format(val));
		} else {

			return 0;

		}
	}
	
	/**
	 * To get start date of year by providing providing date object
	 * @param val
	 * @return
	 */
	public static Date getYearStartDateByDate(Date idate) {
		  int iyear = Utilities.getYearByDate(idate);
		  
		  Calendar c = Calendar.getInstance();
		  c.set(iyear, 0, 1);

		  return c.getTime();    
	}
	
	/**
	 * To get array of past dates on providing a date object and number of months 
	 * @param val
	 * @param NumberOfMonthsInPast
	 * @return
	 */
	public static Date[] getPastMonthsInDate(Date val, int NumberOfMonthsInPast) {

		int month = getMonthNumberByDate(val);
		int year = getYearByDate(val);

		Date ret[] = new Date[NumberOfMonthsInPast];

		for (int i = (NumberOfMonthsInPast - 1); i >= 0; i--) {

			int imonth = (month - i);
			int iyear = year;

			if (imonth < 1) {
				imonth = imonth + 12;
				iyear = iyear - 1;
			}

			ret[(NumberOfMonthsInPast - i - 1)] = getStartDateByMonth(
					imonth - 1, iyear);

		}

		return ret;
	}

	/**
	 * To get number in "###,###.##" format
	 * @param val
	 * @return
	 */
	public static String getDisplayCurrencyFormat(double val) {

		java.text.NumberFormat format = new java.text.DecimalFormat(
				"###,###.##");
		format.setMaximumFractionDigits(2);

		return format.format(val);

	}
	
	/**
	 * To get number in "###,###.#" format
	 * @param val
	 * @return
	 */
	public static String getDisplayCurrencyFormatOneDecimal(double val) {

		java.text.NumberFormat format = new java.text.DecimalFormat(
				"###,###.#");
		format.setMaximumFractionDigits(1);

		return format.format(val);

	}
	
	/**
	 * To get number in "###,###.#" format
	 * @param val
	 * @return
	 */
	public static String getDisplayCurrencyFormatTwoDecimalFixed(double val) {

		java.text.NumberFormat format = new java.text.DecimalFormat(
				"###,###.#");
		format.setMaximumFractionDigits(2);
		format.setMinimumFractionDigits(2);
		
		return format.format(val);

	}
	
	/**
	 * To get number in "###,###.# Dr/Cr" format
	 * @param val
	 * @return
	 */
	public static String getDisplayCurrencyFormatTwoDecimalFixedAccountingDr(double val) {

		java.text.NumberFormat format = new java.text.DecimalFormat(
				"###,###.#");
		format.setMaximumFractionDigits(2);
		format.setMinimumFractionDigits(2);
		
		if (val < 0){
			return format.format(val * -1) + " Cr";	
		}else{
			return format.format(val) + " Dr";	
		}

	}
	/**
	 * To get number in "###,###.#" format, in brackets if negative
	 * @param val
	 * @return
	 */
	public static String getDisplayCurrencyFormatTwoDecimalFixedAccounting(double val) {

		java.text.NumberFormat format = new java.text.DecimalFormat(
				"###,###.#");
		format.setMaximumFractionDigits(2);
		format.setMinimumFractionDigits(2);
		
		if (val < 0){
			return "("+ format.format(val * -1) + ")";	
		}else{
			return format.format(val);	
		}

	}
	
	/**
	 * To get number in "###,###" format, in brackets if negative
	 * @param val
	 * @return
	 */
	public static String getDisplayCurrencyFormatRoundedAccounting(double val) {

		java.text.NumberFormat format = new java.text.DecimalFormat(
				"###,###");
		format.setMaximumFractionDigits(0);
		format.setMinimumFractionDigits(0);
		
		if (val < 0){
			return "("+ format.format(val * -1) + ")";	
		}else{
			return format.format(val);	
		}

	}
	
	
	/**
	 * To get number in abbreviated format (K for thousand, M for million)
	 * @param val
	 * @return
	 */
	public static String getDisplayCurrencyFormatAbbreviatedOneDecimal(double val) {
		
		String symbol = "";
		
		if (val > 1000 && val < 1000000){
			val = val / 1000;
			symbol = "K";
		}
		if (val > 1000000){
			val = val / 1000000;
			symbol = "M";
		}
		
		java.text.NumberFormat format = new java.text.DecimalFormat(
				"###,###.#");
		format.setMaximumFractionDigits(1);
		
		return format.format(val)+symbol;
		
	}

	/**
	 * To get number in abbreviated format (strictly in K for thousand)
	 * @param val
	 * @return
	 */
	public static String getDisplayCurrencyFormatAbbreviatedThousandsOneDecimal(double val) {
		
		String symbol = "";
		
		if (val > 1000){
			val = val / 1000;
			symbol = "K";
		}
		
		java.text.NumberFormat format = new java.text.DecimalFormat(
				"###,###.#");
		format.setMaximumFractionDigits(1);
		
		return format.format(val)+symbol;
		
	}

	
	/**
	 * To get number in "#.##" format
	 * @param val
	 * @return
	 */
	public static String getDisplayCurrencyFormatSimple(double val) {

		java.text.NumberFormat format = new java.text.DecimalFormat("#.##");
		format.setMaximumFractionDigits(2);

		return format.format(val);

	}
	
	/**
	 * To get number in "###,###" format
	 * @param val
	 * @return
	 */
	public static String getDisplayCurrencyFormatRounded(double val) {

		java.text.NumberFormat format = new java.text.DecimalFormat("###,###");
		format.setMaximumFractionDigits(0);

		return format.format(val);

	}
	
	/**
	 * To convert string to long
	 * @param val
	 * @return
	 */
	public static long parseLong(String val) {

		if (val == null) {
			val = "0";
		}

		long ret = 0;

		try {
			ret = Long.parseLong(val);
		} catch (NumberFormatException e) {
		}

		return ret;
	}

	/**
	 * To convert string to int
	 * @param val
	 * @return
	 */
	public static int parseInt(String val) {

		if (val == null) {
			val = "0";
		}

		int ret = 0;

		try {
			ret = Integer.parseInt(val);
		} catch (NumberFormatException e) {
		}

		return ret;
	}

	/**
	 * To convert string to double
	 * @param val
	 * @return
	 */
	public static double parseDouble(String val) {

		if (val == null) {
			val = "0";
		}

		double ret = 0;

		try {
			ret = Double.parseDouble(val);
		} catch (NumberFormatException e) {
		}

		return ret;
	}

	/**
	 * To convert string to boolean
	 * @param val
	 * @return
	 */
	public static boolean parseBoolean(String val) {

		if (val == null) {
			val = "false";
		}

		boolean ret = false;
		ret = Boolean.parseBoolean(val);

		return ret;
	}

	/**
	 * To convert string array into double array
	 * @param val
	 * @return
	 */
	public static double[] parseDouble(String val[]) {
		
		if (val != null) {
			double ret[] = new double[val.length];
	
			for (int i = 0; i < val.length; i++) {
				ret[i] = parseDouble(val[i]);
			}
	
			return ret;
		}else{
			return null;
		}
	}

	/**
	 * To convert array of string to array of double and ignore commas
	 * @param val
	 * @return
	 */
	public static double[] parseDoubleAndFilterComma(String val[]) {
		
		if (val != null) {
			double ret[] = new double[val.length];
	
			for (int i = 0; i < val.length; i++) {
				if (val[i] != null) {
					val[i] = val[i].replaceAll(",", "");
				}
				ret[i] = parseDouble(val[i]);
			}
	
			return ret;
		}else{
			return null;
		}
	}

	/**
	 * To convert array of string into array of long
	 * @param val
	 * @return
	 */
	public static long[] parseLong(String val[]) {
		
		if (val != null) {
			long ret[] = new long[val.length];
	
			for (int i = 0; i < val.length; i++) {
				ret[i] = parseLong(val[i]);
			}
	
			return ret;
		}else{
			return null;
		}
	}

	/**
	 * To convert array of string into array of int
	 * @param val
	 * @return
	 */
	public static int[] parseInt(String val[]) {

		if (val != null) {
			int ret[] = new int[val.length];

			for (int i = 0; i < val.length; i++) {
				ret[i] = parseInt(val[i]);
			}

			return ret;
		} else {
			return null;
		}
	}

	/**
	 * To convert array of string into array of date
	 * @param val
	 * @return
	 */
	public static Date[] parseDate(String val[]) {
		
		if (val != null) {
			Date ret[] = new Date[val.length];
	
			for (int i = 0; i < val.length; i++) {
				ret[i] = parseDate(val[i]);
			}
	
			return ret;
		}else{
			return null;
		}
	}
	
	
	/**
	 * To convert user parameters with serial number into a single array of string
	 * @param parameter
	 * @param length
	 * @param request
	 * @return
	 */
	public static String[] getSerialParameterValues(String parameter,
			int length, HttpServletRequest request) {
		String ret[] = new String[length];

		for (int i = 0; i < length; i++) {
			ret[i] = request.getParameter(parameter + "" + (i + 1));
		}

		return ret;
	}

	/**
	 * To truncate string to a specified length
	 * @param val
	 * @param MaxLength
	 * @return
	 */
	public static String truncateStringToMax(String val, int MaxLength) {
		if (val != null) {
			int len = val.length();
			if (len > MaxLength) {
				val = val.substring(0, MaxLength);
			}
		}
		return val;
	}

	
	/**
	 * 	To get start date of a month
	 * @param month
	 * @param year
	 * @return
	 */
	public static Date getStartDateByMonth(int month, int year) {

		Calendar c = Calendar.getInstance();
		c.set(year, month, 1);

		return c.getTime();
	}

	/**
	 * To get end date of a month
	 * @param month
	 * @param year
	 * @return
	 */
	public static Date getEndDateByMonth(int month, int year) {

		Calendar c = Calendar.getInstance();
		c.set(year, month, 1);
		c.set(Calendar.DAY_OF_MONTH, c.getActualMaximum(Calendar.DAY_OF_MONTH));

		return c.getTime();
	}

	/**
	 * To get end date of a month
	 * @param idate
	 * @return
	 */
	public static Date getEndDateByDate(Date idate) {
		int imonth = Utilities.getMonthNumberByDate(idate);
		int iyear = Utilities.getYearByDate(idate);
		return Utilities.getEndDateByMonth(imonth - 1, iyear);
	}
	
	/**
	 * To get start date of a month
	 * @param idate
	 * @return
	 */
	public static Date getStartDateByDate(Date idate) {
		int imonth = Utilities.getMonthNumberByDate(idate);
		int iyear = Utilities.getYearByDate(idate);
		return Utilities.getStartDateByMonth(imonth - 1, iyear);
	}
	
	/**
	 * It generates a time based unique number to use for barcodes or document identifiers
	 * @param UserID
	 * @return
	 */
	public static long getUniqueVoucherID(long UserID)
	{
		
		String AUserID = UserID + "";
		
		while(AUserID.length() <= 4){
			AUserID = "0"+AUserID;
		}
		
		AUserID = AUserID.substring(AUserID.length()-4, AUserID.length());
		
		String UniqueNumber = AUserID+""+(System.currentTimeMillis());
		
		return Utilities.parseLong(UniqueNumber);
	}
	
	/**
	 * It generates a short time based unique number to use for barcodes or document identifiers
	 * @param UserID
	 * @return
	 */
	public static long getUniqueVoucherIDShort(long UserID)
	{
		
		String AUserID = UserID + "";
		
		while(AUserID.length() <= 2){
			AUserID = "0"+AUserID;
		}
		
		AUserID = AUserID.substring(AUserID.length()-2, AUserID.length());
		
		String UniqueNumber = AUserID+""+(System.currentTimeMillis());
		
		return Utilities.parseLong(UniqueNumber);
	}
	
	/**
	 * It converts a long array into a string of comma separated values 
	 * @param arr
	 * @return
	 */
	public static String serializeForSQL(long arr[]){
		String ret = "";
		if (arr != null){
			for (int i = 0; i < arr.length; i++){
			if (i != 0){
				ret += ",";
			}
			ret += arr[i];
			}
		}
		return ret;
	}
	
	/**
	 * It converts a String array into a string of comma separated values 
	 * @param arr
	 * @return
	 */
	public static String serializeForSQL(String arr[]){
		
		String ret = "";
		if (arr != null){
			for (int i = 0; i < arr.length; i++){
			if (i != 0){
				ret += ",";
			}
			ret += "'"+arr[i]+"'";
			}
		}
		return ret;
	}

	/**
	 * To get admin password in MD5
	 * @return
	 */
	public static String getMobileAdminPasswordMD5(){
		return "e3e6c68051fdfdf177c8933bfd76de48";
	}
	
	/**
	 * To get admin password
	 * @return
	 */
	public static String getMobileAdminPassword(){
		return "wildspace12";
	}
	
	
	
	/**
	 * To get day of month
	 * @param val
	 * @return
	 */
	public static int getDayNumberByDate(Date val) {
		  if (val != null) {
		   SimpleDateFormat format = new SimpleDateFormat("dd");
		   return parseInt(format.format(val));
		  } else {

		   return 0;

		  }
	}	
	
	
	/**
	 * To get Friday count of month
	 * @param val
	 * @return
	 */
	public static int getFridayCountByDate(Date val) {
		int NumberOfFriday=0;
		 Date StartDate=Utilities.getStartDateByDate(val);
		 Date EndDate=Utilities.getEndDateByDate(val);
		 
		 Date CurrentDate = StartDate;
		 
		 while(true){
			 if(Utilities.getDayOfWeekByDate(CurrentDate)==6){ //if it is Friday
				 NumberOfFriday++;
			 }
			  
			 if(DateUtils.isSameDay(CurrentDate, EndDate)){
				 break;
			 }
	
			 CurrentDate = Utilities.getDateByDays(CurrentDate, 1);
		 }
	 
		 return NumberOfFriday;
	}
	
	/**
	 * To get subsequent Friday count of month
	 * @param val
	 * @return
	 */
	public static int getSubsequentFridayCountByDate(Date val) {
		int NumberOfFriday=0;
		Date StartDate=val;
		Date EndDate=Utilities.getEndDateByDate(val);
		 
		Date CurrentDate = StartDate;
		 
		while(true){
			 if(Utilities.getDayOfWeekByDate(CurrentDate)==6){ //if it is Friday
				 NumberOfFriday++;
			 }
			  
			 if(DateUtils.isSameDay(CurrentDate, EndDate)){
				 break;
			 }
	
			 CurrentDate = Utilities.getDateByDays(CurrentDate, 1);
		}
	 
		 return NumberOfFriday;
	}

	
	/**
	 * To get date by providing number of days starting from today
	 * @param Days
	 * @return
	 */
	public static Date getDateByDays(int Days){
		return DateUtils.addDays(new Date(), Days);
	}
	
	
	/**
	 * To get date by providing number of days starting from specific date
	 * @param val
	 * @param Days
	 * @return
	 */
	public static Date getDateByDays(Date val, int Days){
		return DateUtils.addDays(val, Days);
	}
	
	
	/**
	 * To get month name by providing month number
	 * @param Month
	 * @return
	 */
	public static String getMonthNameByNumber(int Month){
		String MonthName = "";
		if(Month == 1){
			MonthName = "January" ;	
		}else if(Month == 2){
			MonthName = "February";
		}else if(Month == 3){
			MonthName = "March";
		}else if(Month == 4){
			MonthName = "April";
		}else if(Month == 5){
			MonthName = "May";
		}else if(Month == 6){
			MonthName = "June";
		}else if(Month == 7){
			MonthName = "July";
		}else if(Month == 8){
			MonthName = "August";
		}else if(Month == 9){
			MonthName = "September";
		}else if(Month == 10){
			MonthName = "October";
		}else if(Month == 11){
			MonthName = "November";
		}else if(Month == 12){
			MonthName = "December";
		}
		return MonthName;
	}	
	
	
	/**
	 * To get day of week of provided date
	 * @param date
	 * @return
	 */
	public static int getDayOfWeekByDate(Date date){
		
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		int DayOfWeek = c.get(Calendar.DAY_OF_WEEK);
		return DayOfWeek;
		
	}

	
	/**
	 * To send SMS
	 * @param number
	 * @param message
	 * @return
	 * @throws IOException
	 */
	public static boolean sendSMS(String number, String message) throws IOException{
		
        URL url = new URL("http://155.135.0.70/default.aspx?number="+number+"&msg="+URLEncoder.encode(message));
        URLConnection urlConnection = url.openConnection();
        
        HttpURLConnection connection = null;
        if(urlConnection instanceof HttpURLConnection){
           connection = (HttpURLConnection) urlConnection;
        }else{
           System.out.println("Utilities.sendSMS: Invalid URL");
        }
        
        BufferedReader in = new BufferedReader(
        new InputStreamReader(connection.getInputStream()));
        String urlString = "";
        String current;
        while((current = in.readLine()) != null)
        {
           urlString += current;
        }
        
        if (urlString != null && urlString.indexOf("true") == -1){
        	return false;
        }else{
        	return true;	
        }
	}
	
		/**
	 * To send Telegram message
	 * @param number
	 * @param message
	 * @param pictures
	 * @return
	 * @throws IOException
	 */
	/**
	 * To send email
	 * @param to
	 * @param cc
	 * @param bcc
	 * @param subject
	 * @param message
	 * @param filename
	 * @return
	 * @throws EmailException
	 */
	public static String sendPBCEmail(String to[], String cc[], String bcc[], String subject, String message, String filename[]) throws EmailException{
		
		try{
			
			MultiPartEmail email = new MultiPartEmail();
			email.setHostName("155.135.0.3");
			
			for (int i = 0; i < to.length; i++){
				email.addTo(to[i]);
			}
			if (cc != null){
				for (int i = 0; i < cc.length; i++){
					email.addCc(cc[i]);
				}
			}
			if (bcc != null){
				for (int i = 0; i < bcc.length; i++){
					email.addBcc(bcc[i]);
				}
			}
			
			email.setFrom("theia@pbc.com.pk", "Theia");
			
			email.setSubject(subject);
			
			email.setMsg(message);
			
			if (filename != null){
				
				for (int i = 0; i < filename.length; i++){
					EmailAttachment attachment = new EmailAttachment();
					attachment.setPath(Utilities.getEmailAttachmentsPath()+"/"+filename[i]);
					attachment.setDisposition(EmailAttachment.ATTACHMENT);
					attachment.setDescription(filename[i]);
					attachment.setName(filename[i]);
					email.attach(attachment);
				}
				
			}		
		
			return email.send();
			
		}catch(Exception e){
			e.printStackTrace();
			
			return null;
			
		}
		//return true;
	}
	
	/**
	 * To send email in HTML format
	 * @param to
	 * @param cc
	 * @param bcc
	 * @param subject
	 * @param message
	 * @param filename
	 * @return
	 * @throws EmailException
	 */
public static String sendHTMLEmailWithImage(String to[], String cc[], String bcc[], String subject, String message, String filename[]) throws EmailException{
		
		try{
			
			HtmlEmail email = new HtmlEmail();
			//email.setDebug(true);
			email.setHostName("smtp.gmail.com");
			email.setSmtpPort(587);
			//email.setAuthentication("theia@pbc.com.pk","smooking");
			email.setAuthenticator(new DefaultAuthenticator("greencare@seainfosys.com","greencare123"));
			
			//email.setSSLOnConnect(true);
			
			//email.setSSLCheckServerIdentity(false);
			
			for (int i = 0; i < to.length; i++){
				email.addTo(to[i]);
			}
			if (cc != null){
				for (int i = 0; i < cc.length; i++){
					email.addCc(cc[i]);
				}
			}
			if (bcc != null){
				for (int i = 0; i < bcc.length; i++){
					email.addBcc(bcc[i]);
				}
			}

			email.setFrom("greencare@seainfosys.com", "Summit Orthopaedics");

			//email.setSSL(true);
			
			email.setSubject(subject);
			
			email.setHtmlMsg(message);

		//	email.setStartTLSEnabled(true);
			if (filename != null){
				
				for (int i = 0; i < filename.length; i++){
					try{
						EmailAttachment attachment = new EmailAttachment();
						attachment.setPath("/opt/apache-tomcat-7.0.96/webapps/final2.pdf");
						attachment.setDisposition(EmailAttachment.ATTACHMENT);
						attachment.setDescription(filename[i]);
						attachment.setName(filename[i]);
						email.attach(attachment);
					}catch(Exception e1){e1.printStackTrace();}
				}
				
			}		
			email.setStartTLSEnabled(true);
			return email.send();
			
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
public static String sendHTMLEmail(String to[], String cc[], String bcc[], String subject, String message, String filename[]) throws EmailException{
		
		try{
			
			HtmlEmail email = new HtmlEmail();
			//email.setDebug(true);
			email.setHostName("smtp.gmail.com");
			email.setSmtpPort(587);
			//email.setAuthentication("theia@pbc.com.pk","smooking");
			email.setAuthenticator(new DefaultAuthenticator("greencare@seainfosys.com","greencare123"));
			
			//email.setSSLOnConnect(true);
			
			//email.setSSLCheckServerIdentity(false);
			
			for (int i = 0; i < to.length; i++){
				email.addTo(to[i]);
			}
			if (cc != null){
				for (int i = 0; i < cc.length; i++){
					email.addCc(cc[i]);
				}
			}
			if (bcc != null){
				for (int i = 0; i < bcc.length; i++){
					email.addBcc(bcc[i]);
				}
			}

			email.setFrom("greencare@seainfosys.com", "Summit Orthopaedics");

			//email.setSSL(true);
			
			email.setSubject(subject);
			
			email.setHtmlMsg(message);

		//	email.setStartTLSEnabled(true);
			if (filename != null){
				
				for (int i = 0; i < filename.length; i++){
					try{
						EmailAttachment attachment = new EmailAttachment();
						attachment.setPath(Utilities.getEmailAttachmentsPath()+"/"+filename[i]);
						attachment.setDisposition(EmailAttachment.ATTACHMENT);
						attachment.setDescription(filename[i]);
						attachment.setName(filename[i]);
						email.attach(attachment);
					}catch(Exception e1){e1.printStackTrace();}
				}
				
			}		
			email.setStartTLSEnabled(true);
			return email.send();
			
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}

	
	/**
	 * To send email on external addresses in HTML format
	 * @param to
	 * @param cc
	 * @param bcc
	 * @param subject
	 * @param message
	 * @param filename
	 * @return
	 * @throws EmailException
	 */
	public static String sendPBCHTMLEmailExternal(String to[], String cc[], String bcc[], String subject, String message, String filename[]) throws EmailException{
		

		try{
			
			HtmlEmail email = new HtmlEmail();
			email.setDebug(true);
			email.setHostName("mail.pbc.com.pk");
			email.setSmtpPort(465);
			//email.setAuthentication("theia@pbc.com.pk","smooking");
			email.setAuthenticator(new DefaultAuthenticator("theia@pbc.com.pk", "smooking"));
			//email.setTLS(true);
			email.setSSL(true);
			//email.setSSLOnConnect(true);
			
			//email.setSSLCheckServerIdentity(false);
			//email.setStartTLSRequired(true);
			
			for (int i = 0; i < to.length; i++){
				email.addTo(to[i]);
			}
			if (cc != null){
				for (int i = 0; i < cc.length; i++){
					email.addCc(cc[i]);
				}
			}
			if (bcc != null){
				for (int i = 0; i < bcc.length; i++){
					email.addBcc(bcc[i]);
				}
			}
			
			email.setFrom("theia@pbc.com.pk", "Theia");
			
			email.setSubject(subject);
			
			email.setHtmlMsg(message);
			
			if (filename != null){
				
				for (int i = 0; i < filename.length; i++){
					try{
						EmailAttachment attachment = new EmailAttachment();
						attachment.setPath(Utilities.getEmailAttachmentsPath()+"/"+filename[i]);
						attachment.setDisposition(EmailAttachment.ATTACHMENT);
						attachment.setDescription(filename[i]);
						attachment.setName(filename[i]);
						email.attach(attachment);
					}catch(Exception e1){e1.printStackTrace();}
				}
				
			}		
			
			return email.send();
			
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
		//return true;
	}

		
	/**
	 * To add leading zeros in a string until specified length is achieved
	 * @param number
	 * @param length
	 * @return
	 */
	public static String addLeadingZeros(String number, int length){
		
		String SaleOrderStr = number;
		if(SaleOrderStr.length() < length){
			int MissingDigits = length - SaleOrderStr.length();
			for(int i = 0; i < MissingDigits; i++){
				SaleOrderStr = "0"+SaleOrderStr;
			}
		}
		return SaleOrderStr;
		
	}
	
	/**
	 * To get From Date and To Date of current order booking week
	 * @return
	 */
	public static Date[] getCurrentWeekInDates(){
		  Date FromDate=new Date();
		  Date ToDate=new Date();

		  int i = 1; 
		  while(i <= 7){
		   
		   Date CurDate = DateUtils.addDays(new Date(), i * (-1));
		   
		   Calendar cal = Calendar.getInstance();
		   cal.setTime(CurDate);
		   
		   int DayOfWeek = cal.get(Calendar.DAY_OF_WEEK);
		   
		   if(DayOfWeek == 6){
		    ToDate = CurDate;
		   }
		   
		   if(DayOfWeek == 7){
		    
		    FromDate = CurDate;
		    
		    break;
		   }
		   
		   i++;
		   
		  }// end while
		  
		  
		  Date temp[] = new Date[2];
		  temp[0] = FromDate;
		  temp[1] = ToDate;
		  
		  return temp;
		  
	}
	
	public static boolean isCurrentMonth(Date val){
		  
		  int imonth = Utilities.getMonthNumberByDate(val);
		  int iyear = Utilities.getYearByDate(val);
		  
		  imonth--;
		  
		  Calendar cal = Calendar.getInstance();
		  int year = cal.get(Calendar.YEAR);
		  int month = cal.get(Calendar.MONTH);
		  
		  if(imonth == month && iyear == year){
		   return true;
		  }
		  
		  return false;
	}
	
	public static long DifferenceDays(Date d1,Date d2){
		
		long diff = Math.abs(d1.getTime() - d2.getTime());
		long diffDays = diff / (24 * 60 * 60 * 1000);
		return (diffDays+1);	
	
	}
	
	public static int DifferenceYears(Date d1,Date d2){
	
		return (int) (DifferenceDays(d1, d2)/365);
	
	}
	

	public static String RemoveCommas(String val){
		System.out.println(val);
		val=val.replaceAll("(^(\\s*?\\,+)+\\s?)|(^\\s+)|(\\s+$)|((\\s*?\\,+)+\\s?$)","");
		System.out.println(val);
		return val;
	}
	public static String getDisplayDateFormatMMDDYYYY(Date val) {

		if (val != null) {
			
			SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy");
			return  format.format(val) ;

		} else {

			return null;

		}
		
	}
	public static int getWeekDayNumberByDate(Date val) {

		if (val != null) {
			Calendar c = Calendar.getInstance();
			c.setTime(val);
			int dayOfWeek = c.get(Calendar.DAY_OF_WEEK);
			return dayOfWeek;
		} else {

			return -1;

		}
		
	}
	public static long getRandomMRN(Statement st){
		int loop = 0;
		int loopend = 1;
		double RandomPatientID = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
		try {
			for (loop = 0; loop<loopend; loop++)
			{
				ResultSet rs4 = st.executeQuery("SELECT patient_id FROM reg_form_step1 WHERE patient_id=" + RandomPatientID);
				if(rs4.next()){
					RandomPatientID = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
					//System.out.println("RandonPatientID : "+RandomPatientID);
					loopend = loopend+1;
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		return Math.round(RandomPatientID);
	}
	
	
	public static int getRandomNumber(int start, int end){
		int number=0;
		Random rand = new Random();
		number = rand.nextInt((end - start) + 1) + start;
		return number;
	}
}
