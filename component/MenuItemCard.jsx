"use client"

import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styles from "../styles/MenuItemCard.module.css";

const MenuItemCard = ({ name, description, base_price }) => {

  // function to calculate max height of description text container
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

// define the expected types and requirements of the props
MenuItemCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  base_price: PropTypes.number.isRequired,
};

export default MenuItemCard;

