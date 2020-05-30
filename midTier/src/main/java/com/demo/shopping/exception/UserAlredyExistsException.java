package com.demo.shopping.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@SuppressWarnings("serial")
@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "User Already Exist")
public class UserAlredyExistsException extends Exception {
	
	public UserAlredyExistsException() {
		super();
	}
	
	public UserAlredyExistsException(String msg) {
		super(msg);
	}

}
