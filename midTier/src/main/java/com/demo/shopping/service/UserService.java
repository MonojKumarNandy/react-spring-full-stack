package com.demo.shopping.service;

import com.demo.shopping.exception.UserAlredyExistsException;
import com.demo.shopping.model.User;

public interface UserService {
	
	
	
	public  void signUp(User user) throws UserAlredyExistsException ;

}
