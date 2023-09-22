"use client"

import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/MenuItems.module.css";
import { CartContext } from '../app/CartContext';
import MenuItemCard from "./MenuItemCard";
import MenuItemModal from "./MenuItemModal";
import axios from "axios";

const MenuItems = ({ onToggleCart }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null); // To store the selected item
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cartItems } = useContext(CartContext);
  const time1030 = new Date(0, 0, 0, 10, 30, 0, 0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/menu-items")
      .then((response) => {
        console.log("API response:", response.data);
        setMenuItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      });
  }, []);

  const totalQuantity = cartItems.reduce((total, cartItem) => {
    if (cartItem && cartItem.quantity !== undefined) {
      return total + cartItem.quantity;
    }
    return total;
  }, 0);

  const currentTime = new Date();
  const isBreakfastTime = !(currentTime.getHours() >= 10 && currentTime.getHours() < 15);

  const filteredMenuItems = menuItems.filter((menuItem) => {
    if (isBreakfastTime) {
      // Display all items before 10:30 AM
      return true;
    } else {
      // Display items that do not belong to categories 1-7 after 10:30 AM
      const categoryId = menuItem.category_id;
      return categoryId < 1 || categoryId > 7;
    }
  });

  const groupedMenuItems = {};

  // Group menu items by category
  filteredMenuItems.forEach((menuItem) => {
    const categoryName = menuItem.category_name;
    if (!groupedMenuItems[categoryName]) {
      groupedMenuItems[categoryName] = [];
    }
    groupedMenuItems[categoryName].push(menuItem);
  });

  const openModal = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedMenuItem(null);
    setIsModalOpen(false);
  };

  // Function to format id name
  const formatId = (categoryName) => {
    const formattedId = categoryName.toLowerCase().replace(/[^a-z]+/g, '-');
    return formattedId;
  }

  return (
    <div className={styles.container}>
      {Object.keys(groupedMenuItems).map((categoryName) => (
        <div key={categoryName} id={formatId(categoryName)} className={styles.categoryText}>
          <h3 className={styles.category}>{categoryName}</h3>
          <div className={styles.wrapper}>
            {groupedMenuItems[categoryName].map((menuItem) => (
              <div className={styles.menuItemWrapper} key={menuItem.id} onClick={() => openModal(menuItem)}>
                <MenuItemCard
                  name={menuItem.name}
                  base_price={parseFloat(menuItem.base_price)}
                  description={menuItem.description}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {Object.keys(cartItems).length > 0 && (
        <div className={`${styles.viewOrderButton} bttn bttn_red`} onClick={onToggleCart}>
          <span>{totalQuantity} Item{totalQuantity > 1 ? 's' : ''} in Order</span>
        </div>
      )}

      {isModalOpen && (
        <MenuItemModal
        itemId={selectedMenuItem.itemId}
        id={selectedMenuItem.id}
        closeModal={closeModal}
        operationType={"add"}
        />
      )}
    </div>
  );
};

export default MenuItems;


