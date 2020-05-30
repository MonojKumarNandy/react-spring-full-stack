package com.demo.shopping.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.shopping.dao.UserDao;
import com.demo.shopping.exception.UserAlredyExistsException;
import com.demo.shopping.model.User;


@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserDao userdao;
	

	@Override
	public void signUp(User user) throws UserAlredyExistsException {
		System.out.println("sgnup srvc");
		userdao.signUp(user);
	
	}

}
