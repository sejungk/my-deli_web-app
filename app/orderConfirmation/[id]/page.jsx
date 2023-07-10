import styles from "../../../styles/OrderConfirmation.module.css"
import Image from "next/image";

const OrderConfirmation = () => {
  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <div className={styles.logoMobile}>
          <Image src="/img/green-check.svg" layout="fill" alt="location icon"/>
        </div>
        <span class={styles.mainText}>Thank you for your order, John.</span>
        <div class={styles.descriptionText}>
          <div class={styles.logoWeb}>
            <Image src="/img/green-check.svg" layout="fill" alt="location icon"/>
          </div>
          <h4>We’re preparing your pickup order for 3:30 am today. </h4>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation;
