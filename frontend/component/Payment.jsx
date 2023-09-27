import styles from "../styles/Payment.module.css";
import Image from "next/image";

const Payment = () => {
  return (
    <div className="checkout-card-container">
      <div className="checkout-card-header">
        <h4>Payment</h4>
      </div>

      <hr></hr>

      <div className={styles.customerInfoSection}>

          <div>
            <p>Card Number</p>
            <input className={styles.input100} type="text" id="name" name="name" required></input>
          </div>

        <div className="flex_row">
          <div>
            <p>Exp</p>
            <input className={styles.input33} type="text" id="name" name="name" required></input>
          </div>

          <div>
              <p>CVV</p>
              <input className={styles.input33} type="text" id="name" name="name" required></input>
          </div>

          <div>
              <p>Billing Zip Code</p>
              <input className={styles.input33} type="text" id="name" name="name" required></input>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Payment;
