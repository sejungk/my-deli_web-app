import React, { useState } from 'react';
import styles from "../styles/CustomerInfo.module.css";
import { parsePhoneNumber, isValidNumber } from 'libphonenumber-js';

const CustomerInfo = ({ onCustomerInfoChange, phoneNumberValid, updatePhoneNumberValid }) => {
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
        updatePhoneNumberValid(true);
        onCustomerInfoChange({ phoneNumber: e.target.value });
      } else {
        console.log("INVALID NUMBER");
        updatePhoneNumberValid(false);
        onCustomerInfoChange({ phoneNumber: '' });
      }
    } else {
      updatePhoneNumberValid(false);
    }
  }

  return (
    <div className="checkout-card-container">
        <div className="checkout-card-header">
        <h4>Customer Info</h4>
      </div>

      <hr></hr>

      <div className={`${styles.cardWrapper} checkout-card_content`}>
        <div className={`${styles.nameRow} flex_row`}>
          <div>
            <input
              className={styles.input}
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                onCustomerInfoChange({ firstName: e.target.value });
              }}
              required>
            </input>
          </div>

          <div>
            <input className={styles.input}
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
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
          <input className={styles.input}
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Phone Number"
            required
            value={phoneNumber}
            onChange={handlePhoneNumberChange}>
          </input>
          {!phoneNumberValid && (
            <span className={styles.errorMsg}>
              A valid phone number must be provided.
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default CustomerInfo;
