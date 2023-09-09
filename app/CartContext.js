"use client"

import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const CartContext = createContext("");

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [editItemData, setEditItemData] = useState(null);
  const [selectedPickupDateTime, setSelectedPickupDateTime] = useState(null);

  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) =>
        cartItem.id === item.id &&
        JSON.stringify(cartItem.option_groups) === JSON.stringify(item.selectedOptions)
    );
    if (existingItemIndex !== -1) {
      // If the item already exists, update its quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += item.quantity;
      setCartItems(updatedCartItems);
    } else {
      // If the item doesn't exist, add it to the cart
      const uniqueId = uuidv4(); // Generate a unique ID
      const cartItem = {
        cartItemId: uniqueId,
        item_id: item.id,
        quantity: item.quantity,
        item_price:item.total_price,
        item_name: item.name,
        option_groups: item.selectedOptions,
      };
      setCartItems((prevCartItems) => [...prevCartItems, cartItem]);
    }
  };

  const removeFromCart = (cartItemId) => {
    console.log(cartItems, cartItemId)
    const updatedCart = cartItems.filter((item) => item.cartItemId !== cartItemId);
    setCartItems(updatedCart);
  };

  const checkout = () => {
    // Implement checkout logic
  };

  const setEditItem = (item) => {
    setEditItemData(item); // Set the editItemData state
  };

  // Function to update selected pickup date and time
  const updateSelectedPickupDateTime = (date, time) => {
    setSelectedPickupDateTime({ date, time });
  };

  const editCartItem = (updatedItem) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.cartItemId === updatedItem.cartItemId) {
        // Update the item with the edited data
        return updatedItem;
      }
      return item;
    });

    setCartItems(updatedCartItems);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      checkout,
      editItemData,
      setEditItem,
      selectedPickupDateTime,
      updateSelectedPickupDateTime,
      }}>
      {children}
    </CartContext.Provider>
  );
};
