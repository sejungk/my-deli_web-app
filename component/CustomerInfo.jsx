import styles from "../styles/CustomerInfo.module.css";
// import Image from "next/image";

const CustomerInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.customerInfoHeaderSection}>
        <h1>Customer Info</h1>
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
