package com.demo.shopping.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.shopping.ShoppingConstants;
import com.demo.shopping.model.MenuItem;
import com.demo.shopping.service.MenuItemService;

@RequestMapping("/menu-items")
@RestController
public class MenuItemController {
	public static Logger LOGGER = LoggerFactory.getLogger(MenuItemController.class);
	@Autowired
	InMemoryUserDetailsManager inMemoryUserDetailsManager;
	@Autowired
	private MenuItemService menuItemService;

	@GetMapping
	public List<MenuItem> getAllMenuItems()

	{
		LOGGER.debug("Inside All Menu items");
		System.out.println("eretrt");
		List<MenuItem> menuItemList;
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String user = authentication.getName();
		LOGGER.debug("Username " + user);
		if (user != "anonymousUser") {
			System.out.println("not ano");
			UserDetails userDetails = inMemoryUserDetailsManager.loadUserByUsername(user);
			LOGGER.debug("userdatails" + userDetails);
			String role = userDetails.getAuthorities().toArray()[0].toString();
			ShoppingConstants.LOGGER.debug("Role" + role);
			if (role.equals("ROLE_ADMIN")) {
				System.out.println("admin");
				LOGGER.debug("Inside Menu ItemList Admin get");
				menuItemList = menuItemService.getMenuItemListAdmin();

			} else {
				System.out.println("user");
				LOGGER.debug("Inside Menu ItemList Customer get");
				menuItemList = menuItemService.getMenuItemListCustomer();

			}
		} else {
			System.out.println("ano");
			LOGGER.debug("Inside Menu ItemList customer get");
			menuItemList = menuItemService.getMenuItemListCustomer();

		}

		return menuItemList;

	}

	@GetMapping("/{id}")
	public MenuItem getMenuItem(@PathVariable long id) {
		return menuItemService.getMenuItem(id);
	}

	@PutMapping
	public void modifyMenuItem(@RequestBody MenuItem menuItem) {
		System.out.println(menuItem);
		menuItemService.modifyMenuItem(menuItem);
	}

}
