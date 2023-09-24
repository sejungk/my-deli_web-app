'use client'

import React, { useContext, useState} from 'react';
import styles from "../styles/OrderSummary.module.css";
import { CartContext } from '../app/CartContext';
import CartItem from "./CartItem";
import { createOrder } from '../app/api';
import Link from 'next/link';
import { isValidPhoneNumber } from 'libphonenumber-js';

const OrderSummary = ({ customerInfo, requiredFieldsComplete, onCheckoutButtonClick }) => {
  const [tipPercentage, setTipPercentage] = useState(0);
  const [selectedTipIndex, setSelectedTipIndex] = useState(-1);

  const currentTime = new Date();
  const { cartItems, removeFromCart, selectedPickupDateTime, totalPrice } = useContext(CartContext);
  const tipOptions = [
    { label: '5%', percentage: 5 },
    { label: '10%', percentage: 10 },
    { label: '15%', percentage: 15 },
    { label: '20%', percentage: 20 }
  ];

// console.log(cartItems)
  const handleTipClick = (percentage, index) => {
    setTipPercentage(percentage);
    setSelectedTipIndex(index);
  };

   // Calculate the subtotal
   const tipAmount = (totalPrice * (tipPercentage / 100)) || 0;
   const total = totalPrice + tipAmount;

  // Function to handle placing the order
  const handlePlaceOrder = async () => {
    // format orderData for orders database
    const orderData = {
      customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
      phone_number: customerInfo.phoneNumber,
      payment_method: "",
      total_amount: parseFloat(total.toFixed(2)),
      subtotal_amount: total,
      tip_amount: parseFloat(tipAmount.toFixed(2)),
      taxes_amount: 0,
      status_id: 1,
      order_time: currentTime.toLocaleTimeString(),
      order_date: currentTime.toLocaleDateString(),
      pickup_time: selectedPickupDateTime?.time || '',
      pickup_date: selectedPickupDateTime?.date || '',
    };

    try {
      await createOrder(orderData, cartItems);
      setOrderPlaced(true);
    } catch (error) {
      console.error('Error placing order:', error);
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
                <p>${((totalPrice * option.percentage / 100) ?? 0).toFixed(2)}</p>
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
            <p>${totalPrice.toFixed(2)}</p>
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

        {requiredFieldsComplete ? (
          <Link href="/order-confirmation" className="text-decoration-none">
            <div className="bttn bttn_red bttn_center bttn_auto-width"
              onClick={handlePlaceOrder}>
                <span>Checkout</span>
            </div>
          </Link>
        ) : (
          <div className="bttn bttn_red bttn_center bttn_auto-width"
            onClick={() => {
              onCheckoutButtonClick();
            }}>
            <span>Checkout</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
