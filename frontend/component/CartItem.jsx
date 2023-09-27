import React, { useState, useContext } from "react";
import styles from "../styles/CartItem.module.css";
import { CartContext } from '../app/CartContext';
import RemoveItemModal from '../component/RemoveItemModal';
import MenuItemModal from './MenuItemModal';

const CartItem = ({ item }) => {
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

  const renderSelectedOptions = () => {
    const selectedOptionsArray = [];

    // Iterate through each option group
    for (const optionGroupName in item.selectedOptions) {
      // console.log(item.selectedOptions)
      if (optionGroupName === 'free_option_limit') continue;

      const optionGroup = item.selectedOptions[optionGroupName];

      // Check if the option group is an object (indicating multiple selections)
      if (typeof optionGroup === 'object') {
        for (const optionId in optionGroup) {
          const option = optionGroup[optionId];
          if (option && option.name) selectedOptionsArray.push(option.name);
        }
      } else {
        // Single selection
        if (optionGroup && optionGroup.name) {
          selectedOptionsArray.push(optionGroup.name);
        }
      }
    }

    return selectedOptionsArray.map((option, index) => (
      <div className={styles.optionGroupWrapper} key={index}>
        <span>{option}</span>
      </div>
    ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.singleItemHeader}>
        <span className={styles.itemQuantity}>{item.quantity}</span>
        <span className={styles.itemName}>{item.name}</span>
        <span className={styles.itemPrice}>${item.total_price.toFixed(2)}</span>
      </div>
      <div className={styles.optionGroup}>
        {renderSelectedOptions()}
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
          selectedQuantity={item.quantity}
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
