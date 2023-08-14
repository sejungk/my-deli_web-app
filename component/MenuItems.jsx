"use client"

import React, { useState, useEffect } from "react";
import styles from "../styles/MenuItems.module.css";
import MenuItemCard from "./MenuItemCard";
import axios from "axios";

const MenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);

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
  console.log(groupedMenuItems)

  // Group menu items by category
  menuItems.forEach((menuItem) => {
    const categoryName = menuItem.category_name;
    if (!groupedMenuItems[categoryName]) {
      groupedMenuItems[categoryName] = [];
    }
    groupedMenuItems[categoryName].push(menuItem);
  });

  // return (
  //   <div className={styles.container}>
  //     {Object.keys(groupedMenuItems).map((categoryName) => (
  //       <div key={categoryName} className={styles.categoryText}>
  //         <h1 className={styles.category}>{categoryName}</h1>
  //         <div className={styles.wrapper}>
  //           {groupedMenuItems[categoryName].map((menuItem) => (
  //             <MenuItemCard
  //               key={menuItem.id}
  //               name={menuItem.name}
  //               description={menuItem.description}
  //               base_price={parseFloat(menuItem.base_price)}
  //             />
  //           ))}
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );

  return (
    <div className={styles.container}>
      {Object.keys(groupedMenuItems).map((categoryName) => (
        <div key={categoryName} className={styles.categoryText}>
          <h1 className={styles.category}>{categoryName}</h1>
          <div className={styles.wrapper}>
            {groupedMenuItems[categoryName].map((menuItem) => (
              <MenuItemCard
                key={menuItem.menu_item_id}
                name={menuItem.menu_item_name}
                description={menuItem.menu_item_description}
                base_price={parseFloat(menuItem.menu_item_base_price)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuItems;

