'use client'

import React, { useEffect, useContext, useState} from 'react';
import styles from "../styles/Cart.module.css";
import { CartContext } from '../app/CartContext';
import Image from "next/image";
import CartItem from "./CartItem";
import Link from "next/link";
import PickupDateModal from "./PickupDateModal";

const Cart = () => {
  const [isPickupDateModalVisible, setIsPickupDateModalVisible] = useState(false);
  const { cartItems, checkout, editItemData, removeFromCart, updateSelectedPickupDateTime, selectedPickupDateTime, dateOptions, timeOptions } = useContext(CartContext);

  const handleCheckout = () => {
    const { date, time } = selectedPickupDateTime;
    updateSelectedPickupDateTime(date, time);
  };

   // Callback function to handle the selected date and time
   const handlePickupDateTimeSelection = (date, time) => {
     if (!date) date = selectedPickupDateTime.date;
     if (!time) time = selectedPickupDateTime.time;

    // Only update the state if a different date or time is selected
    if (date !== selectedPickupDateTime.date || time !== selectedPickupDateTime.time) {
      updateSelectedPickupDateTime(date, time);
    }
  };

  const toggleModal = () => {
    setIsPickupDateModalVisible((prev) => !prev);
  }

  const handleTogglePickupDateModal = () => {
    setIsPickupDateModalVisible(!isPickupDateModalVisible);
  };

  // Function to handle editing an item
  const handleEditItem = (item) => {
    setEditItemData(item);
    setIsMenuItemModalVisible(true);
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  // Function to handle saving the edited item
  const handleSaveEdit = (updatedItemData) => {
    // Find the item in cartItems based on some unique identifier, e.g., cartItemId
    const updatedCartItems = cartItems.map((item) => {
      if (item.cartItemId === updatedItemData.cartItemId) {
        return updatedItemData;
      }
      return item;
    });
    // Close the modal
    closeModal();
  };

  let subtotal = cartItems.reduce((acc, item) => acc + parseFloat(item.base_price), 0);

  return (
    <div className={styles.container}>
      <div className={styles.pickupDetailSection}>
        <h5>Pickup Order Summary</h5>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <Image src="/img/location-icon.svg" layout="fill" alt="location icon" />
          </div>
          <p>521 Broadway St, Quantico</p>
        </div>
        <div className="bttn bttn_outline bttn_center" onClick={toggleModal}>
          {selectedPickupDateTime ? (
            <span>{`${selectedPickupDateTime.date} ${selectedPickupDateTime.time}`}</span>
          ) : (
            <span>Select Pickup Date &amp; Time</span>
          )}
        </div>
        {isPickupDateModalVisible && (
          <PickupDateModal
            onCancel={handleTogglePickupDateModal}
            handlePickupDateTimeSelection={handlePickupDateTimeSelection}
            dateOptions={dateOptions}
            timeOptions={timeOptions}
            toggleModal={toggleModal}
            selectedPickupDateTime={selectedPickupDateTime}
          />
        )}
      </div>

      <hr />

      <div className={styles.addedItemSection}>
        {cartItems.map((item, index) => (
          <React.Fragment key={index}>
            <CartItem
              key={item.cartItemId}
              item={item}
              editItemData={editItemData}
              onEditItem={handleEditItem}
              onRemove={handleRemoveItem}
            />
            {index < cartItems.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </div>

      <hr />

      <div className={styles.subtotalSection}>
        <div className={styles.subtotalInfo}>
          <h5>Subtotal</h5>
          <h5>${(subtotal ?? 0).toFixed(2)}</h5>
        </div>
        <Link href="/checkout" className="text-decoration-none">
          <div className="bttn bttn_red bttn_center" onClick={handleCheckout}>
              <span>Checkout</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
