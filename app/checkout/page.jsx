"use client"
import React, { useContext, useState, useEffect } from 'react';
import styles from "../../styles/Checkout.module.css"
import PickupDetails from '../../component/PickupDetails';
import CustomerInfo from '../../component/CustomerInfo';
import Payment from '../../component/Payment';
import OrderSummary from '../../component/OrderSummary';
import { CartContext } from '../../app/CartContext';
import { createCheckoutSession } from '../api';

const CheckoutPage = () => {
  const [customerInfo, setCustomerInfo] = useState({ firstName: '', lastName: '', phoneNumber: '' });
  const { cartItems } = useContext(CartContext);
  let subtotal = cartItems.reduce((acc, item) => acc + parseFloat(item.base_price), 0);

  useEffect(() => {
    const button = document.querySelector("#checkout_stripe");
    if (button) {
      button.addEventListener("click", async () => {
        try {
          const session = await createCheckoutSession([
            { id: 1, quantity: 3 },
            { id: 2, quantity: 1 },
          ]);
          window.location = session.url;
        } catch (error) {
          console.error(error);
        }
      });
    }
  }, []);

  // useEffect(() => {
  //   const button = document.querySelector("#checkout_stripe");
  //   if (button) {
  //     button.addEventListener("click", () => {
  //       fetch('http://localhost:5000/create-checkout-session', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({
  //           items: [
  //             { id: 1, quantity: 3 },
  //             { id: 2, quantity: 1 }
  //           ]
  //         })
  //       }).then(res => {
  //         if (res.ok) return res.json();
  //         return res.json().then(json => Promise.reject(json));
  //       }).then(({ url }) => {
  //         window.location = url;
  //       }).catch(e => {
  //         console.error(e.error);
  //       });
  //     });
  //   }
  // }, []);

  // console.log(cartItems)
  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={`${styles.orderHeader} vertical-center`}>
          <h1>Let&apos;s review your order.</h1>
        </div>
        <PickupDetails/>
        <CustomerInfo
          onCustomerInfoChange={(info) => {
            setCustomerInfo((prevInfo) => ({ ...prevInfo, ...info }));
          }}
        />
        <Payment />
      </div>
      <div className={styles.rightSection}>
        <div className={styles.bttnWrapper}>
          <div className="bttn bttn_red bttn_auto-width" id="checkout_stripe">
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

export default CheckoutPage;

