import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from "../styles/ItemModal.module.css";
import Image from "next/image";

const PickupDateModal = ({ onCancel }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Function to generate an array of dates for the next 2 weeks
  const generateDateOptions = () => {
    const options = [];
    const today = new Date();
    const currentTime = new Date();

    if (currentTime.getHours() >= 15) {
      // If it's past 3 PM, show tomorrow's date
      today.setDate(today.getDate() + 1);
    }

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateString = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      options.push(dateString);
    }
    return options;
  };

  // Function to generate an array of time options in 15-minute intervals
  const generateTimeOptions = () => {
    const options = [];
    const currentTime = new Date();
    const startTime = new Date(currentTime);
    startTime.setHours(6, 0, 0);

    const endTime = new Date(currentTime);
    endTime.setHours(15, 0, 0);

    if (currentTime.getHours() >= 15) {
      // If it's past 3 PM, set the start time to 6 AM for the next day
      startTime.setDate(startTime.getDate() + 1);
      startTime.setHours(6, 0, 0);
    }

    const interval = 15 * 60 * 1000; // 15 minutes in milliseconds

    let nextAvailableTime = new Date(Math.ceil(currentTime.getTime() / interval) * interval); // Round up to the nearest 15 minutes

    while (nextAvailableTime <= endTime) {
      const hours = nextAvailableTime.getHours();
      const minutes = nextAvailableTime.getMinutes();
      const timeString = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
      options.push(timeString);
      nextAvailableTime = new Date(nextAvailableTime.getTime() + interval);
    }
    return options;
  };

  const dateOptions = generateDateOptions();
  const timeOptions = generateTimeOptions();

  useEffect(() => {
    // Set initial values for selectedDate and selectedTime
    setSelectedDate(dateOptions[0]);
    setSelectedTime(timeOptions[0]);
  }, [dateOptions, timeOptions]);

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
                  <select className={styles.selectBox} value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                    {dateOptions.map((date, index) => (
                      <option key={index} value={date}>
                        {date}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.selectWrapper}>
                  <select className={styles.selectBox} value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
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
                  <span>Update</span>
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
