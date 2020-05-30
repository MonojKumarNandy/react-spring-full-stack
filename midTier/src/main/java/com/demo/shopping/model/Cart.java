package com.demo.shopping.model;

import java.util.List;

public class Cart {

	private List<CartItems> items;
	private Double total;

	public Cart(List<CartItems> items, Double total) {
		super();
		this.items = items;
		this.total = total;
	}

	public Cart() {

	}

	public List<CartItems> getItems() {
		return items;
	}

	public void setItems(List<CartItems> items) {
		this.items = items;
	}

	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
		this.total = total;
	}

}
