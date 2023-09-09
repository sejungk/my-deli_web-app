"use client"
import React, { useContext, useState } from 'react';
import styles from "../styles/Checkout.module.css"
import PickupDetails from '../component/PickupDetails';
import CustomerInfo from '../component/CustomerInfo';
import Payment from '../component/Payment';
import OrderSummary from '../component/OrderSummary';
import { CartContext } from '../app/CartContext';

const Checkout = () => {
  const [customerInfo, setCustomerInfo] = useState({ firstName: '', lastName: '', phoneNumber: '' });
  const { cartItems } = useContext(CartContext);
  let subtotal = cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0);

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={`${styles.orderHeader} vertical-center`}>
          <h1>Let&apos;s review your order.</h1>
        </div>
        <PickupDetails />
        <CustomerInfo
          onCustomerInfoChange={(info) => {
            setCustomerInfo((prevInfo) => ({ ...prevInfo, ...info }));
          }}
        />
        <Payment />
      </div>
      <div className={styles.rightSection}>
        <div className={styles.bttnWrapper}>
          <div className="bttn bttn_red bttn_auto-width">
            <span>Place Pickup Order</span>
            <span>|</span>
            <span>${(subtotal ?? 0).toFixed(2)}</span>
          </div>
        </div>
        <OrderSummary customerInfo={customerInfo}/>
      </div>
    </div>
  )
}

export default Checkout;
