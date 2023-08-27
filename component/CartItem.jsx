import React from "react";
import styles from "../styles/CartItem.module.css";

const CartItem = ({ item }) => {
  console.log(item)
  return (
    <div className={styles.container}>
      <div className={styles.singleItemHeader}>
        <span className={styles.itemQuantity}>{item.quantity}</span>
        <span className={styles.itemName}>{item.name}</span>
        <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>
      </div>
      <ol className={styles.addOnsList}>
        {item.addOns.map((addOn, index) => (
          <li key={index}>
            <span>{addOn}</span>
          </li>
        ))}
      </ol>
      <div className={styles.editRemoveOptions}>
        <a href="url">Edit</a>
        <a href="url">Remove</a>
      </div>
    </div>
  );
};

export default CartItem;
