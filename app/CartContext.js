"use client"

import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const CartContext = createContext("");
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [editItemData, setEditItemData] = useState(null);
  const [selectedPickupDateTime, setSelectedPickupDateTime] = useState(null);
  const [dateOptions, setDateOptions] = useState([]);
  const [timeOptions, setTimeOptions] = useState([]);
  const time220 = new Date(0, 0, 0, 14, 20, 0, 0);

  useEffect(() => {
    const dateOpts = generateDateOptions();
    const timeOpts = generateTimeOptions();
    setDateOptions(dateOpts);
    setTimeOptions(timeOpts);
    // Set initial values for selectedDate and selectedTime
    if (!selectedPickupDateTime) {
      setSelectedPickupDateTime({ date: dateOpts[0], time: timeOpts[0] });
    }
  }, []);

  const addToCart = (item) => {
    // if an existing item is added, increase quantity
    const existingItemIndex = cartItems.findIndex(
      (cartItem) =>
        cartItem.id === item.id
        && JSON.stringify(cartItem.selectedOptions) === JSON.stringify(item.selectedOptions)
    );
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += item.quantity;
      setCartItems(updatedCartItems);
    } else {
      // If the item doesn't exist, add it to the cart
      const uniqueId = uuidv4();
      const cartItem = {
        itemId: uniqueId,
        id: item.id,
        quantity: item.quantity,
        base_price:item.total_price,
        name: item.name,
        selectedOptions: item.selectedOptions,
      };
      setCartItems((prevCartItems) => [...prevCartItems, cartItem]);
    }
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.itemId !== itemId);
    setCartItems(updatedCart);
  };

  const checkout = () => {
    // Implement checkout logic
  };

  const setEditItem = (item) => {
    setEditItemData(item);
  };

  // Function to update selected pickup date and time
  const updateSelectedPickupDateTime = (date, time) => {
    setSelectedPickupDateTime({ date, time });
  };

  const editCartItem = (selectedItem, itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.itemId === itemId) return selectedItem;
    });
    setCartItems(updatedCartItems);
  };

  // Function to generate an array of dates for the next 2 weeks
  const generateDateOptions = () => {
    const options = [];
    const today = new Date();
    const currentTime = new Date();

    if (currentTime.getHours() >= 14 && currentTime.getMinutes() >= 20) {
      today.setDate(today.getDate() + 1);
    }

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      if (date.getDay() !== 6 && date.getDay() !== 0) {
        const dateString = date.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        });
        options.push(dateString);
      }
    }
    return options;
  };

  const generateTimeOptions = () => {
    const options = [];
    const currentTime = new Date();
    const startTime = new Date(currentTime);
    startTime.setHours(6, 0, 0);

    const endTime = new Date(currentTime);
    endTime.setHours(14, 30, 0); // Restaurant open hours until 2:30 PM

    const interval = 15 * 60 * 1000; // 15 minutes in milliseconds

    while (startTime < endTime) {
      const startTimeString = formatTime(startTime);
      startTime.setTime(startTime.getTime() + interval);
      const endTimeString = formatTime(startTime);
      options.push(`${startTimeString} - ${endTimeString}`);
    }
    return options;
  };

  // Helper function to format time as "hh:mm AM/PM"
  const formatTime = (time) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      checkout,
      editItemData,
      setEditItem,
      editCartItem,
      selectedPickupDateTime,
      updateSelectedPickupDateTime,
      dateOptions,
      timeOptions,
      }}>
      {children}
    </CartContext.Provider>
  );
};
