import React, { useState } from 'react';
import styles from "../styles/CustomerInfo.module.css";

const CustomerInfo = ({ onCustomerInfoChange }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

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
            <input
              className={styles.input}
              type="text"
              id="firstName"
              name="firstName"
              minlength="1"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                onCustomerInfoChange({ firstName: e.target.value });
              }}
              required>
            </input>
          </div>

          <div>
            <p>Last Name</p>
            <input className={styles.input}
              type="text"
              id="lastName"
              name="lastName"
              minLength="1"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                onCustomerInfoChange({ lastName: e.target.value });
              }}
              required>
            </input>
          </div>
        </div>

        <div>
          <p>Phone Number</p>
          <input className={styles.input}
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            required
            minLength="1"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              onCustomerInfoChange({ phoneNumber: e.target.value });
            }}>
          </input>
        </div>
      </div>
    </div>
  )
}

export default CustomerInfo;
