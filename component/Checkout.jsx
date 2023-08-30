"use client"
import styles from "../styles/Checkout.module.css"
import PickupDetails from '../component/PickupDetails';
import CustomerInfo from '../component/CustomerInfo';
import Payment from '../component/Payment';
import OrderSummary from '../component/OrderSummary';
import { useContext } from 'react';
import { CartContext } from '../app/CartContext';

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  console.log("checkout cart items: ", cartItems)
    //dummy data
    // const cartItems = [
    //   {
    //     id: 3,
    //     name: "DIY Croissant Breakfast Sandwich",
    //     option_groups: [],
    //     price: 3.49,
    //     quantity: 1,
    //   },
    //   {
    //     id: 11,
    //     name: "Beef Country Burrito",
    //     option_groups: {
    //       breakfast_mods: {
    //         id: 20,
    //         name: "Add Extra Cheese",
    //         additional_price: "0.50",
    //       },
    //       homefries_toast: {
    //         id: 17,
    //         name: "Add a Side of Rye Toast",
    //         additional_price: "1.00",
    //       },
    //     },
    //     price: 7.49,
    //     quantity: 1,
    //   },
    //   {
    //     id: 11,
    //     name: "Beef Country Burrito",
    //     option_groups: {
    //       homefries_toast: {
    //         id: 18,
    //         name: "Add a Side of Sourdough Toast",
    //         additional_price: "1.00",
    //       },
    //     },
    //     price: 6.99,
    //     quantity: 1,
    //   },
    //   {
    //     id: 11,
    //     name: "Beef Country Burrito",
    //     option_groups: {
    //       breakfast_mods: {
    //         id: 20,
    //         name: "Add Extra Cheese",
    //         additional_price: "0.50",
    //       },
    //       homefries_toast: {
    //         id: 17,
    //         name: "Add a Side of Rye Toast",
    //         additional_price: "1.00",
    //       },
    //     },
    //     price: 7.49,
    //     quantity: 1,
    //   },
    //   {
    //     id: 11,
    //     name: "Beef Country Burrito",
    //     option_groups: {
    //       homefries_toast: {
    //         id: 18,
    //         name: "Add a Side of Sourdough Toast",
    //         additional_price: "1.00",
    //       },
    //     },
    //     price: 6.99,
    //     quantity: 1,
    //   }
    // ];

  let subtotal = cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0);

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div  className={`${styles.orderHeader} vertical-center`}>
          <h1>Let&apos;s review your order.</h1>
        </div>
        <PickupDetails />
        <CustomerInfo />
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
        <OrderSummary />
      </div>
    </div>
  )
}


export default Checkout;
