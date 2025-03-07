<%-- 
    Document   : viewUser
    Created on : Feb 20, 2025, 5:00:11 PM
    Author     : brandonescudero
--%>

<%@page import="Entity.UserEntity"%>
<%@page import="java.util.List"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>View users</title>
    </head>
    <body>
        <h1>List of registered users</h1>
        
        <%
            List<UserEntity> listUser;
            int count;
            
            
            listUser = (List) request.getSession().getAttribute("listUser");
            count = 1;
        %>
        
        <table>
            <tr>
                <th>N°</th>
                <th>ID</th>
                <th>Name</th>
                <th>Last name</th>
                <th>Phone</th>
            </tr>
            
            <%
                for (UserEntity user : listUser)
                {
            %>
            
            <tr>
                <td><%=count%></td>
                <td><%=user.getNumDoc()%></td>
                <td><%=user.getName()%></td>
                <td><%=user.getLastName()%></td>
                <td><%=user.getPhone()%></td>
            </tr>
            
            <%
                count++;
                }
            %>
        </table>
    </body>
</html>
