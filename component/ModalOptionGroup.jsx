import React, { useState, useEffect } from "react";
import styles from "../styles/ModalOptionGroup.module.css";

const ModalOptionGroup = ({ optionGroup, handleOptionChange, selectionCounts, setSelectionCounts }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const nextIsFree = optionGroup.free_option_limit !== null && (selectionCounts[optionGroup.name] === undefined || selectionCounts[optionGroup.name] < optionGroup.free_option_limit);
  const freeItemsCount = optionGroup.free_option_limit || 0;
  const itemsWithZeroPrice = selectedOptions.slice(0, freeItemsCount);

  useEffect(() => {
    if (selectionCounts[optionGroup.name]) {
      console.log(`Selection count: ${selectionCounts[optionGroup.name]}`);
      console.log(optionGroup.free_option_limit, selectionCounts[optionGroup.name])
      console.log(nextIsFree)
    }
  }, [selectionCounts, optionGroup]);

  // Function to handle option selection
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

  return (
    <div className={styles.container}>
      <div className={styles.optionDesc}>
        <h5>{optionGroup.display_text}</h5>
        <div className={styles.requiredOptionalLabel}>
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
          const isSelected = selectedOptions.some((selected) => selected.id === option.id);
          const shouldHaveZeroPrice = itemsWithZeroPrice.some((item) => item.id === option.id);
          return (
            <div className={styles.listOption} key={option.id}>
              <label className={styles.label}>
                <input
                  className={styles.option}
                  type={optionGroup.allow_multiple ? "checkbox" : "radio"}
                  value={option.name}
                  name={optionGroup.name}
                  onChange={() => {
                    handleOptionSelection(option, optionGroup.name);
                  }}
                  checked={isSelected}
                />
                <span>{option.name}</span>
              </label>
              <div>${shouldHaveZeroPrice ? "0.00" : nextIsFree ? "0.00" : option.additional_price.toFixed(2)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModalOptionGroup;


