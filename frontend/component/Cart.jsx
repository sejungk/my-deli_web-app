'use client'

import React, { useEffect, useContext, useState} from 'react';
import styles from "../styles/Cart.module.css";
import { CartContext } from '../app/CartContext';
import Image from "next/image";
import CartItem from "./CartItem";
import Link from "next/link";
import PickupDateModal from "./PickupDateModal";
import EmptyCart from './EmptyCart';

const Cart = ({ onToggleCart }) => {
  const [isPickupDateModalVisible, setIsPickupDateModalVisible] = useState(false);
  const [isPickupTimeValid, setIsPickupTimeValid] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isCentered, setIsCentered] = useState(false);
  const [initialModalPosition, setInitialModalPosition] = useState(null);
  const { cartItems, editItemData, removeFromCart, updateSelectedPickupDateTime, selectedPickupDateTime, subtotal } = useContext(CartContext);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const modal = document.getElementById('cartModal');
    const modalRect = modal.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const centerPosition = (viewportHeight - modalRect.height) / 2;
    const minPosition = viewportHeight * 0.6;

    const newPosition = Math.max(centerPosition, 175 - scrollPosition / 2);
    if (modal) modal.style.top = `${newPosition}px`;
  }, [scrollPosition]);

  //  useEffect(() => {
  //   // Get the modal and viewport dimensions
  //   const modal = document.getElementById('cartModal');
  //   const modalRect = modal.getBoundingClientRect();
  //   const viewportHeight = window.innerHeight;

  //   // Calculate the initial modal position
  //   const initialPosition = (viewportHeight - modalRect.height) / 2;

  //   setInitialModalPosition(initialPosition);
  // }, []);

  // useEffect(() => {
  //   const modal = document.getElementById('cartModal');
  //   if (modal) {
  //     const modalHeight = modal.offsetHeight;
  //     const viewportHeight = window.innerHeight;
  //     const position = (viewportHeight - modalHeight) / 2;

  //     modal.style.top = `${position}px`;
  //   }
  // }, []);

  // useEffect(() => {
  //   const modal = document.getElementById('cartModal');
  //   if (modal) {
  //     const modalHeight = modal.offsetHeight;
  //     const viewportHeight = window.innerHeight;
  //     const position = (viewportHeight - modalHeight) / 2;

  //     modal.style.top = `${position}px`;
  //   }
  // }, []);


  // Real-time time validation effect
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      const selectedTime = new Date(selectedPickupDateTime.date + ' ' + selectedPickupDateTime.time);

      // Check if the selected time is in the past
      setIsPickupTimeValid(selectedTime >= currentTime);
    }, 60000); // Check every minute

    // console.log(selectedPickupDateTime)
    return () => clearInterval(interval);
  }, [selectedPickupDateTime]);

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

  return (
    <div className={styles.container} id="cartModal">
      <div className={styles.pickupDetailSection}>
        <div className={styles.closeIcon} onClick={onToggleCart}>
            <Image className={styles.icon} src="./img/x-icon.svg" layout="fill" alt="location icon" />
        </div>
        <h5>Pickup Order Summary</h5>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <Image src="./img/location-icon.svg" layout="fill" alt="location icon" />
          </div>
          <p>521 Broadway St, Quantico</p>
        </div>
        <div className="bttn bttn_outline bttn_center bttn_full-width" onClick={toggleModal}>
          {selectedPickupDateTime ? (
            <span>{`${selectedPickupDateTime.date}, ${selectedPickupDateTime.time.split(' - ')[0]}`}</span>
          ) : (
            <span>Select Pickup Date &amp; Time</span>
          )}
        </div>
        {isPickupDateModalVisible && (
          <PickupDateModal
            onCancel={handleTogglePickupDateModal}
            handlePickupDateTimeSelection={handlePickupDateTimeSelection}
            toggleModal={toggleModal}
          />
        )}
      </div>

      <hr />

      <div className={styles.cartItemSection}>
        <div className={styles.addedItemSection}>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
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
            ))
          ) : (
            <EmptyCart />
          )}
        </div>
      </div>

      <hr />

      <div className={styles.subtotalSection}>
        <div className={styles.subtotalInfo}>
          <h5>Subtotal</h5>
          <h5>${subtotal.toFixed(2)}</h5>
        </div>
        {cartItems.length === 0 ? (
          <div className={`${styles.checkoutButton} bttn bttn_red bttn_center bttn_disabled`}>
            <span>Checkout</span>
          </div>
        ) : (
          <Link href="/checkout" className="text-decoration-none">
            <div className={`${styles.checkoutButton} bttn bttn_red bttn_center`}
             onClick={handleCheckout}>
              <span>Checkout</span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Cart;

