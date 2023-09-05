import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from "../styles/ItemModal.module.css";
import Image from "next/image";

const PickupDateModal = ({ onCancel, onSelectDateTime, dateOptions, timeOptions }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleDateTimeSelection = () => {
    // Call the callback function with the selected date and time
    onSelectDateTime(selectedDate, selectedTime);
    onCancel(); // Close the modal or perform other actions
  };

  return ReactDOM.createPortal(
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.closeIcon} onClick={onCancel}>
            <Image className={styles.icon} src="/img/x-icon.svg" layout="fill" alt="location icon" />
          </div>
          <div className={styles.contentWrapper}>
            <div className={styles.modalHeaderContainer}>
              <h5>Pickup Details</h5>
            </div>

            <hr></hr>

            <div className={styles.contentContainer}>
              <div className={styles.selectContainer}>
                <div className={styles.selectWrapper}>
                  <select
                    className={styles.selectBox}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  >
                    {dateOptions.map((date, index) => (
                      <option key={index} value={date}>
                        {date}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.selectWrapper}>
                  <select
                    className={styles.selectBox}
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  >
                  {timeOptions.map((time, index) => (
                      <option key={index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.buttonWrapper}>
                <button className="bttn bttn_red bttn_center">
                  <span onClick={handleDateTimeSelection}>Update</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PickupDateModal;
