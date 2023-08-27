import React, { createContext, useContext, useState} from 'react';
import styles from "../styles/Cart.module.css";
import { CartContext } from '../app/CartContext';
import Image from "next/image";
import CartItem from "./CartItem";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, checkout } = useContext(CartContext);

  const handleCheckout = () => {
    checkout();
  };

  console.log()
  //dummy
  // let cartItems = [{price: 20, addOns:[]}];
  let subtotal = 200;
  // dummy

  return (
    <div className={styles.container}>
      <div className={styles.pickupDetailSection}>
        <h5>Pickup Order Summary</h5>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <Image src="/img/location-icon.svg" layout="fill" alt="location icon" />
          </div>
          <p>521 Broadway St, Quantico</p>
        </div>
        <div className="bttn bttn_outline bttn_center">
          <span>Mon, Jun 12 8:45 am</span>
        </div>
      </div>

      <hr />

      <div className={styles.addedItemSection}>
        {/* {cartItems.map((item, index) => (
          <React.Fragment key={index}>
            <CartItem item={item} />
            {index < cartItems.length - 1 && <hr />}
          </React.Fragment>
        ))} */}
      </div>

      <hr />

      <div className={styles.subtotalSection}>
        <div className={styles.subtotalInfo}>
          <h5>Subtotal</h5>
          <h5>${(subtotal ?? 0).toFixed(2)}</h5>
        </div>
        <div className="bttn bttn_red bttn_center" onClick={handleCheckout}>
          <span>Checkout</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
