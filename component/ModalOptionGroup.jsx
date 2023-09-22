import React, { useState } from "react";
import styles from "../styles/ModalOptionGroup.module.css";

const ModalOptionGroup = ({ optionGroup, selectedOption, handleOptionChange, operationType, selectionCounts, setSelectionCounts, addToOrderClicked }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const nextIsFree = optionGroup.free_option_limit !== null && (selectionCounts[optionGroup.name] === undefined || selectionCounts[optionGroup.name] < optionGroup.free_option_limit);
  const freeItemsCount = optionGroup.free_option_limit || 0;
  const itemsWithZeroPrice = selectedOptions.slice(0, freeItemsCount);

  const handleOptionSelection = (option, group_name) => {
    const isSelected = selectedOptions.some((selected) => selected.id === option.id);

    if (isSelected) {
      const updatedOptions = selectedOptions.filter((selected) => selected.id !== option.id);
      setSelectedOptions(updatedOptions);

      // Update the selection count for the respective group
      setSelectionCounts((prevCounts) => ({
        ...prevCounts,
        [group_name]: prevCounts[group_name] - 1,
      }));
    } else {
      const updatedOption = { ...option, group_name };
      setSelectedOptions([...selectedOptions, updatedOption]);

      // Update the selection count for the respective group
      setSelectionCounts((prevCounts) => ({
        ...prevCounts,
        [group_name]: (prevCounts[group_name] || 0) + 1,
      }));
    }
    handleOptionChange(optionGroup, option);
  };

  // Check if the section is required and not completed
  const isRequiredNotCompleted = optionGroup.required && !selectedOptions.length && addToOrderClicked;

  return (
    <div className={`${styles.container} ${isRequiredNotCompleted ? styles.requiredNotCompleted : ""}`}>
      <div className={styles.optionDesc}>
        <h5>{optionGroup.display_text}</h5>
        <div className={`${styles.requiredOptionalLabel} ${isRequiredNotCompleted ? styles.requiredNotCompletedLabel : ""}`}>
          {optionGroup.required ? "REQUIRED" : "OPTIONAL"}
        </div>
      </div>
      <span className="comment">
        {optionGroup.free_option_limit === 1
          ? "* first item is free"
          : optionGroup.free_option_limit > 1
          ? `* first ${optionGroup.free_option_limit} items are free`
          : ""}
      </span>

      <div className={styles.optionChoices}>
        {optionGroup.options.map((option, index) => {
          return (
            <div className={styles.listOption} key={option.id}>
              <label className={styles.label}>
                <input
                  className={styles.option}
                  type={optionGroup.allow_multiple ? "checkbox" : "radio"}
                  value={option.name}
                  name={optionGroup.name}
                  {...(operationType === "edit" &&
                  selectedOption[option.id] &&
                  selectedOption[option.id].id === option.id && { checked: true })}
                  onChange={() => {
                    handleOptionSelection(option, optionGroup.name);
                  }}
                />
                <span>{option.name}</span>
              </label>
              <div>${nextIsFree ? "0.00" : option.additional_price.toFixed(2)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModalOptionGroup;


