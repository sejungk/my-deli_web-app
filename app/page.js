"use client"
import React from 'react';
import { CartProvider } from './CartContext';
import MenuItems from '../component/MenuItems';
import Cart from '../component/Cart';

export default function Home() {
  return (
    <CartProvider>
      <div>
        <MenuItems/>
        <Cart/>
      </div>
    </CartProvider>
  );
}


