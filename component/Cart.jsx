'use client'

import React, { useEffect, useContext, useState} from 'react';
import styles from "../styles/Cart.module.css";
import { CartContext } from '../app/CartContext';
import Image from "next/image";
import CartItem from "./CartItem";
import Link from "next/link";
import PickupDateModal from "./PickupDateModal";
import MenuItemModal from './MenuItemModal';

const Cart = () => {
  const [isPickupDateModalVisible, setIsPickupDateModalVisible] = useState(false);
  const [selectedPickupDateTime, setSelectedPickupDateTime] = useState(null);
  const [dateOptions, setDateOptions] = useState([]);
  const [timeOptions, setTimeOptions] = useState([]);
  const time230 = new Date(0, 0, 0, 2, 30, 0, 0);

  console.log(selectedPickupDateTime);
  // setSelectedPickupDateTime({ date, time });
  const { cartItems, checkout, editItemData, setEditItem, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    // Function to generate an array of dates for the next 2 weeks
    const generateDateOptions = () => {
      const options = [];
      const today = new Date();
      const currentTime = new Date();

      if (currentTime.getTime() > time230.getTime()) {
        today.setDate(today.getDate() + 1);
      }

      for (let i = 0; i < 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateString = date.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        });
        options.push(dateString);
      }
      return options;
    };

    // Function to generate an array of time options in 15-minute intervals
    const generateTimeOptions = () => {
      const options = [];
      const currentTime = new Date();
      const startTime = new Date(currentTime);
      startTime.setHours(6, 0, 0);

      const endTime = new Date(currentTime);
      endTime.setHours(14, 30, 0); // Restaurant open hours until 2:30 PM

      const interval = 15 * 60 * 1000; // 15 minutes in milliseconds

      // Start from the greater of startTime and currentTime
      let nextAvailableTime = new Date(Math.max(startTime, currentTime));
      if (currentTime.getTime() > time230.getTime()) nextAvailableTime = startTime;

      while (nextAvailableTime <= endTime) {
        const hours = nextAvailableTime.getHours();
        const minutes = nextAvailableTime.getMinutes();

        if (currentTime.getTime() > time230.getTime() || timeDifference >= 15) {
          const timeString = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${
            hours >= 12 ? 'PM' : 'AM'
          }`;
          options.push(timeString);
        }

        nextAvailableTime = new Date(nextAvailableTime.getTime() + interval);
      }

      return options;
    };
    const dateOpts = generateDateOptions();
    const timeOpts = generateTimeOptions();

    setDateOptions(dateOpts);
    setTimeOptions(timeOpts);

    // Set initial values for selectedDate and selectedTime
    setSelectedPickupDateTime({ date: dateOpts[0], time: timeOpts[0] });
  }, []);

  const handleCheckout = () => {
    checkout();
  };

  // Callback function to handle the selected date and time
  const handlePickupDateTimeSelection = (date, time) => {
    // Only update the state if a different date or time is selected
    if (date !== selectedPickupDateTime.date || time !== selectedPickupDateTime.time) {
      setSelectedPickupDateTime({ date, time });
      // You can also perform any other actions you need with the selected date and time here
    }
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
          {selectedPickupDateTime ? (
            <span>{`${selectedPickupDateTime.date} ${selectedPickupDateTime.time}`}</span>
          ) : (
            <span>Select Pickup Date &amp; Time</span>
          )}
        </div>
        {isPickupDateModalVisible && (
          <PickupDateModal
            onCancel={handleTogglePickupDateModal}
            onSelectDateTime={handlePickupDateTimeSelection}
            dateOptions={dateOptions}
            timeOptions={timeOptions}
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
