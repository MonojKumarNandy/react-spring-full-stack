package com.demo.shopping.model;

import java.util.Date;

public class MenuItem {

	private int id;

	private String name;

	private float price;
	private boolean active;
	private String category;
	private Date dateOfLaunch;
	private boolean freeDelivery;
	private String imgSrc;

	public MenuItem(int id, String name, float price, boolean active, String category, Date dateOfLaunch,
			boolean freeDelivery, String imgSrc) {
		super();
		this.id = id;
		this.name = name;
		this.price = price;
		this.active = active;
		this.category = category;
		this.dateOfLaunch = dateOfLaunch;
		this.freeDelivery = freeDelivery;
		this.imgSrc = imgSrc;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Date getDateOfLaunch() {
		return dateOfLaunch;
	}

	public void setDateOfLaunch(Date dateOfLaunch) {
		this.dateOfLaunch = dateOfLaunch;
	}

	public boolean isFreeDelivery() {
		return freeDelivery;
	}

	public void setFreeDelivery(boolean freeDelivery) {
		this.freeDelivery = freeDelivery;
	}

	public String getImgSrc() {
		return imgSrc;
	}

	public void setImgSrc(String imgSrc) {
		this.imgSrc = imgSrc;
	}

	public MenuItem() {
		super();
	}

	@Override
	public String toString() {
		return "MenuItem [id=" + id + ", name=" + name + ", price=" + price + ", active=" + active + ", category="
				+ category + ", dateOfLaunch=" + dateOfLaunch + ", freeDelivery=" + freeDelivery + ", imgSrc=" + imgSrc
				+ "]";
	}

}
