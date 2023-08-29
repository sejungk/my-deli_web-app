import styles from "../styles/CustomerInfo.module.css";
// import Image from "next/image";

const CustomerInfo = () => {
  return (
    <div className="checkout-card-container">
        <div className="checkout-card-header">
        <h4>Customer Info</h4>
      </div>

      <hr></hr>

      <div className={styles.customerInfoSection}>
        <div className="flex_row">
          <div>
            <p>First Name</p>
            <input className={styles.input} type="text" id="name" name="name" required minlength="1"></input>
          </div>

          <div>
            <p>Last Name</p>
            <input className={styles.input} type="text" id="name" name="name" required minlength="1"></input>
          </div>
        </div>

        <div>
          <p>Phone Number</p>
          <input className={styles.input} type="text" id="name" name="name" required minlength="1"></input>
        </div>
      </div>

    </div>
  )
}

export default CustomerInfo;
