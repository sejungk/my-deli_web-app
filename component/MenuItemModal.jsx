import React from "react";
import styles from "../styles/MenuItemModal.module.css";

const MenuItemModal = ({ menuItem, closeModal }) => {
  return (
    <div className={styles.container}>
      <div className={styles.modalContainer}>
        <h2>{menuItem.name}</h2>
        {/* Add any additional content you want */}
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default MenuItemModal;
