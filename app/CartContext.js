import React, { createContext, useState } from 'react';

export const CartContext = createContext("");

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    console.log("Adding to Cart: ", item);
    const cartItem = {
      id: item.id,
      name: item.name,
      option_groups: item.selectedOptions,
      quantity: item.quantity,
      price: item.total_price
    }
    setCartItems((prevCartItems) => [...prevCartItems, cartItem]);
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
