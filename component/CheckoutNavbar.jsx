import styles from "../styles/CheckoutNavbar.module.css"
import Image from "next/image";

const CheckoutNavbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.backBttn}>
        <Image src="/img/back-arrow.svg" layout="fill" alt="location icon"/>
      </div>
      <p>Back</p>
    </div>
  )
}

export default CheckoutNavbar;

