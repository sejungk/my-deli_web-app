"use client"
import styles from "../../styles/OrderConfirmation.module.css"
import { CartContext } from '../CartContext';
import React, { useContext, useEffect } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';

const OrderConfirmation = () => {
  const { push } = useRouter();
  const { cartItems, selectedPickupDateTime } = useContext(CartContext);

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

  return (
    <div className={styles.container}>
        <div className={styles.illustration}>
          <Image className={styles.trayImg} src="/img/food-tray-outlined_icon.svg" layout="fill" alt="location icon"/>
        </div>
        <div className={styles.textContainer}>
          <h3 className={styles.mainText}>Your pickup order is confirmed.</h3>
          <div className={styles.descriptionText}>
            <p className={styles.detailsText}>We’re preparing your pickup order for {formattedDate} at {selectedPickupDateTime.time}. </p>
          </div>
        </div>
    </div>
  )
}

export default OrderConfirmation;
