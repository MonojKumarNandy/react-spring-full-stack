package com.demo.shopping.model;

public class CartItems {
	int id;
	MenuItem foodItem;
	int quantity;

	public CartItems(int id, MenuItem foodItem, int quantity) {
		super();
		this.id = id;
		this.foodItem = foodItem;
		this.quantity = quantity;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public MenuItem getFoodItem() {
		return foodItem;
	}

	public void setFoodItem(MenuItem foodItem) {
		this.foodItem = foodItem;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public CartItems() {
	}
}
