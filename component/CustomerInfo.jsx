import React, { useState } from 'react';
import styles from "../styles/CustomerInfo.module.css";
import { parsePhoneNumber, isValidNumber } from 'libphonenumber-js';

const CustomerInfo = ({ onCustomerInfoChange }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneNumberChange = (e) => {
    let inputPhoneNumber = e.target.value;
    inputPhoneNumber = inputPhoneNumber.replace(/\D/g, '');

    // Automatically add dashes to format the phone number
    if (inputPhoneNumber.length <= 3) {
      setPhoneNumber(inputPhoneNumber);
    } else if (inputPhoneNumber.length <= 6) {
      setPhoneNumber(`${inputPhoneNumber.slice(0, 3)}-${inputPhoneNumber.slice(3)}`);
    } else if (inputPhoneNumber.length <= 10) {
      setPhoneNumber(`${inputPhoneNumber.slice(0, 3)}-${inputPhoneNumber.slice(3, 6)}-${inputPhoneNumber.slice(6)}`);
    } else {
      // If more than 10 digits are entered, truncate the input
      inputPhoneNumber = inputPhoneNumber.slice(0, 10);
      setPhoneNumber(`${inputPhoneNumber.slice(0, 3)}-${inputPhoneNumber.slice(3, 6)}-${inputPhoneNumber.slice(6)}`);
    }

    // Check if the formatted phone number is valid
    if (inputPhoneNumber.length === 10) {
      const parsedPhoneNumber = parsePhoneNumber(inputPhoneNumber, 'US');
      if (isValidNumber(parsedPhoneNumber.number, 'US')) {
        console.log("VALID NUMBER")
        onCustomerInfoChange({ phoneNumber: e.target.value });
      } else {
        console.log("INVALID NUMBER")
        onCustomerInfoChange({ phoneNumber: '' }); // Clear the phone number if it's invalid
      }
    }
  }

  return (
    <div className="checkout-card-container">
        <div className="checkout-card-header">
        <h4>Customer Info</h4>
      </div>

      <hr></hr>

      <div className={`${styles.card_wrapper} checkout-card_content`}>
        <div className="flex_row">
          <div>
            <p>First Name</p>
            <input
              className={styles.input}
              type="text"
              id="firstName"
              name="firstName"
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
            value={phoneNumber}
            onChange={handlePhoneNumberChange}>
          </input>
        </div>
      </div>
    </div>
  )
}

export default CustomerInfo;
