"use client"
import styles from "../../styles/OrderConfirmation.module.css"
import { CartContext } from '../CartContext';
import React, { useContext } from 'react';
import Image from "next/image";

const OrderConfirmation = () => {
  const { selectedPickupDateTime } = useContext(CartContext);

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

  // return (
  //   <div className={styles.container}>
  //     <div className={styles.center}>
  //       <div className={styles.logoMobile}>
  //         <Image src="/img/green-check.svg" layout="fill" alt="location icon" />
  //       </div>
  //       <span className={styles.mainText}>Thank you for your order, Name.</span>
  //       <div className={styles.descriptionText}>
  //         <div className={styles.logoWeb}>
  //           <Image src="/img/green-check.svg" layout="fill" alt="location icon" />
  //         </div>
  //         <h4>
  //           We’re preparing your pickup order for{' '}
  //           {formattedDate} at {selectedPickupDateTime.time}.
  //         </h4>
  //       </div>
  //     </div>
  //   </div>
  //   );
  // };
  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <div className={styles.logoMobile}>
          <Image src="/img/green-check.svg" layout="fill" alt="location icon"/>
        </div>
        <span class={styles.mainText}>Thank you for your order, Name.</span>
        <div class={styles.descriptionText}>
          <div class={styles.logoWeb}>
            <Image src="/img/green-check.svg" layout="fill" alt="location icon"/>
          </div>
          <h4>We’re preparing your pickup order for {formattedDate} at {selectedPickupDateTime.time}. </h4>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation;
