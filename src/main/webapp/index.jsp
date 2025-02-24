<%-- 
    Document   : index
    Created on : Feb 20, 2025, 4:34:55 PM
    Author     : brandonescudero
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Test form</title>
    </head>
    <body>
        <h1>Customer data</h1>
        
        <form action="UserService" method="POST">
            <label for="fname">ID</label>
            <input type="text" id="numDocument" name="numDocument">
            
            <label for="lname">Name</label>
            <input type="text" id="name" name="name">
            
            <label for="lname">Last name</label>
            <input type="text" id="lastName" name="lastName">
            
            <label for="lname">Phone</label>
            <input type="text" id="phone" name="phone">
            
            <button type="submit">Send</button>
        </form>
        
        
        <h1>View user list</h1>
        <form action="UserService" method="GET">
            <button type="submit">View</button>
        </form>
    </body>
</html>
