import React, { useContext } from "react";
import styles from "../styles/CartItem.module.css";
import { CartContext } from '../app/CartContext';

const CartItem = ({ item, onRemove }) => {
  const handleRemoveClick = () => {
    // Call the onRemove callback with the item ID when the "Remove" button is clicked
    onRemove(item.id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.singleItemHeader}>
        <span className={styles.itemQuantity}>{item.quantity}</span>
        <span className={styles.itemName}>{item.name}</span>
        <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>
      </div>
      <div className={styles.optionGroup}>
        {item.option_groups && Object.keys(item.option_groups).map((optionKey, index) => (
          <div className={styles.optionGroupWrapper} key={index}>
            <span>{item.option_groups[optionKey].name}</span>
          </div>
        ))}
      </div>
      <div className={styles.editRemoveOptions}>
        <a href="url">Edit</a>
        <a onClick={handleRemoveClick}>Remove</a>
      </div>
    </div>
  );
};

export default CartItem;
