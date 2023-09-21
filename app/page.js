import React from 'react';
import MenuItems from '../component/MenuItems';
import Cart from '../component/Cart';
import Navbar from '../component/Navbar'

const Home = () => {
  return (
    <>
      <Navbar />
      <MenuItems/>
      <Cart/>
    </>
  );
}

export default Home;
