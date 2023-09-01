import React, { useState, useContext } from "react";
import styles from "../styles/CartItem.module.css";
import { CartContext } from '../app/CartContext';
import MenuItemModal from '../component/MenuItemModal';

const CartItem = ({ item, closeModal, editItemData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { removeFromCart } = useContext(CartContext);

  const handleRemoveClick = () => {
    setIsModalVisible(true);
  };

  const handleCancelRemove = () => {
    setIsModalVisible(false);
  };

  const handleConfirmRemove = () => {
    removeFromCart(item.cartItemId);
    setIsModalVisible(false);
  };

  const handleEditClick = () => {
    setIsModalVisible(true); // Open the edit modal
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
        {editItemData ? (
          <a onClick={""}>Save Edit</a>
        ) : (
          <React.Fragment>
            <a onClick={handleEditClick}>Edit</a>
            <a onClick={handleRemoveClick}>Remove</a>
          </React.Fragment>
        )}
        {/* <a onClick={handleEditClick}>Edit</a>
        <a onClick={handleRemoveClick}>Remove</a> */}
      </div>
      {isModalVisible && (
        <MenuItemModal
          menuItem={item}
          closeModal={closeModal}
          operationType="edit"
        />
      )}
    </div>
  );
};

export default CartItem;
