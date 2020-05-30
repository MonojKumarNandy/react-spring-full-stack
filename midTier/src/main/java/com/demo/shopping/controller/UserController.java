package com.demo.shopping.controller;

//import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.shopping.exception.UserAlredyExistsException;
import com.demo.shopping.model.User;
import com.demo.shopping.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping
	// public void signUp(@RequestBody @Valid User user) throws
	// UserAlredyExistsException
	public void signUp(@RequestBody User user) throws UserAlredyExistsException {
		System.out.println(user);
		userService.signUp(user);
	}

}
