<%-- 
    Document   : index
    Created on : Mar 9, 2025, 11:53:54 PM
    Author     : brandonescudero
--%>

<%@page import="Persistence.BookJpaController"%>
<%@page import="Persistence.AuthorJpaController"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Hello World!</h1>
        <%
            AuthorJpaController AuthorJpaController = new AuthorJpaController();
            BookJpaController   BookJpaController   = new BookJpaController();
        %>
    </body>
</html>
