"use client"
import React, { useContext, useState, useEffect } from 'react';
import styles from "../../styles/Checkout.module.css"
import PickupDetails from '../../component/PickupDetails';
import CustomerInfo from '../../component/CustomerInfo';
import OrderSummary from '../../component/OrderSummary';
import { CartContext } from '../../app/CartContext';
import { createCheckoutSession } from '../api';

const CheckoutPage = () => {
  const [customerInfo, setCustomerInfo] = useState({ firstName: '', lastName: '', phoneNumber: '' });
  const { cartItems, totalPrice } = useContext(CartContext);

  useEffect(() => {
    const button = document.querySelector("#checkout_stripe");
    if (button) {
      button.addEventListener("click", async () => {
        try {
          // Format the cartItems prices to cents and structure the data correctly
          const lineItems = cartItems.map((item) => ({
            product_id: item.id,
            name: item.name,
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
              },
              unit_amount: Math.round(item.base_price * 100), // Convert to cents
            },
            quantity: item.quantity,
          }));

          console.log(lineItems)
          const session = await createCheckoutSession({ items: lineItems });
          window.location = session.url;
        } catch (error) {
          console.error(error);
        }
      });
    }
  }, []);

  console.log(cartItems)
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

      </div>
      <div className={styles.rightSection}>
        <div className={styles.bttnWrapper}>
          <div className="bttn bttn_red bttn_auto-width" id="checkout_stripe">
            <span>Place Pickup Order</span>
            <span>|</span>
            <span>${(totalPrice ?? 0).toFixed(2)}</span>
          </div>
        </div>
        <OrderSummary customerInfo={customerInfo}/>
      </div>
    </div>
  )
}

export default CheckoutPage;

