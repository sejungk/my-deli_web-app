import React from "react";
import styles from "../styles/EmptyCart.module.css";
import Image from "next/image";

const EmptyCart = () => {
  return (
    <div className={styles.container}>
      <div className={styles.illustration}>

        <Image className={styles.trayImg} src="/img/food-tray-outlined_icon.svg" alt="food tray icon" width={150} height={150}/>
      </div>
      <div className={styles.textContainer}>
        <h4>No Orders Yet</h4>
        <p>Add an item to get started.</p>
      </div>
    </div>
  );
};

export default EmptyCart;
