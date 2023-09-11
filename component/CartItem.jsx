import React, { useState, useContext } from "react";
import styles from "../styles/CartItem.module.css";
import { CartContext } from '../app/CartContext';
import RemoveItemModal from '../component/RemoveItemModal';

const CartItem = ({ item }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { removeFromCart } = useContext(CartContext);

  const handleEditClick = () => setisMenuItemModalVisible(true);
  const handleRemoveClick = () => setIsModalVisible(true);
  const handleCancelRemove = () => setIsModalVisible(false);
  const handleConfirmRemove = () => {
    removeFromCart(item.itemId);
    setIsModalVisible(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.singleItemHeader}>
        <span className={styles.itemQuantity}>{item.quantity}</span>
        <span className={styles.itemName}>{item.name}</span>
        <span className={styles.itemPrice}>${item.base_price.toFixed(2)}</span>
      </div>
      <div className={styles.optionGroup}>
        {item.selectedOptions && Object.values(item.selectedOptions).map((option, index) => (
          <div className={styles.optionGroupWrapper} key={index}>
            <span>{option.name}</span>
          </div>
        ))}
      </div>
      <div className={styles.editRemoveOptions}>
        <a onClick={handleEditClick}>Edit</a>
        <a onClick={handleRemoveClick}>Remove</a>
      </div>
      {/* Render the modal if it's visible */}
      {isModalVisible && (
        <RemoveItemModal
          itemName={item.name} // Pass the correct item name
          onCancel={handleCancelRemove}
          onConfirm={handleConfirmRemove}
          isOpen={isModalVisible}
        />
      )}
    </div>
  );
};

export default CartItem;
