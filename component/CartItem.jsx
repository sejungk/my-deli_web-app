import React, { useState, useContext } from "react";
import styles from "../styles/CartItem.module.css";
import { CartContext } from '../app/CartContext';
import MenuItemModal from '../component/MenuItemModal';

const CartItem = ({ item, editItemData }) => {
  const [isMenuItemModalVisible, setisMenuItemModalVisible] = useState(false);
  const { removeFromCart } = useContext(CartContext);

  const handleRemoveClick = () => removeFromCart(item.itemId);
  const handleEditClick = () => setisMenuItemModalVisible(true);
  const closeModal = () => setisMenuItemModalVisible(false);

  // console.log(editItemData)
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
    </div>
  );
};

export default CartItem;
