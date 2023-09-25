"use client"

import React, { useState, useEffect, useLayoutEffect } from "react";
import MenuItems from '../component/MenuItems';
import Cart from '../component/Cart';
import Navbar from '../component/Navbar'


const Home = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        const initialIsCartVisible = window.innerWidth > 750;
        setIsCartVisible(initialIsCartVisible);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // const [isCartVisible, setIsCartVisible] = useState(window.innerWidth > 750);

  // const toggleCartVisibility = () => {
  //   if (window.innerWidth <= 750) {
  //     setIsCartVisible(!isCartVisible);
  //   }
  // };
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth <= 750) setIsCartVisible(false);
  //     else setIsCartVisible(true);
  //   };

  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);


  return (
    <>
      <Navbar />
      <MenuItems onToggleCart={toggleCartVisibility}/>
      {isCartVisible && <Cart onToggleCart={toggleCartVisibility}/>}
    </>
  );
}

export default Home;
