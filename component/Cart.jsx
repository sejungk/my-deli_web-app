'use client'

import React, { createContext, useContext, useState} from 'react';
import styles from "../styles/Cart.module.css";
import { CartContext } from '../app/CartContext';
import Image from "next/image";
import CartItem from "./CartItem";
import Link from "next/link";
import PickupDateModal from "./PickupDateModal";
import MenuItemModal from './MenuItemModal';

const Cart = () => {
  const [isPickupDateModalVisible, setIsPickupDateModalVisible] = useState(false);
  const { cartItems, checkout, editItemData, setEditItem, removeFromCart } = useContext(CartContext);

  const handleCheckout = () => {
    checkout();
  };

  const handleTogglePickupDateModal = () => {
    setIsPickupDateModalVisible(!isPickupDateModalVisible);
  };

  // Function to handle editing an item
  const handleEditItem = (item) => {
    setEditItemData(item);
    setIsMenuItemModalVisible(true);
  };

  const handleRemoveItem = (itemId) => {
    // Call removeFromCart with the item ID to remove it from the cart
    console.log(itemId)
    removeFromCart(itemId);
  };

  // Function to handle saving the edited item
  const handleSaveEdit = (updatedItemData) => {
    // Implement your update logic here
    // Find the item in cartItems based on some unique identifier, e.g., cartItemId
    const updatedCartItems = cartItems.map((item) => {
      if (item.cartItemId === updatedItemData.cartItemId) {
        // Update the item with the edited data
        return updatedItemData;
      }
      return item;
    });

    // Update the cart with the edited data (assuming you have a function for this in your CartContext)
    // For example, if you have a setCartItems function in CartContext:
    // setCartItems(updatedCartItems);

    // Close the modal
    setIsMenuItemModalVisible(false);
  };

  const closeModal = () => {
    setIsMenuItemModalVisible(false);
  };

  let subtotal = cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0);

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
        <div className="bttn bttn_outline bttn_center" onClick={handleTogglePickupDateModal}>
          <span>Mon, Jun 12 8:45 am</span>
        </div>
        {isPickupDateModalVisible && (
          <PickupDateModal
            onCancel={handleTogglePickupDateModal}
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
      {/* {isMenuItemModalVisible && (
        <MenuItemModal
          menuItem={editItemData}
          closeModal={closeModal}
          editItemData={editItemData}
          onSaveEdit={handleSaveEdit}
        />
      )} */}
    </div>
  );
};

export default Cart;
