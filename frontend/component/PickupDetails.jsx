import styles from "../styles/PickupDetails.module.css";
import { CartContext } from '../app/CartContext';
import React, { useContext } from 'react';
import Image from "next/image";

const PickupDetails = () => {
  const { selectedPickupDateTime, dateOptions } = useContext(CartContext);
  return (
    <div className="checkout-card-container">
      <div className="checkout-card-header">
        <h4 className="web-only">Pickup Details</h4>
        <h4 className="mobile-only">My Deli Pickup Details</h4>
      </div>

      <hr/>

      <div className="checkout-card_content">
        <div className={styles.infoSection}>
          <div className={styles.logoWrapper}>
            <Image className={styles.logo} src="/img/store-icon.svg" layout="fill" alt="restaurant icon"/>
          </div>
          <div className={styles.infoWrapper}>
            <h5 className="web-only">My Deli</h5>
            <p>521 Broadway St, Quantico, VA 22134</p>
            <a href="https://goo.gl/maps/39p3eL8vpdob73EC6" target="_blank">Get Directions</a>
          </div>
        </div>

        <hr className="web-only" />

        <div className={styles.infoSection}>
          <div className={styles.logoWrapper}>
            <Image className={styles.logo} src="/img/time-icon.svg" layout="fill" alt="time icon"/>
          </div>
          <div className={styles.infoWrapper}>
            <p>{selectedPickupDateTime.date} at {selectedPickupDateTime.time}</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default PickupDetails;
