"use client"

import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/MenuItemCard.module.css";

const MenuItemCard = ({ name, description, base_price }) => {
  const openModal = () => {

  }
  return (
    <section className={styles.container} onClick={openModal}>
      <h5 className={styles.itemName}>{name}</h5>
      <p className={styles.itemDesc}>{description}</p>
      <p className={styles.itemPrice}>${parseFloat(base_price).toFixed(2)}</p>
    </section>
  );
};

// define the expected types and requirements of the props
MenuItemCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  basePrice: PropTypes.number.isRequired,
};

export default MenuItemCard;
