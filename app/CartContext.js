"use client"

import React, { createContext, useState } from 'react';

export const CartContext = createContext("");

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    // Check if an item with the same id and option groups already exists in the cart
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
      const cartItem = {
        id: item.id,
        name: item.name,
        option_groups: item.selectedOptions,
        quantity: item.quantity,
        price: item.total_price,
      };
      setCartItems((prevCartItems) => [...prevCartItems, cartItem]);
    }

    // const cartItem = {
    //   id: item.id,
    //   name: item.name,
    //   option_groups: item.selectedOptions,
    //   quantity: item.quantity,
    //   price: item.total_price
    // }
    // setCartItems((prevCartItems) => [...prevCartItems, cartItem]);
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  const checkout = () => {
    // Implement checkout logic
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, checkout }}>
      {children}
    </CartContext.Provider>
  );
};
