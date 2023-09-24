"use client"
import React, { useContext, useState, useEffect } from 'react';
import styles from "../../styles/Checkout.module.css"
import PickupDetails from '../../component/PickupDetails';
import CustomerInfo from '../../component/CustomerInfo';
import OrderSummary from '../../component/OrderSummary';
import { CartContext } from '../../app/CartContext';
import { createCheckoutSession } from '../api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const CheckoutPage = () => {
  const { push } = useRouter();
  const { cartItems, totalPrice } = useContext(CartContext);
  const [customerInfo, setCustomerInfo] = useState({ firstName: '', lastName: '', phoneNumber: '' });
  const [phoneNumberValid, setPhoneNumberValid] = useState(false);
  const [firstNameValid, setFirstNameValid] = useState(false);
  const [lastNameValid, setLastNameValid] = useState(false);
  const [requiredFieldsComplete, setRequiredFieldsComplete] = useState(false);
  const [checkoutButtonClicked, setCheckoutButtonClicked] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0) push('/');
  }, [cartItems, push]);

  // useEffect(() => {
  //   console.log(checkoutButtonClicked);
  //   console.log("fields complete ",requiredFieldsComplete);
  // }, [checkoutButtonClicked])

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

          // console.log(lineItems)
          const session = await createCheckoutSession({ items: lineItems });
          window.location = session.url;
        } catch (error) {
          console.error(error);
        }
      });
    }
  }, [cartItems]);

  useEffect(() => {
    if (phoneNumberValid && firstNameValid && lastNameValid) setRequiredFieldsComplete(true);
    else setRequiredFieldsComplete(false);
  }, [phoneNumberValid, firstNameValid, lastNameValid, requiredFieldsComplete]);

  const handlePhoneNumberValidChange = (isValid) => {
    setPhoneNumberValid(isValid);
  };

  if (cartItems.length === 0) return null;

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={`web-only ${styles.orderHeader} vertical-center`}>
          <h1>Let&apos;s review your order.</h1>
        </div>
        {cartItems.length > 0 && <PickupDetails />}
        <CustomerInfo
          onCustomerInfoChange={(info) => {
            setCustomerInfo((prevInfo) => ({ ...prevInfo, ...info }));
          }}
          phoneNumberValid={phoneNumberValid}
          firstNameValid ={firstNameValid}
          lastNameValid={lastNameValid}
          setFirstNameValid={setFirstNameValid}
          setLastNameValid={setLastNameValid}
          updatePhoneNumberValid={handlePhoneNumberValidChange}
          checkoutButtonClicked={checkoutButtonClicked}
        />

      </div>
      <div className={styles.rightSection}>
        <div className={`web-only ${styles.bttnWrapper}`}>
          {phoneNumberValid ? (
            <div className="bttn bttn_red bttn_auto-width" id="checkout_stripe">
              <span>Place Pickup Order</span>
              <span>|</span>
              <span>${(totalPrice ?? 0).toFixed(2)}</span>
            </div>
          ) : (
            <div className="bttn bttn_red bttn_auto-width bttn_disabled">
              <span>Place Pickup Order</span>
              <span>|</span>
              <span>${(totalPrice ?? 0).toFixed(2)}</span>
            </div>
          )}
        </div>
        <OrderSummary
          customerInfo={customerInfo}
          requiredFieldsComplete={requiredFieldsComplete}
          onCheckoutButtonClick={() => {
            setCheckoutButtonClicked(true);
          }}
          />
      </div>
    </div>
  )
}

export default CheckoutPage;

