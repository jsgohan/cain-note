package org.apache.jsp.WEB_002dINF.view;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import java.util.*;

public final class lightBlog_jsp extends org.apache.jasper.runtime.HttpJspBase
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
      response.setContentType("text/html;charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write('\r');
      out.write('\n');

String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

      out.write("\r\n");
      out.write("\r\n");
      out.write("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">\r\n");
      out.write("<html>\r\n");
      out.write("  <head>\r\n");
      out.write("    <base href=\"");
      out.print(basePath);
      out.write("\">\r\n");
      out.write("    \r\n");
      out.write("    <title>小白轻博客</title>\r\n");
      out.write("\t<meta name=\"keywords\" content=\"小白轻博客\" />\r\n");
      out.write("\t<meta name=\"description\" content=\"\" />\r\n");
      out.write("\t<meta http-equiv=\"pragma\" content=\"no-cache\">\r\n");
      out.write("\t<meta http-equiv=\"cache-control\" content=\"no-cache\">\r\n");
      out.write("\t<meta http-equiv=\"expires\" content=\"0\">    \r\n");
      out.write("\t<meta http-equiv=\"keywords\" content=\"keyword1,keyword2,keyword3\">\r\n");
      out.write("\t<meta http-equiv=\"description\" content=\"This is my page\">\r\n");
      out.write("\r\n");
      out.write("\t<link rel=\"stylesheet\" href=\"");
      out.print(path);
      out.write("/css/index.css\"/>\r\n");
      out.write("\t<link rel=\"stylesheet\" href=\"");
      out.print(path);
      out.write("/css/style.css\"/>\r\n");
      out.write("\t<link rel=\"stylesheet\" href=\"");
      out.print(path);
      out.write("/blog/css/blog.css\"/>\r\n");
      out.write("\t<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/js/jquery-1.7.2.js\"></script>\r\n");
      out.write("\t<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/js/jquery.SuperSlide.2.1.1.js\"></script>\r\n");
      out.write("\t<style type=\"text/css\">\r\n");
      out.write("\t\t.tdSie{font-size: 12px;font-weight: bold;}\r\n");
      out.write("\t\t#loading-mask {position: fixed;_position: absolute;left: 0;top: 0;width:100%;height:100%;z-index: 20000;background-color:#000;filter:alpha(Opacity = 50);-moz-opacity:0.8;opacity:0.8;}\r\n");
      out.write("\t\t#loading {position: absolute;left: 50%;top: 50%;padding: 2px;z-index: 20001;height: auto;}\r\n");
      out.write("\t\t#loading-msg {font: bold 14px arial, tahoma, sans-serif ;font-weight:bolder;line-height:35px;color:#fff;}\r\n");
      out.write("\t\t\r\n");
      out.write("\t\t\r\n");
      out.write("\t</style>\r\n");
      out.write("</head>\r\n");
      out.write("  \r\n");
      out.write("  <body>\r\n");
      out.write("    <!--header start-->\r\n");
      out.write("    <div id=\"header\">\r\n");
      out.write("      <h1>小白轻博客</h1>\r\n");
      out.write("      <p>青春是打开了,就合不上的书。人生是踏上了，就回不了头的路。good ~ study and day ~ up</p>    \r\n");
      out.write("    </div>\r\n");
      out.write("     <!--header end-->\r\n");
      out.write("    <!--nav-->\r\n");
      out.write("     <div id=\"nav\">\r\n");
      out.write("        <ul id='page-ul'>\r\n");
      out.write("         <li><a class='nava'>首页</a></li>\r\n");
      out.write("         <li><a >心情墙</a></li>\r\n");
      out.write("         <li><a >碎言碎语</a></li>\r\n");
      out.write("        </ul>\r\n");
      out.write("        <div class=\"clear\"></div>\r\n");
      out.write("      </div>\r\n");
      out.write("       <!--nav end-->\r\n");
      out.write("    <!--content start-->\r\n");
      out.write("    <div id=\"content\" style='margin-top: 10px;'>\r\n");
      out.write("    \t<div id='main-page'>\r\n");
      out.write("         <!--left-->\r\n");
      out.write("         <div class=\"left\" id=\"c_left\">\r\n");
      out.write("           <div class=\"s_tuijian\">\r\n");
      out.write("           <h2>文章<span>推荐</span></h2>\r\n");
      out.write("           </div>\r\n");
      out.write("           \r\n");
      out.write("          <div class=\"content_text\">\r\n");
      out.write("          <div id='main-page-wz'>          \r\n");
      out.write("            <!--wz-->\r\n");
      out.write("           <div class=\"wz\">\r\n");
      out.write("            <h3><a href=\"#\" title=\"浅谈：html5和html的区别\">浅谈：html5和html的区别</a></h3>\r\n");
      out.write("             <dl>\r\n");
      out.write("               <dt><img src=\"images/s3.jpg\" width=\"200\" height=\"123\" alt=\"\"></dt>\r\n");
      out.write("               <dd>\r\n");
      out.write("                 <p class=\"dd_text_1\">最近看群里聊天聊得最火热的莫过于手机网站和html5这两个词。可能有人会问，这两者有什么关系呢？随着这移动互联\r\n");
      out.write("                 网快速发展的时代，尤其是4G时代已经来临的时刻，加上微软对\"XP系统\"不提供更新补丁、维护的情况下。\r\n");
      out.write("               html5+css3也逐渐的成为新一代web前端技术.....</p>\r\n");
      out.write("               <p class=\"dd_text_2\">\r\n");
      out.write("               <span class=\"left author\">段亮</span><span class=\"left sj\">时间:2014-8-9</span>\r\n");
      out.write("               <span class=\"left fl\">分类:<a href=\"#\" title=\"学无止境\">学无止境</a></span><span class=\"left yd\"><a onclick='show_detail()' title=\"阅读全文\" class='hover-cursor'>阅读全文</a>\r\n");
      out.write("               </span>\r\n");
      out.write("               </p>\r\n");
      out.write("               </dd>\r\n");
      out.write("             </dl>\r\n");
      out.write("            </div>\r\n");
      out.write("           <!--wz end-->  \r\n");
      out.write("           </div> \r\n");
      out.write("           <div id='main-page-wz-detail'>\r\n");
      out.write("           \t           <div class=\"wz\">\r\n");
      out.write("            <h2 style='float: left;margin-left: 10px;'><a title=\"浅谈：html5和html的区别\">浅谈：html5和html的区别</a></h2>\r\n");
      out.write("            <h3 style='margin-left: 660px;width: 50px;' class='hover-cursor'><a onclick=\"back_to_main_page()\" title=\"返回\">返回</a></h3>\r\n");
      out.write("             <dl>\r\n");
      out.write("               <dt><img src=\"images/s3.jpg\" width=\"200\" height=\"123\" alt=\"\"></dt>\r\n");
      out.write("               <dd>\r\n");
      out.write("                 <p class=\"dd_text_1\" style='height: auto;'>最近看群里聊天聊得最火热的莫过于手机网站和html5这两个词。可能有人会问，这两者有什么关系呢？随着这移动互联\r\n");
      out.write("                 网快速发展的时代，尤其是4G时代已经来临的时刻，加上微软对\"XP系统\"不提供更新补丁、维护的情况下。\r\n");
      out.write("               html5+css3也逐渐的成为新一代web前端技术11最近看群里聊天聊得最火热的莫过于手机网站和html5这两个词。可能有人会问，这两者有什么关系呢？随着这移动互联\r\n");
      out.write("                 网快速发展的时代，尤其是4G时代已经来临的时刻，加上微软对\"XP系统\"不提供更新补丁、维护的情况下。</p>\r\n");
      out.write("                 \t<div style='float: left;width: 70px;'><span style='float: left;'><img alt='' src='");
      out.print(path);
      out.write("/images/support.png' width='22px' height='22px'></span><span class='blog-button'>赞</span></div>\r\n");
      out.write("                 \t<div id='critize'><span style='float: left;'><img alt='' src='");
      out.print(path);
      out.write("/images/critize.png' width='22px' height='22px'></span><span class='blog-button' onclick='show_critize();'>评论</span></div>   \r\n");
      out.write("                 \t<div id='critize-textarea' style='padding-bottom: 10px; '>\r\n");
      out.write("               \t\t\t<textarea style='text-align:left; width: 300px; height: 80px;overflow-y:hidden;float: left;'></textarea>               \t\t            \t\t\t\r\n");
      out.write("               \t\t\t<div class='button1' onclick='clear_critize(this);'>清空</div>\r\n");
      out.write("               \t\t\t<div class='button1' onclick='send_critize(this);'>发送</div>            \t\t\t\r\n");
      out.write("                 \t</div>                  \r\n");
      out.write("               </dd>             \r\n");
      out.write("             </dl>\t\r\n");
      out.write("            </div>\r\n");
      out.write("           </div>                            \r\n");
      out.write("           </div>\r\n");
      out.write("           \r\n");
      out.write("           \r\n");
      out.write("           \r\n");
      out.write("         </div>\r\n");
      out.write("         <!--left end-->\r\n");
      out.write("         <!--right-->\r\n");
      out.write("         <div class=\"right blog-common\">\r\n");
      out.write("          <div class=\"s_about\">\r\n");
      out.write("          <h2>关于博主</h2>\r\n");
      out.write("           <img src=\"images/bg.jpg\" width=\"230\" height=\"230\" alt=\"博主\"/>\r\n");
      out.write("           <p>博主：XX</p>\r\n");
      out.write("           <p>职业：web前端、视觉设计</p>\t\r\n");
      out.write("           <p>简介：</p>\r\n");
      out.write("          </div>\r\n");
      out.write("          <!--栏目分类-->\r\n");
      out.write("           <div class=\"lanmubox\">\r\n");
      out.write("              <div class=\"hd\">\r\n");
      out.write("               <ul><li>精心推荐</li><li>最新文章</li><li class=\"hd_3\">随机文章</li></ul>\r\n");
      out.write("              </div>\r\n");
      out.write("              <div class=\"bd\">            \r\n");
      out.write("              </div>\r\n");
      out.write("           </div>\r\n");
      out.write("           <!--end-->\r\n");
      out.write("           <div class=\"link\">\r\n");
      out.write("            <h2>友情链接</h2>\r\n");
      out.write("            <p><a href=\"http://www.duanliang920.com\">段亮个人博客</a></p>\r\n");
      out.write("           </div>\r\n");
      out.write("         </div>\r\n");
      out.write("         <!--right end-->\r\n");
      out.write("         <div class=\"clear\"></div>\r\n");
      out.write("         </div>\r\n");
      out.write("         \r\n");
      out.write("        \r\n");
      out.write("         \r\n");
      out.write("         <!-- 新建博客模块 开始-->\r\n");
      out.write("         <div id='new-page'>\r\n");
      out.write("         \t<!--left-->\r\n");
      out.write("         <div class=\"left\" id=\"guestbook\">\r\n");
      out.write("           <div class=\"weizi\">\r\n");
      out.write("           \t   <div class=\"wz_text\">当前位置：<a href=\"#\">首页</a>&gt;<h1>心情墙</h1></div>\r\n");
      out.write("           \t   <div class='clear'></div>\r\n");
      out.write("           </div>\r\n");
      out.write("           <div class=\"g_content\">\r\n");
      out.write("\t           <div style='width:40px;height: 20px;'><span id='word-num' >0</span>/2000</div>\r\n");
      out.write("\t           <textarea name=\"textarea\" id=\"textarea\" style='height:400px;width:700px;' onkeyup=\"num_control(this);\" onmouseup=\"num_control(this);\"onfocus=\"num_control(this);\"onblur=\"num_control(this);\" ></textarea>\r\n");
      out.write("\t           <div class='button3' onclick='send_wb(this)'>发布</div> \r\n");
      out.write("          \t   <div class='clear'></div>\r\n");
      out.write("           </div>\r\n");
      out.write("           <div class='clear'></div>\r\n");
      out.write("         </div>\r\n");
      out.write("         <!--end left -->\r\n");
      out.write("          <!--right-->\r\n");
      out.write("         <div class=\"right blog-common\">\r\n");
      out.write("          <div class=\"s_about\">\r\n");
      out.write("          <h2>关于博主</h2>\r\n");
      out.write("           <img src=\"images/bg.jpg\" width=\"230\" height=\"230\" alt=\"博主\"/>\r\n");
      out.write("           <p>博主：XX</p>\r\n");
      out.write("           <p>职业：web前端、视觉设计</p>\t\r\n");
      out.write("           <p>简介：</p>\r\n");
      out.write("          </div>\r\n");
      out.write("          <!--栏目分类-->\r\n");
      out.write("           <div class=\"lanmubox\">\r\n");
      out.write("              <div class=\"hd\">\r\n");
      out.write("               <ul><li>精心推荐</li><li>最新文章</li><li class=\"hd_3\">随机文章</li></ul>\r\n");
      out.write("              </div>\r\n");
      out.write("              <div class=\"bd\">            \r\n");
      out.write("              </div>\r\n");
      out.write("           </div>\r\n");
      out.write("           <!--end-->\r\n");
      out.write("           <div class=\"link\">\r\n");
      out.write("            <h2>友情链接</h2>\r\n");
      out.write("            <p><a href=\"http://www.duanliang920.com\">段亮个人博客</a></p>\r\n");
      out.write("           </div>\r\n");
      out.write("         </div>\r\n");
      out.write("         <!--right end-->\r\n");
      out.write("         <div class=\"clear\"></div>\r\n");
      out.write("         </div>         \r\n");
      out.write("         <!-- 新建博客模块 结束-->\r\n");
      out.write("         <div class=\"clear\"></div>\r\n");
      out.write("    </div>\r\n");
      out.write("    <!--content end-->\r\n");
      out.write("        \r\n");
      out.write("    \r\n");
      out.write("         <!-- 聊天室开始 -->\r\n");
      out.write("         <div id=\"say\" style='margin-top: 10px;'>\r\n");
      out.write("     \t\t<div class=\"weizi\">\r\n");
      out.write("           \t\t<div class=\"wz_text\">当前位置：<a href=\"#\">首页</a>><h1>碎言碎语</h1></div>\r\n");
      out.write("           \t</div>\r\n");
      out.write("           \t<div id='critize-textarea' style='padding-bottom: 5px;padding-top:5px;height: 80px;width: 919px;background-color: white;'>\r\n");
      out.write("               \t\t\t<textarea style='text-align:left; width: 600px;margin-left:100px;  height: 80px;overflow-y:hidden;float: left;background-color: #E3E3E5'></textarea>               \t\t            \t\t\t\r\n");
      out.write("               \t\t\t<div class='button2' onclick='clear_say(this);'>清空</div>\r\n");
      out.write("               \t\t\t<div class='button2' onclick='send_say(this);'>发送</div>            \t\t\t\r\n");
      out.write("            </div> \r\n");
      out.write("\t\t\t<div id='chat'>\r\n");
      out.write("\t\t\t\t <ul class=\"say_box\">\r\n");
      out.write("                     <div class=\"sy\">\r\n");
      out.write("                         <p> 时间好象一把尺子，它能衡量奋斗者前进的进程。\r\n");
      out.write("                         时间如同一架天平，它能称量奋斗者成果的重量；\r\n");
      out.write("                         时间就像一把皮鞭，它能鞭策我们追赶人生的目标。时间犹如一面战鼓，它能激励我们加快前进的脚步。</p>\r\n");
      out.write("                     </div>\r\n");
      out.write("                  <span class=\"dateview\">0000-00-00 00:00:00</span>\r\n");
      out.write("          \t\t</ul>\r\n");
      out.write("\t\t\t</div>\r\n");
      out.write("   \r\n");
      out.write("         <div class=\"clear\"></div>\t   \r\n");
      out.write("         </div>\r\n");
      out.write("    \t <!-- 聊天室结束 -->\r\n");
      out.write("    \r\n");
      out.write("    \r\n");
      out.write("    <!--footer start-->\r\n");
      out.write("    <div id=\"footer\">\r\n");
      out.write("     <p>Design by:小白</p>\r\n");
      out.write("    </div>\r\n");
      out.write("    <!--footer end-->\r\n");
      out.write("    \r\n");
      out.write("    \r\n");
      out.write("<!-- 进度条 -->\r\n");
      out.write("<div id='loading_shade_div' style=\"display:none;z-index: 2000;\">\r\n");
      out.write("<div id ='loading-mask'></div>\r\n");
      out.write("<div id ='loading' style='vertical-align: bottom;position:fixed;margin-bottom:50px;'>\r\n");
      out.write("<img src ='");
      out.print(basePath);
      out.write("/icons/loading.gif'  width ='50'  height ='37' style ='margin-right:8px;float:left;vertical-align:bottom;'/>\r\n");
      out.write("&nbsp;&nbsp;&nbsp;&nbsp;<span id ='loading-msg'></span>\r\n");
      out.write("</div>\r\n");
      out.write("</div>    \r\n");
      out.write("    <script type=\"text/javascript\">jQuery(\".lanmubox\").slide({easing:\"easeOutBounce\",delayTime:400});</script>\r\n");
      out.write("<!--     <script  type=\"text/javascript\" src=\"js/nav.js\"></script> -->\r\n");
      out.write("    <script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/blog/js/blog.js\"></script>\r\n");
      out.write("    <script  type=\"text/javascript\">\r\n");
      out.write("\tvar path = '");
      out.print(path);
      out.write("';\r\n");
      out.write("    </script>\r\n");
      out.write("\t\r\n");
      out.write("</body>\r\n");
      out.write("</html>\r\n");
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
