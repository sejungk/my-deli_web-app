"use client"
import styles from "../styles/Checkout.module.css"
import PickupDetails from '../component/PickupDetails';
import CustomerInfo from '../component/CustomerInfo';
import Payment from '../component/Payment';
// import { useContext } from 'react';
// import { CartContext } from '../CartContext';

const Checkout = () => {
  // const { cartItems } = useContext(CartContext);

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <span className={styles.orderHeader}>Let&apos;s review your order.</span>
        <PickupDetails />
        <CustomerInfo />
        <Payment />
      </div>
      <div className={styles.rightSection}>
        <div className={styles.bttnWrapper}>
          <div className="bttn bttn_red bttn_auto-width">
            <span>Place Pickup Order</span>
            <span>|</span>
            <span>$3.99</span>
          </div>
        </div>
        <PickupDetails />
      </div>
    </div>
  )
}


export default Checkout;
