import styles from "../styles/Payment.module.css";
import Image from "next/image";

const Payment = () => {
  return (
    <div className={styles.container}>
      <div className={styles.customerInfoHeaderSection}>
        <h1>Payment</h1>
      </div>

      <hr></hr>

      <div className={styles.customerInfoSection}>

          <div>
            <p>Card Number</p>
            <input className={styles.input100} type="text" id="name" name="name" required minlength="1"></input>
          </div>


        <div className="flex_row">
          <div>
            <p>Exp</p>
            <input className={styles.input33} type="text" id="name" name="name" required minlength="15"></input>
          </div>

          <div>
              <p>CVV</p>
              <input className={styles.input33} type="text" id="name" name="name" required minlength="3" maxlength="3"></input>
          </div>

          <div>
              <p>Billing Zip Code</p>
              <input className={styles.input33} type="text" id="name" name="name" required minlength="5" maxlength="5"></input>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Payment;
