"use client"
import styles from "../../styles/OrderConfirmation.module.css"
import { CartContext } from '../CartContext';
import React, { useContext, useEffect } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';

const OrderConfirmation = () => {
  const { push } = useRouter();
  const { cartItems, selectedPickupDateTime } = useContext(CartContext);
  console.log(cartItems)

  useEffect(() => {
    if (cartItems.length === 0) push('/');
  }, [cartItems, push]);
  if (cartItems.length === 0) return null;

  // Function to format the date
  const formatDate = (dateString) => {
    const dateParts = dateString.split(', ');
    const date = new Date(dateParts[1]); // Parse the date part "Sep 14"

    // Check if the date is today
    const currentDate = new Date();
    if (
      date.getDate() === currentDate.getDate() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    ) {
      return 'today';
    }

    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    };

    return date.toLocaleDateString('en-US', options);
  };

  // Format the selected date
  const formattedDate = formatDate(selectedPickupDateTime.date);
  console.log(cartItems.length)


  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <div className={styles.logo}>
          <Image src="/img/green-check.svg" layout="fill" alt="location icon"/>
        </div>
        <span class={styles.mainText}>Thank you for your order, Name.</span>
        <div class={styles.descriptionText}>
          {/* <div className={`${styles.logo} web-only`}>
            <Image src="/img/green-check.svg" layout="fill" alt="location icon"/>
          </div> */}
          <p className={styles.detailsText}>We’re preparing your pickup order for {formattedDate} at {selectedPickupDateTime.time}. </p>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation;
