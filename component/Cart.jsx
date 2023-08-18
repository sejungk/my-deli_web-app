import React from 'react';
import styles from "../styles/Cart.module.css";
import Image from "next/image";
import CartItem from "./CartItem";

const Cart = () => {
  const dummyCartItems = [
    {
      quantity: 1,
      name: "Egg and Cheese Sandwich",
      price: 2.99,
      addOns: ["Wheat bread", "American Cheese", "Provolone Cheese"],
    },
    {
      quantity: 2,
      name: "Ham and Swiss Sandwich",
      price: 3.49,
      addOns: ["Rye bread", "Swiss Cheese", "Lettuce"],
    },
    // Add more dummy cart items here...
  ];

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

      {/* middle cart items section */}
      <div className={styles.addedItemSection}>
        {dummyCartItems.map((item, index) => (
          <React.Fragment key={index}>
            <CartItem item={item} />
            {index < dummyCartItems.length - 1 && <hr />} {/* Add <hr> except for the last item */}
          </React.Fragment>
        ))}
      </div>

      <hr />

      <div className={styles.subtotalSection}>
        <div className={styles.subtotalInfo}>
          <h5>Subtotal</h5>
          <h5>$2.99</h5>
        </div>
        <div className="bttn bttn_red bttn_center">
          <span>Checkout</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
