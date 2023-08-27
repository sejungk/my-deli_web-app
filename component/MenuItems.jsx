"use client"

import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/MenuItems.module.css";
import MenuItemCard from "./MenuItemCard";
import MenuItemModal from "./MenuItemModal";
import axios from "axios";

const MenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null); // To store the selected item
  const [isModalOpen, setIsModalOpen] = useState(false);

  // console.log(cartItems)
  useEffect(() => {
    // Fetch menu items from the backend API
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

  const groupedMenuItems = {}; // Object to store grouped menu items

  // Group menu items by category
  menuItems.forEach((menuItem) => {
    const categoryName = menuItem.category_name;
    if (!groupedMenuItems[categoryName]) {
      groupedMenuItems[categoryName] = [];
    }
    groupedMenuItems[categoryName].push(menuItem);
  });

  // Function to open the modal and set the selected item
  // const openModal = (menuItem) => {
  //   console.log("OPEN")
  //   setSelectedMenuItem(menuItem);
  //   setIsModalOpen(true);
  // };

  const openModal = (menuItem) => {
    console.log(selectedMenuItem);
    setSelectedMenuItem(menuItem);
    setIsModalOpen(true);
  };

  useEffect(() => {
    console.log(selectedMenuItem); // Log when selectedMenuItem changes
  }, [selectedMenuItem]);

  // Function to close the modal
  const closeModal = () => {
    setSelectedMenuItem(null);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      {Object.keys(groupedMenuItems).map((categoryName) => (
        <div key={categoryName} className={styles.categoryText}>
          <h1 className={styles.category}>{categoryName}</h1>
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

      {isModalOpen && (
              <MenuItemModal
              menuItem={selectedMenuItem}
              closeModal={closeModal}
              />
        // <MenuItemModal menuItem={selectedMenuItem} closeModal={closeModal} />
      )}
    </div>
  );
};

export default MenuItems;


