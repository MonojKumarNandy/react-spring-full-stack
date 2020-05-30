package com.demo.shopping.dao;

import java.util.List;

import com.demo.shopping.model.MenuItem;



public interface MenuItemDao {
	public List<MenuItem> getMenuItemListAdmin();
	public List<MenuItem>getMenuItemListCustomer();
	public void modifyMenuItem(MenuItem menuItem);
	public MenuItem getMenuItem(long menuItemId);

}
