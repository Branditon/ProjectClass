/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Services;

import Controller.UserController;
import Entity.UserEntity;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author brandonescudero
 */
@WebServlet(name = "UserService", urlPatterns = {"/UserService"})
public class UserService extends HttpServlet 
{
    UserController UserController = new UserController();
    

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException 
    {
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException 
    {
        List<UserEntity>        listUser;
        Gson                    gson;
        HttpSession             session;
        String                  json;
        
       
        listUser = UserController.find();
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        gson = new Gson();
        json = gson.toJson(listUser);
        
        response.getWriter().write(json);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException 
    {
        String action;
        boolean success;
        PrintWriter out;
        
        
        action = request.getParameter("action");
        out = response.getWriter();
        
        if (action == null) 
        {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"status\":\"error\", \"message\":\"No action provided\"}");
            out.flush();
            return;
        }
        
        switch (action) 
        {
            case "create":
                success = createUser(request);
                break;
            case "update":
                success = updateUser(request);
                break;
            case "delete":
                success = deleteUser(request);
                break;
            default:
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print("{\"status\":\"error\", \"message\":\"Invalid action\"}");
                out.flush();
                return;
        }
        
        if (success) 
        {
            out.print("{\"status\":\"success\"}");
        } else 
        {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"status\":\"error\"}");
        }
        
        out.flush();
    }
    
    private boolean createUser (HttpServletRequest request)
    {
        UserEntity userEntity;
        String numDocument, name, lastName, phone;
        
        
        numDocument = request.getParameter("numDocument");
        name = request.getParameter("name");
        lastName = request.getParameter("lastName");
        phone = request.getParameter("phone");
        
        userEntity = new UserEntity();
        userEntity.setNumDoc(numDocument);
        userEntity.setName(name);
        userEntity.setLastName(lastName);
        userEntity.setPhone(phone);
        
        return UserController.create(userEntity);
    }
    
    private boolean updateUser (HttpServletRequest request)
    {
        UserEntity userEntity, findUserEntity;
        String numDocument, name, lastName, phone;
        Long id;
        
        
        id = Long.valueOf(request.getParameter("id"));
        numDocument = request.getParameter("numDocument");
        name = request.getParameter("name");
        lastName = request.getParameter("lastName");
        phone = request.getParameter("phone");
        
        userEntity = new UserEntity();
        userEntity.setId(id);
        userEntity.setNumDoc(numDocument);
        userEntity.setName(name);
        userEntity.setLastName(lastName);
        userEntity.setPhone(phone);
        
        return UserController.edit(userEntity);
    }
    
    private boolean deleteUser (HttpServletRequest request) 
    {
        Long id;
        
        
        id = Long.valueOf(request.getParameter("id"));
        
        return UserController.detroy(id);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
