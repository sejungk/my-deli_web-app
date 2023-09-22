import React from "react";
import styles from "../styles/EmptyCart.module.css";

const EmptyCart = () => {
  return (
    <div className={styles.container}>
      <h4>No Orders Yet</h4>
      <p>Add an item to get started.</p>
    </div>
  );
};

export default EmptyCart;

