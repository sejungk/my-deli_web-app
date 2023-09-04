import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from "../styles/ItemModal.module.css";
import Image from "next/image";

const PickupDateModal = ({ onCancel }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [dateOptions, setDateOptions] = useState([]);
  const [timeOptions, setTimeOptions] = useState([]);
  const time230 = new Date(0, 0, 0, 2, 30, 0, 0);

  useEffect(() => {
    // Function to generate an array of dates for the next 2 weeks
    const generateDateOptions = () => {
      const options = [];
      const today = new Date();
      const currentTime = new Date();

      if (currentTime.getTime() > time230.getTime()) {
        today.setDate(today.getDate() + 1);
      }

      for (let i = 0; i < 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateString = date.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        });
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
      endTime.setHours(14, 30, 0); // Restaurant open hours until 2:30 PM

      const interval = 15 * 60 * 1000; // 15 minutes in milliseconds

      // Start from the greater of startTime and currentTime
      let nextAvailableTime = new Date(Math.max(startTime, currentTime));
      if (currentTime.getTime() > time230.getTime()) nextAvailableTime = startTime;

      while (nextAvailableTime <= endTime) {
        const hours = nextAvailableTime.getHours();
        const minutes = nextAvailableTime.getMinutes();

        if (currentTime.getTime() > time230.getTime() || timeDifference >= 15) {
          const timeString = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${
            hours >= 12 ? 'PM' : 'AM'
          }`;
          options.push(timeString);
        }

        nextAvailableTime = new Date(nextAvailableTime.getTime() + interval);
      }
      //   if (currentTime.getTime() > time230.getTime()) {
      //     const timeString = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${
      //       hours >= 12 ? 'PM' : 'AM'
      //     }`;
      //     options.push(timeString);
      //     nextAvailableTime = new Date(nextAvailableTime.getTime() + interval);
      //   }
      //   else if (timeDifference >= 15) {
      //     const timeString = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${
      //       hours >= 12 ? 'PM' : 'AM'
      //     }`;
      //     options.push(timeString);
      //     nextAvailableTime = new Date(nextAvailableTime.getTime() + interval);
      //   }
      // }

      return options;
    };

    const dateOpts = generateDateOptions();
    const timeOpts = generateTimeOptions();

    setDateOptions(dateOpts);
    setTimeOptions(timeOpts);

    // Set initial values for selectedDate and selectedTime
    setSelectedDate(dateOpts[0]);
    setSelectedTime(timeOpts[0]);
  }, []);

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
