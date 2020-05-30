package com.demo.shopping.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.shopping.dao.MenuItemDao;
import com.demo.shopping.model.MenuItem;


@Service
public class MenuItemServiceImpl implements MenuItemService {
	
	@Autowired
	private MenuItemDao menuItemDao;

	@Override
	public List<MenuItem> getMenuItemListAdmin() {
		
		return menuItemDao.getMenuItemListAdmin();
	}

	@Override
	public List<MenuItem> getMenuItemListCustomer() {
	
		return menuItemDao.getMenuItemListCustomer();
	}

	@Override
	public MenuItem getMenuItem(long id) {
		
		return menuItemDao.getMenuItem(id);
	}

	@Override
	public void modifyMenuItem(MenuItem menuItem) {
		
     menuItemDao.modifyMenuItem(menuItem);
	}

}
