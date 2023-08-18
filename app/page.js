"use client"
import React from 'react';
import MenuItems from '../component/MenuItems';
import { CartProvider } from './CartContext';
import Cart from '../component/Cart';

export default function Home() {
  return (
    <CartProvider>
      <div>
          <MenuItems/>
          <Cart />
      </div>
    </CartProvider>
  )
}


