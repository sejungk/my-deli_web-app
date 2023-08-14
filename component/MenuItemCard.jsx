"use client"

import { useState, useEffect } from "react";
import styles from "../styles/MenuItemCard.module.css";

const MenuItemCard = ({ name, description, base_price }) => {

  return (
    <div className={styles.container}>
      <h5 className={styles.itemName}>{name}</h5>
      <p className={styles.itemDesc}>{description}</p>
      <p className={styles.itemPrice}>${parseFloat(base_price).toFixed(2)}</p>
    </div>
  );
};

export default MenuItemCard;
