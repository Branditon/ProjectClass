/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Controller;

import Entity.UserEntity;
import Persistence.UserEntityJpaController;
import java.util.List;

/**
 *
 * @author brandonescudero
 */
public class UserController {
    UserEntityJpaController UserEntityJpaController = new UserEntityJpaController();
    
    public boolean create (UserEntity userEntity)
    {
        try
        {
            UserEntityJpaController.create(userEntity);
            
            return true;
        }
        catch (Exception e) 
        {
            e.printStackTrace();
            
            return false;
        }
    }
    
    public List<UserEntity> find ()
    {
        return UserEntityJpaController.findUserEntityEntities();
    }
    
    public boolean detroy (Long id)
    {
        try
        {
            UserEntityJpaController.destroy(id);
            
            return true;
        }
        catch (Exception e) 
        {
            e.printStackTrace();
            
            return false;
        }
    }
    
    public boolean edit (UserEntity userEntity)
    {
        try
        {
            UserEntityJpaController.edit(userEntity);
            
            return true;
        }
        catch (Exception e) 
        {
            e.printStackTrace();
            
            return false;
        }
    }
}
