package com.demo.shopping.dao;

import com.demo.shopping.exception.CartEmptyException;
import com.demo.shopping.model.Cart;

public interface CartDao {
	public void addCartItem(String user ,long menuItemId);
	public Cart getAllCartItems(String user ) throws CartEmptyException;
	public void removeCartItem(String user , long menuItemId,boolean clearCart);

}
