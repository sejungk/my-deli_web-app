import React, { createContext, useState } from 'react';

export const CartContext = createContext("");

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevCartItems) => [...prevCartItems, item]);
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


// For example:
// const cartItem = {
//   id: 1,
//   name: 'Cheeseburger',
//   price: 5.99,
//   quantity: 2,
//   options: [
//     { name: 'Toppings', value: 'Ketchup, Mustard, Lettuce, Tomato' },
//     { name: 'Extra Cheese', value: 'Yes' },
//   ],
// };
