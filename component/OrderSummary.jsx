'use client'

import React, { createContext, useContext, useState} from 'react';
import styles from "../styles/OrderSummary.module.css";
import { CartContext } from '../app/CartContext';
import CartItem from "./CartItem";
import Link from 'next/link';
import { createOrder } from '../app/app';

const OrderSummary = ({ customerInfo }) => {
  const [tipPercentage, setTipPercentage] = useState(0);
  const [selectedTipIndex, setSelectedTipIndex] = useState(-1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const currentTime = new Date();
  const { cartItems, addToCart, removeFromCart, checkout } = useContext(CartContext);
  const tipOptions = [
    { label: '5%', percentage: 5 },
    { label: '10%', percentage: 10 },
    { label: '15%', percentage: 15 },
    { label: '20%', percentage: 20 }
  ];
  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0);
  };
console.log(customerInfo)
  const handleTipClick = (percentage, index) => {
    const newSubtotal = calculateSubtotal();
    setTipPercentage(percentage);
    setSelectedTipIndex(index);
  };

   // Calculate the subtotal
   const subtotal = calculateSubtotal();
   const tipAmount = (subtotal * (tipPercentage / 100)) || 0;
   const total = subtotal + tipAmount;

  // Function to handle placing the order
  const handlePlaceOrder = async () => {
    const orderData = {
      customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
      phone_number: customerInfo.phoneNumber,
      total_amount: subtotal,
      order_date: currentTime.getTime(),
      pickup_time: "",
      pickup_date: "",
      payment_method: "",
      taxes: 0,
      items: cartItems,
      status_name: "pending",
      tip_amount: parseFloat(tipAmount.toFixed(2)),
    };
    console.log("order, ",orderData)
    try {
      // Send the order to the server
      await createOrder(orderData);

      // Set a flag indicating that the order was successfully placed
      setOrderPlaced(true);
    } catch (error) {
      console.error('Error placing order:', error);
      // Handle the error (e.g., display an error message to the user)
    }
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

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
          <div className="bttn bttn_red bttn_center"
            onClick={handlePlaceOrder}>
              <span>Checkout</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
