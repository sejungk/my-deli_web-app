"use client"

import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const CartContext = createContext("");

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [editItemData, setEditItemData] = useState(null);

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
        id: item.id,
        name: item.name,
        option_groups: item.selectedOptions,
        quantity: item.quantity,
        price: item.total_price,
      };
      setCartItems((prevCartItems) => [...prevCartItems, cartItem]);
    }
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  const checkout = () => {
    // Implement checkout logic
  };

  const setEditItem = (item) => {
    setEditItemData(item); // Set the editItemData state
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, checkout, editItemData, setEditItem }}>
      {children}
    </CartContext.Provider>
  );
};
