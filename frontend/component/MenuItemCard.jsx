"use client"

import React from "react";
import styles from "../styles/MenuItemCard.module.css";

const MenuItemCard = ({ name, description, base_price }) => {
  return (
    <section className={styles.container}>
      <div className={styles.textContainer}>
        <h4 className={`${styles.itemName} truncate-text`}>{name}</h4>
        <p className={`${styles.itemDesc} truncate-text`}>{description}</p>
      </div>
      <p className={styles.itemPrice}>${parseFloat(base_price).toFixed(2)}</p>
    </section>
  );
};
export default MenuItemCard;

