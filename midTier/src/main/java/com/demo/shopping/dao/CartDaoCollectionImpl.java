package com.demo.shopping.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Component;

import com.demo.shopping.exception.CartEmptyException;
import com.demo.shopping.model.Cart;
import com.demo.shopping.model.CartItems;
import com.demo.shopping.model.MenuItem;

@Component
public class CartDaoCollectionImpl implements CartDao {

	private static HashMap<String, Cart> userCarts;

	public CartDaoCollectionImpl() {
		if (userCarts == null)
			userCarts = new HashMap<>();
	}

	@Override
	public void addCartItem(String user, long menuItemId) {

		MenuItemDao menuItemDao = new MenuItemDaoCollectionImpl();
		boolean added = false;
		if (userCarts.containsKey(user)) {
			System.out.println("Insode if");
			List<CartItems> userCart = userCarts.get(user).getItems();
			for (CartItems cartItems : userCart) {
				if (cartItems.getId() == menuItemId) {
					cartItems.setQuantity(cartItems.getQuantity() + 1);
					added = true;
					break;
				}
			}
			if (!added) {
				List<CartItems> cartList = userCarts.get(user).getItems();
				CartItems cartItem = new CartItems();
				MenuItem foodItem = menuItemDao.getMenuItem(menuItemId);

				cartItem.setFoodItem(foodItem);
				cartItem.setId((int) menuItemId);
				cartItem.setQuantity(1);

				cartList.add(cartItem);
				Cart cart = new Cart();
				cart.setItems(cartList);
				double total = 0;
				for (CartItems cItem : cartList) {
					total += (cItem.getFoodItem().getPrice() * cItem.getQuantity());
				}

				cart.setTotal(total);
				userCarts.put(user, cart);
			}

		} else {

			System.out.println("Insode else");
			CartItems cartItem = new CartItems();
			MenuItem foodItem = menuItemDao.getMenuItem(menuItemId);

			cartItem.setFoodItem(foodItem);
			cartItem.setId((int) menuItemId);
			cartItem.setQuantity(1);

			List<CartItems> cartItems = new ArrayList<CartItems>();
			cartItems.add(cartItem);
			Cart cart = new Cart(cartItems, 0.0);
			userCarts.put(user, cart);
		}

	}

	@Override
	public Cart getAllCartItems(String user) throws CartEmptyException {

		if (userCarts.containsKey(user)) {
			Cart cart = userCarts.get(user);
			List<CartItems> cartList = cart.getItems();
			if (cartList.isEmpty()) {
				throw new CartEmptyException();
			} else {
				Double total = 0.0;
				for (CartItems menuItem : cartList) {
					total += (menuItem.getFoodItem().getPrice() * menuItem.getQuantity());
				}
				cart.setTotal(total);
				return cart;
			}
		} else {
			throw new CartEmptyException();
		}

	}

	@Override
	public void removeCartItem(String user, long menuItemId, boolean clearCart) {

		if (userCarts.containsKey(user)) {
			Cart cart = userCarts.get(user);
			List<CartItems> cartItems = cart.getItems();
			for (CartItems item : cartItems) {
				if ((item.getId() == menuItemId && item.getQuantity() == 1) || clearCart == true) {
					cart.setTotal(cart.getTotal() - item.getQuantity() * item.getFoodItem().getPrice());
					cart.getItems().remove(item);
					break;

				} else if (item.getId() == menuItemId) {
					cart.setTotal(cart.getTotal() - item.getFoodItem().getPrice());
					item.setQuantity(item.getQuantity() - 1);
					break;
				}
			}

		}

	}

}
