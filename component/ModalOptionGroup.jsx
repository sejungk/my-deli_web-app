import React from "react";
import styles from "../styles/ModalOptionGroup.module.css";

const ModalOptionGroup = ({ optionGroup, selectedOption, handleOptionChange }) => {
  return (
    <div className={styles.container}>
      <div className={styles.optionDesc}>
        <h5>{optionGroup.option_group_display_text}</h5>
        <div className={styles.requiredOptionalLabel}>
          {optionGroup.option_group_required ? "REQUIRED" : "OPTIONAL"}
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
                name={optionGroup.option_group_name}
                onChange={() => {
                  console.log("Clicked option modal:", optionGroup.option_group_display_text, optionGroup.options[index].name);
                  handleOptionChange(optionGroup.option_group_name, option.name);
                }}
              />{" "}
              {option.name}
            </label>
            <div>{option.additional_price === "0.00" ? "---" : `$${option.additional_price}`}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModalOptionGroup;
