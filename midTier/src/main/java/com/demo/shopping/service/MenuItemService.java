package com.demo.shopping.service;

import java.util.List;

import com.demo.shopping.model.MenuItem;


public interface MenuItemService {
	public List<MenuItem> getMenuItemListAdmin();
	public List<MenuItem> getMenuItemListCustomer();
	public MenuItem getMenuItem(long id);
	public void modifyMenuItem(MenuItem menuItem);
}
