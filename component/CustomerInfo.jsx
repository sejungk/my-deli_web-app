import React, { useState, useEffect } from 'react';
import styles from "../styles/CustomerInfo.module.css";
import { parsePhoneNumber, isValidNumber } from 'libphonenumber-js';

const CustomerInfo = ({ onCustomerInfoChange, phoneNumberValid, firstNameValid, lastNameValid, setFirstNameValid, setLastNameValid, updatePhoneNumberValid, checkoutButtonClicked}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    // Check if first name is at least 2 characters long
    setFirstNameValid(firstName.length >= 2);
  }, [firstName]);

  useEffect(() => {
    // Check if last name is at least 2 characters long
    setLastNameValid(lastName.length >= 2);
  }, [lastName]);

  useEffect(() => {
    console.log(checkoutButtonClicked);
    console.log("fields complete ",lastNameValid, setFirstNameValid, setLastNameValid);
  }, [checkoutButtonClicked])

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
              className={`${styles.input} ${!firstNameValid && checkoutButtonClicked ? styles.errorInput : ''}`}
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
            {console.log(firstNameValid && checkoutButtonClicked)}
            {!firstNameValid && checkoutButtonClicked && (
              <div class={styles.errorMsg}>
                <svg fill="none" viewBox="0 0 16 16">
                  <path fill="#F25353" fill-rule="evenodd" d="M8 14A6 6 0 0 0 8 2a6 6 0 0 0 0 12ZM8 3.33a4.67 4.67 0 1 1-.01 9.35A4.67 4.67 0 0 1 8 3.33Zm0 8a.83.83 0 1 0 0-1.66.83.83 0 0 0 0 1.66Zm-.67-6.66h1.34V9H7.33V4.67Z"></path>
                </svg>
                <span className="error-text">A first name must be provided.</span>
              </div>
            )}
          </div>

          <div>
            <input
              className={`${styles.input} ${!lastNameValid && checkoutButtonClicked ? styles.errorInput : ''}`}
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
            {!lastNameValid && checkoutButtonClicked && (
              <div class={styles.errorMsg}>
                <svg fill="none" viewBox="0 0 16 16">
                  <path fill="#F25353" fill-rule="evenodd" d="M8 14A6 6 0 0 0 8 2a6 6 0 0 0 0 12ZM8 3.33a4.67 4.67 0 1 1-.01 9.35A4.67 4.67 0 0 1 8 3.33Zm0 8a.83.83 0 1 0 0-1.66.83.83 0 0 0 0 1.66Zm-.67-6.66h1.34V9H7.33V4.67Z"></path>
                </svg>
                <span className="error-text">A last name must be provided.</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <input
            className={`${styles.input} ${!phoneNumberValid && checkoutButtonClicked ? styles.errorInput : ''}`}
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Phone Number"
            required
            value={phoneNumber}
            onChange={handlePhoneNumberChange}>
          </input>
          {!phoneNumberValid && checkoutButtonClicked && (
            <div class={styles.errorMsg}>
              <svg fill="none" viewBox="0 0 16 16">
                <path fill="#F25353" fill-rule="evenodd" d="M8 14A6 6 0 0 0 8 2a6 6 0 0 0 0 12ZM8 3.33a4.67 4.67 0 1 1-.01 9.35A4.67 4.67 0 0 1 8 3.33Zm0 8a.83.83 0 1 0 0-1.66.83.83 0 0 0 0 1.66Zm-.67-6.66h1.34V9H7.33V4.67Z"></path>
              </svg>
              <span className="error-text">A valid phone number must be provided.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CustomerInfo;
