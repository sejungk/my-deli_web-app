import React from "react";
import styles from "../styles/ModalOptionGroup.module.css";

const ModalOptionGroup = ({ optionGroup, selectedOption, handleOptionChange, operationType }) => {

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
            <label className={styles.label}>
              {/* {console.log(Object.values(selectedOption)[0], option)} */}
              <input
                className={styles.option}
                type="radio"
                value={option.name}
                name={optionGroup.name}
                {...(operationType === "edit" &&
                selectedOption &&
                 selectedOption.id === option.id && { checked: true })}
                onChange={() => {
                  handleOptionChange(optionGroup, option);
                }}
              />
              {/* {operationType === "edit" &&
                  selectedOption &&
                  selectedOption.id === option.id ? (
                <input
                  className={styles.option}
                  type="radio"
                  // type="checkbox"
                  value={option.name}
                  name={optionGroup.name}
                  checked={true}
                  onChange={() => {
                    handleOptionChange(optionGroup, option);
                  }}
                />
              ) : (
                <input
                  className={styles.option}
                  type="radio"
                  // type="checkbox"
                  value={option.name}
                  name={optionGroup.name}
                  onChange={() => {
                    handleOptionChange(optionGroup, option);
                  }}
                />
              )} */}
              <span>{option.name}</span>
            </label>
            <div>{option.additional_price === "00.00" ? "---" : `$${option.additional_price.toFixed(2)}`}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModalOptionGroup;
