"use client"
import React, { useContext, useState, useEffect } from 'react';
import styles from "../../styles/Checkout.module.css"
import PickupDetails from '../../component/PickupDetails';
import CustomerInfo from '../../component/CustomerInfo';
import OrderSummary from '../../component/OrderSummary';
import { CartContext } from '../../app/CartContext';
import { createCheckoutSession } from '../api';
import { useRouter } from 'next/navigation';
import { createOrder } from '../api';
import Link from 'next/link';

const CheckoutPage = () => {
  const { push } = useRouter();
  const { cartItems, totalPrice, tipAmount, subtotal, selectedPickupDateTime} = useContext(CartContext);
  const [customerInfo, setCustomerInfo] = useState({ firstName: '', lastName: '', phoneNumber: '' });
  const [phoneNumberValid, setPhoneNumberValid] = useState(false);
  const [firstNameValid, setFirstNameValid] = useState(false);
  const [lastNameValid, setLastNameValid] = useState(false);
  const [requiredFieldsComplete, setRequiredFieldsComplete] = useState(false);
  const [checkoutButtonClicked, setCheckoutButtonClicked] = useState(false);
  const [errorStyling, setErrorStyling] = useState(false);
  const currentTime = new Date();

  useEffect(() => {
    if (cartItems.length === 0) push('/');
  }, [cartItems, push]);

  useEffect(() => {
  }, [checkoutButtonClicked])

  useEffect(() => {
    if (phoneNumberValid && firstNameValid && lastNameValid) setRequiredFieldsComplete(true);
    else setRequiredFieldsComplete(false);
  }, [phoneNumberValid, firstNameValid, lastNameValid, requiredFieldsComplete]);

  const handlePhoneNumberValidChange = (isValid) => {
    setPhoneNumberValid(isValid);
  };

  const handleStripeCheckout = async () => {
    try {
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

      const session = await createCheckoutSession({ items: lineItems });
      window.location = session.url;
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckoutButtonClick = () => {
    setCheckoutButtonClicked(true);
    setErrorStyling(true);

    setTimeout(() => {
      setCheckoutButtonClicked(false);
    }, 100);
  };

  const addOrderToDatabase = async () => {
    // format orderData for orders database
    const orderData = {
      customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
      phone_number: customerInfo.phoneNumber,
      payment_method: "",
      total_amount: parseFloat(totalPrice.toFixed(2)),
      subtotal_amount: subtotal,
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
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const handlePlaceOrderAndCheckout = async () => {
    await addOrderToDatabase();
    // handleStripeCheckout();
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
          errorStyling={errorStyling}
        />
      </div>
      <div className={styles.rightSection}>
        <div className={`web-only ${styles.bttnWrapper}`}>
          {requiredFieldsComplete ? (
            // <Link href="/order-confirmation" className="text-decoration-none">
              <div className="bttn bttn_red bttn_auto-width"  onClick={handlePlaceOrderAndCheckout}>
                <span>Place Pickup Order</span>
                <span>|</span>
                <span>${(totalPrice ?? 0).toFixed(2)}</span>
              </div>
            // </Link>
          ) : (
            <div className="bttn bttn_red bttn_auto-width" onClick={handleCheckoutButtonClick}>
              <span>Place Pickup Order</span>
              <span>|</span>
              <span>${(totalPrice ?? 0).toFixed(2)}</span>
            </div>
          )}
        </div>
        <OrderSummary
          customerInfo={customerInfo}
          requiredFieldsComplete={requiredFieldsComplete}
          onCheckoutButtonClick={handleCheckoutButtonClick}
          handlePlaceOrderAndCheckout={handlePlaceOrderAndCheckout}
          />
      </div>
    </div>
  )
}

export default CheckoutPage;

