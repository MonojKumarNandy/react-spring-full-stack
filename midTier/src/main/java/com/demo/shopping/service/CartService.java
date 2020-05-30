package com.demo.shopping.service;

import com.demo.shopping.exception.CartEmptyException;
import com.demo.shopping.model.Cart;

public interface CartService {
	
	public Cart getAllcartItems(String user) throws CartEmptyException;
	public  void addCartItem(String user, long menuItemId);
	public void removeCartItem(String user, long menuItemId,boolean clearCart);

}
