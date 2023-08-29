// 'use client'

import React from 'react';
import { CartProvider } from './CartContext';
import MenuItems from '../component/MenuItems';
import Cart from '../component/Cart';

const Home = () => {
  return (
    <CartProvider>
        <MenuItems/>
        <Cart/>
    </CartProvider>
  );
}

export default Home;
