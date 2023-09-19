import React from "react";
import styles from "../styles/EmptyCart.module.css";

const EmptyCart = () => {
  return (
    <div className={styles.container}>
      <h4>Your Cart is Empty</h4>
      <p>Add an item to get started.</p>
    </div>
  );
};

export default EmptyCart;

