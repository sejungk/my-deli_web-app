'use client'

import React, { createContext, useContext, useState} from 'react';
import styles from "../styles/OrderSummary.module.css";
import { CartContext } from '../app/CartContext';
import Image from "next/image";
import CartItem from "./CartItem";
import Link from 'next/link';

const OrderSummary = () => {
  const [tipPercentage, setTipPercentage] = useState(0);
  const [selectedTipIndex, setSelectedTipIndex] = useState(-1);

  // const { cartItems, addToCart, removeFromCart, checkout } = useContext(CartContext);

  //dummy data
  const cartItems = [
    {
      id: 3,
      name: "DIY Croissant Breakfast Sandwich",
      option_groups: [],
      price: 3.49,
      quantity: 1,
    },
    {
      id: 11,
      name: "Beef Country Burrito",
      option_groups: {
        breakfast_mods: {
          id: 20,
          name: "Add Extra Cheese",
          additional_price: "0.50",
        },
        homefries_toast: {
          id: 17,
          name: "Add a Side of Rye Toast",
          additional_price: "1.00",
        },
      },
      price: 7.49,
      quantity: 1,
    },
    {
      id: 11,
      name: "Beef Country Burrito",
      option_groups: {
        homefries_toast: {
          id: 18,
          name: "Add a Side of Sourdough Toast",
          additional_price: "1.00",
        },
      },
      price: 6.99,
      quantity: 1,
    },
    {
      id: 11,
      name: "Beef Country Burrito",
      option_groups: {
        breakfast_mods: {
          id: 20,
          name: "Add Extra Cheese",
          additional_price: "0.50",
        },
        homefries_toast: {
          id: 17,
          name: "Add a Side of Rye Toast",
          additional_price: "1.00",
        },
      },
      price: 7.49,
      quantity: 1,
    },
    {
      id: 11,
      name: "Beef Country Burrito",
      option_groups: {
        homefries_toast: {
          id: 18,
          name: "Add a Side of Sourdough Toast",
          additional_price: "1.00",
        },
      },
      price: 6.99,
      quantity: 1,
    }
  ];

  const tipOptions = [
    { label: '5%', percentage: 5 },
    { label: '10%', percentage: 10 },
    { label: '15%', percentage: 15 },
    { label: '20%', percentage: 20 },
  ];

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0);
  };

  const handleTipClick = (percentage, index) => {
    const newSubtotal = calculateSubtotal();
    const newTipAmount = newSubtotal * (percentage / 100);
    setTipPercentage(percentage);
    setSelectedTipIndex(index);
  };

  const handleCheckout = () => {
    // checkout();
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  // let subtotal = cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0);
   // Calculate the subtotal
   const subtotal = calculateSubtotal();

   // Calculate the tip amount based on the tip percentage
   const tipAmount = (subtotal * (tipPercentage / 100)) || 0;

   // Calculate the total by adding the subtotal and tip amount
   const total = subtotal + tipAmount;


  return (
    <div className="checkout-card-container">
      <div className="checkout-card-header">
        <h4>Order Summary</h4>
      </div>

      <hr></hr>

      <div className={styles.addedItemSection}>
        {cartItems.map((item, index) => (
          <React.Fragment key={index}>
            <CartItem item={item} onRemove={handleRemoveItem} />
            {index < cartItems.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </div>

      <hr></hr>

      <div className={styles.tipSection}>
        <div className={styles.tipInfo}>
          <h5>Add a tip</h5>
          <p>100% of your tip supports the restaurant.</p>

          <div className={`${styles.tipCardWrapper} flex_row`}>
            {tipOptions.map((option, index) => (
              <div
                key={index}
                className={`${styles.tipCard} ${
                  selectedTipIndex === index ? styles.selectedTipCard : ''
                }`}
                onClick={() => handleTipClick(option.percentage, index)}
              >
                <p>{option.label}</p>
                <p>${((subtotal * option.percentage / 100) ?? 0).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr></hr>

      <div className={styles.priceSection}>
        <div className={styles.priceWrapper}>
          <div className={styles.priceRow}>
            <p>Subtotal</p>
            <p>${(subtotal ?? 0).toFixed(2)}</p>
          </div>
          <div className={styles.priceRow}>
            <p>Taxes</p>
            <p>$0.00</p>
          </div>
          <div className={styles.priceRow}>
            <p>Tip</p>
            <p>${(tipAmount ?? 0).toFixed(2)}</p>
          </div>
          <div className={styles.priceRow}>
            <p><b>Total</b></p>
            <p><b>${(total ?? 0).toFixed(2)}</b></p>
          </div>
        </div>
        <Link href="/checkout" className="text-decoration-none">
          <div className="bttn bttn_red bttn_center" onClick={handleCheckout}>
              <span>Checkout</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
