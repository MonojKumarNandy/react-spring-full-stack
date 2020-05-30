package com.demo.shopping.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.shopping.exception.CartEmptyException;
import com.demo.shopping.model.Cart;
import com.demo.shopping.service.CartService;

@RestController
@RequestMapping("/carts")
public class CartController {
	public static Logger LOGGER = LoggerFactory.getLogger(CartController.class);
	@Autowired
	private CartService cartService;

	@GetMapping("/{user}")
	public Cart getAllCartItems(@PathVariable String user) throws CartEmptyException {
		LOGGER.debug("Inside getAllCart Items");
		return cartService.getAllcartItems(user);

	}

	@PostMapping("/{user}/{menuItemId}")
	public Cart addAllCartItem(@PathVariable String user, @PathVariable long menuItemId) throws CartEmptyException {
		LOGGER.debug("Inside getAllCart Items");
		System.out.println("add cart");
		cartService.addCartItem(user, menuItemId);
		return cartService.getAllcartItems(user);

	}

	@DeleteMapping("/{user}/{menuItemId}/{clearCartItem}")
	public Cart removeCartItem(@PathVariable String user, @PathVariable long menuItemId, @PathVariable boolean clearCartItem) throws CartEmptyException {
		LOGGER.debug("Inside getAllCart Items");
		cartService.removeCartItem(user, menuItemId, clearCartItem);
		return cartService.getAllcartItems(user);
	}
}
