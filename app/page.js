"use client"

import React, { useState, useEffect, useLayoutEffect } from "react";
import MenuItems from '../component/MenuItems';
import Cart from '../component/Cart';
import Navbar from '../component/Navbar'


const Home = () => {
  const [isCartVisible, setIsCartVisible] = useState(window.innerWidth > 750);

   // Function to toggle the cart's visibility
  //  const toggleCartVisibility = () => {
  //   setIsCartVisible(!isCartVisible);
  // };

  const toggleCartVisibility = () => {
    if (window.innerWidth <= 750) {
      setIsCartVisible(!isCartVisible);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 750) {
        setIsCartVisible(false); // Show the cart if the screen is 750px or smaller
      } else {
        setIsCartVisible(true); // Always show the cart if the screen is larger than 750px
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);



  return (
    <>
      <Navbar />
      <MenuItems onToggleCart={toggleCartVisibility}/>
      {isCartVisible && <Cart onToggleCart={toggleCartVisibility}/>}
    </>
  );
}

export default Home;
