package com.demo.shopping.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.shopping.dao.CartDao;
import com.demo.shopping.exception.CartEmptyException;
import com.demo.shopping.model.Cart;


@Service
public class CartServiceImpl implements CartService {
	
	@Autowired
	private CartDao cartdao;

	@Override
	public Cart getAllcartItems(String user) throws CartEmptyException {
		
		return cartdao.getAllCartItems(user);
	}

	@Override
	public void addCartItem(String user, long menuItemId) {
		cartdao.addCartItem(user, menuItemId);
	}

	@Override
	public void removeCartItem(String user, long menuItemId,boolean clearCart) {
		cartdao.removeCartItem(user, menuItemId,clearCart);

	}

}
