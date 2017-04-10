package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import java.util.*;

public final class index_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List<String> _jspx_dependants;

  private javax.el.ExpressionFactory _el_expressionfactory;
  private org.apache.tomcat.InstanceManager _jsp_instancemanager;

  public java.util.List<String> getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
    _jsp_instancemanager = org.apache.jasper.runtime.InstanceManagerFactory.getInstanceManager(getServletConfig());
  }

  public void _jspDestroy() {
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html; charset=GBK");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("  \r\n");
      out.write("  \r\n");
      out.write("<html><head><title>Cluster App Test</title></head>  \r\n");
      out.write("<body>  \r\n");
      out.write("Server Info:  \r\n");
  
out.println(request.getLocalAddr() + " : " + request.getLocalPort()+"<br>");
      out.write("  \r\n");
  
  out.println("<br> ID " + session.getId()+"<br>");  
  // 如果有新的 Session 属性设置  
  String dataName = request.getParameter("dataName");  
  if (dataName != null && dataName.length() > 0) {  
     String dataValue = request.getParameter("dataValue");  
     session.setAttribute(dataName, dataValue);  
  }  
  out.println("<b>Session 列表</b><br>");  
  System.out.println("============================");  
  Enumeration e = session.getAttributeNames();  
  while (e.hasMoreElements()) {  
     String name = (String)e.nextElement();  
     String value = session.getAttribute(name).toString();  
     out.println( name + " = " + value+"<br>");  
         System.out.println( name + " = " + value);  
   }  

      out.write("  \r\n");
      out.write("  <form action=\"index.jsp\" method=\"POST\">  \r\n");
      out.write("    名称:<input type=text size=20 name=\"dataName\">  \r\n");
      out.write("     <br>  \r\n");
      out.write("    值:<input type=text size=20 name=\"dataValue\">  \r\n");
      out.write("     <br>  \r\n");
      out.write("    <input type=submit>  \r\n");
      out.write("   </form>  \r\n");
      out.write("<br/>  \r\n");
      out.write("<!--tomcat7_a就都写a  tomcat7_b工程里都写b   tomcat7_c工程里都写c-->   \r\n");
      out.write("<b>负载均衡测试：此为：Tomcat7_a上的文件，aaaaaaaaaaaaaaaaaa </b>  \r\n");
      out.write("</body>  \r\n");
      out.write("</html>  ");
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          try { out.clearBuffer(); } catch (java.io.IOException e) {}
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
