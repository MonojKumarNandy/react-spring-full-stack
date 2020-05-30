package com.demo.shopping.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.stereotype.Component;

import com.demo.shopping.exception.UserAlredyExistsException;
import com.demo.shopping.model.User;

@Component
public class UserDao {

	@Autowired
	InMemoryUserDetailsManager inMemoryUserDetailsManager;

	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	public void signUp(User user) throws UserAlredyExistsException {
		System.out.println("sgnup dao");
		if (!inMemoryUserDetailsManager.userExists(user.getUsername())) {
			inMemoryUserDetailsManager
					.createUser(org.springframework.security.core.userdetails.User.withUsername(user.getUsername())
							.password(passwordEncoder().encode(user.getPassword())).roles("USER").build());
		} else {
			throw new UserAlredyExistsException("User Already Exist");
		}
	}

}
