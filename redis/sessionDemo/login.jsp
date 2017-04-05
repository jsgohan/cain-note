<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <title>Session Demo</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">
</head>

<body>

<h2>Session Demo in Tomcat</h2>
<form action="/user?type=login" method="post">
    用户名：<input type="text" name="userName"/><br/>
    密码：<input type="password" name="userPassword"/><br/>
    <input type="submit" value="login">
</form>

</body>
</html>
