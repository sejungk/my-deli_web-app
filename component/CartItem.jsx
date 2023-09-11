import React, { useState, useContext } from "react";
import styles from "../styles/CartItem.module.css";
import { CartContext } from '../app/CartContext';
import RemoveItemModal from '../component/RemoveItemModal';
import MenuItemModal from './MenuItemModal';

const CartItem = ({ item, editItemData }) => {
  const [isMenuItemModalVisible, setIsMenuItemModalVisible] = useState(false);
  const [isPickupModalVisible, setIsPickupModalVisible] = useState(false);
  const { removeFromCart } = useContext(CartContext);

  const closeModal = () => setIsMenuItemModalVisible(false);
  const handleEditClick = () => setIsMenuItemModalVisible(true);
  const handleRemoveClick = () => setIsPickupModalVisible(true);
  const handleCancelRemove = () => setIsPickupModalVisible(false);
  const handleConfirmRemove = () => {
    removeFromCart(item.itemId);
    setIsPickupModalVisible(false);
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
      {isMenuItemModalVisible && (
        <MenuItemModal
          itemId={item.itemId}
          id={item.id}
          closeModal={closeModal}
          operationType="edit"
          selectedOptions={item.selectedOptions}
        />
      )}
      {/* Render the modal if it's visible */}
      {isPickupModalVisible && (
        <RemoveItemModal
          itemName={item.name} // Pass the correct item name
          onCancel={handleCancelRemove}
          onConfirm={handleConfirmRemove}
          isOpen={isPickupModalVisible}
        />
      )}
    </div>
  );
};

export default CartItem;
