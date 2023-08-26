import React, { createContext, useState } from 'react';

export const CartContext = createContext("");

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      option_groups: item.option_groups,
      quantity: item.quantity
    }
    setCartItems((prevCartItems) => [...prevCartItems, cartItem]);
    console.log("Cart Items: ", cartItems)
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
