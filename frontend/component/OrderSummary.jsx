'use client'

import React, { useContext, useState} from 'react';
import styles from "../styles/OrderSummary.module.css";
import { CartContext } from '../app/CartContext';
import CartItem from "./CartItem";
import Link from 'next/link';

const OrderSummary = ({ requiredFieldsComplete, onCheckoutButtonClick, handlePlaceOrderAndCheckout }) => {
  const [tipPercentage, setTipPercentage] = useState(0);
  const [selectedTipIndex, setSelectedTipIndex] = useState(-1);

  const { cartItems, removeFromCart, totalPrice, setTotalPrice, subtotal, tipAmount, setTipAmount } = useContext(CartContext);

  const taxesAmount = 0;

  const tipOptions = [
    { label: '5%', percentage: 5 },
    { label: '10%', percentage: 10 },
    { label: '15%', percentage: 15 },
    { label: '20%', percentage: 20 }
  ];

  const handleTipClick = (percentage, index) => {
    setTipPercentage(percentage);
    setSelectedTipIndex(index);

    const newTipAmount = (totalPrice * (percentage / 100)) || 0;
    setTipAmount(newTipAmount);

    // Calculate the subtotal
    const newTotal = subtotal + taxesAmount + newTipAmount;
    setTotalPrice(newTotal);
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
            <p>${subtotal.toFixed(2)}</p>
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
            <p><b>${(totalPrice ?? 0).toFixed(2)}</b></p>
          </div>
        </div>

        {requiredFieldsComplete ? (
          <Link href="/order-confirmation" className="text-decoration-none">
            <div className="bttn bttn_red bttn_center bttn_auto-width"
              onClick={handlePlaceOrderAndCheckout}>
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
