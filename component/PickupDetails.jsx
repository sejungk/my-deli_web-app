import styles from "../styles/PickupDetails.module.css";
import Image from "next/image";

const PickupDetails = () => {
  return (
    <div className={styles.container}>
      <div className={styles.pickupHeaderSection}>
        <h1>Pickup Details</h1>
      </div>
      <hr></hr>
      <div className={styles.deliInfoSection}>
        <div className={styles.storeLogo}>
          <Image className={styles.logo} src="/img/store-icon.svg" layout="fill" alt="restaurant icon"/>
        </div>
        <div className={styles.storeInfo}>
          <h5>My Deli</h5>
          <p>521 Broadway St, Quantico, VA 22134</p>
          <a href="https://goo.gl/maps/39p3eL8vpdob73EC6">Get Directions</a>
        </div>
      </div>
    </div>
  )
}

export default PickupDetails;
