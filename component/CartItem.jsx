import React, { useContext } from "react";
import styles from "../styles/CartItem.module.css";
import { CartContext } from '../app/CartContext';

const CartItem = ({ item }) => {
  const { cartItems } = useContext(CartContext);
  console.log();

  return (
    <div className={styles.container}>
      <div className={styles.singleItemHeader}>
        <span className={styles.itemQuantity}>{item.quantity}</span>
        <span className={styles.itemName}>{item.name}</span>
        <span className={styles.itemPrice}>${item.price}</span>
      </div>
      <ol className={styles.optionGroup}>
        {item.option_groups && Object.keys(item.option_groups).map((optionKey, index) => (
          <li key={index}>
            <span>{item.option_groups[optionKey].name}</span>
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
