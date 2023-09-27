"use client"

import React from "react";
import styles from "../styles/MenuItemCard.module.css";

const MenuItemCard = ({ name, description, base_price }) => {
  const calculateMaxHeight = () => {
    const fontSize = parseFloat(getComputedStyle(document.body).getPropertyValue("--p-font-size"));
    const numberOfLines = 3; // Adjust this as needed
    const lineHeightPercentage = parseFloat(getComputedStyle(document.body).getPropertyValue("--p-line-height")) / 100;
    return `${fontSize * lineHeightPercentage * numberOfLines}px`;
  };

  return (
    <section className={styles.container}>
      <div>
        <h4 className={styles.itemName}>{name}</h4>
        <p className={styles.itemDesc} style={{ maxHeight: calculateMaxHeight() }}>{description}</p>
      </div>
      <p className={styles.itemPrice}>${parseFloat(base_price).toFixed(2)}</p>
    </section>
  );
};

export default MenuItemCard;

