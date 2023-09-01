import React from "react";
import styles from "../styles/ModalOptionGroup.module.css";

const ModalOptionGroup = ({ optionGroup, selectedOption, handleOptionChange }) => {
  return (
    <div className={styles.container}>
      <div className={styles.optionDesc}>
        <h5>{optionGroup.display_text}</h5>
        <div className={styles.requiredOptionalLabel}>
          {optionGroup.required ? "REQUIRED" : "OPTIONAL"}
        </div>
      </div>

      <div className={styles.optionChoices}>
        {optionGroup.options.map((option, index) => (
          <div className={styles.listOption} key={option.id}>
            <label>
              <input
                className={styles.option}
                type="radio"
                value={option.name}
                name={optionGroup.name}
                onChange={() => {
                  handleOptionChange(optionGroup.name, option);
                }}
              />{" "}
              {option.name}
            </label>
            <div>{option.additional_price === "0.00" ? "---" : `$${option.additional_price.toFixed(2)}`}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModalOptionGroup;
