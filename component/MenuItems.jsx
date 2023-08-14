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
        setMenuItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.categoryText}>
        <h1 className={styles.category}>Breakfast</h1>
        <h3 className={styles.subcategory}>Breakfast Sandwiches</h3>
      </div>
      <div className={styles.wrapper}>
        {menuItems.map((menuItem) => (
          <MenuItemCard
            key={menuItem.id}
            name={menuItem.name}
            description={menuItem.description}
            base_price={parseFloat(menuItem.base_price)}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuItems;


//   return (
//     <div className={styles.container}>
//       <div className={styles.categoryText}>
//         <h1 className={styles.category}>Breakfast</h1>
//         <h3 className={styles.subcategory}>Breakfast Sandwiches</h3>
//       </div>
//         <div className={styles.wrapper}>
//           <MenuItemCard />
//           <MenuItemCard />
//           <MenuItemCard />
//           <MenuItemCard />
//           <MenuItemCard />
//           <MenuItemCard />
//           <MenuItemCard />
//           <MenuItemCard />
//           <MenuItemCard />
//           <MenuItemCard />
//           <MenuItemCard />
//           <MenuItemCard />
//         </div>
//     </div>
//   )
// }
