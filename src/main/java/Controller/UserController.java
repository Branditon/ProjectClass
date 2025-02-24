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
    
    public void create (UserEntity userEntity)
    {
        UserEntityJpaController.create(userEntity);
    }
    
    public List<UserEntity> find ()
    {
        return UserEntityJpaController.findUserEntityEntities();
    }
}
